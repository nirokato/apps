// Main thread orchestrator — bridges DB Worker ↔ UI
// Phase 1: local-only identity + room management
// Phase 3+: add Veilid Worker bridge

import { ulid } from './ulid.js';
import { renderApp } from './ui.js';
import { exportToFile, importFromFile } from './export.js';

// --- DB Worker interface ---

class DB {
  constructor() {
    this.worker = new Worker('./src/db-worker.js');
    this.pending = new Map();
    this.nextId = 0;
    this.worker.onmessage = (e) => {
      const { id, result, error } = e.data;
      const p = this.pending.get(id);
      if (!p) return;
      this.pending.delete(id);
      if (error) p.reject(new Error(error));
      else p.resolve(result);
    };
  }

  call(action, params) {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({ id, action, params });
    });
  }

  init() { return this.call('init'); }
  getIdentity() { return this.call('getIdentity'); }
  createIdentity(publicKey, displayName) {
    return this.call('createIdentity', { publicKey, displayName });
  }
  getRooms() { return this.call('getRooms'); }
  createRoom(name, createdBy) {
    const id = ulid();
    return this.call('createRoom', { id, name, createdBy });
  }
  getRoom(roomId) { return this.call('getRoom', { roomId }); }
  getTopics(roomId) { return this.call('getTopics', { roomId }); }
  getUnreadCounts(roomId) { return this.call('getUnreadCounts', { roomId }); }
  getMessages(roomId, topic, limit, offset) {
    return this.call('getMessages', { roomId, topic, limit, offset });
  }
  postMessage(roomId, topic, senderKey, content) {
    const id = ulid();
    return this.call('postMessage', { id, roomId, topic, senderKey, content });
  }
  markRead(roomId, topic, messageId) {
    return this.call('markRead', { roomId, topic, messageId });
  }
  updateMemberName(roomId, publicKey, displayName) {
    return this.call('updateMemberName', { roomId, publicKey, displayName });
  }
  addMember(roomId, publicKey, displayName, role) {
    return this.call('addMember', { roomId, publicKey, displayName, role });
  }
  getMembers(roomId) { return this.call('getMembers', { roomId }); }
  exportRoom(roomId) { return this.call('exportRoom', { roomId }); }
  importRoom(data) { return this.call('importRoom', { data }); }
  searchMessages(roomId, query, limit) {
    return this.call('searchMessages', { roomId, query, limit });
  }
}

// --- App state ---

const state = {
  phase: 'loading', // loading | setup | chat | settings
  identity: null,
  rooms: [],
  currentRoom: null,
  topics: [],
  unreadCounts: {},
  expandedTopics: new Set(),
  topicMessages: {},  // { topic: messages[] }
  members: [],
  searchQuery: '',
  searchResults: null,
  error: null,
};

let db;

// --- State helpers ---

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function render() {
  renderApp(state, handlers);
}

// --- Handlers (passed to UI) ---

