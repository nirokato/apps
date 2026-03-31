// Main thread orchestrator — bridges DB Worker + Veilid Worker ↔ UI

import { ulid } from './ulid.js';
import { renderApp } from './ui.js';
import { exportToFile, importFromFile } from './export.js';

// --- Debug logger (writes to in-app debug panel + console) ---
const log = {
  info: (...args) => window.weftDebug?.log('info', ...args),
  warn: (...args) => window.weftDebug?.log('warn', ...args),
  error: (...args) => window.weftDebug?.log('error', ...args),
  ok: (...args) => window.weftDebug?.log('ok', ...args),
};

// --- DB Worker interface ---

class DB {
  constructor() {
    this.worker = new Worker('./src/db-worker.js', { type: 'module' });
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
  createRoom(name, createdBy, dhtKey, ownerKey, ownerSecret, encryptionKey) {
    const id = ulid();
    return this.call('createRoom', { id, name, createdBy, dhtKey, ownerKey, ownerSecret, encryptionKey });
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
  getDbVersion() { return this.call('getDbVersion'); }
  getChanges(sinceVersion, limit) {
    return this.call('getChanges', { sinceVersion, limit });
  }
  applyChanges(changes) { return this.call('applyChanges', { changes }); }
}

// --- Veilid Worker interface ---

class Veilid {
  constructor(onUpdate) {
    this.worker = new Worker('./src/veilid-worker.js', { type: 'module' });
    this.pending = new Map();
    this.nextId = 0;
    this.onUpdate = onUpdate;
    this.worker.onmessage = (e) => {
      const { id, result, error, type, update } = e.data;
      if (type === 'update') {
        this.onUpdate(update);
        return;
      }
      const p = this.pending.get(id);
      if (!p) return;
      this.pending.delete(id);
      if (error) p.reject(new Error(error));
      else p.resolve(result);
    };
    this.worker.onerror = (e) => {
      log.error('Veilid worker error:', e);
    };
  }

  call(action, params) {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({ id, action, params });
    });
  }

  init(bootstrapUrl) { return this.call('init', { bootstrapUrl }); }
  generateKeyPair() { return this.call('generateKeyPair'); }
  setIdentity(publicKey, secretKey) {
    return this.call('setIdentity', { publicKey, secretKey });
  }
  createPrivateRoute() { return this.call('createPrivateRoute'); }
  importRoute(blob) { return this.call('importRoute', { blob }); }
  createDHTRecord(schema) { return this.call('createDHTRecord', { schema }); }
  openDHTRecord(key, writer) { return this.call('openDHTRecord', { key, writer }); }
  closeDHTRecord(key) { return this.call('closeDHTRecord', { key }); }
  getDHTValue(key, subkey, forceRefresh) {
    return this.call('getDHTValue', { key, subkey, forceRefresh });
  }
  setDHTValue(key, subkey, data) {
    return this.call('setDHTValue', { key, subkey, data });
  }
  watchDHTValues(key, subkeys, expiration, count) {
    return this.call('watchDHTValues', { key, subkeys, expiration, count });
  }
  // Room-level DHT operations
  createRoomDHT(roomName) {
    return this.call('createRoomDHT', { roomName });
  }
  openRoomDHT(dhtKey, ownerKeyPair) {
    return this.call('openRoomDHT', { dhtKey, ownerKeyPair });
  }
  updateRoomMetadata(dhtKey, metadata) {
    return this.call('updateRoomMetadata', { dhtKey, metadata });
  }
  writePresence(dhtKey, subkey, presence) {
    return this.call('writePresence', { dhtKey, subkey, presence });
  }
  readPresence(dhtKey, subkey) {
    return this.call('readPresence', { dhtKey, subkey });
  }
  watchRoom(dhtKey) {
    return this.call('watchRoom', { dhtKey });
  }
  sendAppMessage(target, message) {
    return this.call('sendAppMessage', { target, message });
  }
  sendAppCall(target, request) {
    return this.call('sendAppCall', { target, request });
  }
  replyAppCall(callId, message) {
    return this.call('replyAppCall', { callId, message });
  }
  encryptMessage(data, sharedSecret) {
    return this.call('encryptMessage', { data, sharedSecret });
  }
  decryptMessage(ciphertext, nonce, sharedSecret) {
    return this.call('decryptMessage', { ciphertext, nonce, sharedSecret });
  }
  generateSharedSecret() { return this.call('generateSharedSecret'); }
  getState() { return this.call('getState'); }
  shutdown() { return this.call('shutdown'); }
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
  // Veilid connection state
  veilidState: 'loading', // loading | connecting | connected | offline | error
  veilidError: null,
  // P2P state (transient, not persisted)
  localRoute: null,    // { routeId, blob } — our private route for receiving messages
  peerRoutes: {},      // { publicKey: routeBlob } — known peer routes for sending
  onlinePeers: 0,      // count of peers with known routes
};

