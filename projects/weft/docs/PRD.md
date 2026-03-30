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
