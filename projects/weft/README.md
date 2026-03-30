# weft

Local-first, topic-threaded chat built on [Veilid](https://veilid.com/) and SQLite-in-the-browser. No accounts, no servers storing your messages — your data lives in your browser, and P2P networking handles the rest.

**Live:** [weft.apps.andymolenda.com](https://weft.apps.andymolenda.com)

## How it works

Weft runs entirely in your browser using two Web Workers:

- **DB Worker** — SQLite (via [sql.js](https://github.com/sql-js/sql.js)) persisted to IndexedDB. All rooms, messages, and identity data stay local.
- **Veilid Worker** — [Veilid WASM](https://gitlab.com/nicholasgasior/veilid-wasm-builds) connects to the Veilid P2P network for distributed routing, key exchange, and encrypted messaging.

Messages are organized into **rooms** containing **topics** (threads). Each topic is a collapsible card showing its message history — a "topic river" layout.

## Current status

**What works today:**
- Create rooms and topic threads
- Post and read messages (local persistence)
- Search messages across topics
- Export/import rooms as JSON for backup or sharing
- Veilid network attachment (connects to bootstrap nodes, generates keypairs, creates private routes)
- Identity management with Veilid public keys

**What's next:**
- P2P message sync via Veilid AppMessage
- Room sharing via DHT record keys
- End-to-end encryption (AEAD primitives are wired, not yet applied to messages)
- Presence indicators via DHT
- Conflict-free replication via [cr-sqlite](https://vlcn.io/docs/cr-sqlite/intro)

## Architecture

```
index.html                 Entry point, all CSS
src/
  app.js                   Main thread orchestrator, state management
  ui.js                    Lit-html rendering (loading → setup → chat → settings)
  db-worker.js             SQLite Web Worker (sql.js + IndexedDB)
  veilid-worker.js         Veilid WASM Web Worker (P2P networking)
  export.js                Room JSON export/import
  ulid.js                  ULID generator for sortable message IDs
  constants.js             App config
wasm/veilid/
  veilid_wasm.js           Veilid WASM loader
  veilid_wasm_bg.wasm      Compiled Veilid binary (~9.5 MB)
test.html                  Bootstrap connectivity test suite
run-tests.js               Headless test runner (Playwright)
```

## Data model

| Table | Purpose |
|-------|---------|
| `local_identity` | Single-row: your public key + display name |
| `rooms` | Chat spaces, each with a name and creator |
| `members` | Per-room membership with roles (owner/member) |
| `messages` | Scoped to (room, topic), ULID-keyed for sort order |
| `read_cursors` | Tracks last-read message per topic for unread counts |

## Running locally

No build step. Serve the project directory with any static file server:

```
cd projects/weft
python3 -m http.server 8000
```

Open `http://localhost:8000` for the app, or `http://localhost:8000/test.html` for the bootstrap test suite.

## Bootstrap tests

`test.html` validates the full Veilid stack:

1. WebSocket connectivity to bootstrap node
2. WASM binary loading
3. Veilid core initialization
4. Network attachment
5. Cryptographic keypair generation
6. Private route creation

Run headless with `node run-tests.js` (requires Playwright).

## Tech

- **No bundler, no npm** — native ES modules, CDN imports
- **lit-html** for UI rendering
- **sql.js** (SQLite compiled to WASM) for local persistence
- **Veilid WASM** for P2P networking, DHT, and cryptography
- **ULID** for lexicographically sortable message IDs
