# Phase 3: Veilid Integration (Steps 15-19)

**Status:** IN PROGRESS (Steps 15-18 complete, Step 19 has known bug)

## Step 15: Vendor veilid-wasm artifacts

**PRD says:** Vendor pre-built veilid-wasm artifacts (rebuilt with `enable-protocol-wss`).

**Implementation:**
- WASM binary: `wasm/veilid/veilid_wasm_bg.wasm` (~9.5 MB)
- JS glue: `wasm/veilid/veilid_wasm.js` (~310 KB, Worker-patched)
- Version: v0.5.3 with `--features enable-protocol-wss`

**Tests:** N/A (artifact presence)
**Verified:** Files exist in repo.
**Bugs:** None

---

## Step 16: Veilid Web Worker with startup config + Worker polyfills

**PRD says:** Set up Veilid Worker with polyfills for `window`, `Window`, `localStorage`; configure bootstrap to WSS; start core and attach.

**Implementation:** `src/veilid-worker.js:1-481`
- Polyfills: `veilid-worker.js:4-36`
  - `self.window = self` (Worker has no `window`)
  - `self.Window = self.constructor` (for `instanceof` checks)
  - `self.localStorage` in-memory Map shim
- Initialization: `veilid-worker.js:87-143` — `initVeilid()`
  - Loads WASM via `init()`
  - Initializes core with logging config
  - Overrides bootstrap to `wss://veilid.andymolenda.com/ws`: `veilid-worker.js:113`
  - Creates WSS config section if not present: `veilid-worker.js:119-123`
  - WS/WSS: connect only, no listen (WASM can't accept)
  - Sets `programName: 'weft'`, `namespace: 'weft'`
  - Creates routing context and crypto instance
- Update callback: `veilid-worker.js:57-60` — posts events to main thread
- Action dispatch: `veilid-worker.js:436-467` — message handler dispatches to action functions

**Tests:** `tests/dht-live.test.html` test 1 verifies init succeeds.
**Verified:** Yes (via live test output in previous runs).
**Bugs:** None

---

## Step 17: Identity generation/persistence

**PRD says:** Generate Veilid keypair, persist identity.

**Implementation:**
- Keypair generation: `src/veilid-worker.js:148-154` — `generateKeyPair()`
  - Uses `vldCrypto.generateKeyPair()` to get Veilid-native keypair
  - Returns `{ publicKey, secretKey }` as strings
- Identity storage: `src/app.js:817-823` (boot) + `app.js:849-855` (Veilid upgrade)
  - Initial boot creates `LOCAL:xxx` placeholder identity
  - When Veilid connects, upgrades to real `VLD0:xxx` keypair
  - Stored in `local_identity` table via `db.createIdentity()`
- Set identity: `veilid-worker.js:156-159` — stores in worker-local `identity` variable

**Tests:** `tests/dht-live.test.html` test 2 verifies keypair generation.
**Verified:** Yes
**Bugs:** None

---

## Step 17b: Bootstrap connectivity (WSS proxy)

**PRD says:** Bootstrap via WSS proxy: Cloudflare Tunnel -> nginx -> official bootstrap.

**Implementation:**
- Bootstrap URL: `veilid-worker.js:113` — `wss://veilid.andymolenda.com/ws`
- Infrastructure documented in PRD section 5.5

**Tests:** `tests/dht-live.test.html` implicitly tests this (test 3 waits for attachment).
**Verified:** Yes (documented as working in README).
**Bugs:** None

---

## Step 17c: Network attachment

**PRD says:** Network attachment: AttachedWeak -> AttachedStrong -> FullyAttached confirmed.

**Implementation:**
- Attachment state handling: `src/app.js:262-275` — `handleVeilidUpdate()`
  - `AttachedGood/Strong/Fully/Over` -> `connected`
  - `AttachedWeak/Attaching` -> `connecting`
  - `Detached/Detaching` -> `offline`
- Auto-setup: Creates private route on first good attachment: `app.js:269`

**Tests:** `tests/dht-live.test.html` test 3 waits for AttachedWeak or better (90s timeout).
**Verified:** Yes
**Bugs:** None

---

## Step 18: DHT record creation for rooms

**PRD says:** Create DHT record with SMPL schema for room. Owner gets subkey 0 (metadata), member gets subkey 1 (presence).

**Implementation:** `src/veilid-worker.js:241-296` — `createRoomDHT({ roomName })`
- Generates owner keypair for DHT record: `veilid-worker.js:245`
- Generates room encryption key (ChaCha20-Poly1305): `veilid-worker.js:249`
- Creates SMPL schema with externally-tagged Rust enum format: `veilid-worker.js:257-264`
  - Uses `veilidClient.generateMemberId()` for member key: `veilid-worker.js:256`
  - `{ SMPL: { oCnt: 1, members: [{ mKey: memberId.value, mCnt: 1 }] } }`
- Writes room metadata to subkey 0: `veilid-worker.js:268-277`
- Writes creator's initial presence to subkey 1: `veilid-worker.js:279-289`
- Returns `{ dhtKey, ownerKey, ownerSecret, encryptionKey }`

- Room creation handler integrates DHT: `src/app.js:492-503`
  - If Veilid connected, creates DHT record
  - Falls back to local-only if DHT fails

**Tests:** `tests/dht-live.test.html` test 4 creates a live DHT record and verifies all fields.
**Verified:** Yes (live test confirms real DHT key on network).
**Bugs:** None

---

## Step 19: DHT record opening for room joins

**PRD says:** Open DHT record by key, read metadata, join room.

**Implementation:** `src/veilid-worker.js:299-326` — `openRoomDHT({ dhtKey, ownerKey, ownerSecret })`
- Parses record key and optional KeyPair
- KeyPair construction: `veilid-worker.js:303-306`
  - `KeyPair.newFromParts(pk, sk.value)` — uses separate key + secret
- Opens DHT record via routing context
- Reads metadata from subkey 0 with force refresh
- Returns `{ key, owner, schema, metadata }`

- Join handler: `src/app.js:516-592` — `handlers.joinRoom(dhtKey, encryptionKey)`
  - Opens DHT record, reads metadata
  - Creates room locally with metadata
  - Reads creator's presence from subkey 1
  - Sends join message via AppMessage
  - Watches DHT record for changes

**Tests:** `tests/dht-live.test.html` test 5 re-opens a created DHT record and verifies metadata.
**Verified:** Yes (live test passes).

**Bugs:**
- **HIGH (PRD inconsistency)**: PRD step 19 says "Implement DHT record opening for room joins" and marks it with "**NEXT** (KeyPair parsing bug: 'input has incorrect parts')". However, `veilid-worker.js:305` now uses `KeyPair.newFromParts(pk, sk.value)` instead of `KeyPair.parse()`, and `dht-live.test.html` test 5 (`openRoomDHT`) passes. The bug appears to be **fixed** but the PRD was not updated. The PRD should be updated to mark step 19 as complete.
- **HIGH**: The join flow (`app.js:529`) calls `openRoomDHT(dhtKey.trim())` without passing `ownerKey`/`ownerSecret`. This means joiners open the record without write access. The function still reads metadata successfully, but write operations (presence updates) will fail for joiners. This is architecturally correct for the SMPL schema (joiners don't have owner keys), but the joiner has no allocated subkey to write presence to. The current code at `app.js:324` hardcodes subkey 1 for presence writes regardless of the writer's identity, which would fail for non-owners.
