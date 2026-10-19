// bubble-share showcase — two-phone simulator and protocol labs.
// All bytes come from protocol.mjs; nothing here talks to a network.
import * as P from './protocol.mjs';

// ---------------------------------------------------------------------------
// Tiny DOM helpers
// ---------------------------------------------------------------------------

const $ = (sel, root = document) => root.querySelector(sel);

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }

function hexBlock(bytes, { diag = null, label = null } = {}) {
  const pre = h('pre', { class: 'hex' });
  if (label) pre.append(h('span', { class: 'k', text: label + '\n' }));
  if (diag) pre.append(h('span', { class: 'd', text: diag + '\n' }));
  const lines = [];
  for (let i = 0; i < bytes.length; i += 16) lines.push(P.hex(bytes.subarray(i, i + 16), ' '));
  pre.append(document.createTextNode(lines.join('\n')));
  pre.append(h('span', { class: 'd', text: `\n${bytes.length} bytes` }));
  return pre;
}

function textBlock(label, text) {
  const pre = h('pre', { class: 'hex' });
  pre.append(h('span', { class: 'k', text: label + '\n' }));
  pre.append(document.createTextNode(text));
  return pre;
}

const fmtSize = (n) => (n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`);
const randHex = (n) => P.hex(P.randomBytes(n));
const fakeIpv6 = () => `fe80::${randHex(2)}:${randHex(2)}:${randHex(2)}:${randHex(2)}`;
const fakeMac = () => Array.from(P.randomBytes(6), (b) => b.toString(16).padStart(2, '0')).join(':');
const fakePort = () => 32768 + Math.floor(Math.random() * 28000);

// ---------------------------------------------------------------------------
// Shared crypto context for a sender/receiver pair
// ---------------------------------------------------------------------------

async function makeContext(senderName, receiverName, payload) {
  const S = P.generateIdentity(senderName);
  const R = P.generateIdentity(receiverName);
  const nonce = P.newNonce();
  const kind = payload.files ? P.ShareKind.Files : P.ShareKind.Text;
  const nFiles = payload.files ? payload.files.length : null;
  const sideS = await P.masterSharedKey(S.priv, R.pubKey, nonce);
  const sideR = await P.masterSharedKey(R.priv, S.pubKey, nonce);
  const derived = await P.deriveAll(sideS.msk);
  const derivedR = await P.deriveAll(sideR.msk);
  const frames = payload.files
    ? payload.files.map((f) => ({ ...f, header: P.fileFrameHeader(f.name, f.size) }))
    : [{ name: null, size: P.utf8.encode(payload.text).length, header: P.textFrameHeader(P.utf8.encode(payload.text)), text: payload.text }];
  return {
    S, R, nonce, kind, nFiles, msk: sideS.msk, dh: sideS.dh, derived,
    sameOnBothSides: P.bytesEqual(sideS.msk, sideR.msk) && derived.pairingCode === derivedR.pairingCode,
    ssiR: P.encodeServiceSpecificInfo({ deviceName: R.deviceName, pubKey: R.pubKey }),
    ssiSInfo: P.encodeServiceSpecificInfo({ deviceName: S.deviceName, pubKey: S.pubKey, canReceiveFiles: false }),
    connect: P.encodeConnect({ deviceName: S.deviceName, nonce, pubKey: S.pubKey, kind, nFiles }),
    connectEcho: P.encodeConnect({ deviceName: R.deviceName, nonce, pubKey: R.pubKey, kind, nFiles }),
    // ShareScreen.exposeNfcHandshake builds Connect("noo", nonce, pubKey, kind) — a placeholder name, no nFiles.
    nfcConnect: P.encodeConnect({ deviceName: 'noo', nonce, pubKey: S.pubKey, kind }),
    frames, port: fakePort(), discoveryPort: fakePort(), ipv6: fakeIpv6(), mac: fakeMac(),
  };
}

const diag = (bytes) => P.cborDiagnostic(P.cborDecode(bytes));

// ---------------------------------------------------------------------------
// Simulator
// ---------------------------------------------------------------------------

const PAYLOADS = {
  files: { label: '2 files', files: [{ name: 'hello-world.txt', size: 6 }, { name: 'IMG_2048.jpg', size: 2_411_582 }] },
  text: { label: 'Text', text: 'meet at 7?' },
  link: { label: 'Link', text: 'https://apps.andymolenda.com' },
};

const sim = {
  scenario: 'aware',
  payloadKey: 'files',
  ctx: null,
  steps: [],
  index: -1,
  waiting: null,
  auto: false,
  timer: null,
  S: null,
  R: null,
  link: null,
};

function freshPhones(ctx, { receiverKind = 'android' } = {}) {
  sim.S = { id: ctx.S, screen: 'files', sheet: null, peers: [], dialog: null, ring: null, code: null, accepted: false, shareTappable: false, peerTappable: false, nfc: false };
  sim.R = { id: ctx.R, kind: receiverKind, screen: 'nearby', peers: [], dialog: null, ring: null, code: null, accepted: false, toast: null, browserUrl: null, idle: null, hint: null };
  sim.link = null;
}

const payloadLabel = (payload) => (payload.files ? `${payload.files.length} files` : payload.text.startsWith('http') ? 'link' : 'text');

function dialogFor(role, ctx, payload) {
  const other = role === 'S' ? ctx.R.deviceName : ctx.S.deviceName;
  const n = payload.files?.length;
  const title = payload.files ? (n === 1 ? 'Sharing file' : 'Sharing files') : 'Sharing text';
  const body = payload.files
    ? (role === 'S' ? `Send ${n} files to ${other}?` : `Accept ${n} files from ${other}?`)
    : (role === 'S' ? `Send text to ${other}?` : `Accept text from ${other}?`);
  return { title, body, code: P.formatCode(ctx.derived.pairingCode) };
}

// --- step builders ---------------------------------------------------------

function awareDataPathSteps(ctx, payload, { autoAccepted = false } = {}) {
  const code = P.formatCode(ctx.derived.pairingCode);
  const steps = [];
  if (!autoAccepted) {
    steps.push({
      who: 'S→R', title: 'Connect message over Wi-Fi Aware (L2, ≤255 B)', wait: 'accept',
      note: `sendMessage(peerHandle, Connect). The receiver derives msk = HMAC(X25519(privR, pubS), "NONCE:"‖nonce) and the code ${code}. Both phones now show the same six digits; the sender's dialog appears as soon as the message is sent.`,
      bytes: [{ data: ctx.connect, diag: diag(ctx.connect), label: `P2PMessages.Connect (${ctx.connect.length} B of ${P.AWARE_MAX_MESSAGE})` },
        { text: `nonce      ${P.hex(ctx.nonce)}\nDH secret  ${P.hex(ctx.dh)}\nmsk        ${P.hex(ctx.msk)}\ncode       ${code}`, label: 'Key schedule (Crypto.kt)' }],
      apply() {
        sim.S.sheet = 'sharing'; sim.S.ring = 'spin'; sim.S.code = code; sim.S.dialog = dialogFor('S', ctx, payload); sim.S.peerTappable = false;
        sim.R.screen = 'nearby'; sim.R.dialog = dialogFor('R', ctx, payload);
        sim.link = { text: `Connect · ${ctx.connect.length} B`, cls: '' };
      },
    });
  } else {
    steps.push({
      who: 'S→R', title: 'Connect over Wi-Fi Aware, auto-accepted',
      note: `The Aware Connect carries the nonce agreed over NFC, so both sides derive the pairing code they already have (${code}). MainViewModel sees a Request whose code equals the accepted NFCRequest and calls callback(true): no dialog, straight to the data path.`,
      bytes: [{ data: ctx.connect, diag: diag(ctx.connect), label: `P2PMessages.Connect with nFiles (${ctx.connect.length} B)` }],
      apply() { sim.link = { text: `Connect · ${ctx.connect.length} B`, cls: '' }; },
    });
  }
  steps.push({
    who: 'R', title: 'Receiver accepts: server socket + network request',
    note: `ReceiverSocket binds port ${ctx.port}. requestNetwork(TRANSPORT_WIFI_AWARE, WifiAwareNetworkSpecifier(session, peer).setPskPassphrase(psk).setPort(${ctx.port})). The passphrase is derived from msk, so it is unique to this share.`,
    bytes: [{ text: `psk  = Base64url(HMAC(msk, "WIFI_PSK"))\n     = ${ctx.derived.wifiPsk}\nport = ${ctx.port}`, label: 'WifiAwareNetworkSpecifier' }],
    apply() {
      sim.R.dialog = null; sim.R.screen = 'sharing'; sim.R.ring = 'spin'; sim.R.code = code;
      sim.S.dialog = null; sim.link = null;
    },
  });
  steps.push({
    who: 'R→S', title: 'Connect echoed back',
    note: 'The publisher answers with its own Connect: same nonce, same kind, its name and key. The subscriber checks pubKey and nonce match the peer it tapped before requesting the network.',
    bytes: [{ data: ctx.connectEcho, diag: diag(ctx.connectEcho), label: `Connect echo (${ctx.connectEcho.length} B)` }],
    apply() { sim.link = { text: 'Connect echo', cls: '' }; },
  });
  steps.push({
    who: 'S', title: 'Sender joins the Aware data path, opens sockets',
    note: `requestNetwork with the same passphrase and no port. onCapabilitiesChanged delivers WifiAwareNetworkInfo with the peer's link-local IPv6 and port; network.socketFactory.createSocket() ×${ctx.frames.length}. The receiver only accepts connections from that address.`,
    bytes: [{ text: `peerIpv6Addr = ${ctx.ipv6}%aware_data0\nport         = ${ctx.port}\nsockets      = ${ctx.frames.length} (one per stream)`, label: 'WifiAwareNetworkInfo' }],
    apply() { sim.link = { text: `NAN data path · ${ctx.frames.length} TCP`, cls: '' }; },
  });
  steps.push(framesStep(ctx));
  steps.push(doneStep(ctx, payload));
  return steps;
}

