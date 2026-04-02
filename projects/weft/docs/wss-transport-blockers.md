# WSS Transport Blockers — WASM ↔ Veilid Network

**Date:** 2026-04-02
**Status:** Blocking — must be resolved before two-peer messaging works from HTTPS-hosted weft

---

## The Problem

Weft is served from `https://weft.apps.andymolenda.com` (Cloudflare Pages). From an HTTPS page, browsers **block all `ws://` WebSocket connections** as mixed content. This is a W3C normative MUST — no CSP header, meta tag, Service Worker, Web Worker, or browser flag can bypass it in production.

The Veilid network's nodes only advertise `ws://` dial info (not `wss://`). After bootstrapping, the WASM client discovers peers but cannot connect to any of them:

```
failed to connect: None -> ws|170.64.186.46:5150/ws
"An insecure WebSocket connection may not be initiated from a page loaded over HTTPS."
```

**Bootstrap works** — the WSS proxy through Cloudflare Tunnel → nginx → official bootstrap resolves peer info. The WASM client gets to `AttachedWeak` and even `OverAttached`. But it cannot establish actual peer connections because every peer's dial info is `ws://`.

---

## What Works Today

| Feature | Status | Notes |
|---------|--------|-------|
| Veilid WASM boot | ✅ | With `enable-protocol-wss` feature + Worker polyfills |
| Bootstrap via WSS proxy | ✅ | `wss://veilid.andymolenda.com/ws` → nginx → `bootstrap-v1.veilid.net:5150/ws` |
| Network attachment | ✅ | Reaches OverAttached via bootstrap |
| DHT record create | ✅ | Live-tested, real DHT keys on network |
| DHT record open/read | ✅ | Live-tested |
| AppMessage loopback | ✅ | Send to own private route, message arrives |
| AppMessage to remote peer | ❌ | All peers only advertise `ws://`, blocked by mixed content |
| Private route connectivity | ❌ | Routes exist but can't reach peers to use them |

---

## Root Cause Analysis

### 1. Browser Mixed Content Policy (cannot change)

The W3C Mixed Content specification classifies WebSocket `ws://` connections from HTTPS pages as **blockable active mixed content**. Browsers MUST block these — there is no opt-out:

- No CSP directive allows mixed content (CSP is restriction-only)
- `upgrade-insecure-requests` rewrites `ws://` to `wss://` but the target must support TLS
- Service Workers cannot intercept WebSocket connections (per spec)
- Web Workers inherit the parent page's security context
- No browser flag works reliably in production
- `localhost` is a secure context but doesn't exempt connections *from* an HTTPS page *to* `ws://` targets

### 2. Veilid Network Doesn't Advertise WSS (can change)

The official Veilid bootstrap nodes and all network peers advertise only `ws://` endpoints:

```
DialInfoDetail { class: Direct, dial_info: ws|170.64.186.46:5150/ws }
```

No node advertises `wss://` because:
- **`enable-protocol-wss` is not a default feature** in veilid-core, veilid-server, or veilid-wasm
- The official veilid-server Debian packages (including nightly) are compiled without WSS
- Running WSS requires a valid TLS certificate on the veilid-server process

### 3. Andy's Veilid Node Doesn't Serve WSS (can change)

The veilid-server at `192.168.0.11` is compiled from the nightly Debian package **without `enable-protocol-wss`**. Even though we:
- Obtained a valid Let's Encrypt cert for `veilid.andymolenda.com` (via acme.sh + Cloudflare DNS challenge)
- Configured `tls.certificate_path` and `tls.private_key_path` in veilid-server.conf
- Set `wss.listen = true` and `wss.url = 'wss://veilid.andymolenda.com/ws'`

...the binary silently ignores the WSS config because the feature isn't compiled in. The server only advertises `udp`, `tcp`, and `ws` dial info.

---

## Solution Path

### Step 1: Build veilid-server with WSS support (NEXT)

Compile veilid-server from source with `--features enable-protocol-wss` on the nspawn build container:

```bash
sudo nspawn-manager start veilid-build
# In container:
cd veilid/veilid-server
cargo build --release --features enable-protocol-wss
```

Deploy the binary to `192.168.0.11`, replacing the Debian package binary.

