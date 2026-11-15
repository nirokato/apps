# Local Veilid source changes for weft's WASM build

`build.sh` applies every `*.patch` here to the Veilid checkout before building, and lists
them in `BUILD_INFO.json`. A patch that no longer applies fails the build: update it for
the new tag, or delete it if it is no longer wanted.

These are local workarounds, not fixes. Both relax a check that Veilid makes on purpose,
so that a browser client with a single reachable WSS node can get further than Veilid's
own requirements allow. They sit at the edge of Veilid's security requirements and are
not proposed for Veilid itself. They were written for an experiment (see
`projects/weft/docs/wss-transport-blockers.md`, "Where 0.5.8 stops"); weigh that before
shipping a bundle built with them.

## 0001-wasm-wss-dial-by-hostname.patch

**Veilid's behaviour (0.5.8):** in the browser, `WebsocketProtocolHandler::connect`
(`veilid-core/src/network_manager/network/wasm/protocol/ws.rs`) rebuilds the WebSocket
URL from the dial info's socket address whenever the IP is known, so the connection goes
to the exact address in the signed peer info. A peer dial to
`wss|50.37.118.208|veilid.andymolenda.com:5150/ws` opens `wss://50.37.118.208:5150/ws`.

**Effect on weft:** the home node's certificate is for the hostname, so the browser drops
the TLS handshake and Veilid reports `CloseEvent { code: 1006 }`. Only the bootstrap
one-shot, whose address is `0.0.0.0`, keeps the hostname. A packet capture on the node
(2026-11-15) showed this.

**Workaround:** for `wss`, connect with the dial info's request URL (the hostname). `ws`
is unchanged.

**What it gives up:** the dial follows DNS for the hostname and no longer pins the IP
address carried in the peer info.

## 0002-relay-requirements-configured-address-types.patch

**Veilid's behaviour (0.5.8):** `RelayRequirements::new`
(`veilid-core/src/routing_table/routing_domains/relay_requirements.rs`) requires relay
coverage for every address type, whatever the node is configured for, so a node stays
reachable from both IPv4 and IPv6 peers.

**Effect on weft:** a browser client has no dial info of its own, so even with
`network.addressTypes = ["IPV4"]` it needs relays covering IPv6. The only relay it can
dial over WSS is the IPv4-only home node, so it stays at `inbound=NeedsRelays` and never
publishes peer info.

**Workaround:** seed the requirement from the routing domain's configured address types.

**What it gives up:** IPv6-only peers cannot reach the browser through its relay. Public
IPv6 on the home node would make this patch unnecessary.
