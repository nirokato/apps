// bubble-share protocol tests — pure functions, no network.
// Run: node projects/bubble-share/tests/run.mjs
import {
  hex, fromHex, bytesEqual, utf8, base64url, javaArrayHashCode, hex32,
  x25519, x25519Base, spkiEncode, spkiDecode, deviceId, generateIdentity,
  hmacSha256, masterSharedKey, deriveAll, pairingCodeFromMac,
  cbor, cborDecode, encodeServiceSpecificInfo, decodeServiceSpecificInfo,
  encodeConnect, decodeConnect, ShareKind, AWARE_MAX_MESSAGE,
  textFrameHeader, fileFrameHeader, parseFrameHeader,
  NFC, apdu, apduResponse, capabilityContainer, ndefUriRecord, ndefMimeRecord, ndefMessage,
  nfcUriForText, androidUriEncode, type4ReadExchange, bubbleHandshakeExchange, TransportId,
} from '../protocol.mjs';

let passed = 0;
let failed = 0;
function check(name, cond) {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.error(`  ✗ ${name}`); }
}

console.log('X25519 (RFC 7748 §5.2 test vectors)');
{
  const k = fromHex('a546e36bf0527c9d3b16154b82465edd62144c0ac1fc5a18506a2244ba449ac4');
  const u = fromHex('e6db6867583030db3594c1a424b15f7c726624ec26b3353b10a903a6d0ab1c4c');
  const out = x25519(k, u);
  check('vector 1', hex(out) === 'c3da55379de9c6908e94ea4df28d084f32eccf03491c71f754b4075577a28552');
  const k2 = fromHex('4b66e9d4d1b4673c5ad22691957d6af5c11b6421e0ea01d42ca4169e7918ba0d');
  const u2 = fromHex('e5210f12786811d3f4b7959d0538ae2c31dbe7106fc03c3efc4cd549c715a493');
  check('vector 2', hex(x25519(k2, u2)) === '95cbde9476e8907d7aade45cb4b873f88b595a68799fa152e6f8f7647aac7957');
}

console.log('X25519 Diffie-Hellman (RFC 7748 §6.1)');
{
  const alicePriv = fromHex('77076d0a7318a57d3c16c17251b26645df4c2f87ebc0992ab177fba51db92c2a');
  const bobPriv = fromHex('5dab087e624a8a4b79e17f8b83800ee66f3bb1292618b6fd1c2f8b27ff88e0eb');
  const alicePub = x25519Base(alicePriv);
  const bobPub = x25519Base(bobPriv);
  check('Alice public key', hex(alicePub) === '8520f0098930a754748b7ddcb43ef75a0dbf3a0d26381af4eba4a98eaa9b4e6a');
  check('Bob public key', hex(bobPub) === 'de9edb7d7b7dc1b4d35b61c2ece435373f8343c85b78674dadfc7e146f882b4f');
  const shared = x25519(alicePriv, bobPub);
  check('shared secret', hex(shared) === '4a5d9d5ba4ce2de1728e3bf480350f25e07e21c947d19e3376f09b3c1e161742');
  check('symmetric', bytesEqual(shared, x25519(bobPriv, alicePub)));
}

console.log('Java interop');
{
  check('Arrays.hashCode([]) = 1', javaArrayHashCode(new Uint8Array(0)) === 1);
  check('Arrays.hashCode([1,2,3]) = 30817', javaArrayHashCode(Uint8Array.of(1, 2, 3)) === 30817);
  // 0xff is the signed byte -1: 31*1 + (-1) = 30
  check('bytes are signed', javaArrayHashCode(Uint8Array.of(0xff)) === 30);
  check('"%08x" of -1 is ffffffff', hex32(-1) === 'ffffffff');
  check('"%08x" of 255 is 000000ff', hex32(255) === '000000ff');
  check('Base64 url encoder keeps padding', base64url(Uint8Array.of(0xfb, 0xff)) === '-_8=');
  const spki = spkiEncode(new Uint8Array(32).fill(7));
  check('SPKI wrapper is 44 bytes with the X25519 OID', spki.length === 44 && hex(spki).startsWith('302a300506032b656e032100'));
  check('SPKI roundtrip', bytesEqual(spkiDecode(spki), new Uint8Array(32).fill(7)));
  check('device id is 8 hex chars', /^[0-9a-f]{8}$/.test(deviceId(spki)));
}

