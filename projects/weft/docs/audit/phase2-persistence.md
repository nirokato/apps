# Phase 2: Persistence & Portability (Steps 10-14)

**Status:** COMPLETE

## Step 10: IndexedDB persistence for cr-sqlite

**PRD says:** Add IndexedDB persistence for cr-sqlite so data survives tab close.

**Implementation:**
- cr-sqlite uses `@vlcn.io/wa-sqlite`'s `IDBBatchAtomicVFS` for automatic IndexedDB persistence
- VFS implementation: `lib/wa-sqlite/src/examples/IDBBatchAtomicVFS.js`
- The crsqlite WASM loader (`lib/crsqlite/index.js`) configures this VFS automatically
- DB name defaults to `'weft'` (or test-specific names in tests): `db-worker.js:70`
- No explicit IndexedDB code in `db-worker.js` — persistence is handled transparently by the VFS layer

**Tests:** No explicit persistence test. Tests use unique random DB names (`'weft-test-' + random`) which implicitly create IndexedDB stores, but no test verifies data survives a worker restart.

**Verified:** Code review confirms IDBBatchAtomicVFS is wired correctly. The VFS is a well-tested component of the cr-sqlite ecosystem.

**Bugs:** None found in persistence mechanism, but see test-gaps.md for missing persistence verification test.

---

## Step 11: Export (cr-sqlite -> JSON)

**PRD says:** Implement export of room data to a JSON file.

**Implementation:**
- DB export: `src/db-worker.js:201-241` — `actions.exportRoom({ roomId })`
  - Queries room, members, messages from DB
  - Returns structured object with `weft_version: 1`, `format: 'weft-export-v1'`
  - Includes `exported_at` timestamp and `exported_by` public key
  - Messages sorted by `created_at ASC`
- File download: `src/export.js:3-14` — `exportToFile(data)`
  - Creates Blob, generates download link
  - Filename: `weft-{room-name}-{timestamp}.json`
  - Cleans up object URL after click
- Handler: `src/app.js:716-719` — `handlers.exportRoom()`

**Tests:**
- Test 33: Export returns valid format with correct fields
- Test 34: Export includes `dht_key` for DHT rooms
- Test 37: Export returns null for nonexistent room

**Verified:** Yes — all 3 export tests pass.

**Bugs:**
- **MEDIUM**: Export includes `room.dht_key` but omits `room.owner_key`, `room.owner_secret`, `room.encryption_key` from the export. The `encryption_key` field is set to `null` at the export level (`db-worker.js:239`), not pulled from the room record. This means a full room backup loses the owner credentials and encryption key. See `db-worker.js:218-222` — only `id`, `name`, `created_by`, `created_at`, `dht_key` are exported from the room.

---

## Step 12: Import (JSON -> cr-sqlite)

**PRD says:** Implement import from JSON with dedup (INSERT OR IGNORE).

**Implementation:**
- DB import: `src/db-worker.js:243-266` — `actions.importRoom({ data })`
  - Inserts room with `INSERT OR IGNORE` (idempotent)
  - Inserts members with `INSERT OR IGNORE`
  - Inserts messages with `INSERT OR IGNORE` (ULID PK = natural dedup)
- File reading: `src/export.js:16-36` — `importFromFile(file)`
  - Validates `format` starts with `weft-export-`
  - Validates `room.id` exists
  - Returns parsed JSON
- Handler: `src/app.js:721-730` — `handlers.importRoom(file)`

**Tests:**
- Test 35: Round-trip export/import preserves data
- Test 36: Re-import is idempotent (no duplicates)
- Test 10 (CRDT): Cross-peer export/import merges correctly

**Verified:** Yes — all import tests pass.

**Bugs:**
- **MEDIUM**: Import SQL for rooms is missing `owner_key` and `owner_secret` columns: `db-worker.js:247-249` — `INSERT OR IGNORE INTO rooms (id, name, created_by, created_at, dht_key, encryption_key)` omits `owner_key` and `owner_secret`. Since these columns have `DEFAULT ''`, the insert succeeds but loses owner credentials on import. This pairs with the export bug (Step 11) — neither export nor import handles full room credentials.

---

## Step 13: Persistence across tab close

**PRD says:** Test: close tab, reopen, data persists.

**Implementation:** Relies on cr-sqlite's IDBBatchAtomicVFS (Step 10).

**Tests:** No automated test. The test suite uses unique DB names per run and does not restart workers to verify persistence.

**Verified:** Not directly tested. Code review confirms the mechanism is correct (IDBBatchAtomicVFS writes to IndexedDB on every transaction), but no automated verification exists.

**Bugs:** None (missing test coverage noted in test-gaps.md).

---

## Step 14: Cross-browser export/import

**PRD says:** Test: export from one browser, import in another, data matches.

**Implementation:** Export/import is pure JSON serialization — browser-independent by design.

**Tests:** Test 10 in `crdt-merge.test.html` ("cross-peer: two peers export independently, third imports both") validates this scenario: two independent databases export, a third imports both, and the union is correct.

**Verified:** Yes — cross-peer test passes.
**Bugs:** None