let db;
let veilid;

const BOOTSTRAP_URL = 'wss://veilid.andymolenda.com/ws';

// --- State helpers ---

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function render() {
  renderApp(state, handlers);
}

// --- P2P message protocol ---
// Messages sent over AppMessage are JSON-encoded envelopes.
// When a room has an encryption key, the payload is encrypted.

function encodeEnvelope(envelope) {
  return new TextEncoder().encode(JSON.stringify(envelope));
}

function decodeEnvelope(data) {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  return JSON.parse(new TextDecoder().decode(bytes));
}

// Send an envelope to a specific peer by importing their route blob first
async function sendToPeer(routeBlob, data) {
  // Import the route blob to get a RouteId the Veilid API can use
  const { routeId } = await veilid.importRoute(routeBlob);
  await veilid.sendAppMessage(routeId, Array.from(data));
}

// Broadcast an envelope to all known peers in the current room
async function broadcastToPeers(envelope) {
  if (!veilid || state.veilidState !== 'connected') return;

  const data = encodeEnvelope(envelope);

  for (const [peerKey, routeBlob] of Object.entries(state.peerRoutes)) {
    if (peerKey === state.identity?.public_key) continue; // skip self
    try {
      await sendToPeer(routeBlob, data);
    } catch (e) {
      log.warn(`[P2P] Failed to send to ${peerKey.slice(0, 16)}:`, e.message);
      // Route may be stale — remove it
      delete state.peerRoutes[peerKey];
      setState({ onlinePeers: Object.keys(state.peerRoutes).length });
    }
  }
}

// --- Veilid update handler ---

function handleVeilidUpdate(update) {
  if (!update) return;

  // Attachment state changes
  if (update.kind === 'Attachment') {
    const attachState = update.state;
    log.info('[Veilid] Attachment:', attachState);
    if (attachState === 'AttachedGood' || attachState === 'AttachedStrong' ||
        attachState === 'FullyAttached' || attachState === 'OverAttached') {
      setState({ veilidState: 'connected' });
      // Create our private route once connected
      setupLocalRoute();
    } else if (attachState === 'AttachedWeak' || attachState === 'Attaching') {
      setState({ veilidState: 'connecting' });
    } else if (attachState === 'Detached' || attachState === 'Detaching') {
      setState({ veilidState: 'offline' });
    }
  }

  // AppMessage received — real-time message from a peer
  if (update.kind === 'AppMessage') {
    handleAppMessage(update);
  }

  // AppCall received — sync request from a peer
  if (update.kind === 'AppCall') {
    handleAppCall(update);
  }

  // ValueChange — DHT watch notification
  if (update.kind === 'ValueChange') {
    handleValueChange(update);
  }
}

// Create our private route for receiving P2P messages
async function setupLocalRoute() {
  if (state.localRoute) return; // already set up
  try {
    const route = await veilid.createPrivateRoute();
    setState({ localRoute: route });
    log.info('[P2P] Local route created');

    // If we're in a room with a DHT key, publish our route
    if (state.currentRoom?.dht_key) {
      publishPresence();
    }
  } catch (e) {
    log.warn('[P2P] Failed to create local route:', e.message);
  }
}

