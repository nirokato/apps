// UI rendering with lit-html — topic-river layout
import { html, render } from 'https://cdn.jsdelivr.net/npm/lit-html@3/+esm';

const root = () => document.getElementById('app');

// Debounce helper for search
let searchTimer = null;
function debounce(fn, ms) {
  return (...args) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => fn(...args), ms);
  };
}

function formatTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (isToday) return time;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return `yesterday ${time}`;
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + time;
}

function senderName(msg, identity) {
  if (msg.sender_key === identity.public_key) return identity.display_name || 'You';
  return msg.sender_name || msg.sender_key.slice(0, 12) + '...';
}

// --- Connection status ---

function renderConnectionStatus(state) {
  switch (state.veilidState) {
    case 'connected':
      return html`<span class="status status-connected">&#9679; connected</span>`;
    case 'connecting':
      return html`<span class="status status-connecting">&#9680; connecting...</span>`;
    case 'loading':
      return html`<span class="status status-connecting">&#9680; loading...</span>`;
    case 'error':
      return html`<span class="status status-error" title="${state.veilidError || ''}">&#9675; error</span>`;
    default:
      return html`<span class="status status-offline">&#9675; offline</span>`;
  }
}

// --- Loading screen ---

function renderLoading(state) {
  return html`
    <div class="center-content">
      <h1 class="logo">weft</h1>
      <p class="subtitle">loading...</p>
      ${state.error ? html`<p class="error">${state.error}</p>` : ''}
    </div>
  `;
}

// --- Setup / room list ---

function renderSetup(state, h) {
  return html`
    <div class="center-content">
      <h1 class="logo">weft</h1>
      <p class="subtitle">local-first topic-threaded chat</p>

      <div class="identity-bar">
        <span class="label">Your name:</span>
        <input type="text" class="input inline-input" .value=${state.identity.display_name}
          @keydown=${(e) => { if (e.key === 'Enter') h.updateDisplayName(e.target.value); }}
          @blur=${(e) => h.updateDisplayName(e.target.value)}
          placeholder="Enter your name">
      </div>

      ${state.rooms.length > 0 ? html`
        <div class="section">
          <h2 class="section-title">Your rooms</h2>
          ${state.rooms.map(r => html`
            <button class="room-card" @click=${() => h.enterRoom(r.id)}>
              <span class="room-name">${r.name}</span>
              <span class="room-meta">${formatTime(r.created_at)}</span>
            </button>
          `)}
        </div>
      ` : ''}

      <div class="section">
        <h2 class="section-title">Get started</h2>
        <div class="action-row">
          <input type="text" id="new-room-name" class="input" placeholder="Room name">
          <button class="btn btn-primary" @click=${() => {
            const input = document.getElementById('new-room-name');
            if (input.value.trim()) h.createRoom(input.value.trim());
          }}>Create room</button>
        </div>
        <div class="action-row">
          <label class="btn btn-secondary import-label">
            Import room
            <input type="file" accept=".json" hidden @change=${(e) => {
              if (e.target.files[0]) h.importRoom(e.target.files[0]);
            }}>
          </label>
        </div>
      </div>

      ${state.error ? html`
        <p class="error" @click=${h.clearError}>${state.error}</p>
      ` : ''}

      <p class="back"><a href="https://apps.andymolenda.com">&larr; apps.andymolenda.com</a></p>
    </div>
  `;
}

// --- Chat view ---