function framesStep(ctx) {
  return {
    who: 'S→R', title: ctx.frames.length === 1 && ctx.frames[0].text != null ? 'TEXT_V1 frame' : `FILE_V1 frames ×${ctx.frames.length}`,
    note: 'Each socket carries exactly one frame. The sender copies the stream, flushes, shuts down its output and waits up to 10 s for the receiver to close. P2PStreams only trusts TCP for integrity and checks the declared length.',
    bytes: ctx.frames.map((f) => ({
      data: f.header,
      label: f.text != null
        ? `TEXT_V1 header + ${f.size} B utf8 ("${f.text}")`
        : `FILE_V1 header for ${f.name} (${fmtSize(f.size)}) · opcode · nameLen · name · int64 size`,
    })),
    apply() { sim.link = { text: `${ctx.frames.map((f) => fmtSize(f.size)).join(' + ')}`, cls: '' }; },
  };
}

function doneStep(ctx, payload) {
  const n = ctx.frames.length;
  const toast = payload.files
    ? { title: n === 1 ? 'File saved in Downloads' : `${n} files saved in Downloads`, body: `from ${ctx.S.deviceName}` }
    : payload.text.startsWith('http')
      ? { title: 'Open Link', body: `${payload.text} · pick an app` }
      : { title: 'Share text', body: `"${payload.text}" → system share sheet` };
  return {
    who: 'both', title: 'Done',
    note: payload.files
      ? 'MediaStore inserts each file in Downloads/BubbleShare as pending, streams it, then clears IS_PENDING. A size mismatch deletes the file. A notification links to the folder. The sender\'s share sheet closes after 2 s and the receiver goes back to advertising.'
      : 'Text that looks like a URL opens OpenLinkActivity, Bubble Share\'s own app picker (the system chooser only offers the browser for app links). Any other text is handed to the system share sheet.',
    bytes: [],
    apply() {
      sim.S.ring = 'ok'; sim.S.code = null; sim.R.ring = 'ok'; sim.R.code = null; sim.R.screen = 'sharing'; sim.R.toast = toast; sim.link = null;
    },
  };
}