// Publish our presence (route blob) to the room's DHT record
async function publishPresence() {
  if (!state.localRoute || !state.currentRoom?.dht_key) return;
  if (!veilid || state.veilidState !== 'connected') return;

  try {
    const ownerKp = state.currentRoom.owner_key && state.currentRoom.owner_secret
      ? `${state.currentRoom.owner_key}:${state.currentRoom.owner_secret}`
      : null;

    // Open DHT record (needed before writing)
    await veilid.openRoomDHT(state.currentRoom.dht_key, ownerKp);

    // Write presence to subkey 1 (owner's presence subkey)
    await veilid.writePresence(state.currentRoom.dht_key, 1, {
      v: 1,
      display_name: state.identity?.display_name || '',
      public_key: state.identity?.public_key || '',
      route_blob: Array.from(state.localRoute.blob || []),
      status: 'online',
      last_seen: new Date().toISOString(),
      db_version: await db.getDbVersion(),
    });
    log.info('[P2P] Presence published to DHT');
  } catch (e) {
    log.warn('[P2P] Failed to publish presence:', e.message);
  }
}

// Handle incoming AppMessage
async function handleAppMessage(update) {
  try {
    const envelope = decodeEnvelope(update.message);
    log.info('[P2P] Received:', envelope.type, 'from', (envelope.senderKey || '').slice(0, 16));

    switch (envelope.type) {
      case 'chat_message':
        await handleChatMessage(envelope);
        break;
      case 'join':
        await handleJoinMessage(envelope);
        break;
      case 'welcome':
        await handleWelcomeMessage(envelope);
        break;
      case 'sync_req':
        await handleSyncRequest(envelope);
        break;
      case 'sync_resp':
        await handleSyncResponse(envelope);
        break;
      default:
        log.info('[P2P] Unknown message type:', envelope.type);
    }
  } catch (e) {
    log.warn('[P2P] Failed to handle AppMessage:', e.message);
  }
}

// Process incoming chat message — insert into DB, refresh UI
async function handleChatMessage(envelope) {
  const { roomId, id, topic, senderKey, content, createdAt } = envelope;

  // Verify this message is for a room we're in
  const room = await db.getRoom(roomId);
  if (!room) return;

  // Insert message (idempotent — ULID PK prevents duplicates)
  try {
    await db.call('postMessage', {
      id, roomId, topic, senderKey, content
    });
  } catch (e) {
    // Likely duplicate — ignore
    if (!e.message.includes('UNIQUE')) log.warn('[P2P] Insert error:', e.message);
    return;
  }

  // Add sender as member if not already known
  await db.addMember(roomId, senderKey, '', 'member');

  // Refresh UI if we're viewing this room
  if (state.currentRoom?.id === roomId) {
    const topics = await db.getTopics(roomId);
    const msgs = await db.getMessages(roomId, topic);
    state.topicMessages[topic] = msgs;

    const unreadRows = await db.getUnreadCounts(roomId);
    const unreadCounts = {};
    for (const r of unreadRows) unreadCounts[r.topic] = r.unread;

    setState({ topics, unreadCounts });
  }
}

// Handle join request — a peer wants to join our room
async function handleJoinMessage(envelope) {
  const { senderKey, displayName, routeBlob, roomId } = envelope;

  // Store their route for future messages
  if (routeBlob) {
    state.peerRoutes[senderKey] = routeBlob;
    setState({ onlinePeers: Object.keys(state.peerRoutes).length });
  }

  // Add them as a member
  if (roomId) {
    await db.addMember(roomId, senderKey, displayName || '', 'member');
    if (state.currentRoom?.id === roomId) {
      const members = await db.getMembers(roomId);
      setState({ members });
    }
  }

  // Send welcome back with our route and current state
  if (routeBlob && state.localRoute) {
    const welcomeEnvelope = {
      type: 'welcome',
      senderKey: state.identity.public_key,
      displayName: state.identity.display_name,
      routeBlob: Array.from(state.localRoute.blob || []),
      roomId,
    };
    try {
      await sendToPeer(routeBlob, encodeEnvelope(welcomeEnvelope));
    } catch (e) {
      log.warn('[P2P] Failed to send welcome:', e.message);
    }
  }

  log.info('[P2P] Peer joined:', senderKey.slice(0, 16), displayName);
}