function renderChat(state, h) {
  const room = state.currentRoom;
  const filteredTopics = state.searchQuery
    ? state.topics.filter(t => t.topic.toLowerCase().includes(state.searchQuery.toLowerCase()))
    : state.topics;

  return html`
    <div class="chat-layout">
      <!-- Header -->
      <header class="chat-header">
        <div class="header-left">
          <button class="btn-icon" @click=${h.backToRoomList} title="Back to rooms">&larr;</button>
          <span class="header-title">weft</span>
          <span class="header-sep">&middot;</span>
          <span class="header-room">${room.name}</span>
        </div>
        <div class="header-right">
          ${renderConnectionStatus(state)}
          <button class="btn-icon" @click=${h.showSettings} title="Settings">&#9881;</button>
        </div>
      </header>

      <!-- Search -->
      <div class="search-bar">
        <input type="text" class="input search-input" placeholder="Search topics..."
          .value=${state.searchQuery}
          @input=${debounce((e) => h.search(e.target.value), 200)}>
        ${state.searchQuery ? html`
          <button class="btn-icon search-clear" @click=${h.clearSearch}>&times;</button>
        ` : ''}
      </div>

      <!-- Search results -->
      ${state.searchResults ? html`
        <div class="search-results">
          <p class="search-results-count">${state.searchResults.length} result${state.searchResults.length !== 1 ? 's' : ''}</p>
          ${state.searchResults.map(r => html`
            <div class="search-result" @click=${() => { h.clearSearch(); h.toggleTopic(r.topic); }}>
              <span class="search-result-topic">${r.topic}</span>
              <span class="search-result-content">${r.content.length > 100 ? r.content.slice(0, 100) + '...' : r.content}</span>
              <span class="search-result-time">${formatTime(r.created_at)}</span>
            </div>
          `)}
        </div>
      ` : ''}

      <!-- Topic river -->
      <div class="topic-river">
        ${filteredTopics.length === 0 && !state.searchQuery ? html`
          <div class="empty-state">
            <p>No topics yet. Start a conversation below.</p>
          </div>
        ` : ''}

        ${filteredTopics.map(t => {
          const isExpanded = state.expandedTopics.has(t.topic);
          const msgs = state.topicMessages[t.topic] || [];
          const unread = state.unreadCounts[t.topic] || 0;
          const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;

          return html`
            <div class="topic-card ${isExpanded ? 'expanded' : ''}">
              <div class="topic-header" @click=${() => h.toggleTopic(t.topic)}>
                <span class="topic-name">${t.topic}</span>
                <span class="topic-meta">
                  ${unread > 0 ? html`<span class="badge">${unread} new</span>` : ''}
                  <span class="topic-count">${t.message_count} msg${t.message_count !== 1 ? 's' : ''}</span>
                </span>
              </div>

              ${isExpanded ? html`
                <div class="topic-messages">
                  ${msgs.map(m => html`
                    <div class="message ${m.sender_key === state.identity.public_key ? 'own' : ''}">
                      <div class="message-header">
                        <span class="message-sender">${senderName(m, state.identity)}</span>
                        <span class="message-time">${formatTime(m.created_at)}</span>
                      </div>
                      <div class="message-content">${m.content}</div>
                    </div>
                  `)}
                </div>
                <div class="topic-compose">
                  <input type="text" class="input compose-input"
                    placeholder="Message #${t.topic}..."
                    @keydown=${(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        h.sendMessage(t.topic, e.target.value);
                        e.target.value = '';
                      }
                    }}>
                  <button class="btn btn-send" @click=${(e) => {
                    const input = e.target.previousElementSibling;
                    if (input.value.trim()) {
                      h.sendMessage(t.topic, input.value);
                      input.value = '';
                    }
                  }}>Send</button>
                </div>
              ` : html`
                <div class="topic-preview" @click=${() => h.toggleTopic(t.topic)}>
                  ${lastMsg ? html`
                    <span class="preview-sender">${senderName(lastMsg, state.identity)}:</span>
                    <span class="preview-text">${lastMsg.content.length > 80 ? lastMsg.content.slice(0, 80) + '...' : lastMsg.content}</span>
                  ` : html`<span class="preview-text">No messages</span>`}
                </div>
              `}
            </div>
          `;
        })}
      </div>

      <!-- New topic compose -->
      <div class="new-topic-bar">
        <input type="text" id="new-topic-name" class="input new-topic-input" placeholder="New topic">
        <input type="text" id="new-topic-message" class="input new-topic-message" placeholder="First message..."
          @keydown=${(e) => {
            if (e.key === 'Enter') {
              const topicInput = document.getElementById('new-topic-name');
              if (topicInput.value.trim() && e.target.value.trim()) {
                h.sendNewTopic(topicInput.value, e.target.value);
                topicInput.value = '';
                e.target.value = '';
              }
            }
          }}>
        <button class="btn btn-primary" @click=${() => {
          const topicInput = document.getElementById('new-topic-name');
          const msgInput = document.getElementById('new-topic-message');
          if (topicInput.value.trim() && msgInput.value.trim()) {
            h.sendNewTopic(topicInput.value, msgInput.value);
            topicInput.value = '';
            msgInput.value = '';
          }
        }}>Post</button>
      </div>

      <!-- Footer -->
      <footer class="chat-footer">
        <button class="btn btn-secondary btn-sm" @click=${h.exportRoom}>Export</button>
        <label class="btn btn-secondary btn-sm import-label">
          Import
          <input type="file" accept=".json" hidden @change=${(e) => {
            if (e.target.files[0]) h.importRoom(e.target.files[0]);
          }}>
        </label>
        <a class="back-link" href="https://apps.andymolenda.com">&larr; apps.andymolenda.com</a>
      </footer>

      ${state.error ? html`
        <div class="toast error" @click=${h.clearError}>${state.error}</div>
      ` : ''}
    </div>
  `;
}