console.log('Key schedule (Crypto.kt)');
await (async () => {
  // HMAC-SHA256 RFC 4231 test case 2
  const mac = await hmacSha256(utf8.encode('Jefe'), utf8.encode('what do ya want for nothing?'));
  check('HMAC-SHA256 RFC 4231 #2', hex(mac) === '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843');

  const a = generateIdentity('Pixel 6a');
  const b = generateIdentity('Pixel 8a');
  const nonce = fromHex('000102030405060708090a0b0c0d0e0f');
  const ka = await masterSharedKey(a.priv, b.pubKey, nonce);
  const kb = await masterSharedKey(b.priv, a.pubKey, nonce);
  check('both peers derive the same master shared key', bytesEqual(ka.msk, kb.msk));
  const da = await deriveAll(ka.msk);
  const db = await deriveAll(kb.msk);
  check('same 6-digit pairing code on both sides', da.pairingCode === db.pairingCode);
  check('pairing code in 0..999999', da.pairingCode >= 0 && da.pairingCode < 1_000_000);
  check('Wi-Fi PSK is 44-char base64url (8..63 chars allowed by Android)', da.wifiPsk.length === 44);
  check('TLS key id and PSK are 32 bytes', da.tlsKeyId.length === 32 && da.tlsPsk.length === 32);
  const other = await deriveAll((await masterSharedKey(a.priv, b.pubKey, fromHex('ff'.repeat(16)))).msk);
  check('a new nonce gives a new PSK', other.wifiPsk !== da.wifiPsk);
  check('pairingCodeFromMac mirrors absoluteValue % 1e6', pairingCodeFromMac(Uint8Array.of(0xff)) === 30);
})();

console.log('CBOR (kotlinx.serialization defaults)');
{
  // From kotlinx.serialization docs/formats.md: Project("kotlinx.serialization", "Kotlin")
  const project = cbor.map([['name', cbor.text('kotlinx.serialization')], ['language', cbor.text('Kotlin')]]);
  check('indefinite map matches kotlinx example', hex(project) === 'bf646e616d65756b6f746c696e782e73657269616c697a6174696f6e686c616e6775616765664b6f746c696eff');
  // Data(type2 = @ByteString [1,2,3,4], type4 = [5,6,7,8])
  const data = cbor.map([['type2', cbor.byteString(Uint8Array.of(1, 2, 3, 4))], ['type4', cbor.kotlinByteArray(Uint8Array.of(5, 6, 7, 8))]]);
  check('ByteArray without @ByteString is an indefinite int array', hex(data) === 'bf6574797065324401020304657479706534' + '9f05060708ff' + 'ff');
  check('bytes ≥ 0x80 encode as negative ints', hex(cbor.kotlinByteArray(Uint8Array.of(0x80, 0xff))) === '9f387f20ff');
  check('decoder roundtrips the docs example', JSON.stringify(cborDecode(fromHex('bf646e616d65756b6f746c696e782e73657269616c697a6174696f6e686c616e6775616765664b6f746c696eff'))) === '{"name":"kotlinx.serialization","language":"Kotlin"}');
  check('decoder handles definite map with null', JSON.stringify(cborDecode(fromHex('a263616c6726636b6964f6'))) === '{"alg":-7,"kid":null}');

  const id = generateIdentity('Pixel 8a');
  const ssi = encodeServiceSpecificInfo({ deviceName: 'Pixel 8a', pubKey: id.pubKey });
  const back = decodeServiceSpecificInfo(ssi);
  check('ServiceSpecificInfo roundtrip', back.deviceName === 'Pixel 8a' && bytesEqual(back.pubKey, id.pubKey) && back.canReceiveFiles === true);
  check('canReceiveFiles=true is omitted (encodeDefaults=false)', !('r' in cborDecode(ssi)));
  const informative = decodeServiceSpecificInfo(encodeServiceSpecificInfo({ deviceName: 'Pixel 6a', pubKey: id.pubKey, canReceiveFiles: false }));
  check('canReceiveFiles=false is encoded', informative.canReceiveFiles === false);

  const nonce = new Uint8Array(16).fill(0xab);
  const connect = encodeConnect({ deviceName: 'Pixel 6a', nonce, pubKey: id.pubKey, kind: ShareKind.Files, nFiles: 2 });
  const c = decodeConnect(connect);
  check('Connect roundtrip', c.deviceName === 'Pixel 6a' && bytesEqual(c.nonce, nonce) && c.kind === 1 && c.nFiles === 2);
  check('Connect fits a Wi-Fi Aware message', connect.length <= AWARE_MAX_MESSAGE);
  const text = decodeConnect(encodeConnect({ deviceName: 'x', nonce, pubKey: id.pubKey, kind: ShareKind.Text }));
  check('nFiles omitted for text', text.nFiles === null);
}

