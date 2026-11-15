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

## 0002-relay-requirements-configured-address-types.patch

**Problem (Veilid 0.5.8):** `RelayRequirements::new`
(`veilid-core/src/routing_table/routing_domains/relay_requirements.rs`) seeds the relay
orderings a node needs from every address type, not the ones it is configured for. A
browser client has no dial info of its own, so even with `network.addressTypes = ["IPV4"]`
it needs relays covering IPv6. The only relay it can dial over WSS is the IPv4-only home
node, so the requirement is never met, the client stays at `inbound=NeedsRelays`, and it
never publishes peer info or allocates a private route.

**Fix:** seed from the routing domain's configured address types.

**Trade-off:** IPv6-only peers cannot reach the browser through its relay. Giving the home
node public IPv6 would remove the need for this patch.

**Upstream:** not reported yet.
