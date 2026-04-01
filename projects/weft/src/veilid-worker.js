// Veilid Web Worker — P2P networking, identity, DHT, messaging
// Module worker: loaded with { type: 'module' }

// Veilid WASM expects `window` and `localStorage` — polyfill for Worker context
if (typeof window === 'undefined') {
  self.window = self;
}
// Make Window constructor available so instanceof checks work
if (typeof Window === 'undefined') {
  self.Window = self.constructor;
}

// Diagnostics — log what APIs are available in this Worker
console.log('[veilid-worker] Worker environment diagnostics:');
console.log('  typeof window:', typeof window);
console.log('  typeof Window:', typeof Window);
console.log('  typeof self:', typeof self);
console.log('  self.constructor.name:', self.constructor?.name);
console.log('  typeof indexedDB:', typeof indexedDB);
console.log('  typeof localStorage:', typeof localStorage);
console.log('  typeof crypto:', typeof globalThis.crypto);
console.log('  typeof fetch:', typeof fetch);
console.log('  window === self:', window === self);
console.log('  self instanceof Window:', self instanceof Window);
if (typeof self.localStorage === 'undefined') {
  // In-memory localStorage shim for Workers (Veilid uses it for table store)
  const store = new Map();
  self.localStorage = {
    getItem: (k) => store.has(k) ? store.get(k) : null,
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
    get length() { return store.size; },
    key: (i) => [...store.keys()][i] || null,
  };
}

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
let vldCrypto = null;
let identity = null; // { publicKey, secretKey, keyPair }
const importedRoutes = new Map(); // routeId string → RouteId WASM object

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

function parseRecordKey(key) {
  return typeof key === 'string' ? RecordKey.parse(key) : key;
}

function parseKeyPair(kp) {
  return typeof kp === 'string' ? KeyPair.parse(kp) : kp;
}

// --- Initialization ---

async function initVeilid() {
  // 1. Load WASM binary
  await init();

  // 2. Initialize core (platform/logging config)
  await veilidClient.initializeCore({
    logging: {
      api: { enabled: true, level: 'Debug' },
      performance: { enabled: false, level: 'Info', logsInTimings: false, logsInConsole: false },
    },
  });

  // 3. Get default config and customize for browser WASM
  const config = veilidClient.defaultConfig();

  // Debug: dump default config to understand what bootstrap/protocol we're working with
  function debugLog(msg) {
    self.postMessage({ type: 'update', update: { kind: 'Log', log_level: 'Info', message: msg } });
  }
  debugLog('[veilid-worker] Default bootstrap: ' + JSON.stringify(config.network.routingTable.bootstrap));
  debugLog('[veilid-worker] Default WS config: ' + JSON.stringify(config.network.protocol.ws));
  debugLog('[veilid-worker] Default WSS config: ' + JSON.stringify(config.network.protocol.wss || 'NOT PRESENT'));

  // Default bootstrap uses ws:// which is blocked on HTTPS pages (mixed content).
  // URL format triggers "Direct bootstrap" (direct WSS connection).
  // Dial-info format (wss|0.0.0.0|...) triggers "TXT bootstrap" (DNS TXT lookup) which fails.
  config.network.routingTable.bootstrap = ['wss://veilid.andymolenda.com/ws'];
  debugLog('[veilid-worker] Overriding bootstrap with WSS URL: ' + JSON.stringify(config.network.routingTable.bootstrap));

  // WS/WSS: connect only, no listen (WASM can't accept incoming)
  config.network.protocol.ws.connect = true;
  config.network.protocol.ws.listen = false;
  if (!config.network.protocol.wss) {
    config.network.protocol.wss = {};
  }
  config.network.protocol.wss.connect = true;
  config.network.protocol.wss.listen = false;

  debugLog('[veilid-worker] Final WS config: ' + JSON.stringify(config.network.protocol.ws));
  debugLog('[veilid-worker] Final WSS config: ' + JSON.stringify(config.network.protocol.wss));

  config.programName = 'weft';
  config.namespace = 'weft';

  // 4. Start core with update callback
  await veilidClient.startupCore(onVeilidUpdate, config);

  // 5. Attach to network
  await veilidClient.attach();

  // 6. Create routing context (default safety routing)
  routingCtx = VeilidRoutingContext.create();

  // 7. Get crypto instance
  vldCrypto = veilidClient.getCrypto(veilidCrypto.CRYPTO_KIND_VLD0);

  return { ok: true };
}

