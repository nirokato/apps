# peer-drop

Send files and text between devices. Peer-to-peer over WebRTC — your data never touches a server.

**Live:** [peer-drop.apps.andymolenda.com](https://peer-drop.apps.andymolenda.com)

## How it works

1. Open peer-drop on one device — you get a room code and QR code
2. Open the link (or scan the QR) on a second device
3. Connected — drop files or send text in either direction
4. Transfers flow directly between browsers via WebRTC data channels

No accounts, no installs, no data stored anywhere. Close the tab and it's gone.

## Features

- **File transfer** — drag-and-drop or file picker, with streamed chunked transfer and progress bars
- **Integrity verification** — rolling SHA-256 computed on both sides during transfer, compared on finalize. Match/mismatch indicator shown on the transfer card. A mismatch surfaces an error instead of a silent "complete".
- **Multi-channel** — 4 parallel WebRTC data channels for higher throughput (~4x vs single channel)
- **Resumable transfers** — if the connection drops mid-transfer, reconnects and resumes from where it left off
- **Screen Wake Lock** — keeps devices awake during transfers (desktop and mobile)
- **Text sharing** — paste a URL on your phone, it appears on your laptop instantly
- **QR code pairing** — fastest way to connect phone to desktop
- **Bidirectional** — either peer can send to the other
- **Accept/decline** — receiver sees file name and size before accepting
- **Sequential queue** — drop multiple files, they transfer one at a time

## Architecture

```
┌─────────────────────┐         ┌─────────────────────┐
│   Browser (Peer A)  │         │   Browser (Peer B)  │
│                     │         │                     │
│  UI ◄──► Connection │◄──────►│  Connection ◄──► UI │
│          Manager    │  WebRTC │    Manager          │
│                     │  (DTLS) │                     │
└─────────────────────┘         └─────────────────────┘
                  │                     │
                  └───────┬─────────────┘
                          │
               PeerJS Cloud Signaling
               (handshake only, no data)
```

- **PeerJS** brokers the WebRTC handshake via its free signaling server
- **Data channels** carry all file chunks and text messages directly between peers
- **DTLS encryption** is built into WebRTC — all transfers are encrypted in transit

## File structure

```
projects/peer-drop/
  index.html       # Entire application (HTML + CSS + JS, ~960 lines)
  docs/
    PRD.md          # Product requirements document
  README.md         # This file
```

## Transfer protocol

Files are streamed in 256KB slices across 4 parallel data channels:

```
1. Sender → file-offer     { name, size, mimeType, totalChunks }       (control channel)
2. Receiver → file-accept   or  file-decline                           (control channel)
3. Sender → file-chunk      { index, data }  ×N  round-robin across    (transfer channels)
       ↳ last chunk also carries  { sha256 }  for integrity check
4. Sender → file-complete   (hint; receiver has already auto-finalized)(control channel)
5. Receiver writes to disk (File System Access API) or assembles Blob (fallback)
6. Receiver verifies local SHA-256 against sender's; mismatch → error
```

Both peers maintain a rolling SHA-256 as chunks flow through. The sender feeds each chunk into the hasher exactly once (tracked by `hashedUpTo` so resume doesn't double-count). The receiver hashes chunks in index order as they become contiguous (same order the sender did). The sender includes its final digest in the **last chunk's** message so the receiver always has it by the time it has all data — regardless of how `file-complete` races against data chunks on the control vs. transfer channels.

On reconnect, the receiver sends `transfer-resume` with each transfer's **lowest unreceived chunk index** (`nextContiguous`), and the sender resumes from exactly that index — correct even with out-of-order delivery across multiple channels.

**Send side:** reads one 256KB slice at a time via `file.slice()` — constant memory. Chunks are distributed round-robin across 4 transfer channels with per-channel backpressure via `bufferedAmountLowThreshold`.

**Receive side:** on Chrome/Edge, streams chunks to disk via File System Access API with an ordered write buffer for out-of-order multi-channel delivery. On Firefox/Safari, falls back to in-memory Blob accumulation.

Text messages use a simple `{ type: "text", content: "..." }` envelope.

## Security

- All peer-supplied data (transfer IDs, filenames, text) is sanitized before rendering
- Text messages rendered via DOM API (`createElement`/`textContent`), not `innerHTML`
- Transfer IDs validated against an alphanumeric allowlist
- Streamed I/O prevents memory exhaustion for large files (no file size cap)
- Chunk indices bounds-checked on receive; totalChunks validated against declared file size
- No additional E2E encryption beyond WebRTC's built-in DTLS — suitable for trusted/casual use, not adversarial threat models

## Running locally

No build step. Serve the project directory with any static file server:

```
cd projects/peer-drop
python3 -m http.server 8000
```

Open `http://localhost:8000` — you'll need two devices or browser tabs to test the connection (both must be able to reach the PeerJS signaling server).

## Tech

- **No bundler, no npm** — single `index.html`, CDN-only dependencies
- **[PeerJS](https://peerjs.com/) v1.5.5** — WebRTC data connection abstraction (1 control + 4 transfer channels)
- **[js-sha256](https://github.com/emn178/js-sha256) v0.11.0** — streaming SHA-256 for integrity verification (Web Crypto's `digest()` has no streaming API)
- **[qrcode-generator](https://github.com/nicfit/qrcode-generator) v1.4.4** — QR code rendering to canvas
- **Vanilla JS** — no framework, no build step
