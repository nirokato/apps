# weft

Local-first, topic-threaded chat built on [Veilid](https://veilid.com/) and [cr-sqlite](https://vlcn.io/docs/cr-sqlite/intro). No accounts, no servers storing your messages — your data lives in your browser, and P2P networking handles the rest.

**Live:** [weft.apps.andymolenda.com](https://weft.apps.andymolenda.com)

## How it works

Weft runs entirely in your browser using two Web Workers:

- **DB Worker** — [cr-sqlite](https://vlcn.io/docs/cr-sqlite/intro) (SQLite + CRDT extension) with automatic IndexedDB persistence. All rooms, messages, and identity data stay local. Conflict-free replicated relations enable P2P sync without custom merge logic.
- **Veilid Worker** — [Veilid WASM](https://veilid.com/) connects to the Veilid P2P network for distributed routing, DHT records, key exchange, and encrypted messaging.

Messages are organized into **rooms** containing **topics** (threads). Each topic is a collapsible card showing its message history — a "topic river" layout inspired by Zulip.

## Current status

**What works today:**
- Create rooms and topic threads
- Post and read messages with cr-sqlite persistence
- Search messages across topics
- Export/import rooms as JSON (including DHT credentials)
- Veilid WASM boots with WSS support (compiled with `enable-protocol-wss`)
- Bootstraps to Veilid network via WSS proxy (Cloudflare Tunnel → nginx → official bootstrap)
- Network attachment: reaches OverAttached
- Identity generation and persistence
- DHT record creation and opening (live-tested on real network)
- AppMessage send/receive (loopback verified)
- Per-room presence subkey allocation
- CRDT merge: independent databases converge via `crsql_changes`

**WSS transport: RESOLVED** — see [docs/wss-transport-blockers.md](docs/wss-transport-blockers.md) for the full journey.

Andy's veilid-server rebuilt from source with `enable-protocol-wss`, serving WSS on port 5150 with a Let's Encrypt cert. WASM client bootstraps directly via `wss://veilid.andymolenda.com:5150/ws`, reaches OverAttached, with the node acting as relay to the rest of the network.

**What's next:**
- Two-peer messaging test (PRD step 22)
- End-to-end encryption (AEAD primitives are wired, not yet applied to messages)
- Presence indicators via DHT subkeys
- cr-sqlite changeset sync via Veilid AppCall (reliable catch-up)

## Architecture

```
index.html                 Entry point, all CSS
src/
  app.js                   Main thread orchestrator, state, P2P protocol
  ui.js                    Lit-html rendering (loading → setup → chat → settings)
  db-worker.js             cr-sqlite Web Worker (CRDT + IndexedDB)
  veilid-worker.js         Veilid WASM Web Worker (P2P, DHT, crypto)
  export.js                Room JSON export/import
  ulid.js                  ULID generator for sortable message IDs
  constants.js             App config
lib/                       Vendored cr-sqlite dependencies
  crsqlite/                @vlcn.io/crsqlite-wasm v0.16.0
  wa-sqlite/               @vlcn.io/wa-sqlite v0.22.0
  xplat-api/               @vlcn.io/xplat-api v0.15.0
  async-mutex/             async-mutex v0.4.1
wasm/veilid/
  veilid_wasm.js           Veilid WASM loader (~310 KB, patched for Worker compat)
  veilid_wasm_bg.wasm      Compiled Veilid binary (~9.5 MB, built with enable-protocol-wss)
test-headless.mjs          Headless Chromium test script (console capture via --enable-logging)
tests/
  run.js                   Playwright test runner (auto-discovers *.test.html)
  harness.js               Minimal TAP assertion library
  db-worker.test.html      42 tests: DB CRUD, schema, pagination, search
  crdt-merge.test.html     18 tests: CRDT merge, cross-peer sync, edge cases
test.html                  Bootstrap connectivity test suite (Veilid network)
docs/
  PRD.md                   Product requirements document (living)
```

## Data model

All CRR tables use cr-sqlite's conflict-free replicated relations for automatic CRDT merge.

| Table | CRR | Purpose |
|-------|-----|---------|
| `local_identity` | No | Single-row: your public key + display name |
| `rooms` | Yes | Chat spaces with DHT key, encryption key, owner credentials |
| `members` | Yes | Per-room membership with roles (owner/member) |
| `messages` | Yes | Scoped to (room, topic), ULID-keyed for sort order |
| `read_cursors` | No | Tracks last-read message per topic for unread counts |

## Running locally

No build step. Serve the project directory with any static file server:

```
cd projects/weft
python3 -m http.server 8000
```

Open `http://localhost:8000` for the app, or `http://localhost:8000/test.html` for the bootstrap test suite.

## Tests

**Automated (60 tests, ~5s):**

```
node projects/weft/tests/run.js
```

Runs in headless Chromium via Playwright. Tests cover all DB worker actions, CRDT merge between independent databases, cross-peer export/import, error paths, and edge cases.

**Bootstrap tests (manual, requires network):**

Open `test.html` in a browser or run `node run-tests.js`. Validates Veilid WASM loading, network attachment, keypair generation, and private route creation.

## Tech

- **No bundler, no npm** — native ES modules, CDN imports
- **lit-html** for UI rendering
- **cr-sqlite** (`@vlcn.io/crsqlite-wasm`) for CRDT-enabled local persistence
- **Veilid WASM** v0.5.3 for P2P networking, DHT, and cryptography (built with `enable-protocol-wss`, Worker-patched)
- **ULID** for lexicographically sortable message IDs
- **Playwright** for automated browser-based testing
