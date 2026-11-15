# Veilid source patches for weft's WASM build

`build.sh` applies every `*.patch` here to the Veilid checkout before building, and lists
them in `BUILD_INFO.json`. A patch that no longer applies fails the build: update it for
the new tag, or delete it once upstream has the fix.

## 0001-wasm-wss-dial-by-hostname.patch

**Problem (Veilid 0.5.8):** in the browser, `WebsocketProtocolHandler::connect`
(`veilid-core/src/network_manager/network/wasm/protocol/ws.rs`) rebuilds the WebSocket
URL from the dial info's socket address whenever the IP is known. A peer dial to
`wss|50.37.118.208|veilid.andymolenda.com:5150/ws` therefore opens
`wss://50.37.118.208:5150/ws`. The node's certificate is for the hostname, so the browser
drops the TLS handshake and Veilid reports `CloseEvent { code: 1006 }`. Only the bootstrap
one-shot, whose address is `0.0.0.0`, keeps the hostname and works.

**Evidence:** a packet capture on the node (2026-11-15) showed the failing connections
sending a short ClientHello and closing right after the server's certificate, while the
bootstrap connection from the same browser completed.

**Fix:** for `wss`, always connect with the dial info's request URL (the hostname). `ws`
is unchanged.

**Upstream:** not reported yet.