function senderOpensShareSheetStep(ctx, extraNote = '', extraBytes = []) {
  return {
    who: 'S', title: 'Share sheet opens: subscribe + informative publish',
    note: `ShareActivity receives ACTION_SEND${ctx.nFiles ? '_MULTIPLE' : ''}, attaches to Wi-Fi Aware and subscribes to fr.s1m.share. It also publishes its own ServiceSpecificInfo with r = false, so the receiver's list shows "${ctx.S.deviceName}" without ever trying to send to it. ${extraNote}`,
    bytes: [{ data: ctx.ssiSInfo, diag: diag(ctx.ssiSInfo), label: 'Sender ServiceSpecificInfo (canReceiveFiles = false)' }, ...extraBytes],
    apply() { sim.S.screen = 'files'; sim.S.shareTappable = false; sim.S.sheet = 'sharewith'; sim.S.peers = []; sim.S.ring = 'spin'; },
  };
}

function receiverAdvertisesStep(ctx, note) {
  return {
    who: 'R', title: 'Receiver opens Bubble Share and advertises',
    note: note ?? `WifiAwareManager.attach() → WifiAwareSession, then publish(PublishConfig.setServiceName("${P.AWARE_SERVICE_NAME}").setServiceSpecificInfo(cbor)). The blob is the device's name and X25519 public key; canReceiveFiles defaults to true and is omitted. Device id ${ctx.R.id} is a hash of that key.`,
    bytes: [{ data: ctx.ssiR, diag: diag(ctx.ssiR), label: 'Receiver ServiceSpecificInfo' }],
    apply() { sim.R.screen = 'nearby'; sim.R.peers = []; },
  };
}

function senderPicksStep(ctx, payload) {
  const what = payload.files ? `${payload.files.length} files in the Files app` : payload.text.startsWith('http') ? 'a link in the browser' : 'some text';
  return {
    who: 'S', title: `Sender selects ${what} and taps Share`, wait: 'tap-share',
    note: 'Bubble Share appears in the system share sheet for any MIME type (ACTION_SEND and ACTION_SEND_MULTIPLE). Tap Share on the sender to continue.',
    bytes: [],
    apply() { sim.S.screen = 'files'; sim.S.shareTappable = true; },
  };
}

function buildAware(ctx, payload) {
  return [
    receiverAdvertisesStep(ctx),
    senderPicksStep(ctx, payload),
    senderOpensShareSheetStep(ctx),
    {
      who: 'both', title: 'Discovery', wait: 'tap-peer',
      note: `onServiceDiscovered on both sides. Peers are keyed by the hash of their public key, never by PeerHandle (Android says handles are not stable identifiers). Device ids are only shown when more than one peer is around. Tap "${ctx.R.deviceName}" on the sender.`,
      bytes: [],
      apply() { sim.S.peers = [ctx.R]; sim.S.peerTappable = true; sim.R.peers = [{ ...ctx.S, canReceiveFiles: false }]; sim.link = { text: 'NAN discovery', cls: '' }; },
    },
    ...awareDataPathSteps(ctx, payload),
  ];
}

function nfcHandshakeSteps(ctx, payload, readerTransports) {
  const ndef = P.ndefMessage([P.ndefMimeRecord(P.NFC.MIME_HANDSHAKE), P.ndefEmptyRecord()]);
  const readerSsi = P.encodeServiceSpecificInfo({ deviceName: ctx.R.deviceName, pubKey: ctx.R.pubKey });
  const hs = P.bubbleHandshakeExchange({
    readerTransports, cardTransports: [P.TransportId.WIFI_AWARE_V1, P.TransportId.WIFI_DIRECT_V1],
    readerServiceInfo: readerSsi, cardConnect: ctx.nfcConnect,
  });
  const code = P.formatCode(ctx.derived.pairingCode);
  return {
    hs,
    expose: senderOpensShareSheetStep(ctx,
      'The share sheet also enables HceApduService with HandshakeSharingData: a Type-4 tag whose NDEF message is a MIME record for the handshake plus an empty record, and a Connect message prepared with a fresh nonce.',
      [{ data: ndef, label: 'NDEF message served to Android\'s tag dispatch (MIME application/vnd.fr.s1m.share+handshake)' },
        { data: ctx.nfcConnect, diag: diag(ctx.nfcConnect), label: 'Connect prepared for the NFC handshake (device name is literally "noo" in v0.1.2, nFiles omitted)' }]),
    tap: {
      who: 'R→S', title: 'Tap: APDU handshake, receiver is the reader',
      note: `Android dispatches the MIME record to DispatchNfcActivity → MainActivity → NfcDispatcher, which talks ISO-DEP to the sender's emulated card. Three commands: select the Bubble Share AID, offer the reader's transports (card picks the first it supports, by weight), send the reader's ServiceSpecificInfo and get the Connect back. Both sides now hold nonce and keys; code ${code}; the sender vibrates for 200 ms.`,
      bytes: hs.steps.flatMap((s) => [
        { data: s.cmd, label: `→ ${s.label}` },
        { data: s.resp, label: `← ${P.describeStatusWord(s.resp)}${s.resp.length > 2 ? ` · ${s.resp.length - 2} B data` : ''}` },
      ]),
      apply() {
        sim.S.sheet = 'sharing'; sim.S.ring = 'spin'; sim.S.code = code; sim.S.nfc = false;
        sim.R.screen = 'sharing'; sim.R.ring = 'spin'; sim.R.code = code; sim.R.hint = null;
        sim.link = { text: `selected transport 0x0${hs.selected}`, cls: '' };
      },
    },
  };
}

function nfcWaitStep() {
  return {
    who: 'both', title: 'Hold the phones together', wait: 'tap-nfc',
    note: 'The receiver has NFC foreground dispatch enabled for the handshake MIME type while the Nearby screen is resumed. Tap "Tap phones together".',
    bytes: [],
    apply() { sim.S.nfc = true; sim.link = { text: 'NFC ·))', cls: 'nfc' }; },
  };
}

