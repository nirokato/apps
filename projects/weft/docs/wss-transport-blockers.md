# WSS Transport Blockers — WASM ↔ Veilid Network

**Date:** 2026-04-02
**Status:** RESOLVED — veilid-server rebuilt with WSS support, direct TLS on port 5150

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

### Step 3: Verify end-to-end ✅

Headless Chromium test from `http://localhost:8000`:
```
Attachment: Attaching → AttachedWeak → AttachedGood → AttachedStrong → FullyAttached → OverAttached
Outbound protocols: EnumSet(WS | WSS)
Relays: [VLD0:OTV5wNauJK4_ufEreqk9wJjHdWrJTjpOOWAVQCWDLx4] (Andy's node)
Bootstrap: Direct bootstrap v1 response with full peer info
```

No mixed content errors. WASM client fully connected with Andy's node as relay.

---

## Resolution Details

### What was needed to fix the WSS blocker

1. **Rebuild veilid-server with `enable-protocol-wss`** — the Debian nightly package doesn't include it
2. **Add `async-tls` as a direct dependency** in `veilid-core/Cargo.toml` — WSS code imports it directly but it was only a transitive dep via `async-tungstenite`
3. **Fix compilation errors** in `start_protocols.rs` and `mod.rs`:
   - Add `.await` to `start_wss_listeners()` call (async fn called without await)
   - Remove `.await` from `convert_listen_address_to_bind_set()` and `start_tcp_listener()` (sync fns with spurious await)
   - Remove `async` from `register_wss_dial_info` (declared async but no awaits inside)
4. **Use async-std runtime** (`--no-default-features --features 'default-async-std,enable-protocol-wss'`) — WSS TLS code uses `async-tls` which is async-std, not tokio
5. **Build with musl target** (`x86_64-unknown-linux-musl`) — Arch container has glibc 2.43, Debian node has 2.36
6. **Issue RSA cert** (not ECDSA) — veilid's rustls config failed with EC keys
7. **Include port in WSS URL** — `wss://veilid.andymolenda.com:5150/ws` not `wss://veilid.andymolenda.com/ws` (veilid panics on missing port)
8. **DNS: A record** pointing directly at public IP (50.37.118.208), DNS-only (not proxied), replacing Cloudflare tunnel CNAME
9. **Cloudflare tunnel removed** — no longer needed, direct WSS to veilid-server

### What can be cleaned up

- nginx on 192.168.0.11 — no longer needed (was proxying bootstrap to official node)
- cloudflared package — can be uninstalled
- The `/etc/hosts` override on ares (`192.168.0.11 veilid.andymolenda.com`) is needed for hairpin NAT

---

## Infrastructure Reference (current)

### Veilid Node (192.168.0.11)

```
veilid-server v0.5.3 (custom build: async-std + enable-protocol-wss, musl static binary)
Binary: /usr/bin/veilid-server (backup: /usr/bin/veilid-server.bak = original Debian nightly)
Port: 5150 (UDP/TCP/WS/WSS, multiplexed — TLS auto-detected via first byte 0x16)
Public IP: 50.37.118.208 (port-forwarded through home router)
DNS: veilid.andymolenda.com → 50.37.118.208 (A record, DNS-only, not proxied)
NAT type: FullConeNAT (UDP), varies for TCP/WS
Protocols: UDP, TCP, WS, WSS (all on port 5150)
Capabilities: ROUT, SGNL, RLAY, DIAL, DHTV, APPM
Advertised WSS: Direct:wss|50.37.118.208|veilid.andymolenda.com:5150/ws
```

### TLS Certificate

```
Issuer: ZeroSSL RSA DV SSL CA 2 (via acme.sh + Cloudflare DNS challenge)
Key type: RSA 2048 (not ECDSA — rustls in veilid failed with EC keys)
Domain: veilid.andymolenda.com
Validity: 2026-04-02 to 2026-07-01 (90 days, auto-renewable)
Cert: /etc/veilid-server/ssl/fullchain.crt
Key: /etc/veilid-server/ssl/server.key
Renewal: ~/.acme.sh/acme.sh --cron (needs systemd timer — no cron on node)
DNS challenge token: apps-deploy Cloudflare API token (Zone:DNS:Edit)
```

### Build Environment (nspawn container 'veilid-build' on ares)

```
Source: /home/coder/veilid (cloned from gitlab.com/veilid/veilid, tag v0.5.3)
Patches applied:
  - veilid-core/Cargo.toml: added async-tls = "0.13" as direct dependency
  - start_protocols.rs: removed spurious .await on sync fns, removed async on register_wss_dial_info
  - native/mod.rs: added .await on start_wss_listeners() call

Server build command:
  cargo build --release --target x86_64-unknown-linux-musl \
    --no-default-features --features 'default-async-std,enable-protocol-wss'

WASM build command:
  cd veilid-wasm && wasm-pack build --release --target web -- --features enable-protocol-wss
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

3. **Bootstrap and peer connections are the same in WSS mode.** With WSS-enabled veilid-server, the WASM client bootstraps directly to the server AND maintains an ongoing peer connection. The server responds to BOOT/B01T and also serves as a relay. No need for a separate bootstrap proxy.

4. **Veilid's WSS code has compilation bugs on v0.5.3.** The `async-tls` crate is imported but not declared as a direct dependency. Several functions have async/await mismatches. These had to be patched locally.

5. **RSA certs required.** Veilid's rustls config fails silently with ECDSA/EC keys — must use RSA.

6. **WSS URL must include port.** `wss://host/ws` causes a panic (missing port in URL parsing). Must be `wss://host:5150/ws`.

7. **The relay system works automatically.** Once the WASM client can reach a WSS node, Veilid's relay management assigns that node as its relay. Traffic flows: WASM client → WSS → your node → UDP/TCP → rest of network.

8. **DHTSchema uses serde externally-tagged enums** (`{SMPL: {oCnt: 1, ...}}` not `{kind: 'SMPL', ...}`) and camelCase field names when compiled with `json-camel-case`.

9. **WASM Worker polyfills needed:** `Window = self.constructor`, `window = self`, in-memory `localStorage` shim, `crypto` variable renamed to avoid shadowing `globalThis.crypto`.