const handlers = {
  async createRoom(name) {
    try {
      const room = await db.createRoom(name, state.identity.public_key);
      await db.updateMemberName(room.id, state.identity.public_key, state.identity.display_name);
      const rooms = await db.getRooms();
      await handlers.enterRoom(room.id);
      setState({ rooms });
    } catch (e) {
      setState({ error: e.message });
    }
  },

  async enterRoom(roomId) {
    const room = await db.getRoom(roomId);
    const topics = await db.getTopics(roomId);
    const unreadRows = await db.getUnreadCounts(roomId);
    const members = await db.getMembers(roomId);
    const unreadCounts = {};
    for (const r of unreadRows) unreadCounts[r.topic] = r.unread;

    // Load messages for all topics
    const topicMessages = {};
    for (const t of topics) {
      topicMessages[t.topic] = await db.getMessages(roomId, t.topic);
    }

    setState({
      phase: 'chat',
      currentRoom: room,
      topics,
      unreadCounts,
      topicMessages,
      members,
      expandedTopics: new Set(topics.length > 0 ? [topics[0].topic] : []),
      searchQuery: '',
      searchResults: null,
    });
  },

  async toggleTopic(topic) {
    const expanded = new Set(state.expandedTopics);
    if (expanded.has(topic)) {
      expanded.delete(topic);
    } else {
      expanded.add(topic);
      // Load messages if not yet loaded
      if (!state.topicMessages[topic]) {
        const msgs = await db.getMessages(state.currentRoom.id, topic);
        state.topicMessages[topic] = msgs;
      }
      // Mark as read
      const msgs = state.topicMessages[topic];
      if (msgs && msgs.length > 0) {
        const lastMsg = msgs[msgs.length - 1];
        await db.markRead(state.currentRoom.id, topic, lastMsg.id);
        const unreadRows = await db.getUnreadCounts(state.currentRoom.id);
        const unreadCounts = {};
        for (const r of unreadRows) unreadCounts[r.topic] = r.unread;
        state.unreadCounts = unreadCounts;
      }
    }
    setState({ expandedTopics: expanded });
  },

  async sendMessage(topic, content) {
    if (!content.trim()) return;
    await db.postMessage(state.currentRoom.id, topic, state.identity.public_key, content.trim());

    // Refresh topic data
    const topics = await db.getTopics(state.currentRoom.id);
    const msgs = await db.getMessages(state.currentRoom.id, topic);
    state.topicMessages[topic] = msgs;

    // Mark as read
    if (msgs.length > 0) {
      await db.markRead(state.currentRoom.id, topic, msgs[msgs.length - 1].id);
    }
    const unreadRows = await db.getUnreadCounts(state.currentRoom.id);
    const unreadCounts = {};
    for (const r of unreadRows) unreadCounts[r.topic] = r.unread;

    setState({ topics, unreadCounts });
  },

  async sendNewTopic(topic, content) {
    if (!topic.trim() || !content.trim()) return;
    await db.postMessage(
      state.currentRoom.id, topic.trim(), state.identity.public_key, content.trim()
    );

    const topics = await db.getTopics(state.currentRoom.id);
    const msgs = await db.getMessages(state.currentRoom.id, topic.trim());
    state.topicMessages[topic.trim()] = msgs;

    // Auto-expand and mark read
    const expanded = new Set(state.expandedTopics);
    expanded.add(topic.trim());
    if (msgs.length > 0) {
      await db.markRead(state.currentRoom.id, topic.trim(), msgs[msgs.length - 1].id);
    }
    const unreadRows = await db.getUnreadCounts(state.currentRoom.id);
    const unreadCounts = {};
    for (const r of unreadRows) unreadCounts[r.topic] = r.unread;

    setState({ topics, unreadCounts, expandedTopics: expanded });
  },

  async exportRoom() {
    const data = await db.exportRoom(state.currentRoom.id);
    if (data) exportToFile(data);
  },

  async importRoom(file) {
    try {
      const data = await importFromFile(file);
      const result = await db.importRoom(data);
      const rooms = await db.getRooms();
      setState({ rooms });
      await handlers.enterRoom(result.roomId);
    } catch (e) {
      setState({ error: e.message });
    }
  },

  async search(query) {
    if (!query.trim()) {
      setState({ searchQuery: '', searchResults: null });
      return;
    }
    const results = await db.searchMessages(state.currentRoom.id, query.trim());
    setState({ searchQuery: query, searchResults: results });
  },

  clearSearch() {
    setState({ searchQuery: '', searchResults: null });
  },

  showSettings() {
    setState({ phase: 'settings' });
  },

  backToChat() {
    setState({ phase: 'chat' });
  },

  async backToRoomList() {
    const rooms = await db.getRooms();
    setState({
      phase: 'setup',
      currentRoom: null,
      topics: [],
      topicMessages: {},
      expandedTopics: new Set(),
      rooms,
    });
  },

  async updateDisplayName(name) {
    if (!name.trim()) return;
    await db.createIdentity(state.identity.public_key, name.trim());
    if (state.currentRoom) {
      await db.updateMemberName(state.currentRoom.id, state.identity.public_key, name.trim());
      const members = await db.getMembers(state.currentRoom.id);
      setState({ identity: { ...state.identity, display_name: name.trim() }, members });
    } else {
      setState({ identity: { ...state.identity, display_name: name.trim() } });
    }
  },

  clearError() {
    setState({ error: null });
  },
};

// --- Bootstrap ---

async function boot() {
  try {
    db = new DB();
    await db.init();

    // Load or create identity
    let identity = await db.getIdentity();
    if (!identity) {
      // Phase 1: generate a random local key (placeholder for Veilid keypair)
      const keyBytes = new Uint8Array(32);
      crypto.getRandomValues(keyBytes);
      const publicKey = 'LOCAL:' + Array.from(keyBytes.slice(0, 16))
        .map(b => b.toString(16).padStart(2, '0')).join('');
      identity = await db.createIdentity(publicKey, 'Anonymous');
    }

    const rooms = await db.getRooms();
    setState({
      phase: 'setup',
      identity,
      rooms,
    });
  } catch (e) {
    setState({ phase: 'loading', error: 'Failed to initialize: ' + e.message });
  }
}

boot();