function buildNfcAware(ctx, payload) {
  const { expose, tap } = nfcHandshakeSteps(ctx, payload, [P.TransportId.WIFI_AWARE_V1, P.TransportId.WIFI_DIRECT_V1]);
  return [
    receiverAdvertisesStep(ctx),
    senderPicksStep(ctx, payload),
    expose,
    nfcWaitStep(),
    tap,
    ...awareDataPathSteps(ctx, payload, { autoAccepted: true }),
  ];
}

function buildNfcDirect(ctx, payload) {
  const { expose, tap } = nfcHandshakeSteps(ctx, payload, [P.TransportId.WIFI_DIRECT_V1]);
  const code = P.formatCode(ctx.derived.pairingCode);
  const instance = P.DNSSD.instanceName(ctx.R.id);
  const txtService = P.base64url(ctx.ssiR);
  const servicePortBytes = Uint8Array.of((ctx.port >> 24) & 0xff, (ctx.port >> 16) & 0xff, (ctx.port >> 8) & 0xff, ctx.port & 0xff);
  return [
    receiverAdvertisesStep(ctx, `This receiver has no Wi-Fi Aware hardware. Wi-Fi Direct is supported but not preselected, so nothing is advertised yet and the Nearby list stays empty. The app still shows the Nearby screen because at least one transport (Direct, via NFC) is usable.`),
    senderPicksStep(ctx, payload),
    expose,
    nfcWaitStep(),
    tap,
    {
      who: 'both', title: 'Both switch to Wi-Fi Direct',
      note: `selectTransports([WifiDirect]) on each side. The receiver registers a DNS-SD local service over P2P and the same service through NsdManager for after the group forms. The TXT record carries the Base64url CBOR ServiceSpecificInfo and a discovery port (${ctx.discoveryPort}). The sender starts discoverPeers() + discoverServices().`,
      bytes: [{ text: `instance  ${instance}\ntype      ${P.DNSSD.serviceType}\nTXT service=${txtService}\nTXT port=${ctx.discoveryPort}`, label: 'WifiP2pDnsSdServiceInfo' }],
      apply() { sim.link = { text: 'P2P DNS-SD', cls: '' }; },
    },
    {
      who: 'S', title: 'Service found → P2P group',
      note: `DnsSdTxtRecordListener matches "${instance}.${P.DNSSD.serviceType}.local.", then WifiP2pManager.connect(WifiP2pConfig(deviceAddress)). When WIFI_P2P_CONNECTION_CHANGED says the group is formed, the peer's IP comes from the group owner address, the client list (API 35+), or an NSD resolve.`,
      bytes: [{ text: `peer MAC    ${ctx.mac}\ngroup owner 192.168.49.1\ndiscovery   192.168.49.1:${ctx.discoveryPort}`, label: 'WifiP2pInfo / WifiP2pGroup' }],
      apply() { sim.link = { text: 'P2P group formed', cls: '' }; },
    },
    {
      who: 'S→R', title: 'Discovery socket: Connect → service port',
      note: `A plain TCP connection to the discovery port carries the Connect (with nFiles this time). The receiver derives the same code (${code}), auto-accepts thanks to the NFC request, opens a ReceiverSocket restricted to the sender's address, and answers with its port as a big-endian int32. A refusal would answer -1.`,
      bytes: [{ data: ctx.connect, diag: diag(ctx.connect), label: `Connect (${ctx.connect.length} B)` }, { data: servicePortBytes, label: `int32 service port = ${ctx.port}` }],
      apply() { sim.link = { text: `port ${ctx.port}`, cls: '' }; },
    },
    {
      who: 'S→R', title: `PSK-TLS ×${ctx.frames.length}`,
      note: 'Over Wi-Fi Direct the link itself is not keyed per share, so Bubble Share wraps every stream socket in TLS-PSK (Bouncy Castle PSKTlsClient / PSKTlsServer). Identity and key both come from the master shared key; the server refuses any other identity.',
      bytes: [{ text: `identity = HMAC(msk, "TLS_KEY_ID")\n         = ${P.hex(ctx.derived.tlsKeyId)}\npsk      = HMAC(msk, "TLS_PSK")\n         = ${P.hex(ctx.derived.tlsPsk)}`, label: 'PskTlsSocket' }],
      apply() { sim.link = { text: `TLS-PSK · ${ctx.frames.length} sockets`, cls: '' }; },
    },
    framesStep(ctx),
    doneStep(ctx, payload),
  ];
}

function buildNfcLink(ctx, payload) {
  const text = payload.files ? PAYLOADS.link.text : payload.text;
  const uri = P.nfcUriForText(text);
  const ndef = P.ndefMessage([P.ndefMimeRecord(P.NFC.MIME), P.ndefUriRecord(uri)]);
  const exchange = P.type4ReadExchange(ndef);
  return [
    {
      who: 'R', title: 'Receiver: any phone, no app',
      note: 'This side has nothing installed: an iPhone, or an Android without Bubble Share. It only needs its NFC reader on, which is the default when the screen is unlocked.',
      bytes: [],
      apply() { sim.R.kind = 'any'; sim.R.screen = 'idle'; sim.R.idle = 'Unlocked, nothing open. NFC reader active.'; },
    },
    senderPicksStep(ctx, { text }),
    {
      who: 'S', title: 'Share sheet serves a Type-4 tag with the link',
      note: `For text/plain shares, tryExposeNfcUri wins over the handshake: the NDEF message is a MIME record (so a phone that does have Bubble Share routes it to DispatchNfcActivity) plus a well-known URI record. ${/^https?:\/\//.test(text) ? 'URLs are sent as-is.' : 'Text that is not a URL is wrapped as a fragment on share.s1m.fr/text.html so a browser can still show it.'} The card is limited to ${P.NFC.MAX_NDEF_SIZE} bytes.`,
      bytes: [{ text: uri, label: 'NdefRecord.createUri' }, { data: ndef, label: 'NDEF message' }],
      apply() { sim.S.screen = 'files'; sim.S.shareTappable = false; sim.S.sheet = 'sharewith'; sim.S.peers = []; sim.S.ring = 'spin'; sim.S.nfc = true; sim.link = { text: 'NFC ·))', cls: 'nfc' }; },
      wait: 'tap-nfc',
    },
    {
      who: 'R→S', title: 'Tap: the OS reads the tag',
      note: 'Standard NFC Forum Type-4 read: select the NDEF application, read the capability container, select the NDEF file, read its length, then its body in ≤255-byte chunks. The last read flips the service to Sent and the sender vibrates.',
      bytes: exchange.flatMap((s) => [
        { data: s.cmd, label: `→ ${s.label}` },
        { data: s.resp, label: `← ${P.describeStatusWord(s.resp)}${s.resp.length > 2 ? ` · ${s.resp.length - 2} B data` : ''}` },
      ]),
      apply() {
        sim.S.nfc = false; sim.S.sheet = 'sharing'; sim.S.ring = 'ok';
        sim.R.screen = 'browser'; sim.R.browserUrl = uri; sim.link = null;
      },
    },
    {
      who: 'both', title: 'Done',
      note: 'The receiver\'s OS opens the URI. If Bubble Share had been installed there, the MIME record would have triggered NDEF_DISCOVERED for application/vnd.fr.s1m.share and DispatchNfcActivity would offer OpenLinkActivity\'s app picker, or the system share sheet for wrapped text. The sender closes its share sheet after 2 s.',
      bytes: [],
      apply() { sim.S.ring = 'ok'; },
    },
  ];
}

