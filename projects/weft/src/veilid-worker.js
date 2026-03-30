// Veilid Web Worker — P2P networking, identity, DHT, messaging
// Module worker: loaded with { type: 'module' }

import init, {
  veilidClient,
  VeilidRoutingContext,
  veilidCrypto,
  PublicKey,
  SecretKey,
  KeyPair,
  RecordKey,
  SharedSecret,
  Nonce,
} from '../wasm/veilid/veilid_wasm.js';

let routingCtx = null;
let crypto = null;
let identity = null; // { publicKey, secretKey, keyPair }

// --- Update callback — posts Veilid events to main thread ---

function onVeilidUpdate(update) {
  // update is a VeilidUpdate enum variant as a JS object
  // Key variants: Attachment, AppMessage, AppCall, ValueChange, RouteChange
  self.postMessage({ type: 'update', update });
}

// --- Helpers ---

function encodeBytes(uint8arr) {
  return Array.from(uint8arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

function decodeBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

// --- Initialization ---

async function initVeilid({ bootstrapUrl }) {
  // 1. Load WASM binary
  await init();

  // 2. Initialize core (platform/logging config)
  await veilidClient.initializeCore({
    logging: {
      api: { enabled: true, level: 'Info' },
      performance: { enabled: false, level: 'Info', logs_in_timings: false, logs_in_console: false },
    },
  });

  // 3. Get default config and customize for browser WASM
  const config = veilidClient.defaultConfig();

  // Override for browser: no listening, WSS connect only
  config.network = config.network || {};
  config.network.routingTable = config.network.routingTable || {};
  config.network.routingTable.bootstrap = bootstrapUrl
    ? [bootstrapUrl]
    : ['wss://bootstrap.veilid.net/ws'];

  // Override only what we need — let defaultConfig() handle the rest
  // Disable UDP/TCP (browser can't use raw sockets)
  config.network.protocol.udp.enabled = false;
  config.network.protocol.tcp.connect = false;
  config.network.protocol.tcp.listen = false;
  // WS: connect only, no listen (WASM can't listen)
  config.network.protocol.ws.connect = true;
  config.network.protocol.ws.listen = false;
  config.network.protocol.wss.connect = true;
  config.network.protocol.wss.listen = false;

  config.programName = 'weft';
  config.namespace = 'weft';

  // 4. Start core with update callback
  await veilidClient.startupCore(onVeilidUpdate, config);

  // 5. Attach to network
  await veilidClient.attach();

  // 6. Create routing context (default safety routing)
  routingCtx = VeilidRoutingContext.create();

  // 7. Get crypto instance
  crypto = veilidClient.getCrypto(veilidCrypto.CRYPTO_KIND_VLD0);

  return { ok: true };
}

// --- Identity ---

async function generateKeyPair() {
  const kp = crypto.generateKeyPair();
  const pub = kp.key().encode();
  const sec = kp.secret().encode();
  identity = { publicKey: pub, secretKey: sec };
  return identity;
}

function setIdentity({ publicKey, secretKey }) {
  identity = { publicKey, secretKey };
  return { ok: true };
}

// --- Private Routes ---

async function createPrivateRoute() {
  const routeBlob = await veilidClient.newPrivateRoute();
  // routeBlob has { route_id, blob }
  return {
    routeId: routeBlob.route_id,
    blob: routeBlob.blob, // Uint8Array that can be shared for others to reach us
  };
}

async function importRoute({ blob }) {
  const routeId = veilidClient.importRemotePrivateRoute(new Uint8Array(blob));
  return { routeId: routeId.encode() };
}

async function releaseRoute({ routeId }) {
  // TODO: need to convert string routeId back to RouteId object
  // For now, this is a placeholder
  return { ok: true };
}

// --- DHT Records ---

async function createDHTRecord({ schema }) {
  // schema: { kind: 'DFLT', o_cnt: N } or { kind: 'SMPL', o_cnt: N, members: [...] }
  // For MVP, use DFLT schema (single writer)
  const kind = veilidCrypto.CRYPTO_KIND_VLD0;
  const desc = await routingCtx.createDHTRecord(kind, schema || { kind: 'DFLT', o_cnt: 1 });
  return {
    key: desc.key,
    owner: desc.owner,
    schema: desc.schema,
  };
}

async function openDHTRecord({ key, writer }) {
  const recordKey = RecordKey.fromEncodedString(key);
  const kp = writer ? KeyPair.fromEncodedString(writer) : null;
  const desc = await routingCtx.openDHTRecord(recordKey, kp);
  return {
    key: desc.key,
    owner: desc.owner,
    schema: desc.schema,
  };
}

async function closeDHTRecord({ key }) {
  const recordKey = RecordKey.fromEncodedString(key);
  await routingCtx.closeDHTRecord(recordKey);
  return { ok: true };
}

async function getDHTValue({ key, subkey, forceRefresh }) {
  const recordKey = RecordKey.fromEncodedString(key);
  const value = await routingCtx.getDHTValue(recordKey, subkey, forceRefresh || false);
  if (!value) return null;
  // value is ValueData { data: Uint8Array, seq: number, writer: PublicKey }
  return {
    data: value.data,
    seq: value.seq,
    writer: value.writer,
  };
}

async function setDHTValue({ key, subkey, data }) {
  const recordKey = RecordKey.fromEncodedString(key);
  const dataBytes = typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  const result = await routingCtx.setDHTValue(recordKey, subkey, dataBytes);
  return result ? { data: result.data, seq: result.seq } : null;
}

async function watchDHTValues({ key, subkeys, expiration, count }) {
  const recordKey = RecordKey.fromEncodedString(key);
  const active = await routingCtx.watchDhtValues(recordKey, subkeys || null, expiration || null, count || null);
  return { active };
}

// --- Messaging ---

async function sendAppMessage({ target, message }) {
  const msgBytes = typeof message === 'string'
    ? new TextEncoder().encode(message)
    : new Uint8Array(message);
  await routingCtx.appMessage(target, msgBytes);
  return { ok: true };
}

async function sendAppCall({ target, request }) {
  const reqBytes = typeof request === 'string'
    ? new TextEncoder().encode(request)
    : new Uint8Array(request);
  const response = await routingCtx.appCall(target, reqBytes);
  return { response: Array.from(response) };
}

async function replyAppCall({ callId, message }) {
  const msgBytes = typeof message === 'string'
    ? new TextEncoder().encode(message)
    : new Uint8Array(message);
  await veilidClient.appCallReply(callId, msgBytes);
  return { ok: true };
}

// --- Encryption (for room-level message encryption) ---

function encryptMessage({ data, sharedSecret }) {
  const nonce = crypto.randomNonce();
  const secret = SharedSecret.fromEncodedString(sharedSecret);
  const plaintext = typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  const ciphertext = crypto.encryptAead(plaintext, nonce, secret, null);
  return {
    ciphertext: Array.from(ciphertext),
    nonce: nonce.encode(),
  };
}

function decryptMessage({ ciphertext, nonce, sharedSecret }) {
  const nonceObj = Nonce.fromEncodedString(nonce);
  const secret = SharedSecret.fromEncodedString(sharedSecret);
  const plaintext = crypto.decryptAead(new Uint8Array(ciphertext), nonceObj, secret, null);
  return { data: Array.from(plaintext) };
}

function generateSharedSecret() {
  const secret = crypto.randomSharedSecret();
  return { sharedSecret: secret.encode() };
}

// --- State ---

async function getState() {
  const state = await veilidClient.getState();
  return state;
}

async function shutdown() {
  if (routingCtx) {
    routingCtx.free();
    routingCtx = null;
  }
  await veilidClient.detach();
  await veilidClient.shutdownCore();
  return { ok: true };
}

// --- Action dispatch ---

const actions = {
  init: initVeilid,
  generateKeyPair,
  setIdentity,
  createPrivateRoute,
  importRoute,
  releaseRoute,
  createDHTRecord,
  openDHTRecord,
  closeDHTRecord,
  getDHTValue,
  setDHTValue,
  watchDHTValues,
  sendAppMessage,
  sendAppCall,
  replyAppCall,
  encryptMessage,
  decryptMessage,
  generateSharedSecret,
  getState,
  shutdown,
};

// --- Message handler ---

self.onmessage = async (e) => {
  const { id, action, params } = e.data;
  try {
    const handler = actions[action];
    if (!handler) throw new Error(`Unknown action: ${action}`);
    const result = await handler(params || {});
    self.postMessage({ id, result });
  } catch (err) {
    self.postMessage({ id, error: err.message || String(err) });
  }
};
