// Bubble Share protocol primitives, re-implemented in JavaScript.
//
// Everything here mirrors the Kotlin source of Bubble Share
// (https://codeberg.org/s1m/bubble-share, AGPL-3.0) closely enough that the
// bytes shown in the demos are the bytes a real device would put on the air:
//
//   - Crypto.kt           X25519 identity, HMAC-SHA256 key schedule, 6-digit code
//   - p2p/P2PMessages.kt  CBOR messages (kotlinx.serialization defaults)
//   - p2p/P2PStreams.kt   TEXT_V1 / FILE_V1 stream framing
//   - nfc/APDU.kt         Type-4 tag + Bubble Share APDU commands/responses
//   - nfc/HceApduService  Capability container, NDEF file layout
//
// Pure functions only. Runs in browsers and in Node 22 (WebCrypto for HMAC).

// ---------------------------------------------------------------------------
// Bytes
// ---------------------------------------------------------------------------

export const utf8 = {
  encode: (s) => new TextEncoder().encode(s),
  decode: (b) => new TextDecoder().decode(b),
};

export function concat(...parts) {
  const len = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(len);
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}

export function hex(bytes, sep = '') {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join(sep);
}

export function fromHex(s) {
  const clean = s.replace(/[^0-9a-f]/gi, '');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export function bytesEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export function randomBytes(n) {
  const out = new Uint8Array(n);
  globalThis.crypto.getRandomValues(out);
  return out;
}

// java.util.Base64.getUrlEncoder(): URL-safe alphabet, *with* padding.
export function base64url(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_');
}

export function base64urlDecode(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

// java.util.Arrays.hashCode(byte[]) — what Kotlin's ByteArray.contentHashCode() calls.
// 32-bit wrapping arithmetic, bytes are *signed*.
export function javaArrayHashCode(bytes) {
  let h = 1;
  for (const b of bytes) {
    const signed = b > 127 ? b - 256 : b;
    h = (Math.imul(31, h) + signed) | 0;
  }
  return h;
}

// Kotlin "%08x".format(int): two's complement for negatives.
export function hex32(int) {
  return (int >>> 0).toString(16).padStart(8, '0');
}

// ---------------------------------------------------------------------------
// X25519 (RFC 7748) — BigInt Montgomery ladder. Demo-grade, not constant time.
// ---------------------------------------------------------------------------

const P = (1n << 255n) - 19n;
const A24 = 121665n;

function leToBig(bytes) {
  let n = 0n;
  for (let i = bytes.length - 1; i >= 0; i--) n = (n << 8n) | BigInt(bytes[i]);
  return n;
}

function bigToLe(n, len = 32) {
  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) { out[i] = Number(n & 0xffn); n >>= 8n; }
  return out;
}

function mod(a) { const r = a % P; return r < 0n ? r + P : r; }

function modPow(base, exp) {
  let result = 1n;
  base = mod(base);
  while (exp > 0n) {
    if (exp & 1n) result = mod(result * base);
    base = mod(base * base);
    exp >>= 1n;
  }
  return result;
}

export function clampScalar(k) {
  const c = Uint8Array.from(k);
  c[0] &= 248;
  c[31] &= 127;
  c[31] |= 64;
  return c;
}

export function x25519(scalarBytes, uBytes) {
  const k = leToBig(clampScalar(scalarBytes));
  const uIn = Uint8Array.from(uBytes);
  uIn[31] &= 127; // RFC 7748 §5: mask the most significant bit
  const u = mod(leToBig(uIn));

  let x1 = u, x2 = 1n, z2 = 0n, x3 = u, z3 = 1n, swap = 0n;
  for (let t = 254n; t >= 0n; t--) {
    const kt = (k >> t) & 1n;
    swap ^= kt;
    if (swap) { [x2, x3] = [x3, x2]; [z2, z3] = [z3, z2]; }
    swap = kt;
    const a = mod(x2 + z2), aa = mod(a * a);
    const b = mod(x2 - z2), bb = mod(b * b);
    const e = mod(aa - bb);
    const c = mod(x3 + z3), d = mod(x3 - z3);
    const da = mod(d * a), cb = mod(c * b);
    x3 = mod((da + cb) ** 2n);
    z3 = mod(x1 * (da - cb) ** 2n);
    x2 = mod(aa * bb);
    z2 = mod(e * (aa + A24 * e));
  }
  if (swap) { [x2, x3] = [x3, x2]; [z2, z3] = [z3, z2]; }
  return bigToLe(mod(x2 * modPow(z2, P - 2n)));
}

const BASE_POINT = (() => { const b = new Uint8Array(32); b[0] = 9; return b; })();
export const x25519Base = (scalar) => x25519(scalar, BASE_POINT);

// java.security X509EncodedKeySpec for X25519: SubjectPublicKeyInfo DER, 44 bytes.
export const SPKI_PREFIX = fromHex('302a300506032b656e032100');
export const spkiEncode = (raw32) => concat(SPKI_PREFIX, raw32);
export function spkiDecode(spki) {
  if (spki.length !== 44 || !bytesEqual(spki.subarray(0, 12), SPKI_PREFIX)) {
    throw new Error('not an X25519 SubjectPublicKeyInfo');
  }
  return spki.subarray(12);
}

// Peer.idFromPubkey: "%08x".format(pubKey.contentHashCode()) over the SPKI bytes.
export const deviceId = (spkiPubKey) => hex32(javaArrayHashCode(spkiPubKey));

export function generateIdentity(deviceName) {
  const priv = randomBytes(32);
  const pubRaw = x25519Base(priv);
  const pubKey = spkiEncode(pubRaw);
  return { deviceName, priv, pubRaw, pubKey, id: deviceId(pubKey) };
}

// ---------------------------------------------------------------------------
// Key schedule (Crypto.kt)
// ---------------------------------------------------------------------------

export async function hmacSha256(key, data) {
  const k = await globalThis.crypto.subtle.importKey(
    'raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  return new Uint8Array(await globalThis.crypto.subtle.sign('HMAC', k, data));
}

export const HMAC_INPUTS = Object.freeze({
  NONCE: 'NONCE:',
  WIFI_PSK: 'WIFI_PSK',
  TLS_KEY_ID: 'TLS_KEY_ID',
  TLS_PSK: 'TLS_PSK',
  PAIRING_CODE: 'PAIRING_CODE',
});

export const newNonce = () => randomBytes(16);

// masterSharedKey = HMAC-SHA256(key = X25519(myPriv, peerPub), msg = "NONCE:" || nonce)
export async function masterSharedKey(myPriv, peerSpkiPubKey, nonce) {
  const dh = x25519(myPriv, spkiDecode(peerSpkiPubKey));
  const msk = await hmacSha256(dh, concat(utf8.encode(HMAC_INPUTS.NONCE), nonce));
  return { dh, msk };
}

// Kotlin: hmac.contentHashCode().absoluteValue % 1_000_000
// (absoluteValue of Int.MIN_VALUE stays negative; mirrored for fidelity.)
export function pairingCodeFromMac(mac) {
  const h = javaArrayHashCode(mac);
  const abs = h === -2147483648 ? h : Math.abs(h);
  return abs % 1_000_000;
}

export async function deriveAll(msk) {
  const [psk, code, tlsKeyId, tlsPsk] = await Promise.all([
    hmacSha256(msk, utf8.encode(HMAC_INPUTS.WIFI_PSK)),
    hmacSha256(msk, utf8.encode(HMAC_INPUTS.PAIRING_CODE)),
    hmacSha256(msk, utf8.encode(HMAC_INPUTS.TLS_KEY_ID)),
    hmacSha256(msk, utf8.encode(HMAC_INPUTS.TLS_PSK)),
  ]);
  return {
    wifiPsk: base64url(psk),            // 44 chars, used as WifiAwareNetworkSpecifier passphrase
    pairingCodeMac: code,
    pairingCode: pairingCodeFromMac(code),
    tlsKeyId,                           // PSK identity for Wi-Fi Direct's PSK-TLS
    tlsPsk,
  };
}

export const formatCode = (n) => String(n).padStart(6, '0');

// ---------------------------------------------------------------------------
// CBOR — matching kotlinx.serialization.cbor defaults:
//   indefinite-length maps/arrays, ByteArray as an array of *signed* ints
//   (no @ByteString in Bubble Share), encodeDefaults = false.
// ---------------------------------------------------------------------------

function cborHead(major, n) {
  const m = major << 5;
  if (n < 24) return Uint8Array.of(m | n);
  if (n < 0x100) return Uint8Array.of(m | 24, n);
  if (n < 0x10000) return Uint8Array.of(m | 25, n >> 8, n & 0xff);
  return Uint8Array.of(m | 26, (n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff);
}

export const cbor = {
  int(n) { return n >= 0 ? cborHead(0, n) : cborHead(1, -1 - n); },
  text(s) { const b = utf8.encode(s); return concat(cborHead(3, b.length), b); },
  bool(v) { return Uint8Array.of(v ? 0xf5 : 0xf4); },
  null() { return Uint8Array.of(0xf6); },
  // Kotlin ByteArray without @ByteString: indefinite array of signed ints.
  kotlinByteArray(bytes) {
    const items = Array.from(bytes, (b) => cbor.int(b > 127 ? b - 256 : b));
    return concat(Uint8Array.of(0x9f), ...items, Uint8Array.of(0xff));
  },
  // Definite byte string (major type 2) — what @ByteString would produce. For comparison.
  byteString(bytes) { return concat(cborHead(2, bytes.length), bytes); },
  // Indefinite-length map from [key, encodedValue] pairs.
  map(entries) {
    return concat(Uint8Array.of(0xbf), ...entries.flatMap(([k, v]) => [cbor.text(k), v]), Uint8Array.of(0xff));
  },
};

// Minimal decoder: enough for Bubble Share messages and the kotlinx test vectors.
export function cborDecode(bytes) {
  let i = 0;
  const readArg = (info) => {
    if (info < 24) return info;
    if (info === 24) return bytes[i++];
    if (info === 25) { const v = (bytes[i] << 8) | bytes[i + 1]; i += 2; return v; }
    if (info === 26) { const v = ((bytes[i] << 24) >>> 0) + (bytes[i + 1] << 16) + (bytes[i + 2] << 8) + bytes[i + 3]; i += 4; return v; }
    if (info === 31) return Infinity; // indefinite
    throw new Error('unsupported CBOR length');
  };
  const item = () => {
    const b = bytes[i++];
    const major = b >> 5, info = b & 31;
    switch (major) {
      case 0: return readArg(info);
      case 1: return -1 - readArg(info);
      case 2: { const n = readArg(info); const v = bytes.slice(i, i + n); i += n; return v; }
      case 3: { const n = readArg(info); const v = utf8.decode(bytes.slice(i, i + n)); i += n; return v; }
      case 4: {
        const n = readArg(info); const arr = [];
        if (n === Infinity) { while (bytes[i] !== 0xff) arr.push(item()); i++; }
        else for (let k = 0; k < n; k++) arr.push(item());
        return arr;
      }
      case 5: {
        const n = readArg(info); const obj = {};
        if (n === Infinity) { while (bytes[i] !== 0xff) { const k = item(); obj[k] = item(); } i++; }
        else for (let k = 0; k < n; k++) { const key = item(); obj[key] = item(); }
        return obj;
      }
      case 7:
        if (info === 20) return false;
        if (info === 21) return true;
        if (info === 22) return null;
        throw new Error('unsupported CBOR simple value');
      default: throw new Error('unsupported CBOR major type ' + major);
    }
  };
  const v = item();
  if (i !== bytes.length) throw new Error('trailing CBOR bytes');
  return v;
}

// Decoded Kotlin ByteArray (array of signed ints) -> Uint8Array
export const kotlinBytes = (arr) => Uint8Array.from(arr, (n) => (n < 0 ? n + 256 : n));

// P2PMessages.ServiceSpecificInfo — what a publisher advertises.
//   {"n": deviceName, "pk": pubKey, ["r": false], ["t": transportSpecificInfo]}
export function encodeServiceSpecificInfo({ deviceName, pubKey, canReceiveFiles = true, transportSpecificInfo = null }) {
  const entries = [['n', cbor.text(deviceName)], ['pk', cbor.kotlinByteArray(pubKey)]];
  if (canReceiveFiles !== true) entries.push(['r', cbor.bool(canReceiveFiles)]);
  if (transportSpecificInfo != null) entries.push(['t', cbor.kotlinByteArray(transportSpecificInfo)]);
  return cbor.map(entries);
}

export function decodeServiceSpecificInfo(bytes) {
  const m = cborDecode(bytes);
  return {
    deviceName: m.n,
    pubKey: kotlinBytes(m.pk),
    canReceiveFiles: m.r ?? true,
    transportSpecificInfo: m.t ? kotlinBytes(m.t) : null,
  };
}

export const ShareKind = Object.freeze({ Text: 0, Files: 1 });

// P2PMessages.Connect — the ≤255-byte Wi-Fi Aware L2 message that starts a pairing.
//   {"n": deviceName, "u": nonce, "pk": pubKey, "k": kind, ["nf": nFiles]}
export function encodeConnect({ deviceName, nonce, pubKey, kind, nFiles = null }) {
  const entries = [
    ['n', cbor.text(deviceName)],
    ['u', cbor.kotlinByteArray(nonce)],
    ['pk', cbor.kotlinByteArray(pubKey)],
    ['k', cbor.int(kind)],
  ];
  if (nFiles != null) entries.push(['nf', cbor.int(nFiles)]);
  return cbor.map(entries);
}

export function decodeConnect(bytes) {
  const m = cborDecode(bytes);
  return { deviceName: m.n, nonce: kotlinBytes(m.u), pubKey: kotlinBytes(m.pk), kind: m.k, nFiles: m.nf ?? null };
}

// Wi-Fi Aware: messages are limited to ~255 bytes
// (Characteristics.getMaxServiceSpecificInfoLength()).
export const AWARE_MAX_MESSAGE = 255;
export const AWARE_SERVICE_NAME = 'fr.s1m.share';

// Wi-Fi Direct / NSD service naming (DirectPublisher.kt)
export const DNSSD = Object.freeze({
  serviceType: '_share._tcp',
  instanceName: (devId) => `${devId}.share.s1m.fr`,
  txtServiceInfo: 'service',
  txtDiscoveryPort: 'port',
});

// Human-readable CBOR diagnostic notation for the demos.
export function cborDiagnostic(value) {
  if (value === null) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value === 'string') return JSON.stringify(value);
  if (value instanceof Uint8Array) return `h'${hex(value)}'`;
  if (Array.isArray(value)) return `[_ ${value.map(cborDiagnostic).join(', ')}]`;
  return `{_ ${Object.entries(value).map(([k, v]) => `${JSON.stringify(k)}: ${cborDiagnostic(v)}`).join(', ')}}`;
}

// ---------------------------------------------------------------------------
// Stream framing (P2PStreams.kt). One TCP socket per file.
//   TEXT_V1 = 0x01 || size(4B BE) || utf8 text
//   FILE_V1 = 0x02 || nameSize(4B BE) || name || fileSize(8B BE) || bytes
// ---------------------------------------------------------------------------

export const Opcode = Object.freeze({ TEXT_V1: 1, FILE_V1: 2 });

function int32be(n) { return Uint8Array.of((n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff); }
function int64be(n) {
  const big = BigInt(n);
  const out = new Uint8Array(8);
  for (let i = 7; i >= 0; i--) out[i] = Number((big >> BigInt((7 - i) * 8)) & 0xffn);
  return out;
}
function readInt32be(b, o) { return ((b[o] << 24) >>> 0) + (b[o + 1] << 16) + (b[o + 2] << 8) + b[o + 3]; }
function readInt64be(b, o) {
  let n = 0n;
  for (let i = 0; i < 8; i++) n = (n << 8n) | BigInt(b[o + i]);
  return Number(n);
}

export function textFrameHeader(textBytes) {
  return concat(Uint8Array.of(Opcode.TEXT_V1), int32be(textBytes.length));
}

export function fileFrameHeader(name, size) {
  const nameBytes = utf8.encode(name);
  return concat(Uint8Array.of(Opcode.FILE_V1), int32be(nameBytes.length), nameBytes, int64be(size));
}

// Returns {kind, size, name?, headerLength}. Throws like P2PStreams on a bad opcode.
export function parseFrameHeader(bytes) {
  const op = bytes[0];
  if (op === Opcode.TEXT_V1) return { kind: 'text', size: readInt32be(bytes, 1), headerLength: 5 };
  if (op === Opcode.FILE_V1) {
    const nameLen = readInt32be(bytes, 1);
    const name = utf8.decode(bytes.slice(5, 5 + nameLen));
    return { kind: 'file', name, size: readInt64be(bytes, 5 + nameLen), headerLength: 5 + nameLen + 8 };
  }
  throw new Error(`Found invalid type header ${op}, expected 1 or 2`);
}

// ---------------------------------------------------------------------------
// NFC — Type-4 tag emulation + Bubble Share proprietary APDUs (APDU.kt, HceApduService.kt)
// ---------------------------------------------------------------------------

export const NFC = Object.freeze({
  TYPE4_AID: fromHex('D2760000850101'),
  VND_AID: concat(Uint8Array.of(0xf0), utf8.encode('s1m.share.1')),  // F073316D2E73686172652E31
  CC_FILE_ID: fromHex('e103'),
  NDEF_FILE_ID: fromHex('e104'),
  MAX_NDEF_SIZE: 0x800,
  MIME: 'application/vnd.fr.s1m.share',
  MIME_HANDSHAKE: 'application/vnd.fr.s1m.share+handshake',
  TEXT_WRAPPER: 'https://share.s1m.fr/text.html#',
});

export const TransportId = Object.freeze({ WIFI_AWARE_V1: 0x01, WIFI_DIRECT_V1: 0x02 });

export const apdu = {
  selectApplication: (aid) => concat(Uint8Array.of(0x00, 0xa4, 0x04, 0x00, aid.length), aid, Uint8Array.of(0x00)),
  selectCapabilityContainer: () => fromHex('00a4000c02e103'),
  selectNdef: (fileId = NFC.NDEF_FILE_ID) => concat(fromHex('00a4000c02'), fileId),
  readBinary: (offset, length) => Uint8Array.of(0x00, 0xb0, (offset >> 8) & 0xff, offset & 0xff, length & 0xff),
  bubbleTransportSelection: (ids) => concat(Uint8Array.of(0x80, 0x01, 0x00, 0x00, ids.length), Uint8Array.from(ids), Uint8Array.of(0x01)),
  bubbleConnect: (data) => concat(Uint8Array.of(0x80, 0x02, 0x00, 0x00, data.length), data, Uint8Array.of(0xff)),
};

export const apduResponse = {
  ok: (data = new Uint8Array(0)) => concat(data, Uint8Array.of(0x90, 0x00)),
  notFound: () => Uint8Array.of(0x6a, 0x82),
  noEfSelected: () => Uint8Array.of(0x94, 0x00),
  classNotSupported: () => Uint8Array.of(0x6e, 0x00),
  wrongParameters: () => Uint8Array.of(0x6a, 0x00),
  invalidOffset: () => Uint8Array.of(0x9d, 0x17),
};

export function describeStatusWord(resp) {
  const sw = hex(resp.subarray(resp.length - 2));
  return ({
    9000: 'OK', '6a82': 'Not found', 9400: 'No EF selected', '6e00': 'Class not supported',
    '6d00': 'Instruction not supported', 6700: 'Wrong length', '6a00': 'Wrong parameters', '9d17': 'Invalid offset',
  })[sw] ?? `SW ${sw}`;
}

// Capability container served from file E103 (HceApduService.Data.CapabilityContainer)
export function capabilityContainer(ndefFileId = NFC.NDEF_FILE_ID, maxSize = NFC.MAX_NDEF_SIZE) {
  return concat(
    fromHex('000f'),       // CC length
    Uint8Array.of(0x20),   // mapping version 2.0
    fromHex('00ff'),       // MLe
    fromHex('00ff'),       // MLc
    Uint8Array.of(0x04, 0x06), // NDEF file control TLV
    ndefFileId,
    Uint8Array.of((maxSize >> 8) & 0xff, maxSize & 0xff),
    Uint8Array.of(0x00, 0xff), // read OK, write denied
  );
}

// NDEF record/message encoding (android.nfc.NdefRecord / NdefMessage, short records).
const TNF = Object.freeze({ EMPTY: 0, WELL_KNOWN: 1, MIME_MEDIA: 2 });
const URI_PREFIXES = ['', 'http://www.', 'https://www.', 'http://', 'https://'];

function ndefRecord(tnf, type, payload) {
  return { tnf, type, payload };
}

export function ndefUriRecord(uri) {
  let code = 0;
  for (let i = URI_PREFIXES.length - 1; i > 0; i--) {
    if (uri.startsWith(URI_PREFIXES[i])) { code = i; break; }
  }
  // Prefer the longest match like Android does (https://www. beats https://)
  if (uri.startsWith('https://www.')) code = 2;
  else if (uri.startsWith('http://www.')) code = 1;
  const rest = utf8.encode(uri.slice(URI_PREFIXES[code].length));
  return ndefRecord(TNF.WELL_KNOWN, utf8.encode('U'), concat(Uint8Array.of(code), rest));
}

export const ndefMimeRecord = (mime) => ndefRecord(TNF.MIME_MEDIA, utf8.encode(mime), new Uint8Array(0));
export const ndefEmptyRecord = () => ndefRecord(TNF.EMPTY, new Uint8Array(0), new Uint8Array(0));

export function ndefMessage(records) {
  const parts = records.map((r, idx) => {
    let flags = r.tnf & 0x07;
    if (idx === 0) flags |= 0x80;                   // MB
    if (idx === records.length - 1) flags |= 0x40;  // ME
    const short = r.payload.length < 256;
    if (short) flags |= 0x10;                       // SR
    const plen = short ? Uint8Array.of(r.payload.length) : int32be(r.payload.length);
    return concat(Uint8Array.of(flags, r.type.length), plen, r.type, r.payload);
  });
  return concat(...parts);
}

// NDEF file content as served by ReadBinary: 2-byte length header + message.
export const ndefFile = (msg) => concat(Uint8Array.of((msg.length >> 8) & 0xff, msg.length & 0xff), msg);

// ShareScreen.tryExposeNfcUri: URLs go as-is; other text is wrapped in a URL fragment
// so a phone without Bubble Share still gets it (the page shows the fragment).
const WEB_URL = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(:\d+)?(\/\S*)?$/i;
export function nfcUriForText(text) {
  return WEB_URL.test(text) ? text : NFC.TEXT_WRAPPER + androidUriEncode(text);
}

// android.net.Uri.encode(): percent-encodes everything except A-Za-z0-9 and _-!.~'()*
export function androidUriEncode(s) {
  return Array.from(utf8.encode(s), (b) => {
    const c = String.fromCharCode(b);
    return /[A-Za-z0-9_\-!.~'()*]/.test(c) ? c : '%' + b.toString(16).toUpperCase().padStart(2, '0');
  }).join('');
}

// Simulates an NFC reader (a phone, Bubble Share installed or not) pulling the
// NDEF message off a Bubble Share HCE "tag". Returns the APDU exchange.
export function type4ReadExchange(message) {
  const file = ndefFile(message);
  const cc = capabilityContainer();
  const steps = [];
  const push = (label, cmd, resp) => steps.push({ label, cmd, resp });
  push('SELECT Type-4 tag application', apdu.selectApplication(NFC.TYPE4_AID), apduResponse.ok());
  push('SELECT capability container (E103)', apdu.selectCapabilityContainer(), apduResponse.ok());
  push('READ BINARY capability container', apdu.readBinary(0, cc.length), apduResponse.ok(cc));
  push('SELECT NDEF file (E104)', apdu.selectNdef(), apduResponse.ok());
  push('READ BINARY NDEF length', apdu.readBinary(0, 2), apduResponse.ok(file.subarray(0, 2)));
  let offset = 2;
  while (offset < file.length) {
    const len = Math.min(0xff, file.length - offset);
    push(`READ BINARY NDEF body @${offset}`, apdu.readBinary(offset, len), apduResponse.ok(file.subarray(offset, offset + len)));
    offset += len;
  }
  return steps;
}

// Bubble Share handshake over NFC: the *receiver* is the reader, the *sender*
// emulates the card (HceApduService with HandshakeSharingData).
export function bubbleHandshakeExchange({ readerTransports, cardTransports, readerServiceInfo, cardConnect }) {
  const steps = [];
  const push = (label, cmd, resp) => steps.push({ label, cmd, resp });
  push('SELECT Bubble Share application (F0 "s1m.share.1")', apdu.selectApplication(NFC.VND_AID), apduResponse.ok());
  // Card picks its lowest-weight transport that the reader also supports (all weights are 100,
  // so declaration order wins: Wi-Fi Aware before Wi-Fi Direct).
  const selected = cardTransports.find((t) => readerTransports.includes(t));
  push(
    'Reader offers its transports → card picks one',
    apdu.bubbleTransportSelection(readerTransports),
    selected == null ? apduResponse.notFound() : apduResponse.ok(Uint8Array.of(selected)),
  );
  if (selected == null) return { steps, selected: null };
  push(
    'Reader sends ServiceSpecificInfo → card answers Connect',
    apdu.bubbleConnect(readerServiceInfo),
    apduResponse.ok(cardConnect),
  );
  return { steps, selected };
}
