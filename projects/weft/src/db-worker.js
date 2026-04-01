// Database Web Worker — cr-sqlite (SQLite + CRDT) with automatic IndexedDB persistence
// Uses @vlcn.io/crsqlite-wasm for conflict-free replicated relations

import initWasm from '../lib/crsqlite/index.js';

let db = null;

// --- Schema ---
// Tables promoted to CRR (Conflict-free Replicated Relation) get automatic
// CRDT merge via crsql_changes. local_identity and read_cursors are local-only.

const SCHEMA_TABLES = `
CREATE TABLE IF NOT EXISTS local_identity (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    public_key TEXT NOT NULL,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    created_by TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    dht_key TEXT NOT NULL DEFAULT '',
    owner_key TEXT NOT NULL DEFAULT '',
    owner_secret TEXT NOT NULL DEFAULT '',
    encryption_key TEXT NOT NULL DEFAULT '',
    my_subkey INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS members (
    room_id TEXT NOT NULL DEFAULT '',
    public_key TEXT NOT NULL DEFAULT '',
    display_name TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'member',
    joined_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    PRIMARY KEY (room_id, public_key)
);

CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY NOT NULL,
    room_id TEXT NOT NULL DEFAULT '',
    topic TEXT NOT NULL DEFAULT '',
    sender_key TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    edited_at TEXT,
    deleted INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_msg_room_topic ON messages(room_id, topic, created_at);
CREATE INDEX IF NOT EXISTS idx_msg_room_time ON messages(room_id, created_at);
CREATE INDEX IF NOT EXISTS idx_msg_sender ON messages(sender_key, created_at);

CREATE TABLE IF NOT EXISTS read_cursors (
    room_id TEXT NOT NULL,
    topic TEXT NOT NULL,
    last_read_id TEXT,
    last_read_at TEXT,
    PRIMARY KEY (room_id, topic)
);
`;

// CRR promotion — rooms, members, messages get CRDT merge support
const CRR_TABLES = ['rooms', 'members', 'messages'];

// --- Initialization ---

async function init(params) {
  const dbName = (params && params.dbName) || 'weft';
  const sqlite = await initWasm();
  db = await sqlite.open(dbName);

  // Create tables — execute each statement individually to avoid splitting issues
  for (const stmt of SCHEMA_TABLES.split(/;\s*\n/).filter(s => s.trim())) {
    await db.exec(stmt.trim());
  }

  // Promote to CRRs (idempotent — safe to call on existing CRR tables)
  for (const table of CRR_TABLES) {
    await db.exec(`SELECT crsql_as_crr('${table}')`);
  }

  return { ok: true, siteId: db.siteid };
}

// --- Action handlers ---

