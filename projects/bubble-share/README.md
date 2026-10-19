# bubble-share

Interactive showcase of **[Bubble Share](https://codeberg.org/s1m/bubble-share)**,
Simon Gougeon's (s1m) AGPL-3.0 Android app that shares files, text and links to
nearby devices over Wi-Fi Aware: no internet, no shared network, no QR code, a
six-digit pairing code on both phones.

**Live:** [bubble-share.apps.andymolenda.com](https://bubble-share.apps.andymolenda.com)

This is an unofficial page. It explains how the app works by re-implementing its
protocol pieces in the browser and letting you step through them.

## What's on the page

| Section | What it does |
|---------|--------------|
| Two phones, one share | Step-by-step simulator with four scenarios: Wi-Fi Aware, NFC tap → Wi-Fi Aware, NFC tap → Wi-Fi Direct, NFC link to any phone. Every logged byte (CBOR discovery blobs, `Connect`, passphrase, frame headers, APDUs) is generated live. |
| The six-digit code | Two X25519 identities + nonce → `HMAC-SHA256(dh, "NONCE:"‖nonce)` → pairing code, Wi-Fi passphrase, TLS-PSK identity/key, exactly as `Crypto.kt` does it. |
| Bytes on the wire | `TEXT_V1` / `FILE_V1` frame headers for your text or a local file (name and size only), plus the CBOR messages and the 255-byte Wi-Fi Aware message limit. |
| The NFC tap | Type-4 tag read (NDEF URI any phone can take) and the proprietary Bubble Share handshake (AID `F0 "s1m.share.1"`), as APDU traces. |

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page, styles, static explainer cards |
| `app.mjs` | Simulator state machine, phone renderers, the three labs |
| `protocol.mjs` | Pure re-implementation of the protocol: X25519 (RFC 7748), Java `Arrays.hashCode`/`%08x` interop, HMAC key schedule, kotlinx-default CBOR encoder/decoder, stream framing, APDU/NDEF builders |
| `tests/run.mjs` | Node tests against RFC 7748 and RFC 4231 vectors, the kotlinx CBOR documentation examples, and the APDU byte layouts |

```
node projects/bubble-share/tests/run.mjs
```

## Fidelity notes

Derived from Bubble Share v0.1.2 (`versionCode 3`). Things worth knowing when
the upstream app changes:

- CBOR uses kotlinx.serialization defaults: indefinite-length maps, `ByteArray`
  as an array of signed ints (no `@ByteString`), default-valued fields omitted.
- The NFC handshake's prepared `Connect` carries the literal device name `"noo"`
  and no `nFiles`; the later Aware/Direct `Connect` carries the real values.
- Pairing code = `|Arrays.hashCode(HMAC(msk, "PAIRING_CODE"))| mod 10⁶`,
  device id = `"%08x".format(Arrays.hashCode(spkiPubKey))`.
- Phone screens in the simulator are sketches, not screenshots; the app's own
  icon and screenshots are not redistributed here.
