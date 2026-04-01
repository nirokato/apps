# Phase 4: Sync (Steps 23-27)

**Status:** PRIMITIVES ONLY — Protocol and triggers not implemented

## Step 23: cr-sqlite changeset extraction

**PRD says:** Implement cr-sqlite changeset extraction (`crsql_changes`).

**What exists:**
- `src/db-worker.js:281-313` — Three sync primitives:
  - `getDbVersion()`: Returns `crsql_db_version()` — the monotonically increasing version counter
  - `getChanges({ sinceVersion, limit })`: Queries `crsql_changes` for all changes since a given version, with pagination support
  - `applyChanges({ changes })`: Wraps multiple `INSERT INTO crsql_changes` in a transaction
- `src/app.js:76-79` — Main thread wrappers: `db.getDbVersion()`, `db.getChanges()`, `db.applyChanges()`

**Tests:** 5 tests in `db-worker.test.html` (tests 38-42):
- `getDbVersion` returns positive integer
- `getChanges` returns changesets with 9 columns
- `getChanges` since high version returns empty
- `getChanges` limit is respected
- `db_version` increases after mutation

Additionally, CRDT merge tests (tests 4-9 in `crdt-merge.test.html`) exercise `getChanges`/`applyChanges` for full bidirectional sync between independent peers.

**Verified:** Yes — all tests pass.
**Bugs:** None in primitives themselves.

---

## Step 24: AppCall-based sync request/response protocol

**PRD says:** Implement AppCall-based sync protocol: `sync_req` with `since_version`, response with changesets.

**What exists:**
- Stubs only:
  - `src/app.js:474-477` — `handleSyncRequest()`: logs and returns, no implementation
  - `src/app.js:480-482` — `handleSyncResponse()`: logs and returns, no implementation
  - `src/app.js:463-466` — `handleAppCall()`: logs and returns, no implementation
- P2P envelope types `sync_req` and `sync_resp` are recognized in `handleAppMessage()` switch: `app.js:356-359`
- AppCall send/receive wired in Veilid worker: `veilid-worker.js:376-390`

**What's missing:**
- No actual changeset exchange over AppCall
- No chunking for large changesets (32KB AppCall limit noted in PRD)
- No version comparison logic
- No `has_more` pagination for multi-batch sync

**Tests:** None
**Verified:** No — stubs only

---

## Step 25: Sync-on-connect

**PRD says:** Read peer `db_versions` from DHT presence subkeys, sync with peers who have higher versions.

**What exists:**
- Presence writing includes `db_version` field: `src/app.js:330` — `db_version: await db.getDbVersion()`
- Presence reading exists: `veilid-worker.js:345-354` — `readPresence()`
- DHT value change handler exists but is a stub: `app.js:468-470`

**What's missing:**
- No logic to read all peers' presence on connect
- No version comparison
- No sync trigger on attachment state change
- No automatic sync initiation

**Tests:** None
**Verified:** No — not implemented

---

## Step 26: Periodic sync check

**PRD says:** Re-check presence subkeys every 60s, sync if needed.

**What exists:** Nothing. No `setInterval` or periodic timer for sync.

**What's missing:**
- Periodic timer (PRD suggests 60s)
- Presence re-read and version comparison
- "Sync now" manual button (mentioned in PRD section 6.2)

**Tests:** None
**Verified:** No — not implemented

---

## Step 27: Offline peer catch-up test

**PRD says:** Test: offline peer comes online, catches up automatically.

**What exists:** Nothing — depends on Steps 24-26 which are not implemented.

**What's missing:**
- Full sync flow implementation (Steps 24-26)
- Automated test for offline→online catch-up

**Tests:** None
**Verified:** No — not implemented