const actions = {
  async init(params) {
    return init(params);
  },

  async getIdentity() {
    const rows = await db.execO('SELECT * FROM local_identity WHERE id = 1');
    return rows[0] || null;
  },

  async createIdentity({ publicKey, displayName }) {
    await db.exec(
      'INSERT OR REPLACE INTO local_identity (id, public_key, display_name) VALUES (1, ?, ?)',
      [publicKey, displayName]
    );
    const rows = await db.execO('SELECT * FROM local_identity WHERE id = 1');
    return rows[0] || null;
  },

  async getRooms() {
    return db.execO('SELECT * FROM rooms ORDER BY created_at DESC');
  },

  async createRoom({ id, name, createdBy, dhtKey, ownerKey, ownerSecret, encryptionKey, mySubkey }) {
    await db.exec(
      'INSERT INTO rooms (id, name, created_by, dht_key, owner_key, owner_secret, encryption_key, my_subkey) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, createdBy, dhtKey || '', ownerKey || '', ownerSecret || '', encryptionKey || '', mySubkey != null ? mySubkey : 1]
    );
    await db.exec(
      'INSERT INTO members (room_id, public_key, display_name, role) VALUES (?, ?, ?, ?)',
      [id, createdBy, '', 'owner']
    );
    const rows = await db.execO('SELECT * FROM rooms WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async getRoom({ roomId }) {
    const rows = await db.execO('SELECT * FROM rooms WHERE id = ?', [roomId]);
    return rows[0] || null;
  },

  async getTopics({ roomId }) {
    return db.execO(`
      SELECT topic,
             COUNT(*) as message_count,
             MAX(created_at) as last_activity,
             COUNT(DISTINCT sender_key) as participants
      FROM messages
      WHERE room_id = ? AND deleted = 0
      GROUP BY topic
      ORDER BY last_activity DESC
    `, [roomId]);
  },

  async getUnreadCounts({ roomId }) {
    return db.execO(`
      SELECT m.topic, COUNT(*) as unread
      FROM messages m
      LEFT JOIN read_cursors rc ON rc.room_id = m.room_id AND rc.topic = m.topic
      WHERE m.room_id = ? AND m.deleted = 0
        AND (rc.last_read_id IS NULL OR m.id > rc.last_read_id)
      GROUP BY m.topic
    `, [roomId]);
  },

  async getMessages({ roomId, topic, limit, offset }) {
    return db.execO(`
      SELECT m.id, m.content, m.sender_key, m.created_at, m.topic,
             mem.display_name as sender_name
      FROM messages m
      LEFT JOIN members mem ON mem.room_id = m.room_id AND mem.public_key = m.sender_key
      WHERE m.room_id = ? AND m.topic = ? AND m.deleted = 0
      ORDER BY m.created_at ASC
      LIMIT ? OFFSET ?
    `, [roomId, topic, limit || 50, offset || 0]);
  },

  async postMessage({ id, roomId, topic, senderKey, content }) {
    await db.exec(
      'INSERT INTO messages (id, room_id, topic, sender_key, content) VALUES (?, ?, ?, ?, ?)',
      [id, roomId, topic, senderKey, content]
    );
    const rows = await db.execO('SELECT * FROM messages WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async markRead({ roomId, topic, messageId }) {
    await db.exec(
      `INSERT OR REPLACE INTO read_cursors (room_id, topic, last_read_id, last_read_at)
       VALUES (?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`,
      [roomId, topic, messageId]
    );
  },

  async updateMemberName({ roomId, publicKey, displayName }) {
    await db.exec(
      'UPDATE members SET display_name = ? WHERE room_id = ? AND public_key = ?',
      [displayName, roomId, publicKey]
    );
  },

  async addMember({ roomId, publicKey, displayName, role }) {
    await db.exec(
      'INSERT OR IGNORE INTO members (room_id, public_key, display_name, role) VALUES (?, ?, ?, ?)',
      [roomId, publicKey, displayName, role || 'member']
    );
  },

  async getMembers({ roomId }) {
    return db.execO('SELECT * FROM members WHERE room_id = ? ORDER BY joined_at ASC', [roomId]);
  },

  async exportRoom({ roomId }) {
    const rooms = await db.execO('SELECT * FROM rooms WHERE id = ?', [roomId]);
    const room = rooms[0];
    if (!room) return null;
    const members = await db.execO('SELECT * FROM members WHERE room_id = ?', [roomId]);
    const messages = await db.execO(
      'SELECT * FROM messages WHERE room_id = ? ORDER BY created_at ASC',
      [roomId]
    );
    const identities = await db.execO('SELECT * FROM local_identity WHERE id = 1');
    const identity = identities[0];
    return {
      weft_version: 1,
      format: 'weft-export-v1',
      exported_at: new Date().toISOString(),
      exported_by: identity ? identity.public_key : null,
      room: {
        id: room.id,
        name: room.name,
        created_by: room.created_by,
        created_at: room.created_at,
        dht_key: room.dht_key || null,
        owner_key: room.owner_key || null,
        owner_secret: room.owner_secret || null,
      },
      members: members.map(m => ({
        public_key: m.public_key,
        display_name: m.display_name,
        role: m.role,
        joined_at: m.joined_at
      })),
      messages: messages.map(m => ({
        id: m.id,
        topic: m.topic,
        sender_key: m.sender_key,
        content: m.content,
        created_at: m.created_at,
        edited_at: m.edited_at,
        deleted: m.deleted
      })),
      encryption_key: room.encryption_key || null
    };
  },

  async importRoom({ data }) {
    const { room, members, messages } = data;

    await db.exec(
      'INSERT OR IGNORE INTO rooms (id, name, created_by, created_at, dht_key, owner_key, owner_secret, encryption_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [room.id, room.name, room.created_by, room.created_at, room.dht_key || '', room.owner_key || '', room.owner_secret || '', data.encryption_key || '']
    );

    for (const m of members) {
      await db.exec(
        'INSERT OR IGNORE INTO members (room_id, public_key, display_name, role, joined_at) VALUES (?, ?, ?, ?, ?)',
        [room.id, m.public_key, m.display_name, m.role, m.joined_at]
      );
    }

    for (const m of messages) {
      await db.exec(
        'INSERT OR IGNORE INTO messages (id, room_id, topic, sender_key, content, created_at, edited_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [m.id, room.id, m.topic, m.sender_key, m.content, m.created_at, m.edited_at || null, m.deleted || 0]
      );
    }

    return { roomId: room.id };
  },

  async searchMessages({ roomId, query, limit }) {
    return db.execO(
      `SELECT id, topic, content, created_at, sender_key
       FROM messages
       WHERE room_id = ? AND content LIKE '%' || ? || '%' AND deleted = 0
       ORDER BY created_at DESC
       LIMIT ?`,
      [roomId, query, limit || 20]
    );
  },

  // --- Sync primitives (for Phase 4: Veilid P2P sync) ---

  async getDbVersion() {
    const rows = await db.execA('SELECT crsql_db_version()');
    return rows[0][0];
  },

  async getSiteId() {
    return db.siteid;
  },

  async getChanges({ sinceVersion, limit }) {
    return db.execA(
      `SELECT "table", "pk", "cid", "val", "col_version", "db_version",
              "site_id", "cl", "seq"
       FROM crsql_changes
       WHERE db_version > ?
       ORDER BY db_version ASC
       LIMIT ?`,
      [sinceVersion || 0, limit || 1000]
    );
  },

  async applyChanges({ changes }) {
    await db.tx(async (tx) => {
      for (const c of changes) {
        await tx.exec(
          `INSERT INTO crsql_changes ("table", "pk", "cid", "val", "col_version",
           "db_version", "site_id", "cl", "seq") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          c
        );
      }
    });
  },
};

// --- Message handler ---

self.onmessage = async (e) => {
  const { id, action, params } = e.data;
  try {
    const handler = actions[action];
    if (!handler) throw new Error(`Unknown action: ${action}`);
    const result = await handler(params || {});
    self.postMessage({ id, result });
  } catch (err) {
    self.postMessage({ id, error: err.message });
  }
};