const SCENARIOS = {
  aware: { label: 'Wi-Fi Aware', build: buildAware },
  nfcAware: { label: 'NFC tap → Wi-Fi Aware', build: buildNfcAware },
  nfcDirect: { label: 'NFC tap → Wi-Fi Direct', build: buildNfcDirect },
  nfcLink: { label: 'NFC link to any phone', build: buildNfcLink },
};

// --- rendering --------------------------------------------------------------

function ring(mode, code) {
  const el = h('div', { class: `ring ${mode === 'spin' ? 'spin' : ''}` });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  const outer = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  outer.setAttribute('cx', '50'); outer.setAttribute('cy', '50'); outer.setAttribute('r', '46'); outer.setAttribute('class', 'outer');
  svg.append(outer);
  if (mode === 'spin' && code) {
    const inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    inner.setAttribute('cx', '50'); inner.setAttribute('cy', '50'); inner.setAttribute('r', '30'); inner.setAttribute('class', 'inner');
    svg.append(inner);
  }
  el.append(svg);
  if (mode === 'ok') el.append(h('span', { class: 'mark', text: '✓' }));
  else if (mode === 'fail') el.append(h('span', { class: 'mark', text: '!' }));
  else if (code) el.append(h('span', { class: 'codeval', text: code }));
  return el;
}

function statusbar(name, right = '17:39') {
  return h('div', { class: 'statusbar' }, h('b', { text: name }), h('span', { text: right }));
}

function peerRow(peer, { tappable = false, showId = false, onTap = null } = {}) {
  return h('div', { class: `peer ${tappable ? 'tappable' : ''}`, onclick: tappable ? onTap : null, role: tappable ? 'button' : null },
    h('span', { text: peer.deviceName }),
    showId ? h('span', { class: 'pid', text: peer.id }) : null);
}

function dialog(d, { tappable, accepted, onAccept }) {
  return [
    h('div', { class: 'dim' }),
    h('div', { class: 'dialog' },
      h('div', { class: 'dt', text: d.title }),
      h('div', { text: d.body }),
      h('div', { class: 'code', text: `Pairing code: ${d.code}` }),
      h('div', { class: 'acts' },
        h('span', { class: accepted ? 'done' : '', text: 'Refuse' }),
        h('span', { class: accepted ? 'done' : tappable ? 'tappable' : '', text: accepted ? 'Accepted' : 'Accept', onclick: !accepted && tappable ? onAccept : null }))),
  ];
}

function renderSender() {
  const s = sim.S; const payload = PAYLOADS[sim.payloadKey];
  const screen = clear($('#phone-sender .screen'));
  screen.append(statusbar(s.id.deviceName));
  const app = h('div', { class: 'app' });
  const linkMode = sim.scenario === 'nfcLink';
  if (linkMode || !payload.files) {
    const text = linkMode && payload.files ? PAYLOADS.link.text : payload.text;
    app.append(h('div', { class: 'filesbar' }, h('span', { text: /^https?:/.test(text) ? 'Browser' : 'Notes' }),
      h('span', { class: `share ${s.shareTappable ? 'tappable' : ''}`, text: 'Share', onclick: s.shareTappable ? () => userAction('tap-share') : null })));
    app.append(h('div', { class: 'notepad' }, h('div', { class: 'txt', text: text })));
  } else {
    app.append(h('div', { class: 'filesbar' }, h('span', { text: `${payload.files.length} selected` }),
      h('span', { class: `share ${s.shareTappable ? 'tappable' : ''}`, text: 'Share', onclick: s.shareTappable ? () => userAction('tap-share') : null })));
    app.append(h('div', { class: 'files' }, payload.files.map((f) => h('div', { class: 'tile' }, h('div', { class: 'fn', text: f.name }), h('div', { class: 'fs', text: fmtSize(f.size) })))));
  }
  if (s.sheet) {
    const sheet = h('div', { class: 'sheet' });
    if (s.sheet === 'sharewith') {
      sheet.append(h('div', { class: 'title', text: 'Share with' }));
      if (s.peers.length) s.peers.forEach((p) => sheet.append(peerRow(p, { tappable: s.peerTappable, onTap: () => userAction('tap-peer') })));
      else sheet.append(h('div', { class: 'empty', text: s.nfc ? 'Looking for devices… or tap phones' : 'Looking for devices…' }));
      sheet.append(h('div', { class: 'center' }, ring('spin', null)));
    } else {
      sheet.append(h('div', { class: 'title', text: 'Sharing' }));
      sheet.append(h('div', { class: 'center' }, ring(s.ring, s.code)));
    }
    app.append(sheet);
  }
  if (s.dialog) app.append(...dialog(s.dialog, { tappable: sim.waiting === 'accept', accepted: s.accepted, onAccept: () => userAction('accept', 'S') }));
  screen.append(app);
}