// --- Identity ---

async function generateKeyPair() {
  const kp = vldCrypto.generateKeyPair();
  const pub = kp.key.toString();
  const sec = kp.secret.toString();
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
  return {
    routeId: routeBlob.route_id,
    blob: routeBlob.blob,
  };
}

async function importRoute({ blob }) {
  const routeId = veilidClient.importRemotePrivateRoute(new Uint8Array(blob));
  const routeIdStr = routeId.toString();
  importedRoutes.set(routeIdStr, routeId); // cache for appMessage
  return { routeId: routeIdStr };
}

async function releaseRoute({ routeId }) {
  return { ok: true };
}

// --- DHT Records ---

async function createDHTRecord({ schema, owner }) {
  const kind = veilidCrypto.CRYPTO_KIND_VLD0;
  const ownerKp = owner ? parseKeyPair(owner) : undefined;
  const desc = await routingCtx.createDHTRecord(kind, schema || { DFLT: { o_cnt: 1 } }, ownerKp);
  return {
    key: desc.key.toString(),
    owner: desc.owner.toString(),
    schema: desc.schema,
  };
}

async function openDHTRecord({ key, writer }) {
  const recordKey = parseRecordKey(key);
  const kp = writer ? parseKeyPair(writer) : null;
  const desc = await routingCtx.openDHTRecord(recordKey, kp);
  return {
    key: desc.key.toString(),
    owner: desc.owner.toString(),
    schema: desc.schema,
  };
}

async function closeDHTRecord({ key }) {
  const recordKey = parseRecordKey(key);
  await routingCtx.closeDHTRecord(recordKey);
  return { ok: true };
}

async function getDHTValue({ key, subkey, forceRefresh }) {
  const recordKey = parseRecordKey(key);
  const value = await routingCtx.getDHTValue(recordKey, subkey, forceRefresh || false);
  if (!value) return null;
  return {
    data: Array.from(value.data),
    seq: value.seq,
    writer: value.writer.toString(),
  };
}

async function setDHTValue({ key, subkey, data }) {
  const recordKey = parseRecordKey(key);
  const dataBytes = typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  const result = await routingCtx.setDHTValue(recordKey, subkey, dataBytes);
  return result ? { data: Array.from(result.data), seq: result.seq } : null;
}

async function watchDHTValues({ key, subkeys, expiration, count }) {
  const recordKey = parseRecordKey(key);
  const active = await routingCtx.watchDhtValues(recordKey, subkeys || null, expiration || null, count || null);
  return { active };
}

// --- Room DHT Operations ---

// Creates a DHT record for a room with SMPL schema.
// Owner gets subkey 0 (metadata). Each member gets 1 subkey (presence).
// Returns: { dhtKey, ownerKey, ownerSecret, encryptionKey }
async function createRoomDHT({ roomName }) {
  if (!identity) throw new Error('Identity not set');

  // Generate owner keypair for this room's DHT record
  const ownerKp = vldCrypto.generateKeyPair();
  const ownerPublicKey = ownerKp.key;
  const ownerSecretKey = ownerKp.secret;

  // Generate room encryption key (ChaCha20-Poly1305 symmetric key)
  const encryptionKey = vldCrypto.randomSharedSecret();

  // Create SMPL schema: owner gets 1 subkey (metadata), plus 1 member subkey for creator
  // Veilid WASM deserializes DHTSchema as a Rust tagged enum (externally tagged serde format)
  // Member keys must be MemberId (typed key), not bare PublicKey strings
  const kind = veilidCrypto.CRYPTO_KIND_VLD0;
  const memberId = veilidClient.generateMemberId(ownerPublicKey);
  const schema = {
    SMPL: {
      o_cnt: 1,  // subkey 0: room metadata (owner-writable)
      members: [
        { m_key: memberId.toString(), m_cnt: 1 },  // subkey 1: creator's presence
      ],
    },
  };

  const desc = await routingCtx.createDHTRecord(kind, schema, ownerKp);
  const dhtKey = desc.key.toString();

  // Write room metadata to subkey 0
  const metadata = JSON.stringify({
    v: 1,
    name: roomName,
    created_at: new Date().toISOString(),
    created_by: identity.publicKey,
    member_keys: [identity.publicKey],
  });
  await routingCtx.setDHTValue(desc.key, 0, new TextEncoder().encode(metadata));

  // Write creator's initial presence to subkey 1
  const presence = JSON.stringify({
    v: 1,
    display_name: '',
    public_key: identity.publicKey,
    status: 'online',
    last_seen: new Date().toISOString(),
    db_version: 0,
  });
  await routingCtx.setDHTValue(desc.key, 1, new TextEncoder().encode(presence));

  return {
    dhtKey,
    ownerKey: ownerPublicKey.toString(),
    ownerSecret: ownerSecretKey.toString(),
    encryptionKey: encryptionKey.toString(),
  };
}

