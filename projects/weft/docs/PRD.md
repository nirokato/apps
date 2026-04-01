# Weft — Product Requirements Document

> **Weft** is a local-first, topic-threaded chat application built on Veilid (P2P networking, identity, encryption) and cr-sqlite (CRDT-based conflict-free database replication), deployed as a static web app.

**Target deployment:** `weft.apps.andymolenda.com`
**Repository:** `nirokato/apps` → `projects/weft/`
**Audience for this PRD:** Claude Code Web (primary implementor)

---

## 1. Product vision

Weft takes Zulip's stream→topic→message threading model — the best data model for organized async conversation — and rebuilds it as a lightweight, local-first, peer-to-peer application with no central server.

**What Weft is:**
- A topic-threaded group chat for small trusted groups (2–15 people)
- Local-first: all data lives in an in-browser database, UI is instant
- Peer-to-peer: messages sync directly between peers via the Veilid network
- Portable: conversations can be exported/imported as files for offline bootstrap, room forking, or archival
- Privacy-respecting: end-to-end encrypted, no accounts, no data harvesting, IP addresses hidden by Veilid routing

**What Weft is NOT:**
- Not a Signal/Wickr competitor (not maximally paranoid, not focused on disappearing messages)
- Not a Slack competitor (not trying to serve 1000-person orgs)
- Not a federated protocol (not Matrix/ActivityPub — it's pure P2P)

---

## 2. Architecture overview

### 2.1 Component topology

```
┌──────────────────────────────────────────────────────────────┐
│  BROWSER TAB                                                 │
│                                                              │
│  ┌───────────────┐     ┌────────────────┐                    │
│  │   UI Layer    │◄───►│  Orchestrator  │                    │
│  │  (lit-html)   │     │  (main thread) │                    │
│  └───────────────┘     └───┬────────┬───┘                    │
│                            │        │                        │
│                     postMessage  postMessage                 │
│                            │        │                        │
│  ┌─────────────────┐  ┌───▼────────▼────────┐               │
│  │  DB Worker       │  │  Veilid Worker       │              │
│  │  (cr-sqlite)     │  │  (veilid-wasm)       │              │
│  │  IndexedDB       │  │  WebSocket→network   │              │
│  └─────────────────┘  └─────────────────────┘               │
│                                 │                            │
└─────────────────────────────────│────────────────────────────┘
                                  │ wss://
                                  ▼
                    ┌───────────────────────┐
                    │  Veilid Network       │
                    │  (bootstrap via home  │
                    │   node + CF Tunnel)   │
                    └───────────────────────┘
```

### 2.2 Design principles

1. **Two Workers, never one.** cr-sqlite and Veilid WASM each get their own dedicated Web Worker. Neither blocks the main thread. The main thread is UI-only plus message routing between workers.
2. **Database is the source of truth.** The UI reads exclusively from cr-sqlite. Network events write to cr-sqlite. The UI never reads from the network directly.
3. **Network is best-effort.** The app must be fully functional offline using local data. Network connectivity enhances (live sync) but is never required for reading or composing.
4. **Export is a first-class primitive.** Not an afterthought "settings → export" buried in a menu. The export file IS the room — it can bootstrap a new peer, fork a conversation, or archive history.
5. **Append-mostly for MVP.** Messages are append-only in v1. cr-sqlite's CRDT merge supports edits/deletes, but the MVP UI does not expose these. The schema should support them from day one so the data model doesn't need migration later.

---

## 3. Tech stack

### 3.1 Core dependencies

| Component | Technology | Source | Size (gzip) | Notes |
|---|---|---|---|---|
| P2P networking | Veilid WASM (`veilid-wasm`) | Pre-built from GitLab CI or compiled via `wasm-pack` | ~5-8MB est. | Provides identity, DHT, routing, encryption, AppMessage/AppCall |
| Local database | cr-sqlite (`@vlcn.io/crsqlite-wasm` v0.16.0) | Vendored in `lib/` | ~1.7MB WASM + ~200KB JS | SQLite + CRDT extension for conflict-free merge. Requires `wa-sqlite`, `xplat-api`, `async-mutex` (all vendored with bare specifiers rewritten to relative paths) |
| UI rendering | lit-html | CDN (`https://cdn.jsdelivr.net/npm/lit-html@3/+esm`) | ~7KB | Tagged template literals, no build step, reactive rendering |
| ID generation | ulid | CDN or inline (~30 lines) | <1KB | Time-sortable, globally unique, no coordination |
| Serialization | CBOR or JSON | Native or CDN (`cbor-x`) | <5KB | For message encoding over AppMessage |
| Hosting | Cloudflare Pages | Via OpenTofu in `nirokato/apps` | — | Static files, wildcard SSL |

### 3.2 Infrastructure

| Component | Technology | Notes |
|---|---|---|
| Bootstrap proxy | nginx on Andy's veilid node | Proxies WSS bootstrap requests to official Veilid bootstrap nodes |
| Cloudflare Tunnel | `cloudflared` | Tunnels `wss://veilid.andymolenda.com` → `ws://localhost:5151` (nginx) |
| Veilid node | Andy's home `veilid-server` v0.5.3 | Participates in DHT, relay, routing — but does NOT serve bootstrap requests over WebSocket |
| DNS | Cloudflare (managed by OpenTofu) | `weft.apps.andymolenda.com` CNAME |
| SSL | Cloudflare Advanced Certificate Manager | `*.apps.andymolenda.com` wildcard cert ($10/mo) |
| CI/CD | GitHub Actions (`deploy.yml` in `nirokato/apps`) | Static deploy, auto-discovered from `projects/` directory |

### 3.3 What is NOT in the stack

- No npm / no node_modules at runtime (CDN imports only)
- No React / Vue / Svelte / Angular
- No bundler (no webpack, vite, rollup, esbuild) for application code
- No server-side runtime (no Node, no Deno, no backend)
- No traditional database server
- No accounts, no auth service, no OAuth

---

## 4. Data model

### 4.1 cr-sqlite schema

All tables are created as normal SQLite tables, then promoted to CRRs (Conflict-free Replicated Relations) using `SELECT crsql_as_crr('table_name')`. This enables automatic CRDT merge when syncing changesets between peers.

```sql
-- ============================================================
-- SCHEMA INITIALIZATION
-- Run once on first boot. cr-sqlite extension must be loaded first.
--
-- IMPORTANT: cr-sqlite requires all NOT NULL columns on CRR tables
-- to have DEFAULT values (for forwards/backwards merge compatibility).
-- ============================================================

-- Identity: this peer's Veilid keypair reference
-- NOT a CRR — local-only, never synced
CREATE TABLE IF NOT EXISTS local_identity (
    id INTEGER PRIMARY KEY CHECK (id = 1),  -- singleton
    public_key TEXT NOT NULL,               -- starts as LOCAL:xxx, upgraded to VLD0:xxx
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Rooms: a shared conversation space
CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY NOT NULL,           -- ULID locally, or derived from DHT record key
    name TEXT NOT NULL DEFAULT '',
    created_by TEXT NOT NULL DEFAULT '',    -- veilid public key of creator
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
SELECT crsql_as_crr('rooms');

-- Members: peers in a room
CREATE TABLE IF NOT EXISTS members (
    room_id TEXT NOT NULL DEFAULT '',
    public_key TEXT NOT NULL DEFAULT '',    -- veilid public key
    display_name TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'member',    -- 'owner' | 'member'
    joined_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    PRIMARY KEY (room_id, public_key)
);
SELECT crsql_as_crr('members');

-- Messages: the core content
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY NOT NULL,           -- ULID (time-sortable, globally unique)
    room_id TEXT NOT NULL DEFAULT '',
    topic TEXT NOT NULL DEFAULT '',         -- free-text topic string (the Zulip magic)
    sender_key TEXT NOT NULL DEFAULT '',    -- veilid public key of sender
    content TEXT NOT NULL DEFAULT '',       -- message body (plain text for MVP)
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    edited_at TEXT,                         -- NULL for MVP, future: last edit timestamp
    deleted INTEGER NOT NULL DEFAULT 0     -- soft delete flag (0=active, 1=deleted)
);
SELECT crsql_as_crr('messages');

-- Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_msg_room_topic ON messages(room_id, topic, created_at);
CREATE INDEX IF NOT EXISTS idx_msg_room_time ON messages(room_id, created_at);
CREATE INDEX IF NOT EXISTS idx_msg_sender ON messages(sender_key, created_at);

-- Read cursors: tracks what each local user has read
-- NOT a CRR — local-only, per-device
CREATE TABLE IF NOT EXISTS read_cursors (
    room_id TEXT NOT NULL,
    topic TEXT NOT NULL,
    last_read_id TEXT,                      -- ULID of last read message
    last_read_at TEXT,
    PRIMARY KEY (room_id, topic)
);
```

### 4.2 Key schema decisions

- **ULIDs as message IDs.** Time-sortable, globally unique, no coordination. Even though cr-sqlite handles merge, ULIDs give us a natural chronological sort for display.
- **`topic` is a free-text string, not a foreign key.** This is the Zulip approach — topics emerge organically from conversation. No need to "create" a topic; just type a new topic string when posting.
- **`edited_at` and `deleted` columns exist from day one** even though MVP doesn't expose edit/delete in the UI. When cr-sqlite merges changesets from a future version that supports edits, the data model is ready.
- **`local_identity` and `read_cursors` are NOT CRRs.** They are device-local state. Syncing read state across devices is a future feature.
- **No `signature` column.** Veilid's transport layer already handles message signing and verification. We don't need to redundantly store signatures in the database. If we later want to verify message provenance from an export file (where Veilid transport wasn't involved), we can add this.
- **`dht_key` column on rooms is deferred.** The PRD originally included `dht_key TEXT NOT NULL` on the rooms table. This will be added when DHT record creation is implemented (Phase 3, item 18). For now rooms use ULID IDs and are local-only.
- **cr-sqlite requires DEFAULT on all NOT NULL columns.** This is a CRDT merge compatibility requirement — when a remote peer sends a changeset that creates a row, columns not present in the changeset need a fallback value.

### 4.3 Useful queries the schema supports

```sql
-- Topic list for a room, sorted by recent activity
SELECT topic,
       COUNT(*) as message_count,
       MAX(created_at) as last_activity,
       COUNT(DISTINCT sender_key) as participants
FROM messages
WHERE room_id = ? AND deleted = 0
GROUP BY topic
ORDER BY last_activity DESC;

-- Unread count per topic
SELECT m.topic, COUNT(*) as unread
FROM messages m
LEFT JOIN read_cursors rc ON rc.room_id = m.room_id AND rc.topic = m.topic
WHERE m.room_id = ? AND m.deleted = 0
  AND (rc.last_read_id IS NULL OR m.id > rc.last_read_id)
GROUP BY m.topic;

-- Messages in a topic, paginated
SELECT m.id, m.content, m.sender_key, m.created_at, mem.display_name
FROM messages m
JOIN members mem ON mem.room_id = m.room_id AND mem.public_key = m.sender_key
WHERE m.room_id = ? AND m.topic = ? AND m.deleted = 0
ORDER BY m.created_at ASC
LIMIT 50 OFFSET ?;

-- Full-text search (basic LIKE for MVP, FTS5 extension later)
SELECT id, topic, content, created_at
FROM messages
WHERE room_id = ? AND content LIKE '%' || ? || '%' AND deleted = 0
ORDER BY created_at DESC
LIMIT 20;
```

---

## 5. Veilid integration

### 5.1 Startup sequence

```
1. Load veilid-wasm in Web Worker
2. Apply polyfills:
   - self.window = self (Worker has no Window)
   - self.Window = self.constructor (so instanceof Window works)
   - self.localStorage = in-memory Map shim (Workers have no localStorage)
3. Call veilidClient.initializeCore(loggingConfig)
4. Get defaultConfig() and customize:
   - network.routingTable.bootstrap = ["wss://veilid.andymolenda.com/ws"]
   - network.protocol.ws.connect = true, listen = false
   - network.protocol.wss = { connect: true, listen: false }  (must be created, not in defaults)
   - programName = "weft", namespace = "weft"
5. Call veilidClient.startupCore(updateCallback, config)
6. Call veilidClient.attach()
7. Wait for VeilidUpdate Attachment: AttachedWeak | AttachedGood | AttachedStrong
8. Create RoutingContext (default safety routing)
9. Get crypto instance for VLD0
10. Post ready to main thread → main thread writes identity to cr-sqlite
11. For each room in cr-sqlite: open DHT record, set up watch, sync
```

**Important findings from implementation:**
- The WASM binary MUST be compiled with `--features enable-protocol-wss` (not in default features)
- The `wss` config section does not exist in `defaultConfig()` — must be created before setting properties
- Variable named `crypto` in Worker scope shadows `globalThis.crypto` due to `let` hoisting — renamed to `vldCrypto`
- `instanceof Window` checks in wasm-bindgen glue require patching to accept `DedicatedWorkerGlobalScope`
- The `__wbg_static_accessor_WINDOW` function must fall back to `self` in Worker context

### 5.2 DHT record design (per room)

Each room has ONE Veilid DHT record using the **SMPL** (Simple) schema:

```
Schema: SMPL
Owner: room creator's keypair

Subkey allocation:
  Subkey 0 (owner-only): Room metadata
    {
      "v": 1,
      "name": "CDA ML Club",
      "created_at": "2026-03-29T...",
      "member_keys": ["VLD0:abc...", "VLD0:def...", ...],
      "encryption_key_hash": "BLAKE3:..."  // hash of shared secret, for verification
    }

  Subkeys 1–N (one per member, writable by that member): Presence
    {
      "v": 1,
      "display_name": "Andy",
      "route_id": "<base64 veilid route blob>",
      "last_seen": "2026-03-29T18:00:00Z",
      "db_version": 42,              // cr-sqlite db version for sync negotiation
      "status": "online"             // "online" | "away" | "offline"
    }
```

**Room creation flow:**
1. Generate a random symmetric key (ChaCha20-Poly1305) — this is the room's shared secret
2. Create DHT record with SMPL schema, owner = creator's keypair
3. Write room metadata to subkey 0
4. Allocate subkey 1 for creator's presence
5. INSERT room into local cr-sqlite
6. Share the room invite: `{dht_key, encryption_key}` — this pair IS the invite

**Room join flow:**
1. Receive invite `{dht_key, encryption_key}`
2. Open DHT record by key
3. Read subkey 0 → verify encryption_key_hash matches
4. Owner adds joiner's public key to member_keys in subkey 0
5. Joiner gets allocated a presence subkey
6. Joiner writes their presence
7. INSERT room + members into local cr-sqlite
8. Begin sync

### 5.3 Message transport

Messages are NOT stored in the DHT. They flow peer-to-peer via two mechanisms:

**Real-time delivery: AppMessage (fire-and-forget)**

When a peer sends a message:
1. Serialize the message as CBOR
2. Encrypt with room's symmetric key
3. For each online member (has a valid route_id in their presence subkey):
   `routing_context.app_message(route_id, encrypted_payload)`

AppMessage is unidirectional and unreliable (no delivery confirmation). This is fine — cr-sqlite sync handles catch-up for anything missed.

**Reliable sync: AppCall (request-response)**

When a peer comes online or detects it's behind:
1. Read all members' presence subkeys → compare `db_version` values
2. For each member with a higher db_version:
   ```
   AppCall request:  { "type": "sync_req", "since_version": 38 }
   AppCall response: { "type": "sync_resp", "changes": [...], "version": 42 }
   ```
3. `changes` is the output of `SELECT * FROM crsql_changes WHERE db_version > 38`
4. Apply changes locally: `INSERT INTO crsql_changes VALUES (...)`
5. Update local db_version

**Message size constraint:** Veilid AppCall/AppMessage max payload is ~32KB. A single chat message will be well under this. For sync batches with many messages, chunk the changeset:
```
AppCall: { "type": "sync_req", "since_version": 38, "limit": 100 }
→ Response includes "has_more": true/false for pagination
```

### 5.4 Encryption

All message payloads sent over Veilid AppMessage/AppCall are encrypted with the room's shared symmetric key using ChaCha20-Poly1305 (via Veilid's crypto API).

Veilid's transport layer provides an additional layer of encryption and IP obfuscation, but the application-layer encryption ensures that even Veilid relay nodes cannot read message content.

The room's shared secret is never sent over the network — it is exchanged out-of-band as part of the room invite.

### 5.5 Bootstrap architecture

**The problem:** HTTPS pages cannot make `ws://` connections (mixed content). The default Veilid WASM bootstrap is `ws://bootstrap-v1.veilid.net:5150/ws`. Veilid nodes do NOT respond to `BOOT`/`B01T` magic bytes over WebSocket — bootstrap handling only works on raw TCP/UDP in the current codebase.

**The solution:** nginx on Andy's veilid node proxies WSS bootstrap requests to the official Veilid bootstrap server:

```
Browser (wss://veilid.andymolenda.com/ws)
  → Cloudflare tunnel (TLS terminated at edge)
    → nginx (127.0.0.1:5151, proxies /ws)
      → bootstrap-v1.veilid.net:5150/ws (official bootstrap, responds to BOOT/B01T)
```

**Bootstrap protocol:**
1. WASM client sends 4 bytes: `B01T` (v1 bootstrap request) or `BOOT` (v0)
2. Official bootstrap server responds with JSON containing:
   - `records`: array of TXT-format bootstrap records (node IDs, dial info)
   - `peers`: array of signed PeerInfo objects
3. WASM client parses response, connects to discovered peers via WS

**What the proxy gives us:**
- WSS termination via Cloudflare (browser mixed content satisfied)
- Access to the real Veilid bootstrap network
- Andy's veilid-server still runs on the same box for DHT storage and relay

**nginx config** (`/etc/nginx/sites-enabled/veilid-ws` on 192.168.0.11):
```nginx
server {
    listen 127.0.0.1:5151;
    location /ws {
        proxy_pass http://bootstrap-v1.veilid.net:5150/ws;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host bootstrap-v1.veilid.net;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

**veilid-server config** (`/etc/veilid-server/veilid-server.conf`):
- WS: connect + listen on :5150, path `ws`
- WSS: connect only, `url: 'wss://veilid.andymolenda.com/ws'` (advertises WSS availability to network)
- UDP/TCP: standard on :5150

**DNS TXT records (not currently set):** For future optimization, a TXT record on `veilid.andymolenda.com` in Veilid's bootstrap format would allow the WASM client to discover Andy's node directly without proxying to the official bootstrap. Format: `0|0|VLD0:<pubkey>|veilid.andymolenda.com|S443/ws`

---

## 6. Sync protocol

### 6.1 cr-sqlite changeset exchange

cr-sqlite exposes a virtual table `crsql_changes` that contains all changes made to CRR tables. Each change has a `db_version` (monotonically increasing per-database counter).

**Sync negotiation:**
1. Each peer publishes its current `db_version` in its DHT presence subkey
2. On connect, peers compare db_versions
3. The peer with lower version requests changes: `SELECT * FROM crsql_changes WHERE db_version > ?`
4. The peer with higher version responds with the changeset
5. Receiving peer applies: `INSERT INTO crsql_changes (table, pk, cid, val, col_version, db_version, site_id, cl, seq) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
6. cr-sqlite handles conflict resolution automatically via column-level LWW (last-writer-wins) with lamport clocks

**Bidirectional sync:** Both peers may have changes the other doesn't. Each peer sends its changes to the other. cr-sqlite's CRDT semantics ensure convergence regardless of application order.

### 6.2 Sync triggers

| Trigger | Action |
|---|---|
| Peer comes online | Full sync with all reachable members |
| DHT watch fires (member presence changed) | Check if their db_version increased → sync |
| New message sent locally | AppMessage broadcast to online peers |
| AppMessage received | Insert into cr-sqlite, UI updates reactively |
| Periodic timer (every 60s while connected) | Re-check presence subkeys, sync if needed |
| Manual "sync now" button | Force sync with all reachable peers |

### 6.3 Conflict resolution

cr-sqlite uses **column-level last-writer-wins (LWW)** with lamport timestamps. In practice for a chat app:
- Two peers create a message with the same ULID: impossible (ULIDs include random component)
- Two peers edit the same message simultaneously: last edit wins (by lamport clock), both peers converge to the same state
- Two peers delete the same message: both set `deleted=1`, idempotent
- Topic rename (future): last rename wins

This is acceptable for a chat app. No custom conflict resolution logic needed.

---

## 7. Export / Import

### 7.1 Export format

```json
{
  "weft_version": 1,
  "format": "weft-export-v1",
  "exported_at": "2026-03-29T18:00:00Z",
  "exported_by": "VLD0:abc123...",

  "room": {
    "id": "room-xyz",
    "name": "CDA ML Club",
    "created_by": "VLD0:abc123...",
    "created_at": "2026-03-01T..."
  },

  "members": [
    {
      "public_key": "VLD0:abc123...",
      "display_name": "Andy",
      "role": "owner",
      "joined_at": "2026-03-01T..."
    }
  ],

  "messages": [
    {
      "id": "01JAXYZ...",
      "topic": "infrastructure",
      "sender_key": "VLD0:abc123...",
      "content": "Has anyone tried Hetzner's SX295?",
      "created_at": "2026-03-15T10:30:00Z",
      "edited_at": null,
      "deleted": 0
    }
  ],

  "encryption_key": null
}
```

**Notes:**
- `encryption_key` is `null` in the export by default. If the user chooses "encrypted export," the room's symmetric key is included (or the messages array is encrypted with a passphrase).
- The export does NOT include the room's shared secret unless explicitly requested. An export without the key is a read-only snapshot. An export with the key is a full room invite.
- Messages are sorted by `created_at` ascending for human readability but import does not depend on order.

### 7.2 Import behavior

1. Parse JSON
2. `INSERT OR IGNORE` room into `rooms` table
3. `INSERT OR IGNORE` each member into `members` table
4. For each message: `INSERT OR IGNORE` into `messages` table (ULID primary key = natural dedup)
5. If `encryption_key` is present and room is not yet known: store key, begin network sync
6. UI refreshes from database

Import is **idempotent** — importing the same file multiple times has no effect. Importing two different exports from peers who diverged produces a clean union of both message sets.

### 7.3 Export-as-invite flow

The simplest way to invite someone to a room:
1. Alice clicks "Export room (with key)"
2. Weft generates a JSON file containing room metadata, member list, message history, AND the encryption key
3. Alice sends the file to Bob via any channel (email, Signal, USB stick, whatever)
4. Bob opens Weft, clicks "Import," selects the file
5. Bob now has full room history and can connect to live peers

The export file IS the invite. No invite links, no QR codes, no signaling servers. Just a file.

---

## 8. UI design

### 8.1 Design system

Inherits from the `nirokato/apps` design system defined in `CLAUDE.md`:

| Token | Value | Usage |
|---|---|---|
| Background | `#0f0f0c` | Page background |
| Surface | `#1a1a16` | Cards, panels, message bubbles |
| Border | `#2a2a24` | Dividers, input borders |
| Text primary | `#e8e4d4` | Body text, messages |
| Text secondary | `#9a9686` | Timestamps, metadata |
| Accent | `#c4a24e` | Links, active topic indicator, send button |
| Error/alert | `#c44e4e` | Connection errors |
| Success | `#4ec44e` | Connected indicator |

Typography:
- Body: `'Inter', sans-serif` (400, 600)
- Monospace/timestamps: `'JetBrains Mono', monospace` (400)
- Message text: 14px / 1.5 line-height
- Topic headers: 16px / 600 weight
- Timestamps: 12px / monospace / text-secondary

### 8.2 Layout

**Single-column topic river** (not Zulip's three-pane layout):

```
┌──────────────────────────────────────────────┐
│  weft  ·  CDA ML Club  ·  ● connected  (⚙)  │  ← header bar
├──────────────────────────────────────────────┤
│  🔍 search topics...                         │  ← search/filter
├──────────────────────────────────────────────┤
│                                              │
│  ┌─ infrastructure ──────────── 3 new ─────┐ │  ← topic card (expanded)
│  │  Andy: Has anyone tried Hetzner SX295?  │ │
│  │  Bob: Yeah, the i9-13900 is solid...    │ │
│  │  Andy: What about the network config?   │ │
│  │                                         │ │
│  │  ┌──────────────────────────┐  [send]   │ │  ← inline compose
│  │  │ Type a message...        │           │ │
│  │  └──────────────────────────┘           │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ┌─ social ─────────────────── 0 new ─────┐ │  ← topic card (collapsed)
│  │  Last: Meagan: See you at the meetup!   │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ┌─ meta ───────────────────── 1 new ─────┐ │  ← topic card (collapsed)
│  │  Last: Bob: Welcome Claire!             │ │
│  └─────────────────────────────────────────┘ │
│                                              │
├──────────────────────────────────────────────┤
│  + New topic: [_______________]  [post]      │  ← new topic compose
├──────────────────────────────────────────────┤
│  [export] [import] [← apps.andymolenda.com]  │  ← footer
└──────────────────────────────────────────────┘
```

### 8.3 UI behaviors

**Topics:**
- Sorted by most recent activity (last message timestamp)
- Click to expand/collapse
- Expanded topic shows all messages + inline compose
- Collapsed topic shows last message preview + unread count badge
- New topic compose at bottom of the page (or floating)
- Typing a new topic string auto-creates the topic on first message send

**Messages:**
- Displayed chronologically within a topic
- Sender display name + timestamp on each message
- Own messages visually distinct (subtle background shift or alignment)
- New/unread messages highlighted until scrolled into view

**Connection status:**
- Header shows: `● connected` (green) / `◐ connecting...` (amber) / `○ offline` (grey)
- Offline mode is fully functional for reading and composing (queued for send on reconnect)

**Room management (⚙ settings):**
- View room ID / DHT key
- View/manage members
- Export room (with or without encryption key)
- Import room / messages
- Copy invite (DHT key + encryption key as copiable text)
- Leave room

### 8.4 Responsive design

- Max width: `700px` centered (comfortable reading width for chat)
- Mobile: full-width, same single-column layout
- No desktop multi-pane layout in MVP. The single-column topic river IS the UI.

### 8.5 First-run experience

1. Page loads → cr-sqlite boots (fast) → empty state with loading indicator for Veilid
2. Veilid connects → identity generated → main UI appears
3. Two options presented: **"Create a room"** or **"Import a room"**
4. Create: enter room name → room created → share invite (export file or copy invite text)
5. Import: select JSON file → room populated → connect to peers if online

---

## 9. Build system and deployment

### 9.1 Repository structure

```
projects/weft/
├── index.html              # Entry point, all CSS, loads src/app.js
├── test.html               # Bootstrap connectivity test suite
├── run-tests.js            # Headless Playwright test runner
├── docs/
│   └── PRD.md              # This document
├── src/
│   ├── app.js              # Main thread orchestrator (state, worker coordination)
│   ├── ui.js               # lit-html rendering (loading → setup → chat → settings)
│   ├── db-worker.js        # cr-sqlite Web Worker (module worker)
│   ├── veilid-worker.js    # Veilid WASM Web Worker (module worker)
│   ├── export.js           # Room JSON export/import
│   ├── ulid.js             # ULID generator (~50 lines, Crockford base32)
│   └── constants.js        # Config: version, DB names, limits
├── wasm/
│   └── veilid/             # Pre-built veilid-wasm v0.5.3 artifacts
│       ├── veilid_wasm_bg.wasm  # ~9.5 MB
│       └── veilid_wasm.js       # wasm-bindgen glue (~310 KB)
└── lib/                    # Vendored cr-sqlite dependencies (bare specifiers rewritten)
    ├── crsqlite/            # @vlcn.io/crsqlite-wasm v0.16.0
    │   ├── index.js         # Entry point (initWasm + SQLite3 class)
    │   ├── DB.js, TX.js, Stmt.js, serialize.js, cache.js, log.js
    │   ├── crsqlite.mjs     # Emscripten glue (~79 KB)
    │   └── crsqlite.wasm    # SQLite + cr-sqlite WASM binary (~1.7 MB)
    ├── wa-sqlite/           # @vlcn.io/wa-sqlite v0.22.0
    │   └── src/
    │       ├── sqlite-api.js, sqlite-constants.js, VFS.js
    │       └── examples/IDBBatchAtomicVFS.js, WebLocks.js, IDBContext.js
    ├── xplat-api/           # @vlcn.io/xplat-api v0.15.0
    │   └── xplat-api.js
    └── async-mutex/         # async-mutex v0.4.1
        └── index.mjs
```

### 9.2 Dependency sourcing

| Dependency | Source strategy | Status |
|---|---|---|
| lit-html | CDN import (`jsdelivr`) | Done |
| cr-sqlite WASM | Vendored in `lib/crsqlite/` + `lib/wa-sqlite/` + `lib/xplat-api/` + `lib/async-mutex/` | Done (v0.16.0) |
| veilid-wasm | Vendored in `wasm/veilid/`, built from source with `--features enable-protocol-wss` | Done (v0.5.3+wss) |
| ULID | Inline implementation in `src/ulid.js` | Done |
| CBOR or JSON | TBD — JSON for initial implementation, CBOR if size matters | Not started |

### 9.3 Build and deploy

**No application build step for JS.** All JS is native ES modules with CDN imports. No bundler.

**WASM artifacts are pre-built and vendored.** The `wasm/` and `lib/` directories contain binary artifacts checked into the repo (or downloaded by a CI prep step).

**Deploy workflow** (extends existing `deploy.yml` in `nirokato/apps`):
- Auto-discovered by the existing matrix scan of `projects/`
- Deployed to Cloudflare Pages as static files
- Subdomain `weft.apps.andymolenda.com` managed by OpenTofu (add to `tofu/variables.tf` projects set)

**WASM build process (currently manual via nspawn container on ares):**
1. `sudo nspawn-manager start veilid-build`
2. `cd veilid && git fetch && git checkout <tag>`
3. `cd veilid-wasm && wasm-pack build --release --target web -- --features enable-protocol-wss`
4. Copy `pkg/veilid_wasm.js` and `pkg/veilid_wasm_bg.wasm` to `projects/weft/wasm/veilid/`
5. Apply Worker compatibility patches to `veilid_wasm.js`:
   - `__wbg_instanceof_Window`: add `|| arg0 instanceof DedicatedWorkerGlobalScope`
   - `__wbg_static_accessor_WINDOW`: fall back to `self` when `window` is undefined
6. Commit and PR

**Future: CI-compiled WASM.** Could add a GitHub Actions job, but the `enable-protocol-wss` flag + Worker patches make it non-trivial. The nspawn container on ares is the current build environment.

### 9.4 CLAUDE.md updates — DONE

All `CLAUDE.md` updates have been applied:
- ✅ Projects table entry added
- ✅ Tech stack exception for vendored WASM noted
- ✅ Homepage `index.html` links to weft
- ✅ `weft` added to `tofu/variables.tf` projects set

---

## 10. MVP scope

### 10.1 MVP includes

- [x] Veilid WASM boots in browser (with WSS support, Worker polyfills)
- [x] Veilid bootstraps via WSS proxy → FullyAttached / OverAttached
- [x] cr-sqlite boots in browser, creates schema, persists to IndexedDB
- [x] Create a room (generates DHT record + symmetric key) — live-tested, real DHT key on network
- [ ] Join a room (from invite: DHT key + encryption key) — blocked by KeyPair parsing bug
- [x] Post messages with a topic string
- [x] View messages grouped by topic (topic-river layout)
- [x] Topics sorted by most recent activity
- [x] Expand/collapse topics
- [x] Unread count badges per topic
- [ ] Real-time message delivery via AppMessage
- [ ] Sync on connect via AppCall + cr-sqlite changesets
- [x] Export room to JSON file
- [x] Import room from JSON file
- [ ] Offline reading and composing (queued send)
- [x] Connection status indicator
- [x] First-run experience (create or import)
- [x] Responsive single-column layout
- [x] Design system compliance (colors, typography, back link)

### 10.2 MVP explicitly excludes

- Message editing or deletion (schema supports it, UI does not)
- Reactions / emoji
- File/image attachments
- Rich text / markdown rendering
- User avatars
- Typing indicators
- Read receipts (read cursors are local-only)
- Multi-room view (one room at a time in MVP)
- Room discovery / directory
- Push notifications
- FTS5 full-text search (basic LIKE search only)
- Key rotation
- Member removal / banning
- Pinned messages
- Thread replies within topics (flat messages per topic only)

### 10.3 Stretch goals (post-MVP, in rough priority order)

1. Message editing + deletion (cr-sqlite merge handles it, just add UI)
2. Multi-room support (room list sidebar or switcher)
3. Markdown rendering in messages
4. FTS5 full-text search
5. File attachments via Veilid block store (when available)
6. Typing indicators via DHT presence subkey updates
7. Mobile PWA (service worker for offline, add to homescreen)
8. Key rotation protocol
9. Room administration (member removal, role changes)
10. Git-backed periodic export (GitHub Action cron)

---

## 11. Risks and fallbacks

### 11.1 Technical risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Veilid WASM binary too large (>15MB) | Medium | Slow first load | Lazy-load Veilid after UI renders; show loading progress; consider wasm-opt / strip |
| Veilid WASM unstable / crashes in browser | Medium | App unusable for live sync | App still works offline via cr-sqlite; export/import provides sync fallback |
| cr-sqlite WASM + Veilid WASM memory pressure | Low | Browser tab crash on low-memory devices | Monitor memory; consider shared memory buffer; test on mobile Safari |
| Veilid network too small for reliable DHT | Low (Andy runs own node) | DHT records not findable | Home node stores own records; direct AppCall to known peers as fallback |
| Cloudflare Tunnel latency for WSS bootstrap | Low | Slow initial connection | Acceptable for bootstrap; once connected, traffic routes through Veilid mesh directly |
| Safari IndexedDB eviction | Medium (mobile) | Loss of chat history | Export reminder; periodic auto-export to download; clear warning on Safari |
| cr-sqlite WASM API changes | Low | Breaking changes on update | Pin specific version; vendored binary |

### 11.2 Architectural fallbacks

**If Veilid WASM doesn't work reliably:**
Fall back to Trystero (WebRTC via BitTorrent/Nostr signaling). The architecture is designed so the Veilid Worker can be swapped without touching the DB Worker or UI. The sync protocol (cr-sqlite changesets) is transport-agnostic.

**If cr-sqlite doesn't work reliably:**
Fall back to PGlite with manual ULID-based dedup sync (the original design from earlier in this conversation). Loses CRDT merge for edits/deletes but append-only chat still works.

**If both WASM modules are too heavy:**
Ship Veilid as a separate "connect to sync" step that loads on demand. The app works purely offline with cr-sqlite + export/import. Veilid becomes an optional enhancement, not a requirement.

**If the Veilid network is unreachable:**
The app is fully functional offline. Export/import provides sync between peers who are never online simultaneously. This is the core design insight — Veilid is an optimization, the export file is the primitive.

---

## 12. Development sequence

Recommended order of implementation for Claude Code Web:

### Phase 1: Foundation — COMPLETE ✅
1. ~~Scaffold `projects/weft/` in the apps repo~~
2. ~~Create `index.html` with design system styles and loading states~~
3. ~~Set up cr-sqlite Web Worker with schema initialization~~
4. ~~Implement basic ULID generator~~
5. ~~Build UI for creating a room (local only, no network)~~
6. ~~Build topic-river UI rendering with lit-html~~
7. ~~Implement message posting (local cr-sqlite insert + UI update)~~
8. ~~Implement topic expansion/collapse~~
9. ~~Test: single-user local-only chat works end-to-end~~

### Phase 2: Persistence & portability — COMPLETE ✅
10. ~~Add IndexedDB persistence for cr-sqlite~~
11. ~~Implement export (cr-sqlite → JSON)~~
12. ~~Implement import (JSON → cr-sqlite with dedup)~~
13. ~~Test: close tab, reopen, data persists~~
14. ~~Test: export from one browser, import in another, data matches~~

### Phase 3: Veilid integration — IN PROGRESS
15. ~~Vendor veilid-wasm artifacts (rebuilt with `enable-protocol-wss`)~~
16. ~~Set up Veilid Web Worker with startup config + Worker polyfills~~
17. ~~Implement identity generation/persistence~~
17b. ~~Bootstrap connectivity: WSS proxy via Cloudflare Tunnel → nginx → official bootstrap~~
17c. ~~Network attachment: AttachedWeak → AttachedStrong → FullyAttached → OverAttached confirmed~~
18. ~~Implement DHT record creation for rooms (live-tested: real DHT key created on network)~~
    - Fixed DHTSchema format: externally-tagged Rust enum (`{SMPL: {...}}` not `{kind: 'SMPL', ...}`)
    - Fixed camelCase field names: `oCnt`, `mKey`, `mCnt` (WASM built with `json-camel-case`)
    - Fixed member key type: pass `BareMemberId` WASM object, not stringified key
19. Implement DHT record opening for room joins ← **NEXT** (KeyPair parsing bug: "input has incorrect parts")
20. Implement AppMessage send/receive for real-time messages
21. Implement presence updates in DHT subkeys
22. Test: two browser tabs can exchange messages in real-time

### Phase 4: Sync — NOT STARTED
23. ~~Implement cr-sqlite changeset extraction (`crsql_changes`)~~ (primitives exist in db-worker: `getChanges`/`applyChanges`)
24. Implement AppCall-based sync request/response protocol
25. Implement sync-on-connect (read peer db_versions from DHT, sync if behind)
26. Implement periodic sync check
27. Test: offline peer comes online, catches up automatically

### Phase 5: Polish — PARTIALLY COMPLETE
28. ~~Connection status indicator~~
29. ~~Unread count badges~~
30. ~~First-run experience (create or import)~~
31. Room settings panel (members, invite copy, export/import) — basic version exists
32. ~~Search (basic LIKE)~~
33. Responsive layout testing
34. Error handling and edge cases
35. ~~Update CLAUDE.md, homepage, tofu/variables.tf~~
36. ~~Deploy to weft.apps.andymolenda.com~~

### Phase verification

At the end of each phase, the app should be deployable and functional at the level that phase supports. Phase 1 is a local-only note-taking tool with topics. Phase 2 adds data portability. Phase 3 makes it networked. Phase 4 makes it reliable. Phase 5 makes it polished.

If a phase hits a dead end (e.g., Veilid WASM won't load), the previous phase's functionality is still intact and shippable.

---

## 13. Testing strategy

### 13.1 Automated tests — `node tests/run.js`

Weft uses Playwright (headless Chromium) to test Web Worker logic in a real browser context. This is necessary because cr-sqlite, IndexedDB, and Web Workers only exist in browsers.

**Test architecture:**
- `tests/run.js` — Playwright runner: starts a static file server, loads test HTML pages, collects console output, reports pass/fail with exit code
- `tests/*.test.html` — Test pages that exercise workers via postMessage, log results to console
- Tests run against the real cr-sqlite WASM and real IndexedDB — no mocks

**What's tested automatically (no network needed):**
- DB worker: schema init, room CRUD (with DHT fields), message posting, topic queries, unread counts, export/import, search, changeset extraction/application, CRR merge
- App logic: identity creation, room creation flow, data round-trips

**What requires live network (manual via `test.html`):**
- Veilid WASM bootstrap, network attachment, keypair generation
- DHT record creation, reading, watching
- AppMessage/AppCall between peers
- Private route creation

**TDD workflow:**
1. Write a failing test in `tests/*.test.html`
2. Implement the feature
3. Run `node tests/run.js` — all tests must pass
4. Commit

### 13.2 Manual testing

These scenarios require a real browser with network access:

- **Single-user flow:** Create room, post messages across topics, expand/collapse, search, export, close tab, reopen, verify persistence, import in fresh browser
- **Two-peer flow:** Two browser tabs (or two devices), create room in tab A, import/join in tab B, send messages in both, verify both see all messages
- **Offline resilience:** Disconnect network (DevTools), compose messages, reconnect, verify sync
- **Import idempotency:** Import same file twice, verify no duplicates
- **Cross-export merge:** Export from peer A and peer B separately, import both into peer C, verify clean union

### 13.3 What to watch for

- cr-sqlite `crsql_changes` row size vs. Veilid 32KB AppCall limit
- Memory usage with both WASM modules loaded
- IndexedDB storage quota warnings
- Veilid attachment state transitions (may need retry logic)
- WebSocket reconnection after sleep/wake

---

*This PRD is a living document. Update it as implementation reveals new constraints or opportunities.*