// --- Settings view ---

function renderSettings(state, h) {
  return html`
    <div class="settings-layout">
      <header class="chat-header">
        <div class="header-left">
          <button class="btn-icon" @click=${h.backToChat}>&larr;</button>
          <span class="header-title">Settings</span>
        </div>
      </header>

      <div class="settings-content">
        <div class="setting-group">
          <h3>Identity</h3>
          <label class="setting-label">Display name</label>
          <input type="text" class="input" .value=${state.identity.display_name}
            @blur=${(e) => h.updateDisplayName(e.target.value)}
            @keydown=${(e) => { if (e.key === 'Enter') h.updateDisplayName(e.target.value); }}>
          <label class="setting-label">Public key</label>
          <code class="setting-value">${state.identity.public_key}</code>
        </div>

        ${state.currentRoom ? html`
          <div class="setting-group">
            <h3>Room: ${state.currentRoom.name}</h3>
            <label class="setting-label">Room ID</label>
            <code class="setting-value">${state.currentRoom.id}</code>
            <label class="setting-label">Created</label>
            <code class="setting-value">${formatTime(state.currentRoom.created_at)}</code>
          </div>

          <div class="setting-group">
            <h3>Members (${state.members.length})</h3>
            ${state.members.map(m => html`
              <div class="member-row">
                <span class="member-name">${m.display_name || m.public_key.slice(0, 16) + '...'}</span>
                <span class="member-role">${m.role}</span>
              </div>
            `)}
          </div>

          <div class="setting-group">
            <h3>Data</h3>
            <div class="action-row">
              <button class="btn btn-secondary" @click=${h.exportRoom}>Export room (JSON)</button>
            </div>
            <div class="action-row">
              <label class="btn btn-secondary import-label">
                Import room / messages
                <input type="file" accept=".json" hidden @change=${(e) => {
                  if (e.target.files[0]) h.importRoom(e.target.files[0]);
                }}>
              </label>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// --- Main render ---

export function renderApp(state, handlers) {
  let content;
  switch (state.phase) {
    case 'loading': content = renderLoading(state); break;
    case 'setup': content = renderSetup(state, handlers); break;
    case 'chat': content = renderChat(state, handlers); break;
    case 'settings': content = renderSettings(state, handlers); break;
    default: content = renderLoading(state);
  }
  render(content, root());
}