function renderReceiver() {
  const r = sim.R;
  const phone = $('#phone-receiver');
  phone.classList.toggle('iphone', r.kind === 'any');
  const screen = clear($('.screen', phone));
  screen.append(statusbar(r.kind === 'any' ? 'Any phone' : r.id.deviceName));
  const app = h('div', { class: 'app' });
  if (r.screen === 'idle') {
    app.append(h('div', { class: 'idle', text: r.idle }));
  } else if (r.screen === 'browser') {
    app.append(h('div', { class: 'browser' }, h('div', { class: 'url', text: r.browserUrl }),
      h('div', { class: 'page', text: r.browserUrl.startsWith(P.NFC.TEXT_WRAPPER) ? decodeURIComponent(r.browserUrl.slice(P.NFC.TEXT_WRAPPER.length)) : 'Page opened from the NFC tag.' })));
  } else if (r.screen === 'sharing') {
    app.append(h('div', { class: 'heading', text: 'Sharing' }));
    app.append(h('div', { class: 'center' }, ring(r.ring, r.code)));
    app.append(bottomNav());
  } else {
    app.append(h('div', { class: 'heading', text: 'Nearby devices' }));
    if (r.peers.length) r.peers.forEach((p) => app.append(peerRow(p)));
    else app.append(h('div', { class: 'empty', text: r.hint ?? 'No device nearby yet' }));
    app.append(h('div', { class: 'center' }, ring('spin', null)));
    app.append(bottomNav());
  }
  if (r.dialog) app.append(...dialog(r.dialog, { tappable: sim.waiting === 'accept', accepted: r.accepted, onAccept: () => userAction('accept', 'R') }));
  if (r.toast) app.append(h('div', { class: 'toast' }, h('b', { text: r.toast.title }), h('span', { text: r.toast.body })));
  screen.append(app);
}

const bottomNav = () => h('div', { class: 'bottomnav' }, h('span', { class: 'sel', text: '◎ Nearby' }), h('span', { text: '⚙ Settings' }));

function renderLink() {
  const el = $('#link');
  el.className = 'link' + (sim.link ? ' show ' + (sim.link.cls || '') : '');
  el.textContent = sim.link?.text ?? '';
}

function renderControls() {
  const next = $('#btn-next');
  const labels = { 'tap-share': 'Tap Share on the sender', 'tap-peer': `Tap ${sim.ctx?.R.deviceName ?? 'the peer'}`, accept: 'Accept on both phones', 'tap-nfc': 'Tap phones together' };
  const atEnd = sim.index >= sim.steps.length - 1 && !sim.waiting;
  next.textContent = sim.waiting ? labels[sim.waiting] : atEnd ? 'Finished' : sim.index < 0 ? 'Start' : 'Next step';
  next.disabled = atEnd;
  $('#btn-auto').textContent = sim.auto ? 'Pause' : 'Auto-play';
  $('#btn-auto').classList.toggle('active', sim.auto);
  $('#stepcount').textContent = sim.steps.length ? `step ${Math.max(0, sim.index + 1)} / ${sim.steps.length}` : '';
  document.querySelectorAll('#scenarios .chip').forEach((c) => c.classList.toggle('active', c.dataset.key === sim.scenario));
  document.querySelectorAll('#payloads .chip').forEach((c) => c.classList.toggle('active', c.dataset.key === sim.payloadKey));
}

function renderAll() { renderSender(); renderReceiver(); renderLink(); renderControls(); }

