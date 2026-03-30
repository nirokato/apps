// Database Web Worker — SQLite via sql.js with IndexedDB persistence
// Phase 1: local-only, no cr-sqlite CRR extensions yet
// Phase 3+: swap sql.js for @vlcn.io/crsqlite-wasm, enable crsql_as_crr()

importScripts('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/sql-wasm.js');

const DB_NAME = 'weft';
const DB_STORE = 'data';
const DB_KEY = 'db';

let db = null;
let idb = null; // cached IndexedDB connection

// Schema uses individual statements for clarity — executed via db.exec()
const SCHEMA = `
CREATE TABLE IF NOT EXISTS local_identity (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    public_key TEXT NOT NULL,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_by TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS members (
    room_id TEXT NOT NULL REFERENCES rooms(id),
    public_key TEXT NOT NULL,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    joined_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    PRIMARY KEY (room_id, public_key)
);

CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    room_id TEXT NOT NULL REFERENCES rooms(id),
    topic TEXT NOT NULL,
    sender_key TEXT NOT NULL,
    content TEXT NOT NULL,
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

// --- IndexedDB helpers ---

async function getIDB() {
  if (idb) return idb;
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(DB_STORE);
    req.onsuccess = () => { idb = req.result; resolve(idb); };
    req.onerror = () => reject(req.error);
  });
}

async function loadFromIDB() {
  const conn = await getIDB();
  return new Promise((resolve, reject) => {
    const tx = conn.transaction(DB_STORE, 'readonly');
    const req = tx.objectStore(DB_STORE).get(DB_KEY);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function saveToIDB() {
  if (!db) return;
  const data = db.export();
  const conn = await getIDB();
  return new Promise((resolve, reject) => {
    const tx = conn.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).put(data, DB_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// --- Initialization ---

async function init() {
  const SQL = await initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/${file}`
  });

  const saved = await loadFromIDB();
  db = saved ? new SQL.Database(new Uint8Array(saved)) : new SQL.Database();
  db.exec(SCHEMA);
  await saveToIDB();
  return { ok: true };
}

// --- Query helpers ---

function queryAll(sql, params) {
  const stmt = db.prepare(sql);
  if (params) stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function queryOne(sql, params) {
  const rows = queryAll(sql, params);
  return rows[0] || null;
}

function run(sql, params) {
  db.run(sql, params);
}

// --- Action handlers ---

const actions = {
  async init() {
    return init();
  },

  getIdentity() {
    return queryOne('SELECT * FROM local_identity WHERE id = 1');
  },

  async createIdentity({ publicKey, displayName }) {
    run(
      'INSERT OR REPLACE INTO local_identity (id, public_key, display_name) VALUES (1, ?, ?)',
      [publicKey, displayName]
    );
    await saveToIDB();
    return queryOne('SELECT * FROM local_identity WHERE id = 1');
  },

  getRooms() {
    return queryAll('SELECT * FROM rooms ORDER BY created_at DESC');
  },

  async createRoom({ id, name, createdBy }) {
    run('INSERT INTO rooms (id, name, created_by) VALUES (?, ?, ?)', [id, name, createdBy]);
    run(
      'INSERT INTO members (room_id, public_key, display_name, role) VALUES (?, ?, ?, ?)',
      [id, createdBy, '', 'owner']
    );
    await saveToIDB();
    return queryOne('SELECT * FROM rooms WHERE id = ?', [id]);
  },

  getRoom({ roomId }) {
    return queryOne('SELECT * FROM rooms WHERE id = ?', [roomId]);
  },

  getTopics({ roomId }) {
    return queryAll(`
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

  getUnreadCounts({ roomId }) {
    return queryAll(`
      SELECT m.topic, COUNT(*) as unread
      FROM messages m
      LEFT JOIN read_cursors rc ON rc.room_id = m.room_id AND rc.topic = m.topic
      WHERE m.room_id = ? AND m.deleted = 0
        AND (rc.last_read_id IS NULL OR m.id > rc.last_read_id)
      GROUP BY m.topic
    `, [roomId]);
  },

  getMessages({ roomId, topic, limit, offset }) {
    return queryAll(`
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
    run(
      'INSERT INTO messages (id, room_id, topic, sender_key, content) VALUES (?, ?, ?, ?, ?)',
      [id, roomId, topic, senderKey, content]
    );
    await saveToIDB();
    return queryOne('SELECT * FROM messages WHERE id = ?', [id]);
  },

  async markRead({ roomId, topic, messageId }) {
    run(
      `INSERT OR REPLACE INTO read_cursors (room_id, topic, last_read_id, last_read_at)
       VALUES (?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`,
      [roomId, topic, messageId]
    );
    await saveToIDB();
  },

  async updateMemberName({ roomId, publicKey, displayName }) {
    run(
      'UPDATE members SET display_name = ? WHERE room_id = ? AND public_key = ?',
      [displayName, roomId, publicKey]
    );
    await saveToIDB();
  },

  async addMember({ roomId, publicKey, displayName, role }) {
    run(
      'INSERT OR IGNORE INTO members (room_id, public_key, display_name, role) VALUES (?, ?, ?, ?)',
      [roomId, publicKey, displayName, role || 'member']
    );
    await saveToIDB();
  },

  getMembers({ roomId }) {
    return queryAll('SELECT * FROM members WHERE room_id = ? ORDER BY joined_at ASC', [roomId]);
  },

  exportRoom({ roomId }) {
    const room = queryOne('SELECT * FROM rooms WHERE id = ?', [roomId]);
    if (!room) return null;
    const members = queryAll('SELECT * FROM members WHERE room_id = ?', [roomId]);
    const messages = queryAll(
      'SELECT * FROM messages WHERE room_id = ? ORDER BY created_at ASC',
      [roomId]
    );
    const identity = queryOne('SELECT * FROM local_identity WHERE id = 1');
    return {
      weft_version: 1,
      format: 'weft-export-v1',
      exported_at: new Date().toISOString(),
      exported_by: identity ? identity.public_key : null,
      room: {
        id: room.id,
        name: room.name,
        created_by: room.created_by,
        created_at: room.created_at
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
      encryption_key: null
    };
  },

  async importRoom({ data }) {
    const { room, members, messages } = data;

    run(
      'INSERT OR IGNORE INTO rooms (id, name, created_by, created_at) VALUES (?, ?, ?, ?)',
      [room.id, room.name, room.created_by, room.created_at]
    );

    for (const m of members) {
      run(
        'INSERT OR IGNORE INTO members (room_id, public_key, display_name, role, joined_at) VALUES (?, ?, ?, ?, ?)',
        [room.id, m.public_key, m.display_name, m.role, m.joined_at]
      );
    }

    for (const m of messages) {
      run(
        'INSERT OR IGNORE INTO messages (id, room_id, topic, sender_key, content, created_at, edited_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [m.id, room.id, m.topic, m.sender_key, m.content, m.created_at, m.edited_at || null, m.deleted || 0]
      );
    }

    await saveToIDB();
    return { roomId: room.id };
  },

  searchMessages({ roomId, query, limit }) {
    return queryAll(
      `SELECT id, topic, content, created_at, sender_key
       FROM messages
       WHERE room_id = ? AND content LIKE '%' || ? || '%' AND deleted = 0
       ORDER BY created_at DESC
       LIMIT ?`,
      [roomId, query, limit || 20]
    );
  }
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
