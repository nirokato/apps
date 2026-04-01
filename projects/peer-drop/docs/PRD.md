# peer-drop — Product Requirements Document

> **peer-drop** is a browser-based peer-to-peer file and text sharing tool. Open a link, connect two devices, drop files or paste text — no accounts, no servers touching your data.

**Target deployment:** `peer-drop.apps.andymolenda.com`
**Repository:** `nirokato/apps` → `projects/peer-drop/`
**Audience for this PRD:** Claude Code Web (primary implementor)

---

## 1. Product vision

peer-drop is AirDrop for the browser. Two devices connect via a short room code embedded in a shareable URL. Either device can send files or text to the other. Transfers are direct peer-to-peer over WebRTC — data never touches a server.

**What peer-drop is:**
- A zero-friction file and text transfer tool between two devices
- Peer-to-peer: data flows directly between browsers via WebRTC data channels
- Ephemeral: nothing is stored — close the tab and it's gone
- Bidirectional: either peer can send to the other
- Works cross-platform: laptop to phone, phone to phone, etc.

**What peer-drop is NOT:**
- Not a file hosting/storage service (no persistence)
- Not a multi-user collaboration tool (strictly 2 peers per room)
- Not a replacement for cloud sync (one-shot transfers only)
- Not designed for adversarial threat models (relies on WebRTC's built-in DTLS encryption, no additional E2E layer)

---

## 2. Architecture overview

### 2.1 Component topology

```
┌─────────────────────────────────────────────────────┐
│  BROWSER TAB (Peer A)                               │
│                                                     │
│  ┌─────────────┐    ┌──────────────────────────┐    │
│  │   UI Layer  │◄──►│  Connection Manager      │    │
│  │  (vanilla)  │    │  (PeerJS DataConnection)  │   │
│  └─────────────┘    └────────────┬─────────────┘    │
│                                  │                   │
│                           WebRTC Data Channel        │
│                           (DTLS encrypted)           │
└──────────────────────────────────┼───────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │  PeerJS Cloud Signaling     │
                    │  (0.peerjs.com)             │
                    │  WebSocket — handshake only │
                    └──────────────┬──────────────┘
                                   │
┌──────────────────────────────────┼───────────────────┐
│  BROWSER TAB (Peer B)           │                    │
│                                  │                   │
│  ┌─────────────┐    ┌───────────┴──────────────┐    │
│  │   UI Layer  │◄──►│  Connection Manager      │    │
│  │  (vanilla)  │    │  (PeerJS DataConnection)  │   │
│  └─────────────┘    └──────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### 2.2 Design principles

1. **Zero config** — open the URL, you're ready. No accounts, no install, no permissions.
2. **Serverless data path** — the signaling server (PeerJS cloud) only brokers the WebRTC handshake. File/text data flows directly between peers.
3. **Single-file simplicity** — entire app in one `index.html`. No build step, no dependencies beyond CDN scripts.
4. **Mobile-first** — designed for the most common use case: sending something from phone to laptop or vice versa.

---

## 3. User flow

### 3.1 Happy path

```
Peer A (initiator)                    Peer B (joiner)
─────────────────                     ────────────────
1. Opens peer-drop.apps...
2. Page generates 4-char room code
3. Displays: room URL + QR code
4. Shares URL or shows QR             5. Opens URL (or scans QR)
                                       6. Auto-joins room via hash
          ◄── WebRTC handshake ──►
7. Both see "Connected" status
8. Either side: drops file or sends text
9. Receiver sees accept prompt (file) or inline text
10. Accepts → chunked transfer with progress bar
11. Complete → auto-download
```

### 3.2 States

| State | What the user sees |
|-------|-------------------|
| **Initializing** | Spinner, "Connecting to signaling server..." |
| **Waiting** | Room code + QR code + "Share this link to connect" |
| **Connecting** | "Connecting to peer..." |
| **Connected** | Green indicator, peer label, send UI enabled |
| **Transferring** | Progress bar with %, filename, size, speed |
| **Complete** | Checkmark, "Transfer complete", file auto-downloads |
| **Disconnected** | Yellow indicator, "Peer disconnected", room code still valid for reconnect |
| **Error** | Red indicator, human-readable error, retry suggestion |

---

## 4. Feature specification

### 4.1 Room management

- **Room code:** 4 uppercase letters (e.g. `FOXR`), generated randomly by the initiator.
- **URL format:** `https://peer-drop.apps.andymolenda.com#FOXR` — the hash fragment IS the room code.
- **PeerJS peer IDs:** Initiator registers as `peerdrop-FOXR`. Joiner registers as `peerdrop-FOXR-XYZ` (random suffix) and connects to the host ID.
- **One room = two peers.** Third connections are rejected with a message.
- **Room lifetime:** Exists as long as the host tab is open.

### 4.2 QR code

- Displayed prominently in the waiting state.
- Encodes the full room URL.
- Generated client-side using a lightweight library via CDN (e.g. `qrcode-generator`).
- Styled to match the design system (dark background, accent-colored modules).

### 4.3 File transfer

- **Selection:** Drag-and-drop (desktop) + file picker button (all platforms). `<input type="file" multiple>`.
- **Accept prompt:** Receiver sees file name, human-readable size, and file type. Must click "Accept" or "Decline".
- **Chunking:** Files sliced into 64KB `ArrayBuffer` chunks.
- **Protocol messages (JSON over DataConnection):**

```
// Metadata (sent first)
{
  type: "file-offer",
  id: "<unique-transfer-id>",
  name: "photo.jpg",
  size: 2517483,
  mimeType: "image/jpeg",
  totalChunks: 39
}

// Receiver response
{ type: "file-accept", id: "<transfer-id>" }
{ type: "file-decline", id: "<transfer-id>" }

// Data chunks (JSON envelope with ArrayBuffer payload)
{ type: "file-chunk", id: "<transfer-id>", index: 0, data: <ArrayBuffer> }

// Completion
{ type: "file-complete", id: "<transfer-id>" }
```

- **Progress:** Sender tracks chunks sent. Receiver tracks chunks received. Both display a determinate progress bar with percentage, transferred/total size, and (if feasible) speed estimate.
- **Completion:** Receiver auto-downloads the file via a Blob URL and `<a download>` click.
- **Queue:** Multiple files sent sequentially (one at a time to avoid memory pressure).

### 4.4 Text sharing

- **Input:** Text area with a "Send" button (or Enter to send).
- **Protocol:**

```
{ type: "text", content: "https://example.com/some-long-url" }
```

- **Display:** Appears inline in a simple message list. Clickable if it looks like a URL. One-tap copy button.
- **No chunking needed** — text messages are small.

### 4.5 Connection handling

- **Signaling:** PeerJS cloud server (`0.peerjs.com`) for WebRTC handshake only.
- **ICE:** Default STUN via Google (`stun:stun.l.google.com:19302`). No TURN server (MVP scope).
- **Reconnection:** If the DataConnection drops, the joiner automatically retries connecting to the host peer ID. Host re-registers the same ID on PeerJS disconnect/reconnect.
- **Cleanup:** On `pagehide` (not `beforeunload`, for Safari compatibility), destroy the Peer instance.

---

## 5. Non-goals (MVP)

| Feature | Rationale |
|---------|-----------|
| Multi-peer rooms (3+) | Adds complexity to UI and transfer routing |
| Transfer resume | Requires state tracking; restart is simpler for MVP |
| E2E encryption beyond DTLS | DTLS is built into WebRTC; additional encryption is premature |
| Wake Lock API | Nice-to-have, not blocking for MVP |
| Sound/haptic feedback | Polish item for post-MVP |
| Folder/directory transfer | Browser APIs don't support this well cross-platform |
| Self-hosted signaling server | PeerJS cloud is sufficient for launch |
| Zip bundling for multi-file | Sequential transfer is simpler and avoids memory spikes |
| File previews/thumbnails | Adds complexity; just show name + size + type |

---

## 6. Security hardening

The following mitigations are implemented to defend against a malicious peer:

| Threat | Mitigation |
|--------|-----------|
| XSS via text messages | Text rendered via DOM API (`createElement`/`textContent`), never `innerHTML` |
| XSS via transfer IDs | All peer-supplied IDs sanitized with `sanitizeId()` allowlist (`[a-zA-Z0-9_-]`) |
| Memory exhaustion (huge file offer) | 500MB cap on `totalChunks`; oversized offers auto-declined |
| Out-of-bounds chunk writes | Chunk `index` validated against `[0, totalChunks)` |
| Clipboard API failure | Fallback to `document.execCommand('copy')` via temporary textarea |
| 0-byte file abuse | Empty files filtered from send queue |

**Not in scope:** Application-level E2E encryption beyond WebRTC's built-in DTLS. The threat model assumes a trusted or casual sharing context, not an adversarial one.

---

## 7. Technical details

### 7.1 Dependencies (CDN only)

| Library | Version | Purpose | CDN |
|---------|---------|---------|-----|
| PeerJS | 1.5.5 | WebRTC data connections | `cdn.jsdelivr.net/npm/peerjs@1.5.5/dist/peerjs.min.js` |
| qrcode-generator | latest | QR code rendering to canvas | `cdn.jsdelivr.net/npm/qrcode-generator` |

### 7.2 File structure

```
projects/peer-drop/
  index.html       # Entire application (HTML + CSS + JS, ~960 lines)
  README.md        # Project overview
  docs/
    PRD.md          # This file
```

### 7.3 Chunking strategy

```javascript
const CHUNK_SIZE = 64 * 1024; // 64KB
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB safety limit

// Sender
const buffer = await file.arrayBuffer();
const totalChunks = Math.ceil(buffer.byteLength / CHUNK_SIZE);
for (let i = 0; i < totalChunks; i++) {
  const chunk = buffer.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
  conn.send({ type: 'file-chunk', id, index: i, data: chunk });
  // Backpressure: wait for data channel buffer to drain if >1MB queued
}

// Receiver
const chunks = new Array(totalChunks);  // pre-allocated, indexed
// On each chunk: chunks[index] = data; received++;
// On complete: new Blob(chunks, { type: mimeType })
```

### 7.4 Room code generation

```javascript
function generateCode(length = 4) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // No I, O (ambiguous)
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(b => chars[b % chars.length])
    .join('');
}
```

Note: Excludes `I` and `O` to avoid confusion with `1` and `0`.

### 7.5 Browser compatibility targets

- Chrome/Edge 80+
- Firefox 80+
- Safari 15+ (iOS 15+)
- No IE11

---

## 8. UI layout

### 8.1 Wireframe (text)

```
┌──────────────────────────────────┐
│         peer-drop                │  ← h1, accent color on "drop"
│                                  │
│  ┌────────────────────────────┐  │
│  │      [QR CODE]             │  │  ← Waiting state: QR + code
│  │                            │  │
│  │      Room: FOXR            │  │
│  │  Share this link:          │  │
│  │  [peer-drop...#FOXR] [Copy]│  │
│  └────────────────────────────┘  │
│                                  │
│  ── after connection ──          │
│                                  │
│  ● Connected                     │  ← Green dot
│                                  │
│  ┌────────────────────────────┐  │
│  │ ┌──────────────────┐      │  │  ← Drop zone (dashed border)
│  │ │  Drop files here  │      │  │
│  │ │  or click to pick │      │  │
│  │ └──────────────────┘      │  │
│  │                            │  │
│  │  [text input...] [Send]   │  │  ← Text sharing
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  photo.jpg  2.4 MB         │  │  ← Transfer card
│  │  ████████████░░░░  75%     │  │
│  │  1.8 MB / 2.4 MB          │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  "Check out this link"    │  │  ← Received text
│  │                    [Copy]  │  │
│  └────────────────────────────┘  │
│                                  │
│  ← apps.andymolenda.com         │  ← Back link
└──────────────────────────────────┘
```

### 8.2 Responsive behavior

- **Desktop (>600px):** Centered 600px container, drag-and-drop enabled.
- **Mobile (<600px):** Full-width with 1rem padding. Drop zone becomes a prominent "Select Files" button. QR code scales down but remains scannable.

---

## 9. Implementation checklist

### Phase 1: MVP

- [x] Project scaffolding (`index.html`, design system, back link)
- [x] Room code generation + URL hash management
- [x] PeerJS integration: host creates peer, joiner connects via hash
- [x] Connection state UI (all states from section 3.2)
- [x] QR code display for room URL
- [x] File send: drag-and-drop + file picker
- [x] File receive: accept prompt + chunked reassembly + auto-download
- [x] Transfer progress bar
- [x] Text send/receive with copy button
- [x] Mobile-responsive layout
- [x] Error handling and edge cases

### Phase 2: Polish (post-MVP)

- [ ] Wake Lock API during transfers
- [x] Transfer speed estimate
- [ ] Sound/haptic on completion
- [ ] Animated connection state transitions
- [x] "Copy room link" button with tooltip confirmation
- [ ] Accessibility audit (keyboard nav, screen reader labels, focus management)

### Phase 3: Infrastructure

- [x] Add `peer-drop` to `tofu/variables.tf` projects set
- [x] Add homepage link in `projects/homepage/index.html`
- [x] Update CLAUDE.md projects table