console.log('Stream framing (P2PStreams.kt)');
{
  const t = textFrameHeader(utf8.encode('hello'));
  check('TEXT_V1 header', hex(t) === '0100000005');
  const f = fileFrameHeader('a.txt', 6);
  check('FILE_V1 header', hex(f) === '0200000005' + hex(utf8.encode('a.txt')) + '0000000000000006');
  const p = parseFrameHeader(f);
  check('FILE_V1 parse', p.kind === 'file' && p.name === 'a.txt' && p.size === 6 && p.headerLength === f.length);
  check('TEXT_V1 parse', parseFrameHeader(t).size === 5);
  check('large sizes survive int64', parseFrameHeader(fileFrameHeader('big.iso', 5_000_000_000)).size === 5_000_000_000);
  let threw = false;
  try { parseFrameHeader(Uint8Array.of(9)); } catch { threw = true; }
  check('bad opcode throws', threw);
}

console.log('NFC (APDU.kt / HceApduService.kt)');
{
  check('Type-4 AID', hex(NFC.TYPE4_AID) === 'd2760000850101');
  check('Bubble Share AID = F0 + "s1m.share.1"', hex(NFC.VND_AID) === 'f073316d2e73686172652e31');
  check('SELECT by AID', hex(apdu.selectApplication(NFC.TYPE4_AID)) === '00a4040007d276000085010100');
  check('SELECT CC', hex(apdu.selectCapabilityContainer()) === '00a4000c02e103');
  check('READ BINARY', hex(apdu.readBinary(0x0102, 15)) === '00b001020f');
  check('transport selection APDU', hex(apdu.bubbleTransportSelection([1, 2])) === '80010000020102' + '01');
  check('CC file', hex(capabilityContainer()) === '000f2000ff00ff0406e104080000ff');
  check('OK status word', hex(apduResponse.ok(Uint8Array.of(1))) === '019000');

  const uri = ndefUriRecord('https://apps.andymolenda.com/x');
  check('URI record abbreviates https://', uri.payload[0] === 0x04 && utf8.decode(uri.payload.slice(1)) === 'apps.andymolenda.com/x');
  const msg = ndefMessage([ndefMimeRecord(NFC.MIME), uri]);
  // MB|SR|MIME = 0x92, type len 28, payload 0 ... then ME|SR|WKT = 0x51, type len 1, payload len, 'U'
  check('NDEF message flags', msg[0] === 0x92 && msg[1] === 28 && msg[2] === 0);
  const second = 3 + 28;
  check('last record has ME', msg[second] === 0x51 && msg[second + 1] === 1 && msg[second + 3] === 0x55);

  check('URL text goes as-is', nfcUriForText('https://example.org/a') === 'https://example.org/a');
  check('plain text is wrapped in share.s1m.fr fragment', nfcUriForText('hello world') === 'https://share.s1m.fr/text.html#hello%20world');
  check('Uri.encode keeps unreserved set', androidUriEncode("a-b_c.d~e!f'g(h)i*j k/l") === "a-b_c.d~e!f'g(h)i*j%20k%2Fl");

  const ex = type4ReadExchange(msg);
  check('Type-4 read is 6 APDUs for a short message', ex.length === 6 && ex[5].label.startsWith('READ BINARY NDEF body'));

  const hs = bubbleHandshakeExchange({
    readerTransports: [TransportId.WIFI_DIRECT_V1],
    cardTransports: [TransportId.WIFI_AWARE_V1, TransportId.WIFI_DIRECT_V1],
    readerServiceInfo: Uint8Array.of(1), cardConnect: Uint8Array.of(2),
  });
  check('handshake selects the only common transport', hs.selected === TransportId.WIFI_DIRECT_V1 && hs.steps.length === 3);
  const none = bubbleHandshakeExchange({ readerTransports: [9], cardTransports: [1], readerServiceInfo: Uint8Array.of(1), cardConnect: Uint8Array.of(2) });
  check('no common transport → NotFound', none.selected === null && hex(none.steps[1].resp) === '6a82');
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