function appendLog(step) {
  const log = $('#log');
  log.querySelectorAll('li.current').forEach((li) => li.classList.remove('current'));
  log.querySelectorAll('details[open]').forEach((d) => { d.open = false; });
  const body = h('div', { class: 'body' }, h('div', { text: step.note }));
  for (const b of step.bytes) {
    if (b.text != null) body.append(textBlock(b.label, b.text));
    else body.append(hexBlock(b.data, { diag: b.diag, label: b.label }));
  }
  const li = h('li', { class: 'current' },
    h('details', { open: true }, h('summary', {}, h('span', { class: 'who', text: step.who }), h('span', { text: step.title })), body));
  log.append(li);
  li.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function runStep(i) {
  const step = sim.steps[i];
  sim.index = i;
  step.apply();
  sim.waiting = step.wait ?? null;
  sim.S.accepted = false; sim.R.accepted = false;
  appendLog(step);
  renderAll();
}

function next() {
  if (sim.waiting) return;
  if (sim.index + 1 >= sim.steps.length) { stopAuto(); return; }
  runStep(sim.index + 1);
}

function userAction(kind, who) {
  if (sim.waiting !== kind) return;
  if (kind === 'accept') {
    if (who) sim[who].accepted = true; else { sim.S.accepted = true; sim.R.accepted = true; }
    if (!(sim.S.accepted && sim.R.accepted)) { renderAll(); return; }
  }
  sim.waiting = null;
  if (sim.index + 1 < sim.steps.length) runStep(sim.index + 1); else renderAll();
}

function advance() {
  if (sim.waiting) userAction(sim.waiting);
  else next();
  if (sim.index >= sim.steps.length - 1 && !sim.waiting) stopAuto();
}

function startAuto() { sim.auto = true; sim.timer = setInterval(advance, 1700); renderControls(); advance(); }
function stopAuto() { sim.auto = false; clearInterval(sim.timer); sim.timer = null; renderControls(); }

async function resetSim() {
  stopAuto();
  const payload = PAYLOADS[sim.payloadKey];
  sim.ctx = await makeContext('Pixel 6a', 'Pixel 8a', sim.scenario === 'nfcLink' && payload.files ? PAYLOADS.link : payload);
  freshPhones(sim.ctx);
  sim.steps = SCENARIOS[sim.scenario].build(sim.ctx, payload);
  sim.index = -1; sim.waiting = null;
  clear($('#log'));
  renderAll();
}

function initSim() {
  const sc = $('#scenarios');
  for (const [key, s] of Object.entries(SCENARIOS)) {
    sc.append(h('button', { class: 'chip', 'data-key': key, text: s.label, onclick: () => { sim.scenario = key; resetSim(); } }));
  }
  const pl = $('#payloads');
  pl.append(h('span', { class: 'small muted', text: 'Payload:' }));
  for (const [key, p] of Object.entries(PAYLOADS)) {
    pl.append(h('button', { class: 'chip', 'data-key': key, text: p.label, onclick: () => { sim.payloadKey = key; resetSim(); } }));
  }
  $('#btn-next').addEventListener('click', () => { if (sim.waiting) userAction(sim.waiting); else next(); });
  $('#btn-auto').addEventListener('click', () => (sim.auto ? stopAuto() : startAuto()));
  $('#btn-reset').addEventListener('click', resetSim);
  resetSim();
}

// ---------------------------------------------------------------------------
// Lab: the six-digit code
// ---------------------------------------------------------------------------

const keys = { A: null, B: null, nonce: null };

async function renderKeys() {
  const out = clear($('#keys-out'));
  const a = await P.masterSharedKey(keys.A.priv, keys.B.pubKey, keys.nonce);
  const b = await P.masterSharedKey(keys.B.priv, keys.A.pubKey, keys.nonce);
  const da = await P.deriveAll(a.msk);
  const db = await P.deriveAll(b.msk);
  const same = da.pairingCode === db.pairingCode && P.bytesEqual(a.msk, b.msk);
  const row = (k, v, cls = '') => { out.append(h('dt', { text: k }), h('dd', { class: cls, text: v })); };
  row(`${keys.A.deviceName} · id ${keys.A.id}`, `pubKey (X.509, 44 B) ${P.hex(keys.A.pubKey)}`);
  row(`${keys.B.deviceName} · id ${keys.B.id}`, `pubKey (X.509, 44 B) ${P.hex(keys.B.pubKey)}`);
  row('nonce (16 B, from the sender)', P.hex(keys.nonce));
  row('X25519 shared secret', P.hex(a.dh));
  row('msk = HMAC(dh, "NONCE:" ‖ nonce)', P.hex(a.msk));
  row(`code on ${keys.A.deviceName}`, P.formatCode(da.pairingCode), 'big');
  row(`code on ${keys.B.deviceName}`, P.formatCode(db.pairingCode), 'big');
  row('match', same ? '✓ identical on both sides' : '✗ mismatch', same ? 'ok' : 'warn');
  row('Wi-Fi Aware passphrase', da.wifiPsk);
  row('TLS-PSK identity', P.hex(da.tlsKeyId));
  row('TLS-PSK key', P.hex(da.tlsPsk));
}

function initKeys() {
  keys.A = P.generateIdentity($('#keys-name-a').value || 'Device A');
  keys.B = P.generateIdentity($('#keys-name-b').value || 'Device B');
  keys.nonce = P.newNonce();
  $('#keys-new-a').addEventListener('click', () => { keys.A = P.generateIdentity($('#keys-name-a').value || 'Device A'); renderKeys(); });
  $('#keys-new-b').addEventListener('click', () => { keys.B = P.generateIdentity($('#keys-name-b').value || 'Device B'); renderKeys(); });
  $('#keys-new-nonce').addEventListener('click', () => { keys.nonce = P.newNonce(); renderKeys(); });
  $('#keys-name-a').addEventListener('input', (e) => { keys.A.deviceName = e.target.value || 'Device A'; renderKeys(); });
  $('#keys-name-b').addEventListener('input', (e) => { keys.B.deviceName = e.target.value || 'Device B'; renderKeys(); });
  renderKeys();
}

// ---------------------------------------------------------------------------
// Lab: bytes on the wire
// ---------------------------------------------------------------------------

const wire = { file: null, identity: P.generateIdentity('Pixel 6a'), peer: P.generateIdentity('Pixel 8a'), nonce: P.newNonce() };

function annotatedFrame(header, parsed) {
  const pre = h('pre', { class: 'hex' });
  const seg = (bytes, label) => {
    pre.append(h('span', { class: 'k', text: label.padEnd(10) }), document.createTextNode(P.hex(bytes, ' ') + '\n'));
  };
  if (parsed.kind === 'text') {
    seg(header.subarray(0, 1), 'opcode'); seg(header.subarray(1, 5), 'size');
  } else {
    const nameLen = header.length - 1 - 4 - 8;
    seg(header.subarray(0, 1), 'opcode'); seg(header.subarray(1, 5), 'nameLen');
    seg(header.subarray(5, 5 + nameLen), 'name'); seg(header.subarray(5 + nameLen), 'size');
  }
  pre.append(h('span', { class: 'd', text: `${header.length} header bytes, then ${parsed.size} payload bytes` }));
  return pre;
}

function renderWire() {
  const out = clear($('#wire-out'));
  if (wire.file) {
    const header = P.fileFrameHeader(wire.file.name, wire.file.size);
    const parsed = P.parseFrameHeader(header);
    out.append(h('div', { class: 'small muted', text: `FILE_V1 · ${wire.file.name} · ${fmtSize(wire.file.size)} · the receiver re-parses it as "${parsed.name}", ${parsed.size} bytes` }));
    out.append(annotatedFrame(header, parsed));
  } else {
    const text = $('#wire-text').value;
    const bytes = P.utf8.encode(text);
    const header = P.textFrameHeader(bytes);
    out.append(h('div', { class: 'small muted', text: `TEXT_V1 · ${bytes.length} bytes of UTF-8${/^https?:\/\//.test(text) ? ' · looks like a URL, so the receiver will open the app picker' : ' · the receiver will offer the system share sheet'}` }));
    out.append(annotatedFrame(header, P.parseFrameHeader(header)));
  }
  const cb = clear($('#wire-cbor'));
  const name = $('#wire-name').value || 'Pixel 6a';
  const ssi = P.encodeServiceSpecificInfo({ deviceName: name, pubKey: wire.identity.pubKey });
  const ssiInfo = P.encodeServiceSpecificInfo({ deviceName: name, pubKey: wire.identity.pubKey, canReceiveFiles: false });
  const kind = wire.file ? P.ShareKind.Files : P.ShareKind.Text;
  const connect = P.encodeConnect({ deviceName: name, nonce: wire.nonce, pubKey: wire.identity.pubKey, kind, nFiles: wire.file ? 1 : null });
  cb.append(hexBlock(ssi, { diag: diag(ssi), label: 'ServiceSpecificInfo as a receiver advertises it' }));
  cb.append(hexBlock(ssiInfo, { diag: diag(ssiInfo), label: 'ServiceSpecificInfo as a sender advertises it (r = false)' }));
  cb.append(hexBlock(connect, { diag: diag(connect), label: `Connect · ${connect.length} / ${P.AWARE_MAX_MESSAGE} bytes` }));
  const ok = connect.length <= P.AWARE_MAX_MESSAGE;
  cb.append(h('div', { class: `note ${ok ? 'ok' : 'warn'}`, text: ok
    ? `✓ fits in one Wi-Fi Aware message with ${P.AWARE_MAX_MESSAGE - connect.length} bytes to spare.`
    : `✗ ${connect.length - P.AWARE_MAX_MESSAGE} bytes over the Wi-Fi Aware limit: sendMessage would fail with this device name.` }));
}

function initWire() {
  $('#wire-text').addEventListener('input', () => { wire.file = null; $('#wire-file').value = ''; renderWire(); });
  $('#wire-file').addEventListener('change', (e) => { const f = e.target.files[0]; wire.file = f ? { name: f.name, size: f.size } : null; renderWire(); });
  $('#wire-name').addEventListener('input', renderWire);
  renderWire();
}

// ---------------------------------------------------------------------------
// Lab: the NFC tap
// ---------------------------------------------------------------------------

const nfc = { mode: 'link', text: 'https://apps.andymolenda.com', readerSet: 'both', card: P.generateIdentity('Pixel 6a'), reader: P.generateIdentity('Pixel 8a'), nonce: P.newNonce() };

const READER_SETS = {
  both: { label: 'Reader has Aware + Direct', ids: [P.TransportId.WIFI_AWARE_V1, P.TransportId.WIFI_DIRECT_V1] },
  direct: { label: 'Reader has Direct only', ids: [P.TransportId.WIFI_DIRECT_V1] },
  none: { label: 'Reader supports neither', ids: [0x7f] },
};

function exchangeList(steps) {
  const wrap = h('div');
  for (const s of steps) {
    wrap.append(hexBlock(s.cmd, { label: `→ ${s.label}` }));
    wrap.append(hexBlock(s.resp, { label: `← ${P.describeStatusWord(s.resp)}${s.resp.length > 2 ? ` · ${s.resp.length - 2} B data` : ''}` }));
  }
  return wrap;
}

function renderNfc() {
  document.querySelectorAll('#nfc-modes .chip').forEach((c) => c.classList.toggle('active', c.dataset.key === nfc.mode));
  const controls = clear($('#nfc-controls'));
  const out = clear($('#nfc-out'));
  if (nfc.mode === 'link') {
    controls.append(h('label', { class: 'field' }, 'Text or link to hand over',
      h('input', { type: 'text', value: nfc.text, maxlength: 300, oninput: (e) => { nfc.text = e.target.value; renderNfc(); } })));
    const uri = P.nfcUriForText(nfc.text);
    const msg = P.ndefMessage([P.ndefMimeRecord(P.NFC.MIME), P.ndefUriRecord(uri)]);
    out.append(h('p', { class: 'small muted', text: 'Standard Type-4 tag (AID D2760000850101). Any phone can read it; one with Bubble Share installed is routed straight to the app by the MIME record.' }));
    out.append(textBlock('URI record', uri));
    out.append(hexBlock(msg, { label: `NDEF message (MIME record + URI record) · served with a 2-byte length prefix, max ${P.NFC.MAX_NDEF_SIZE} B` }));
    out.append(hexBlock(P.capabilityContainer(), { label: 'Capability container (E103): v2.0, MLe/MLc 255, NDEF file E104, 2048 B, read-only' }));
    out.append(h('h3', { text: 'APDU exchange' }));
    out.append(exchangeList(P.type4ReadExchange(msg)));
  } else {
    const chips = h('div', { class: 'chips' });
    for (const [key, s] of Object.entries(READER_SETS)) {
      chips.append(h('button', { class: `chip ${nfc.readerSet === key ? 'active' : ''}`, text: s.label, onclick: () => { nfc.readerSet = key; renderNfc(); } }));
    }
    controls.append(chips);
    const readerSsi = P.encodeServiceSpecificInfo({ deviceName: nfc.reader.deviceName, pubKey: nfc.reader.pubKey });
    const cardConnect = P.encodeConnect({ deviceName: 'noo', nonce: nfc.nonce, pubKey: nfc.card.pubKey, kind: P.ShareKind.Files });
    const hs = P.bubbleHandshakeExchange({
      readerTransports: READER_SETS[nfc.readerSet].ids,
      cardTransports: [P.TransportId.WIFI_AWARE_V1, P.TransportId.WIFI_DIRECT_V1],
      readerServiceInfo: readerSsi, cardConnect,
    });
    out.append(h('p', { class: 'small muted', text: 'Proprietary application (AID F0 "s1m.share.1", CLA 0x80). The sender is the card and already holds the share; the receiver reads. Three commands agree on a transport, exchange identities and a nonce, then the chosen transport takes over with no Accept dialog.' }));
    out.append(exchangeList(hs.steps));
    out.append(h('div', { class: `note ${hs.selected ? 'ok' : 'warn'}`, text: hs.selected
      ? `✓ selected transport 0x0${hs.selected} (${hs.selected === 1 ? 'Wi-Fi Aware' : 'Wi-Fi Direct'}). Both sides can now derive the same six digits from the nonce in the Connect response.`
      : '✗ 6A82 Not found: no transport in common. Nothing else happens; the reader falls back to normal Aware discovery.' }));
  }
}

function initNfc() {
  const modes = $('#nfc-modes');
  modes.append(h('button', { class: 'chip', 'data-key': 'link', text: 'Link to any phone', onclick: () => { nfc.mode = 'link'; renderNfc(); } }));
  modes.append(h('button', { class: 'chip', 'data-key': 'handshake', text: 'Bubble Share handshake', onclick: () => { nfc.mode = 'handshake'; renderNfc(); } }));
  renderNfc();
}

// ---------------------------------------------------------------------------

initSim();
initKeys();
initWire();
initNfc();