// Handle welcome response — room owner acknowledged our join
async function handleWelcomeMessage(envelope) {
  const { senderKey, displayName, routeBlob, roomId } = envelope;

  if (routeBlob) {
    state.peerRoutes[senderKey] = routeBlob;
    setState({ onlinePeers: Object.keys(state.peerRoutes).length });
  }

  if (roomId) {
    await db.addMember(roomId, senderKey, displayName || '', 'member');
    if (state.currentRoom?.id === roomId) {
      const members = await db.getMembers(roomId);
      setState({ members });
    }
  }

  log.info('[P2P] Welcome from:', senderKey.slice(0, 16), displayName);
}

async function handleAppCall(update) {
  log.info('[Veilid] AppCall received:', update);
  // Phase 4: handle sync requests via AppCall
}

async function handleValueChange(update) {
  log.info('[Veilid] ValueChange:', update);
  // Future: handle presence updates from DHT watch
}

// Handle sync request (Phase 4 — basic implementation)
async function handleSyncRequest(envelope) {
  // Future: send cr-sqlite changesets back
  log.info('[P2P] Sync request from:', envelope.senderKey?.slice(0, 16));
}

// Handle sync response (Phase 4 — basic implementation)
async function handleSyncResponse(envelope) {
  // Future: apply cr-sqlite changesets
  log.info('[P2P] Sync response, changes:', envelope.changes?.length);
}

// --- Handlers (passed to UI) ---

