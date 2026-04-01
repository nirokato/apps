# Phase 5: Polish (Steps 28-36)

**Status:** PARTIALLY COMPLETE

## Step 28: Connection status indicator

**PRD says:** Header shows connected/connecting/offline/error status.

**Implementation:** `src/ui.js:35-48` — `renderConnectionStatus(state)`
- `connected`: green dot (`&#9679;`), class `status-connected`
- `connecting` / `loading`: amber half-circle (`&#9680;`), class `status-connecting`
- `error`: grey circle with title tooltip, class `status-error`
- `offline`: grey circle, class `status-offline`
- CSS: `index.html:248-258`
- State driven by `state.veilidState`: `app.js:189`
- Attachment state mapping: `app.js:262-275`

**Tests:** N/A (UI rendering)
**Verified:** Yes — code review confirms all PRD states are represented.
**Bugs:** None

---

## Step 29: Unread count badges

**PRD says:** Per-topic unread count badges.

**Implementation:**
- DB query: `src/db-worker.js:143-151` — `getUnreadCounts()` compares message IDs to `read_cursors`
- Badge rendering: `src/ui.js:203` — `<span class="badge">${unread} new</span>`
- Mark read on expand: `src/app.js:639-647` — `handlers.toggleTopic()`
- Badge CSS: `index.html:372-379`

**Tests:** Tests 26-29 in `db-worker.test.html`:
- All messages unread initially
- markRead reduces count
- markRead all clears count
- Per-topic isolation

**Verified:** Yes — all 4 tests pass.
**Bugs:** None

---

## Step 30: First-run experience

**PRD says:** Loading state -> identity generated -> "Create a room" or "Import a room" presented.

**Implementation:**
- Loading screen: `src/ui.js:52-59` — shows logo + "loading..." + optional error
- Setup screen: `src/ui.js:64-132` — identity bar, room list, "Create room" + "Import room" + "Join room"
- Boot sequence: `src/app.js:807-866`
  1. Init DB
  2. Load or create identity (LOCAL: placeholder)
  3. Show setup screen (phase: 'setup')
  4. Boot Veilid async (non-blocking — UI is already interactive)

**Tests:** N/A (UI flow)
**Verified:** Yes — code review confirms PRD first-run flow.
**Bugs:** None

---

## Step 31: Room settings panel

**PRD says:** View room ID/DHT key, members, invite copy, export/import, leave room.

**Implementation:** `src/ui.js:296-366` — `renderSettings()`
- Identity section: display name edit, public key display
- Room section: Room ID, created date, DHT key (if present), peer count
- Copy invite button (DHT key + encryption key): `app.js:781-798`
- Members list with roles
- Export/import buttons
- Accessible via gear icon in chat header: `ui.js:155`

**What's missing:**
- **"Leave room" action** — PRD lists this under room management, but no leave/delete handler exists. No UI button, no DB delete logic.

**Tests:** None for settings panel.
**Verified:** Partial — settings panel renders correctly but is missing Leave Room.
**Bugs:**
- **MEDIUM**: Missing "Leave room" functionality. No way to remove a room from the local database through the UI.

---

## Step 32: Search (basic LIKE)

**PRD says:** Basic LIKE search across message content.

**Implementation:**
- DB query: `src/db-worker.js:268-275` — `searchMessages()` using `LIKE '%' || ? || '%'`
- Search bar: `src/ui.js:161-167` — debounced input (200ms)
- Results display: `src/ui.js:171-183` — topic, content preview (100 chars), timestamp
- Click result: clears search + expands topic: `ui.js:175`
- Clear button: `ui.js:166`
- Topic filtering by search query: `ui.js:138-139`

**Tests:** Tests 30-32 in `db-worker.test.html`:
- Finds messages by substring
- Limit is respected
- No results for non-matching query

**Verified:** Yes — all 3 tests pass.
**Bugs:** None

---

## Step 33: Responsive layout testing

**PRD says:** Test responsive layout.

**Implementation:**
- Max width: `700px` for chat layout: `index.html:214`
- Max width: `500px` for setup/loading: `index.html:37`
- One `@media (max-width: 600px)` rule: `index.html:629-635` — wraps new-topic-bar

**What's missing:**
- No systematic responsive testing
- Only one media query (new-topic-bar wrap)
- No mobile-specific adjustments for chat layout, headers, or settings

**Tests:** None
**Verified:** Code review only — single media query is minimal.
**Bugs:**
- **LOW**: Minimal responsive design. Only one `@media` rule. Header and compose areas may be cramped on small screens. PRD says "Mobile: full-width, same single-column layout" which is technically satisfied by the centered column, but no mobile-specific polish.

---

## Step 34: Error handling and edge cases

**PRD says:** Handle errors and edge cases.

**Implementation:**
- Error state in app: `state.error` with toast display: `ui.js:287-289`
- Click-to-dismiss errors: `ui.js:289`, `ui.js:123`
- Veilid error state: `state.veilidError` with tooltip: `ui.js:44`
- DB worker error handling: `db-worker.js:317-326` — catches and reports errors
- Veilid worker error handling: `veilid-worker.js:471-479` — catches and reports
- P2P message handling with try/catch: `app.js:341-366`
- Graceful DHT fallback: `app.js:493-503` — room creation continues if DHT fails

**What's missing:**
- No offline message queue (messages sent while offline are lost)
- No retry logic for failed operations
- No WebSocket reconnection handling
- No network state change detection (beyond Veilid attachment state)
- No storage quota warning

**Tests:** Tests 11-13 in `crdt-merge.test.html`:
- Action before init throws
- Unknown action throws
- No FK constraint enforcement

**Verified:** Partial — basic error handling exists but important gaps remain.
**Bugs:**
- **MEDIUM**: No offline message queue. Messages composed while disconnected from peers are written to local DB but never queued for send when reconnection occurs. The PRD says "Offline reading and composing (queued send)" is an MVP item but is unchecked.

---

## Step 35: CLAUDE.md + homepage + tofu

**PRD says:** Update CLAUDE.md, homepage links, `tofu/variables.tf`.

**Implementation:** PRD section 9.4 confirms all updates applied.

**Tests:** N/A
**Verified:** Yes (confirmed in PRD and repo CLAUDE.md).
**Bugs:** None

---

## Step 36: Deploy to weft.apps.andymolenda.com

**PRD says:** Deploy to Cloudflare Pages.

**Implementation:** README lists live URL: `weft.apps.andymolenda.com`

**Tests:** N/A
**Verified:** Yes (documented as deployed).
**Bugs:** None
