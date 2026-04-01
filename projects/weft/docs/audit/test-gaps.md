# Test Coverage Gaps

## Must-Have for MVP

### GAP-1: IndexedDB persistence verification

**What should be tested:** Data survives worker restart / page reload.
**Suggested test:** `tests/persistence.test.html`
- Create a DB worker, insert data, terminate the worker
- Create a new DB worker with the same DB name
- Verify data is still present
**Priority:** Must-have — Step 13 has no automated test
**Related PRD Step:** 13

---

### GAP-2: ULID generation correctness

**What should be tested:** ULID format, monotonicity, uniqueness, time encoding.
**Suggested test:** `tests/ulid.test.html`
- Generate 1000 ULIDs rapidly — verify all are unique
- Verify monotonic ordering (each ULID > previous when generated in sequence)
- Verify format: 26 chars, valid Crockford base32
- Verify time component decodes to approximately `Date.now()`
- Verify randomness: no two ULIDs share the same random suffix (when time differs)
**Priority:** Must-have — ULID is the primary key for messages, correctness is critical
**Related PRD Step:** 4

---

### GAP-3: Export/import round-trip with DHT fields

**What should be tested:** Full room record including `dht_key`, `owner_key`, `owner_secret`, `encryption_key` survives export/import.
**Suggested test:** Add tests to `tests/db-worker.test.html`
- Export a room with DHT fields
- Verify export JSON contains all fields
- Import into a fresh DB
- Verify all fields match
**Priority:** Must-have — currently these fields are lost (see BUG-1, BUG-2)
**Related PRD Step:** 11, 12

---

### GAP-4: P2P message handling (AppMessage receive)

**What should be tested:** Incoming `chat_message`, `join`, `welcome` envelopes are correctly processed.
**Suggested test:** `tests/p2p-protocol.test.html`
- Mock the Veilid worker (postMessage events simulating AppMessage)
- Verify `handleChatMessage` inserts message into DB
- Verify `handleJoinMessage` adds member and stores route
- Verify `handleWelcomeMessage` stores route
- Verify duplicate messages (same ULID) are handled gracefully
**Priority:** Must-have — P2P message handling is core to the app
**Related PRD Step:** 20

---

## Nice-to-Have

### GAP-5: UI rendering tests

**What should be tested:** lit-html templates render correct DOM structure for each phase.
**Suggested test:** `tests/ui.test.html`
- Render loading state → verify logo and "loading..." text
- Render setup state → verify room list, create/import buttons
- Render chat state → verify topic cards, message list, compose bar
- Render settings state → verify identity, room info, members
**Priority:** Nice-to-have — UI is simple enough to verify manually
**Related PRD Step:** 6, 8

---

### GAP-6: Export file format validation on import

**What should be tested:** Import rejects malformed/malicious JSON gracefully.
**Suggested test:** Add tests to `tests/db-worker.test.html`
- Import with missing `format` field → error
- Import with missing `room.id` → error
- Import with empty messages array → success (room created, no messages)
- Import with extremely large message count → verify memory behavior
**Priority:** Nice-to-have — basic validation exists in `export.js:22-27`
**Related PRD Step:** 12

---

### GAP-7: Search edge cases

**What should be tested:** Search with empty query, very long query, SQL injection attempts.
**Suggested test:** Add tests to `tests/db-worker.test.html`
- Search with empty string → no results (not all messages)
- Search with SQL metacharacters (`'; DROP TABLE messages; --`) → no error
- Search with Unicode → correct results
**Priority:** Nice-to-have — LIKE queries with parameterized input are safe from injection
**Related PRD Step:** 32

---

### GAP-8: Connection state transitions

**What should be tested:** Veilid attachment state changes correctly update `state.veilidState`.
**Suggested test:** `tests/connection-state.test.html`
- Simulate attachment state events → verify state transitions
- Verify `setupLocalRoute` is called on first good attachment
- Verify offline→online transition triggers presence publication
**Priority:** Nice-to-have — requires mocking Veilid worker
**Related PRD Step:** 17c, 28

---

### GAP-9: Concurrent DB operations

**What should be tested:** Multiple rapid operations don't corrupt state.
**Suggested test:** Add tests to `tests/db-worker.test.html`
- Post 100 messages rapidly in parallel → verify all inserted
- Export during active writes → verify consistent snapshot
- Apply changes while posting messages → verify no conflicts
**Priority:** Nice-to-have — cr-sqlite handles this internally, but worth verifying
**Related PRD Step:** 7, 23