const handlers = {
  async createRoom(name) {
    try {
      // Create DHT record if Veilid is connected
      let dhtKey = '', ownerKey = '', ownerSecret = '', encryptionKey = '';
      if (veilid && state.veilidState === 'connected') {
        try {
          const dht = await veilid.createRoomDHT(name);
          dhtKey = dht.dhtKey;
          ownerKey = dht.ownerKey;
          ownerSecret = dht.ownerSecret;
          encryptionKey = dht.encryptionKey;
          log.info('[Veilid] DHT record created for room:', dhtKey);
        } catch (e) {
          log.warn('Failed to create DHT record, room will be local-only:', e);
        }
      }

      const room = await db.createRoom(name, state.identity.public_key, dhtKey, ownerKey, ownerSecret, encryptionKey);
      await db.updateMemberName(room.id, state.identity.public_key, state.identity.display_name);
      const rooms = await db.getRooms();
      await handlers.enterRoom(room.id);
      setState({ rooms });
    } catch (e) {
      setState({ error: e.message });
    }
  },

  // Join a room via invite (dht_key + encryption_key)
  async joinRoom(dhtKey, encryptionKey) {
    if (!dhtKey.trim()) {
      setState({ error: 'DHT key is required to join a room' });
      return;
    }

    try {
      if (!veilid || state.veilidState !== 'connected') {
        setState({ error: 'Not connected to Veilid network. Please wait for connection.' });
        return;
      }

      // Open the DHT record and read room metadata
      const dhtResult = await veilid.openRoomDHT(dhtKey.trim());
      if (!dhtResult.metadata) {
        setState({ error: 'Could not read room metadata from DHT' });
        return;
      }

      const meta = dhtResult.metadata;

      // Create room locally
      const room = await db.createRoom(
        meta.name || 'Unnamed Room',
        meta.created_by || '',
        dhtKey.trim(),
        '', '', // no owner key/secret for joiners
        encryptionKey.trim()
      );

      // Add self as member
      await db.updateMemberName(room.id, state.identity.public_key, state.identity.display_name);

      // Add existing members from metadata
      if (meta.member_keys) {
        for (const mk of meta.member_keys) {
          await db.addMember(room.id, mk, '', 'member');
        }
      }

      // Read creator's presence from subkey 1 to get their route
      try {
        const presence = await veilid.readPresence(dhtKey.trim(), 1);
        if (presence?.route_blob) {
          state.peerRoutes[presence.public_key] = presence.route_blob;

          // Send join message to creator
          if (state.localRoute) {
            const joinEnvelope = {
              type: 'join',
              senderKey: state.identity.public_key,
              displayName: state.identity.display_name,
              routeBlob: Array.from(state.localRoute.blob || []),
              roomId: room.id,
            };
            await sendToPeer(presence.route_blob, encodeEnvelope(joinEnvelope));
            log.info('[P2P] Join message sent to room creator');
          }
        }
      } catch (e) {
        log.warn('[P2P] Could not read creator presence:', e.message);
      }

      // Watch the DHT record for changes
      try {
        await veilid.watchRoom(dhtKey.trim());
      } catch (e) {
        log.warn('[P2P] Failed to watch room DHT:', e.message);
      }

      const rooms = await db.getRooms();
      setState({ rooms, onlinePeers: Object.keys(state.peerRoutes).length });
      await handlers.enterRoom(room.id);
    } catch (e) {
      setState({ error: 'Failed to join room: ' + e.message });
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

    // If room has DHT key and we're connected, publish presence
    if (room.dht_key && veilid && state.veilidState === 'connected') {
      publishPresence();
    }
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
    const msg = await db.postMessage(state.currentRoom.id, topic, state.identity.public_key, content.trim());

    // Broadcast to peers via AppMessage
    broadcastToPeers({
      type: 'chat_message',
      roomId: state.currentRoom.id,
      id: msg.id,
      topic,
      senderKey: state.identity.public_key,
      content: content.trim(),
      createdAt: msg.created_at,
    });

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
    const msg = await db.postMessage(
      state.currentRoom.id, topic.trim(), state.identity.public_key, content.trim()
    );

    // Broadcast to peers
    broadcastToPeers({
      type: 'chat_message',
      roomId: state.currentRoom.id,
      id: msg.id,
      topic: topic.trim(),
      senderKey: state.identity.public_key,
      content: content.trim(),
      createdAt: msg.created_at,
    });

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
      peerRoutes: {},
      onlinePeers: 0,
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

  // Copy invite text to clipboard (dht_key + encryption_key)
  async copyInvite() {
    if (!state.currentRoom?.dht_key) {
      setState({ error: 'This room has no DHT key (local-only room)' });
      return;
    }
    const invite = [state.currentRoom.dht_key, state.currentRoom.encryption_key].filter(Boolean).join('\n');
    try {
      await navigator.clipboard.writeText(invite);
    } catch (e) {
      // Fallback: select text in a temporary textarea
      const ta = document.createElement('textarea');
      ta.value = invite;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  },

  clearError() {
    setState({ error: null });
  },
};

// --- Bootstrap ---

async function boot() {
  try {
    log.info('Boot: initializing DB worker...');
    // 1. Initialize DB
    db = new DB();
    await db.init();
    log.ok('Boot: DB initialized');

    // 2. Load or create identity
    let identity = await db.getIdentity();
    if (!identity) {
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

    // 3. Initialize Veilid (async, non-blocking — UI is already interactive)
    bootVeilid();
  } catch (e) {
    setState({ phase: 'loading', error: 'Failed to initialize: ' + e.message });
  }
}

async function bootVeilid() {
  try {
    log.info('Veilid: loading WASM...');
    setState({ veilidState: 'loading' });
    veilid = new Veilid(handleVeilidUpdate);
    await veilid.init(BOOTSTRAP_URL);
    log.ok('Veilid: core started, attaching to network...');
    setState({ veilidState: 'connecting' });

    // Generate Veilid identity if we're still using a LOCAL: placeholder
    if (state.identity && state.identity.public_key.startsWith('LOCAL:')) {
      try {
        const kp = await veilid.generateKeyPair();
        // Update identity with real Veilid public key
        const newIdentity = await db.createIdentity(kp.publicKey, state.identity.display_name);
        setState({ identity: newIdentity });
      } catch (e) {
        log.warn('Failed to generate Veilid keypair, keeping local identity:', e);
      }
    }
  } catch (e) {
    log.error('Veilid init failed:', e);
    setState({
      veilidState: 'error',
      veilidError: e.message || 'Failed to connect to Veilid network',
    });
  }
}

boot();