**Prerequisites already in place:**
- TLS cert: `/etc/veilid-server/ssl/fullchain.crt` (Let's Encrypt via acme.sh, Cloudflare DNS challenge)
- TLS key: `/etc/veilid-server/ssl/server.key`
- Config: `tls`, `wss.listen = true`, `wss.url` all set in `veilid-server.conf`
- Port forwarding: 5150 is already forwarded through the home router
- acme.sh renewal: installed, needs a systemd timer (no cron on the node)

**Expected result:** The server advertises `wss|veilid.andymolenda.com:5150/ws` in its PublicInternet dial info. Browser WASM clients can connect directly to it via WSS.

### Step 2: Update WASM bootstrap to connect directly to WSS node

Once the server advertises WSS, update the WASM client's bootstrap to include the WSS dial info for Andy's node. The WASM client would:
1. Bootstrap via the existing WSS proxy (gets peer list)
2. Connect to Andy's node via `wss://veilid.andymolenda.com:5150/ws` (direct WSS)
3. Andy's node relays to the rest of the network via UDP/TCP

### Step 3: Verify end-to-end

- Two browser tabs on `https://weft.apps.andymolenda.com`
- Both bootstrap, both connect to Andy's WSS node
- Create room in tab A, join in tab B
- Send messages, verify they arrive via AppMessage through the relay

---

## Alternative Approaches (if WSS build doesn't work)

### WebRTC Hybrid
Keep Veilid for identity, DHT, and crypto. Use WebRTC data channels (like peer-drop) for browser-to-browser message transport. The DHT stores signaling info instead of Veilid route blobs.

**Pros:** Already proven (peer-drop works), no TLS cert issues
**Cons:** Adds WebRTC complexity, loses Veilid's privacy routing

### WebTransport (future)
WebTransport supports self-signed certs via `serverCertificateHashes`. If Veilid added WebTransport support, browser nodes could connect to any peer without CA certificates. This is the best long-term P2P answer but requires Veilid protocol changes.

### Tauri Wrapper
Wrap weft in Tauri for a native app. No mixed content restrictions, full network access. Loses the "just a URL" simplicity.

### HTTP-Only Deployment
Serve weft from `http://` instead of HTTPS. Only viable for local network use. Loses secure context APIs.

---

## Infrastructure Reference

### Veilid Node (192.168.0.11)

```
veilid-server v0.5.3 (Debian nightly, WITHOUT enable-protocol-wss)
Port: 5150 (UDP/TCP/WS, multiplexed)
Public IP: 50.37.118.208 (port-forwarded)
NAT type: FullConeNAT (UDP), PortRestrictedNAT (TCP/WS)
Peers: ~30-40 active connections
Capabilities: ROUT, SGNL, RLAY, DIAL, DHTV, APPM
```

### TLS Certificate

```
Issuer: ZeroSSL ECC DV SSL CA 2 (via acme.sh)
Domain: veilid.andymolenda.com
Validity: 2026-04-02 to 2026-07-01 (90 days)
Cert: /etc/veilid-server/ssl/fullchain.crt
Key: /etc/veilid-server/ssl/server.key
Renewal: acme.sh --cron (needs systemd timer, no cron on node)
```

### nginx WSS Proxy (bootstrap only)

```
Listen: 127.0.0.1:5151
Proxies /ws to: bootstrap-v1.veilid.net:5150/ws (official bootstrap)
Cloudflare Tunnel routes wss://veilid.andymolenda.com → ws://127.0.0.1:5151
Purpose: Provides WSS bootstrap for WASM clients on HTTPS pages
NOTE: This only handles bootstrap requests (BOOT/B01T magic), NOT ongoing peer connections
```

### WASM Build

```
Version: veilid-wasm 0.5.3
Features: enable-protocol-wss, enable-crypto-vld0, json-camel-case
Built in: nspawn container 'veilid-build' on ares
Worker patches: instanceof Window + WINDOW accessor + crypto rename
Location: projects/weft/wasm/veilid/
```

---

## Key Learnings

1. **`enable-protocol-wss` is not default** in any Veilid component (server, WASM, CLI). Must be explicitly enabled at compile time.

2. **Veilid multiplexes protocols on one port.** Port 5150 handles UDP, TCP, WS, and WSS. TLS is auto-detected by checking if the first byte is `0x16` (TLS ClientHello).

3. **Bootstrap ≠ peer connection.** Our WSS proxy handles bootstrap (HTTP-level WebSocket with BOOT/B01T magic). But post-bootstrap peer connections are Veilid protocol-level and go directly to each peer's advertised dial info.

4. **Veilid nodes do NOT respond to BOOT/B01T over WebSocket.** Only the official bootstrap servers handle bootstrap requests. Regular nodes handle Veilid protocol envelopes.

5. **The Veilid relay system exists** (`RLAY` capability) but doesn't help if the WASM client can't reach any relay over WSS in the first place.

6. **DHTSchema uses serde externally-tagged enums** (`{SMPL: {oCnt: 1, ...}}` not `{kind: 'SMPL', ...}`) and camelCase field names when compiled with `json-camel-case`.

7. **WASM Worker polyfills needed:** `Window = self.constructor`, `window = self`, in-memory `localStorage` shim, `crypto` variable renamed to avoid shadowing `globalThis.crypto`.