// Opens an existing room's DHT record and reads metadata
async function openRoomDHT({ dhtKey, ownerKeyPair }) {
  const recordKey = parseRecordKey(dhtKey);
  const kp = ownerKeyPair ? parseKeyPair(ownerKeyPair) : null;
  const desc = await routingCtx.openDHTRecord(recordKey, kp);

  // Read room metadata from subkey 0
  const metaValue = await routingCtx.getDHTValue(desc.key, 0, true);
  let metadata = null;
  if (metaValue && metaValue.data) {
    try {
      metadata = JSON.parse(new TextDecoder().decode(metaValue.data));
    } catch (e) {
      // metadata may be encrypted or corrupt
    }
  }

  return {
    key: desc.key.toString(),
    owner: desc.owner.toString(),
    schema: desc.schema,
    metadata,
  };
}

// Updates room metadata (owner only)
async function updateRoomMetadata({ dhtKey, metadata }) {
  const recordKey = parseRecordKey(dhtKey);
  const data = new TextEncoder().encode(JSON.stringify(metadata));
  const result = await routingCtx.setDHTValue(recordKey, 0, data);
  return result ? { stale: true, data: Array.from(result.data) } : { ok: true };
}

// Writes presence to a member's subkey
async function writePresence({ dhtKey, subkey, presence }) {
  const recordKey = parseRecordKey(dhtKey);
  const data = new TextEncoder().encode(JSON.stringify(presence));
  const result = await routingCtx.setDHTValue(recordKey, subkey, data);
  return result ? { stale: true } : { ok: true };
}

// Reads a member's presence from their subkey
async function readPresence({ dhtKey, subkey }) {
  const recordKey = parseRecordKey(dhtKey);
  const value = await routingCtx.getDHTValue(recordKey, subkey, true);
  if (!value || !value.data) return null;
  try {
    return JSON.parse(new TextDecoder().decode(value.data));
  } catch (e) {
    return null;
  }
}

// Sets up a watch on a room's DHT record for changes
async function watchRoom({ dhtKey }) {
  const recordKey = parseRecordKey(dhtKey);
  const active = await routingCtx.watchDhtValues(recordKey, null, null, null);
  return { active };
}

// --- Messaging ---

async function sendAppMessage({ target, message }) {
  const msgBytes = typeof message === 'string'
    ? new TextEncoder().encode(message)
    : new Uint8Array(message);
  // target can be a routeId string (look up cached WASM object) or passed directly
  const routeId = typeof target === 'string' ? importedRoutes.get(target) : target;
  if (!routeId) throw new Error('Unknown route: ' + target + '. Import the route first.');
  await routingCtx.appMessage(routeId, msgBytes);
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
  const nonce = vldCrypto.randomNonce();
  const secret = SharedSecret.parse(sharedSecret);
  const plaintext = typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  const ciphertext = vldCrypto.encryptAead(plaintext, nonce, secret, null);
  return {
    ciphertext: Array.from(ciphertext),
    nonce: nonce.toString(),
  };
}

function decryptMessage({ ciphertext, nonce, sharedSecret }) {
  const nonceObj = Nonce.parse(nonce);
  const secret = SharedSecret.parse(sharedSecret);
  const plaintext = vldCrypto.decryptAead(new Uint8Array(ciphertext), nonceObj, secret, null);
  return { data: Array.from(plaintext) };
}

function generateSharedSecret() {
  const secret = vldCrypto.randomSharedSecret();
  return { sharedSecret: secret.toString() };
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
  // Room-level DHT operations
  createRoomDHT,
  openRoomDHT,
  updateRoomMetadata,
  writePresence,
  readPresence,
  watchRoom,
  // Messaging
  sendAppMessage,
  sendAppCall,
  replyAppCall,
  // Encryption
  encryptMessage,
  decryptMessage,
  generateSharedSecret,
  // State
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
