# Bugs Found

## BUG-1: Export omits room owner credentials and encryption key

**Severity:** HIGH
**Location:** `src/db-worker.js:218-222` (export) and `src/db-worker.js:239` (encryption_key)
**PRD Step:** 11 (Export)

**Description:** The `exportRoom` action builds the export object with only `id`, `name`, `created_by`, `created_at`, `dht_key` from the room record. It omits `owner_key`, `owner_secret`, and sets `encryption_key: null` at the top level rather than reading it from `room.encryption_key`. This means:
- A full room backup loses the owner's DHT write credentials
- The room encryption key is never included in exports
- Re-importing an export into a fresh browser loses the ability to write to DHT

**Suggested fix:**
```js
// In exportRoom, add to the room object:
room: {
  id: room.id,
  name: room.name,
  created_by: room.created_by,
  created_at: room.created_at,
  dht_key: room.dht_key || null,
  owner_key: room.owner_key || null,
  owner_secret: room.owner_secret || null,
},
// And set encryption_key from the room:
encryption_key: room.encryption_key || null
```

Note: The PRD section 7.1 intentionally says `encryption_key` is `null` by default (opt-in "export with key"). But there's no UI toggle for "export with key" — the key is simply always lost.

---

## BUG-2: Import omits room owner credentials

**Severity:** HIGH
**Location:** `src/db-worker.js:246-249`
**PRD Step:** 12 (Import)

**Description:** The `importRoom` SQL is:
```sql
INSERT OR IGNORE INTO rooms (id, name, created_by, created_at, dht_key, encryption_key) VALUES (?, ?, ?, ?, ?, ?)
```
This omits `owner_key` and `owner_secret` columns. Even if the export included them (BUG-1), the import would not restore them. Imported rooms will always have empty `owner_key` and `owner_secret`, preventing DHT write access.

**Suggested fix:**
```sql
INSERT OR IGNORE INTO rooms (id, name, created_by, created_at, dht_key, owner_key, owner_secret, encryption_key)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
```
With corresponding values from `room.owner_key || ''`, `room.owner_secret || ''`.

---

## BUG-3: PRD not updated — Step 19 marked as blocked but is fixed

**Severity:** MEDIUM
**Location:** `docs/PRD.md:813` (Phase 3, step 19 comment)
**PRD Step:** 19

**Description:** PRD says step 19 is "**NEXT** (KeyPair parsing bug: 'input has incorrect parts')". However, `veilid-worker.js:305` now uses `KeyPair.newFromParts(pk, sk.value)` instead of the broken `KeyPair.parse()`, and `dht-live.test.html` test 5 passes. The PRD should be updated to mark step 19 as complete.

Also, the "What's next" section in `README.md:33` lists "DHT record creation for rooms (Phase 3, step 18)" as next, but step 18 is complete. This is stale.

---

## BUG-4: Presence writes hardcode subkey 1 for all users

**Severity:** MEDIUM
**Location:** `src/app.js:324`
**PRD Step:** 19 (Join flow / presence)

**Description:** `publishPresence()` always writes to subkey 1:
```js
await veilid.writePresence(state.currentRoom.dht_key, 1, { ... });
```
In the SMPL schema, subkey 1 belongs to the room creator. Other members should have their own allocated subkeys (2, 3, ...). If a non-owner peer tries to write to subkey 1, the DHT write will fail because they don't have the correct writer key.

**Suggested fix:** Track the member's allocated subkey index in the room record or derive it from the member_keys array position. On join, the owner should allocate a new subkey for the joiner.

---

## BUG-5: Missing "Leave room" functionality

**Severity:** MEDIUM
**Location:** `src/ui.js` (settings panel), `src/app.js` (handlers)
**PRD Step:** 31 (Room settings)

**Description:** The PRD specifies "Leave room" as a room management action in settings. No UI button or handler exists. Users cannot remove a room from their local database through the UI. The only way to "leave" is to clear browser storage.

**Suggested fix:** Add a `handlers.leaveRoom()` that:
1. Confirms with the user
2. Deletes room, members, messages, and read_cursors for that room
3. Returns to setup screen

---

## BUG-6: No offline message queue

**Severity:** MEDIUM
**Location:** `src/app.js:232-248` — `broadcastToPeers()`
**PRD Step:** 34 (Error handling) / MVP checklist item "Offline reading and composing (queued send)"

**Description:** `broadcastToPeers()` silently skips sending if `veilidState !== 'connected'` or if there are no known peer routes. Messages are saved to the local database but never queued for delivery when the connection is restored.

The PRD MVP checklist explicitly includes "Offline reading and composing (queued send)" as unchecked, confirming this is a known gap.

**Suggested fix:** Implement a send queue that stores pending broadcasts and replays them on reconnection (or rely on sync protocol from Phase 4).

---

## BUG-7: P2P chat_message handler uses raw db.call instead of db.postMessage

**Severity:** LOW
**Location:** `src/app.js:379-381`
**PRD Step:** 20 (AppMessage send/receive)

**Description:** When receiving a `chat_message` from a peer, `handleChatMessage()` calls:
```js
await db.call('postMessage', { id, roomId, topic, senderKey, content });
```
This bypasses the `db.postMessage()` wrapper in the DB class (`app.js:56-59`), which generates a new ULID. The raw call correctly uses the incoming message's ULID, but it also bypasses any future validation or transformation the wrapper might add. This is intentional but fragile.

---

## BUG-8: Search debounce accesses wrong event target

**Severity:** LOW
**Location:** `src/ui.js:164`
**PRD Step:** 32 (Search)

**Description:** The search input uses a debounced handler:
```js
@input=${debounce((e) => h.search(e.target.value), 200)}
```
The `debounce` function delays execution by 200ms using `setTimeout`. By the time the callback fires, the event `e` has been recycled by the browser (lit-html uses event delegation). In practice, `e.target.value` may be undefined or point to a different element.

However, testing shows this works correctly in Chromium because the input element and its value are preserved by closure. This is a theoretical concern more than a practical bug, but it's fragile and could break in different rendering frameworks.

**Suggested fix:** Capture `e.target.value` before debouncing:
```js
@input=${(e) => { const v = e.target.value; debounce(() => h.search(v), 200)(); }}
```

---

## BUG-9: XSS vulnerability in debug panel

**Severity:** LOW
**Location:** `index.html:663-664`
**PRD Step:** N/A (debug feature)

**Description:** The debug panel renders log entries via `innerHTML`:
```js
panel.innerHTML = this.entries.map(e =>
  `<div class="log-entry"><span class="log-time">${e.ts}</span> <span class="log-${e.level}">${e.msg}</span></div>`
).join('');
```
The `e.msg` value is constructed from `JSON.stringify` or `String()` coercion (`index.html:652`), but if a crafted message contains HTML tags, they will be rendered as HTML in the debug panel. Since log entries come from Veilid network events and peer messages, a malicious peer could potentially inject HTML/JS into the debug panel.

**Suggested fix:** Escape HTML in `e.msg` before rendering:
```js
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
// then use esc(e.msg) in the template
```
