/* tslint:disable */
/* eslint-disable */

declare const CryptoKindSymbol: unique symbol
export type CryptoKind = Opaque<CryptoKindInner, typeof CryptoKindSymbol>



declare const OpaqueNewTypeSymbol: unique symbol
declare class OpaqueNewType<S extends symbol> {
    private [OpaqueNewTypeSymbol]: S
}
type Opaque<T, S extends symbol> = (T & OpaqueNewType<S>) | OpaqueNewType<S>



declare const VeilidCapabilitySymbol: unique symbol
export type VeilidCapability = Opaque<VeilidCapabilityInner, typeof VeilidCapabilitySymbol>



export type UpdateVeilidFunction = (event: VeilidUpdate) => void;


/**
 * 8-byte-aligned `u64` newtype that serializes as a string for JSON safety.
 */
export type AlignedU64 = string;

/**
 * 8-byte-aligned `u64` newtype that serializes as a string for JSON safety.
 */
export type ByteCount = string;

/**
 * 8-byte-aligned `u64` newtype that serializes as a string for JSON safety.
 */
export type NodeCount = string;

/**
 * 8-byte-aligned `u64` newtype that serializes as a string for JSON safety.
 */
export type OperationId = string;

/**
 * 8-byte-aligned `u64` newtype that serializes as a string for JSON safety.
 */
export type Timestamp = string;

/**
 * 8-byte-aligned `u64` newtype that serializes as a string for JSON safety.
 */
export type TimestampDuration = string;

/**
 * A DHT value and its metadata
 */
export interface ValueData {
    /**
     * An increasing sequence number to time-order the DHT record changes
     */
    seq: ValueSeqNum;
    /**
     * The contents of a DHT Record
     */
    data: Uint8Array;
    /**
     * The public identity key of the writer of the data
     */
    writer: PublicKey;
}

/**
 * A DHT value and its metadata
 */
export interface ValueData {
    /**
     * An increasing sequence number to time-order the DHT record changes
     */
    seq: ValueSeqNum;
    /**
     * The contents of a DHT Record
     */
    data: Uint8Array;
    /**
     * The public identity key of the writer of the data
     */
    writer: PublicKey;
}

/**
 * A VeilidCore log message with optional backtrace.
 */
export interface VeilidLog {
    /**
     * Severity of the message.
     */
    logLevel: VeilidLogLevel;
    /**
     * The log message text.
     */
    message: string;
    /**
     * Backtrace, present for errors when available.
     */
    backtrace?: string;
}

/**
 * A condition on [VeilidStateAttachment], for [VeilidAPI::wait_for_attachment_condition].
 *
 * A field left `None` is not checked, so the default condition holds for every state.
 */
export interface VeilidStateAttachmentCondition {
    /**
     * The least attached state that satisfies the condition.
     */
    optMinState?: AttachmentState;
    /**
     * The most attached state that satisfies the condition.
     */
    optMaxState?: AttachmentState;
    /**
     * The PublicInternet readiness that satisfies the condition.
     */
    optPublicInternetReady?: boolean;
    /**
     * The LocalNetwork readiness that satisfies the condition.
     */
    optLocalNetworkReady?: boolean;
}

/**
 * A four-character code
 */
export type CryptoKindInner = string;

/**
 * A four-character code
 */
export type EnvelopeVersionInner = string;

/**
 * A four-character code
 */
export type ReceiptVersionInner = string;

/**
 * A four-character code
 */
export type VeilidCapabilityInner = string;

/**
 * A queriable state of the internals of veilid-core.
 */
export interface VeilidState {
    /**
     * The current attachment state.
     */
    attachment: VeilidStateAttachment;
    /**
     * The current network state.
     */
    network: VeilidStateNetwork;
    /**
     * The current node configuration.
     */
    config: VeilidStateConfig;
}

/**
 * A set of DHT subkeys stored as inclusive ranges of [ValueSubkey]
 */
export type ValueSubkeyRangeSet = Array<[ValueSubkey, ValueSubkey]>;

/**
 * API-visible statistics for a peer in the routing table
 */
export interface PeerStats {
    /**
     * latency stats for this peer
     */
    latency?: LatencyStats | undefined;
    /**
     * transfer stats for this peer
     */
    transfer?: TransferStatsDownUp;
}

/**
 * An IP address family (IP version) the node may use.
 */
declare namespace VeilidConfigAddressType {
    /**
     * IPv4 (32-bit) addresses.
     */
    export type IPV4 = "IPV4";
    /**
     * IPv6 (128-bit) addresses.
     */
    export type IPV6 = "IPV6";
}

/**
 * An IP address family (IP version) the node may use.
 */
export type VeilidConfigAddressType = VeilidConfigAddressType.IPV4 | VeilidConfigAddressType.IPV6;

/**
 * An update from the veilid-core to the host application describing a change
 * to the internal state of the Veilid node.
 */
export type VeilidUpdate = ({ kind: "Log" } & VeilidLog) | ({ kind: "AppMessage" } & VeilidAppMessage) | ({ kind: "AppCall" } & VeilidAppCall) | ({ kind: "Attachment" } & VeilidStateAttachment) | ({ kind: "Network" } & VeilidStateNetwork) | ({ kind: "Config" } & VeilidStateConfig) | ({ kind: "RouteChange" } & VeilidRouteChange) | ({ kind: "ValueChange" } & VeilidValueChange) | { kind: "Shutdown" };

/**
 * Attachment abstraction for network 'signal strength'.
 *
 * Ordered from least to most attached.
 */
declare namespace AttachmentState {
    /**
     * Not attached to the network.
     */
    export type Detached = "Detached";
    /**
     * Detaching from the network and shutting down connections.
     */
    export type Detaching = "Detaching";
    /**
     * Attaching, but not yet able to perform network operations.
     */
    export type Attaching = "Attaching";
    /**
     * Attached with the weakest signal strength.
     */
    export type AttachedWeak = "AttachedWeak";
    /**
     * Attached with fair signal strength.
     */
    export type AttachedFair = "AttachedFair";
    /**
     * Attached with good signal strength.
     */
    export type AttachedGood = "AttachedGood";
    /**
     * Attached with strong signal strength.
     */
    export type AttachedStrong = "AttachedStrong";
    /**
     * Attached with the strongest signal strength.
     */
    export type AttachedFull = "AttachedFull";
}

/**
 * Attachment abstraction for network 'signal strength'.
 *
 * Ordered from least to most attached.
 */
export type AttachmentState = AttachmentState.Detached | AttachmentState.Detaching | AttachmentState.Attaching | AttachmentState.AttachedWeak | AttachmentState.AttachedFair | AttachmentState.AttachedGood | AttachmentState.AttachedStrong | AttachmentState.AttachedFull;

/**
 * Attachment configuration, owned by the attachment manager.
 *
 * ```yaml
 * attachment:
 *     app_lifecycle: # only with `--features=app-lifecycle`
 *         prefer_foreground: true
 *         auto_detect_state: true
 * ```
 */
export interface VeilidConfigAttachment {
    /**
     * Host application lifecycle handling (requires `app-lifecycle`).
     */
    appLifecycle?: VeilidConfigAppLifecycle;
}

/**
 * Block store configuration: content-addressed block storage.
 */
export interface VeilidConfigBlockStore {
    /**
     * Directory holding the block store (empty = platform default).
     */
    directory: string;
    /**
     * Delete the block store on startup.
     */
    delete: boolean;
}

/**
 * Capabilities advertised by this node.
 */
export interface VeilidConfigCapabilities {
    /**
     * Capabilities to disable (advertised as unavailable).
     */
    disable: VeilidCapability[];
}

/**
 * Choice of nodes to include in allocated routes
 * * `Stability::LowLatency`: prefer nodes with low latency, but may be unreliable and require route reallocation
 * * `Stability::Reliable`: prefer nodes with reliable uptime, but may have higher latency
 */
declare namespace Stability {
    /**
     * Prefer nodes with low latency, but may be unreliable and require route reallocation
     */
    export type LowLatency = "LowLatency";
    /**
     * Prefer nodes with reliable uptime, but may have higher latency
     */
    export type Reliable = "Reliable";
}

/**
 * Choice of nodes to include in allocated routes
 * * `Stability::LowLatency`: prefer nodes with low latency, but may be unreliable and require route reallocation
 * * `Stability::Reliable`: prefer nodes with reliable uptime, but may have higher latency
 */
export type Stability = Stability.LowLatency | Stability.Reliable;

/**
 * Configuration for all WASM logging outputs.
 */
export interface VeilidWASMConfigLogging {
    /**
     * Performance/console logging configuration.
     */
    performance?: VeilidWASMConfigLoggingPerformance;
    /**
     * API logging configuration.
     */
    api?: VeilidWASMConfigLoggingAPI;
    /**
     * Internal stats logging configuration.
     */
    stats?: VeilidWASMConfigLoggingStats;
}

/**
 * Configuration for the API logging
 */
export interface VeilidWASMConfigLoggingAPI {
    /**
     * Determines if the API logging is enabled at all
     */
    enabled?: boolean;
    /**
     * The log level to use for the API logging
     */
    level?: VeilidConfigLogLevel;
    /**
     * Log directives to apply to the API logging in `veilid_core::VeilidLogDirective` format
     */
    directives?: string[];
    /**
     * Log targets to ignore in the output (deprecated)
     */
    ignoreLogTargets?: string[];
}

/**
 * Configuration for the console logging
 */
export interface VeilidWASMConfigLoggingPerformanceConsole {
    /**
     * Determines if the console logging is enabled at all
     */
    enabled?: boolean;
    /**
     * Determines if the console logging should be colorized
     */
    color?: boolean;
    /**
     * Determines if the console logging should include a timestamp
     */
    timestamp?: boolean;
    /**
     * Optional URL to prepend to origins. E.g. to allow for showing full file paths that can be navigated when logged in the browser console.
     */
    originBaseUrl?: string | undefined;
}

/**
 * Configuration for the internal stats logging. Records ride the "stats" log facility.
 */
export interface VeilidWASMConfigLoggingStats {
    /**
     * Determines if periodic stats logging is enabled.
     */
    enabled?: boolean;
    /**
     * Seconds between emitted records.
     */
    intervalSecs?: number;
}

/**
 * Configuration for the performance/console logging
 */
export interface VeilidWASMConfigLoggingPerformance {
    /**
     * Determines if the performance logging is enabled at all
     */
    enabled?: boolean;
    /**
     * The log level to use for the performance logging
     */
    level?: VeilidConfigLogLevel;
    /**
     * Determines if the logging events should be included in the performance timings
     */
    timings?: boolean;
    /**
     * Configuration for the console logging
     */
    console?: VeilidWASMConfigLoggingPerformanceConsole;
    /**
     * Log directives to apply to the performance logging in `veilid_core::VeilidLogDirective` format
     */
    directives?: string[];
    /**
     * Log targets to ignore in the output (deprecated)
     */
    ignoreLogTargets?: string[];
}

/**
 * Configure Network Protocols.
 *
 * Veilid can communicate over UDP, TCP, and Web Sockets.
 *
 * All protocols are available by default, and the Veilid node will
 * sort out which protocol is used for each peer connection.
 *
 */
export interface VeilidConfigProtocol {
    /**
     * UDP protocol configuration.
     */
    udp: VeilidConfigUDP;
    /**
     * TCP protocol configuration.
     */
    tcp: VeilidConfigTCP;
    /**
     * WebSocket protocol configuration.
     */
    ws: VeilidConfigWS;
    /**
     * Secure WebSocket protocol configuration.
     */
    wss: VeilidConfigWSS;
}

/**
 * Configure RPC.
 *
 */
export interface VeilidConfigRPC {
    /**
     * Default number of hops used when allocating private routes.
     */
    defaultRouteHopCount: number;
}

/**
 * Configure TLS.
 *
 * ```yaml
 * tls:
 *     certificate_path: /path/to/cert
 *     private_key_path: /path/to/private/key
 *     connection_initial_timeout_ms: 2000
 *
 */
export interface VeilidConfigTLS {
    /**
     * Path to the TLS certificate (PEM) for inbound TLS protocols.
     */
    certificatePath: string;
    /**
     * Path to the TLS private key (PEM) for inbound TLS protocols.
     */
    privateKeyPath: string;
    /**
     * Timeout for completing a TLS handshake, in milliseconds.
     */
    connectionInitialTimeoutMs: number;
}

/**
 * Configure the Distributed Hash Table (DHT).
 * Defaults should be used here unless you are absolutely sure you know what you're doing.
 * If you change the count/fanout/timeout parameters, you may render your node inoperable
 * for correct DHT operations.
 */
export interface VeilidConfigDHT {
    /**
     * Number of subkeys cached for locally-created DHT records.
     */
    localSubkeyCacheSize: number;
    /**
     * Memory cap for the local subkey cache, in megabytes.
     */
    localMaxSubkeyCacheMemoryMb: number;
    /**
     * Number of subkeys cached for DHT records stored on behalf of others.
     */
    remoteSubkeyCacheSize: number;
    /**
     * Maximum number of remote DHT records stored on behalf of others.
     */
    remoteMaxRecords: number;
    /**
     * Memory cap for the remote subkey cache, in megabytes.
     */
    remoteMaxSubkeyCacheMemoryMb: number;
    /**
     * Disk cap for remote DHT record storage, in megabytes.
     */
    remoteMaxStorageSpaceMb: number;
    /**
     * Max concurrent DHT network operations in flight (local-only ops exempt).
     */
    maxConcurrentOperations?: number;
}

/**
 * Configure the network routing table.
 *
 */
export interface VeilidConfigRoutingTable {
    /**
     * This node's identity public keys, by crypto kind (empty = generate fresh).
     */
    publicKeys: string[];
    /**
     * Node identity secret keys matching `public_keys` (empty = generate fresh).
     */
    secretKeys: string[];
    /**
     * Bootstrap server hostnames/URLs used to join the network.
     */
    bootstrap: string[];
    /**
     * Public keys trusted to sign bootstrap records.
     */
    bootstrapKeys: string[];
    /**
     * Bootstrap records, verbatim, as `veilid-server --dump-txt-record` prints them.
     * Served to direct bootstrap requests without any lookup, and usable to bootstrap this
     * node itself. Both record versions are served; bootstrapping from them follows the same
     * rule as a TXT bootstrap, so v0 records are only used when no bootstrap keys are set.
     * Empty by default, in which case records come from the bootstrap servers.
     */
    bootstrapRecords: string[];
    /**
     * Answer direct bootstrap requests (BOOT and B01T) from the last successful bootstrap set.
     * Off by default: a bootstrap server turns it on, and an app has no reason to serve. A node
     * that finds itself among its own bootstraps answers regardless.
     */
    serveDirectBootstrap?: boolean;
}

/**
 * DHT Record Descriptor
 */
export interface DHTRecordDescriptor {
    /**
     * DHT Key = Hash(ownerKeyKind) of: [ ownerKeyValue, schema ]
     */
    key: RecordKey;
    /**
     * The public key of the owner
     * If this key is being created: KeyPair
     * If this key is just being opened: PublicKey
     */
    owner: PublicKey | KeyPair;
    /**
     * The schema in use associated with the key
     */
    schema: DHTSchema;
}

/**
 * DHT Record Report
 */
export interface DHTRecordReport {
    /**
     * The actual subkey range within the schema being reported on
     * This may be a subset of the requested range if it exceeds the schema limits
     * or has more than `DHTSchema::MAX_SUBKEY_COUNT` (1024) subkeys
     */
    subkeys: ValueSubkeyRangeSet;
    /**
     * The subkeys that have been writen offline that still need to be flushed
     */
    offlineSubkeys: ValueSubkeyRangeSet;
    /**
     * The sequence numbers of each subkey requested from a locally stored DHT Record
     */
    localSeqs: ValueSeqNum[];
    /**
     * The sequence numbers of each subkey requested from the DHT over the network
     */
    networkSeqs: ValueSeqNum[];
}

/**
 * DHT Record Report Scope
 */
declare namespace DHTReportScope {
    /**
     * Return only the local copy sequence numbers
     * Useful for seeing what subkeys you have locally and which ones have not been retrieved
     */
    export type Local = "Local";
    /**
     * Return the local sequence numbers and the network sequence numbers with GetValue fanout parameters
     * Provides an independent view of both the local sequence numbers and the network sequence numbers for nodes that
     * would be reached as if the local copy did not exist locally.
     * Useful for determining if the current local copy should be updated from the network.
     */
    export type SyncGet = "SyncGet";
    /**
     * Return the local sequence numbers and the network sequence numbers with SetValue fanout parameters
     * Provides an independent view of both the local sequence numbers and the network sequence numbers for nodes that
     * would be reached as if the local copy did not exist locally.
     * Useful for determining if the unchanged local copy should be pushed to the network.
     */
    export type SyncSet = "SyncSet";
    /**
     * Return the local sequence numbers and the network sequence numbers with GetValue fanout parameters
     * Provides an view of both the local sequence numbers and the network sequence numbers for nodes that
     * would be reached as if a GetValue operation were being performed, including accepting newer values from the network.
     * Useful for determining which subkeys would change with a GetValue operation
     */
    export type UpdateGet = "UpdateGet";
    /**
     * Return the local sequence numbers and the network sequence numbers with SetValue fanout parameters
     * Provides an view of both the local sequence numbers and the network sequence numbers for nodes that
     * would be reached as if a SetValue operation were being performed, including accepting newer values from the network.
     * This simulates a SetValue with the initial sequence number incremented by 1, like a real SetValue would when updating.
     * Useful for determine which subkeys would change on an SetValue operation
     */
    export type UpdateSet = "UpdateSet";
}

/**
 * DHT Record Report Scope
 */
export type DHTReportScope = DHTReportScope.Local | DHTReportScope.SyncGet | DHTReportScope.SyncSet | DHTReportScope.UpdateGet | DHTReportScope.UpdateSet;

/**
 * Default DHT Schema (DFLT)
 */
export interface DHTSchemaDFLT {
    /**
     * Owner subkey count
     */
    oCnt: number;
}

/**
 * Describe a private or safety route change that has happened
 */
export interface VeilidRouteChange {
    /**
     * If an allocated route dies or was released, it is listed here.
     */
    deadRoutes: RouteId[];
    /**
     * If an imported remote private route has died, it is listed here.
     */
    deadRemoteRoutes: RouteId[];
}

/**
 * Describe a recently accessed peer
 */
export interface PeerTableData {
    /**
     * The node ids used by this peer
     */
    nodeIds: string[];
    /**
     * The peer's human readable address.
     */
    peerAddress: string;
    /**
     * Statistics we have collected on this peer.
     */
    peerStats: PeerStats;
}

/**
 * Describe changes to the Veilid node configuration
 * Currently this is only ever emitted once, however we reserve the right to
 * add the ability to change the configuration or have it changed by the Veilid node
 * itself during runtime.
 */
export interface VeilidStateConfig {
    /**
     * If the Veilid node configuration has changed the full new config will be here.
     */
    config: VeilidConfig;
}

/**
 * Describe the attachment state of the Veilid node
 */
export interface VeilidStateAttachment {
    /**
     * Overall network quality (signal-strength bars).
     */
    state: AttachmentState;
    /**
     * Whether the PublicInternet routing domain is ready for all operations.
     */
    publicInternetReady: boolean;
    /**
     * Whether the LocalNetwork routing domain is ready for all operations.
     */
    localNetworkReady: boolean;
    /**
     * Node uptime.
     */
    uptime: TimestampDuration;
    /**
     * Uptime since last attach, None when detached.
     */
    attachedUptime: TimestampDuration | undefined;
    /**
     * Reliable peers in the routing table.
     */
    reliablePeerCount: NodeCount;
    /**
     * Live peers (reliable, unreliable, and newly added) in the routing table.
     */
    livePeerCount: NodeCount;
    /**
     * Smoothed estimate of total reachable network size.
     */
    estimatedNetworkSize: NodeCount;
    /**
     * Median p75 latency across reliable peers, None when no samples yet.
     */
    medianLatency: TimestampDuration | undefined;
    /**
     * Entries in bucket overflow awaiting lazy kick.
     */
    overAttachedNodes: NodeCount;
}

/**
 * Describe the current network state of the Veilid node
 */
export interface VeilidStateNetwork {
    /**
     * If the network has been started or not.
     */
    started: boolean;
    /**
     * The total number of bytes per second used by Veilid currently in the download direction.
     */
    bpsDown: ByteCount;
    /**
     * The total number of bytes per second used by Veilid currently in the upload direction.
     */
    bpsUp: ByteCount;
    /**
     * The list of most recently accessed peers.
     * This is not an active connection table, nor is representative of the entire routing table.
     */
    peers: PeerTableData[];
    /**
     * The list of node ids for this node
     */
    nodeIds: string[];
}

/**
 * Describe when DHT records have subkey values changed
 */
export interface VeilidValueChange {
    /**
     * The DHT Record key that changed
     */
    key: RecordKey;
    /**
     * The portion of the DHT Record's subkeys that have changed
     * If the subkey range is empty, any watch present on the value has died.
     */
    subkeys: ValueSubkeyRangeSet;
    /**
     * The count remaining on the watch that triggered this value change
     * If there is no watch and this is received, it will be set to u32::MAX
     * If this value is zero, any watch present on the value has died.
     */
    count: number;
    /**
     * The (optional) value data for the first subkey in the subkeys range
     * If 'subkeys' is not a single value, other values than the first value
     * must be retrieved with RoutingContext::get_dht_value().
     */
    value: ValueData | undefined;
}

/**
 * Direct question blob passed to hosting application for processing to send an eventual AppReply.
 */
export interface VeilidAppCall {
    sender?: NodeId;
    routeId?: string;
    message: Uint8Array;
    callId: OperationId;
}

/**
 * Direct statement blob passed to hosting application for processing.
 */
export interface VeilidAppMessage {
    sender?: string;
    routeId?: string;
    message: Uint8Array;
}

/**
 * Enable and configure Secure Web Sockets.
 *
 * ```yaml
 * wss:
 *     connect: true
 *     listen: false
 *     listen_address: ':5150'
 *     path: 'ws'
 *     url: ''
 *
 */
export interface VeilidConfigWSS {
    /**
     * Allow outbound secure WebSocket connections.
     */
    connect: boolean;
    /**
     * Accept inbound secure WebSocket connections.
     */
    listen: boolean;
    /**
     * Local address to bind, as `ip:port` (empty binds the default port).
     */
    listenAddress: string;
    /**
     * URL path served by the secure WebSocket listener.
     */
    path: string;
    /**
     * Externally-reachable URL to advertise (required and validated for TLS protocols).
     */
    url?: string;
}

/**
 * Enable and configure TCP.
 *
 * ```yaml
 * tcp:
 *     connect: true
 *     listen: true
 *     listen_address: ':5150'
 *     public_address: ''
 *
 */
export interface VeilidConfigTCP {
    /**
     * Allow outbound TCP connections.
     */
    connect: boolean;
    /**
     * Accept inbound TCP connections.
     */
    listen: boolean;
    /**
     * Local address to bind, as `ip:port` (empty binds the default port).
     */
    listenAddress: string;
    /**
     * Externally-reachable `ip:port` to advertise, if behind NAT/port mapping.
     */
    publicAddress?: string;
}

/**
 * Enable and configure UDP.
 *
 * ```yaml
 * udp:
 *     enabled: true
 *     socket_pool_size: 0
 *     listen_address: ':5150'
 *     public_address: ''
 * ```
 *
 */
export interface VeilidConfigUDP {
    /**
     * Enable the UDP protocol.
     */
    enabled: boolean;
    /**
     * Local address to bind, as `ip:port` (empty binds the default port).
     */
    listenAddress: string;
    /**
     * Externally-reachable `ip:port` to advertise, if behind NAT/port mapping.
     */
    publicAddress?: string;
}

/**
 * Enable and configure Web Sockets.
 *
 * ```yaml
 * ws:
 *     connect: true
 *     listen: true
 *     listen_address: ':5150'
 *     path: 'ws'
 *     url: 'ws://localhost:5150/ws'
 *
 */
export interface VeilidConfigWS {
    /**
     * Allow outbound WebSocket connections.
     */
    connect: boolean;
    /**
     * Accept inbound WebSocket connections.
     */
    listen: boolean;
    /**
     * Local address to bind, as `ip:port` (empty binds the default port).
     */
    listenAddress: string;
    /**
     * URL path served by the WebSocket listener.
     */
    path: string;
    /**
     * Externally-reachable URL to advertise, if behind NAT/proxy.
     */
    url?: string;
}

/**
 * How the node lives through its host application moving between foreground and background.
 *
 * ```yaml
 * app_lifecycle:
 *     prefer_foreground: true
 *     auto_detect_state: true
 * ```
 */
export interface VeilidConfigAppLifecycle {
    /**
     * While attached, keep a hidden desktop app from being throttled (macOS App Nap, Windows power throttling); no effect on mobile.
     */
    preferForeground: boolean;
    /**
     * Follow the platform's own lifecycle reports where it has them; when false, only `report_app_lifecycle_state` counts.
     */
    autoDetectState?: boolean;
}

/**
 * Internal "footgun" DHT configuration. See [VeilidConfigInternal].
 * Changing the count/fanout/timeout parameters may render your node inoperable for
 * correct DHT operations.
 */
export interface VeilidConfigInternalDHT {
    /**
     * Maximum number of nodes returned by a FindNode query.
     */
    maxFindNodeCount: number;
    /**
     * Timeout for resolving a node, in milliseconds.
     */
    resolveNodeTimeoutMs: number;
    /**
     * Number of nodes sought when resolving a node.
     */
    resolveNodeCount: number;
    /**
     * Parallel fanout width when resolving a node.
     */
    resolveNodeFanout: number;
    /**
     * Timeout for a GetValue operation, in milliseconds.
     */
    getValueTimeoutMs: number;
    /**
     * Number of matching values sought for GetValue consensus.
     */
    getValueCount: number;
    /**
     * Parallel fanout width for GetValue.
     */
    getValueFanout: number;
    /**
     * Timeout for a SetValue operation, in milliseconds.
     */
    setValueTimeoutMs: number;
    /**
     * Number of nodes that must accept a SetValue for consensus.
     */
    setValueCount: number;
    /**
     * Parallel fanout width for SetValue.
     */
    setValueFanout: number;
    /**
     * Maximum number of nodes considered 'close to a record key' for storing a record.
     */
    consensusWidth: number;
    /**
     * Minimum number of peers to keep in the routing table.
     */
    minPeerCount: number;
    /**
     * Minimum interval between peer-refresh rounds, in milliseconds.
     */
    minPeerRefreshTimeMs: number;
    /**
     * Time allowed to receive a dial-info validation receipt, in milliseconds.
     */
    validateDialInfoReceiptTimeMs: number;
    /**
     * Maximum lifetime of a DHT watch, in milliseconds.
     */
    maxWatchExpirationMs: number;
    /**
     * Longest interval between change inspections of a watch, in milliseconds: the interval
     * doubles up to it while inspections find nothing. Half the watch lifetime by default, so a
     * quiet watch inspects before each renewal; a watch short of consensus delivers changes at
     * most this late.
     */
    maxWatchInspectIntervalMs: number;
    /**
     * Maximum concurrent watches by anonymous watchers (signer not a schema member).
     */
    publicWatchLimit: number;
    /**
     * Reserved watch slots for watchers whose signer is a schema member of the record.
     */
    memberWatchLimit: number;
    /**
     * Maximum concurrent transactions by anonymous signers (not a schema member).
     */
    publicTransactionLimit: number;
    /**
     * Reserved transaction slots for signers who are schema members of the record.
     */
    memberTransactionLimit: number;
}

/**
 * Internal "footgun" RPC configuration. See [VeilidConfigInternal].
 */
export interface VeilidConfigInternalRPC {
    /**
     * Number of concurrent RPC worker tasks (0 = automatic).
     */
    concurrency: number;
    /**
     * Maximum number of queued RPC operations.
     */
    queueSize: number;
    /**
     * Reject messages timestamped more than this many ms in the past (`None` = no limit).
     */
    maxTimestampBehindMs?: number;
    /**
     * Reject messages timestamped more than this many ms in the future (`None` = no limit).
     */
    maxTimestampAheadMs?: number;
    /**
     * Timeout for an RPC round-trip, in milliseconds.
     */
    timeoutMs: number;
    /**
     * Maximum number of hops allowed in a route.
     */
    maxRouteHopCount: number;
}

/**
 * Internal "footgun" UDP configuration. See [VeilidConfigInternal].
 */
export interface VeilidConfigInternalUDP {
    /**
     * Number of UDP sockets in the send/receive pool (0 = automatic).
     */
    socketPoolSize: number;
}

/**
 * Internal "footgun" configuration tree, parallel to the main config.
 *
 * These fields tune low-level network/DHT timing, fanout, consensus and connection limits.
 * Changing them from the defaults can render a node inoperable. They are only honored when
 * veilid-core is built with the `footgun-config` feature; without it, any non-default values
 * here are reset to defaults at startup (with a warning).
 */
export interface VeilidConfigInternal {
    /**
     * Internal network tuning.
     */
    network: VeilidConfigInternalNetwork;
}

/**
 * Internal "footgun" network configuration. See [VeilidConfigInternal].
 */
export interface VeilidConfigInternalNetwork {
    /**
     * Timeout to establish a new connection, in milliseconds.
     */
    connectionInitialTimeoutMs: number;
    /**
     * Cap on any single low-level send, in milliseconds, so a send on a wedged
     * transport cannot consume the caller's whole RPC timeout budget.
     */
    singleSendTimeoutMs: number;
    /**
     * Idle time before an inactive connection is dropped, in milliseconds.
     */
    connectionInactivityTimeoutMs: number;
    /**
     * Maximum simultaneous connections from a single IPv4 address.
     */
    maxConnectionsPerIp4: number;
    /**
     * Maximum simultaneous connections from a single IPv6 prefix.
     */
    maxConnectionsPerIp6Prefix: number;
    /**
     * IPv6 prefix length (bits) used to group connections for the per-prefix limit.
     */
    maxConnectionsPerIp6PrefixSize: number;
    /**
     * Maximum new connections accepted per minute from one source.
     */
    maxConnectionFrequencyPerMin: number;
    /**
     * Time a client stays on the allowlist after connecting, in milliseconds.
     */
    clientAllowlistTimeoutMs: number;
    /**
     * Time allowed to receive a reverse-connection receipt, in milliseconds.
     */
    reverseConnectionReceiptTimeMs: number;
    /**
     * Time allowed to receive a hole-punch receipt, in milliseconds.
     */
    holePunchReceiptTimeMs: number;
    /**
     * TTL (hop limit) of a hole punch, enough to pass this node's NAT but not reach the peer's.
     */
    defaultHolePunchTtl: number;
    /**
     * Hole punch TTL behind a carrier-grade NAT, which sits more hops out than a home router.
     */
    cgnatHolePunchTtl: number;
    /**
     * NAT-detection retries during dial-info confirmation for port/address-restricted NAT
     * (some NATs open to full-cone after a few attempts; off by default).
     */
    restrictedNatRetries: number;
    /**
     * Internal RPC tuning.
     */
    rpc: VeilidConfigInternalRPC;
    /**
     * Internal DHT tuning.
     */
    dht: VeilidConfigInternalDHT;
    /**
     * Internal per-protocol tuning.
     */
    protocol: VeilidConfigInternalProtocol;
    /**
     * Internal routing table tuning.
     */
    routingTable: VeilidConfigInternalRoutingTable;
}

/**
 * Internal "footgun" per-protocol configuration. See [VeilidConfigInternal].
 */
export interface VeilidConfigInternalProtocol {
    /**
     * Internal UDP tuning.
     */
    udp: VeilidConfigInternalUDP;
}

/**
 * Internal "footgun" routing table configuration. See [VeilidConfigInternal].
 */
export interface VeilidConfigInternalRoutingTable {
    /**
     * When the routing table is saved.
     */
    save: VeilidConfigInternalRoutingTableSave;
}

/**
 * Internal "footgun" routing table save schedule. See [VeilidConfigInternal].
 */
export interface VeilidConfigInternalRoutingTableSave {
    /**
     * Quiet time after a change worth saving before the table is saved, in milliseconds.
     */
    settleMs: number;
    /**
     * Least time between saves driven by changes, in milliseconds.
     */
    minIntervalMs: number;
    /**
     * Least time between saves in the background, where the process may be frozen within
     * seconds, in milliseconds.
     */
    backgroundMinIntervalMs: number;
    /**
     * Longest the table goes unsaved, so changes too small to drive a save still reach disk,
     * in milliseconds.
     */
    periodMs: number;
}

/**
 * Log level for VeilidCore.
 */
declare namespace VeilidLogLevel {
    /**
     * Errors.
     */
    export type Error = "Error";
    /**
     * Warnings.
     */
    export type Warn = "Warn";
    /**
     * Informational messages.
     */
    export type Info = "Info";
    /**
     * Debugging messages.
     */
    export type Debug = "Debug";
    /**
     * Tracing messages, the most verbose level.
     */
    export type Trace = "Trace";
}

/**
 * Log level for VeilidCore.
 */
export type VeilidLogLevel = VeilidLogLevel.Error | VeilidLogLevel.Warn | VeilidLogLevel.Info | VeilidLogLevel.Debug | VeilidLogLevel.Trace;

/**
 * Logging level threshold (`Off` disables logging).
 */
declare namespace VeilidConfigLogLevel {
    /**
     * Logging disabled.
     */
    export type Off = "Off";
    /**
     * Errors only.
     */
    export type Error = "Error";
    /**
     * Warnings and above.
     */
    export type Warn = "Warn";
    /**
     * Informational messages and above.
     */
    export type Info = "Info";
    /**
     * Debug messages and above.
     */
    export type Debug = "Debug";
    /**
     * All messages, including trace.
     */
    export type Trace = "Trace";
}

/**
 * Logging level threshold (`Off` disables logging).
 */
export type VeilidConfigLogLevel = VeilidConfigLogLevel.Off | VeilidConfigLogLevel.Error | VeilidConfigLogLevel.Warn | VeilidConfigLogLevel.Info | VeilidConfigLogLevel.Debug | VeilidConfigLogLevel.Trace;

/**
 * Measurement of communications latency to this node over all RPC questions
 */
export interface LatencyStats {
    /**
     * fastest latency in the ROLLING_LATENCIES_SIZE last latencies
     */
    fastest: TimestampDuration;
    /**
     * average latency over the ROLLING_LATENCIES_SIZE last latencies
     */
    average: TimestampDuration;
    /**
     * slowest latency in the ROLLING_LATENCIES_SIZE last latencies
     */
    slowest: TimestampDuration;
    /**
     * trimmed mean with lowest 90% latency in the ROLLING_LATENCIES_SIZE
     */
    tm90?: TimestampDuration;
    /**
     * trimmed mean with lowest 75% latency in the ROLLING_LATENCIES_SIZE
     */
    tm75?: TimestampDuration;
    /**
     * p90 latency in the ROLLING_LATENCIES_SIZE
     */
    p90?: TimestampDuration;
    /**
     * p75 latency in the ROLLING_LATENCIES_SIZE
     */
    p75?: TimestampDuration;
}

/**
 * Measurement of how much data has transferred to or from this node over a time span
 */
export interface TransferStats {
    /**
     * total amount transferred ever
     */
    total: ByteCount;
    /**
     * maximum rate over the ROLLING_TRANSFERS_SIZE last amounts
     */
    maximum: ByteCount;
    /**
     * average rate over the ROLLING_TRANSFERS_SIZE last amounts
     */
    average: ByteCount;
    /**
     * minimum rate over the ROLLING_TRANSFERS_SIZE last amounts
     */
    minimum: ByteCount;
}

/**
 * Network subsystem configuration: connections, routing table, RPC, DHT, transports, and privacy.
 */
export interface VeilidConfigNetwork {
    /**
     * Maximum total simultaneous connections across all protocols.
     * Range: native 32-512, wasm32/browser 16-64.
     */
    maxConnections: number;
    /**
     * Optional password; its presence joins a private network with a derived network key.
     */
    networkKeyPassword?: string;
    /**
     * Routing table identity and bootstrap configuration.
     */
    routingTable: VeilidConfigRoutingTable;
    /**
     * RPC configuration.
     */
    rpc: VeilidConfigRPC;
    /**
     * DHT cache and storage configuration.
     */
    dht: VeilidConfigDHT;
    /**
     * Enabled IP address families (empty = all available).
     */
    addressTypes?: VeilidConfigAddressType[];
    /**
     * Use UPnP to map ports on the local gateway.
     */
    upnp: boolean;
    /**
     * Watch for and react to local address changes (`None` = auto-detect).
     */
    detectAddressChanges: boolean | undefined;
    /**
     * Wait before retrying a listen address that failed to bind, in milliseconds.
     */
    bindRetryMs?: number;
    /**
     * TLS configuration for inbound secure protocols.
     */
    tls: VeilidConfigTLS;
    /**
     * Per-protocol (UDP/TCP/WS/WSS) configuration.
     */
    protocol: VeilidConfigProtocol;
    /**
     * Privacy and relay preferences.
     */
    privacy: VeilidConfigPrivacy;
}

/**
 * Options that override defaults for DHTTransaction::set
 */
export interface DHTTransactionSetValueOptions {
    /**
     * Override writer key pair for this operation
     */
    writer?: KeyPair;
    /**
     * Raise the sequence number to at least this, after the automatic increment.
     * `veilidClient.VALUE_SEQ_NUM_MAX` minus `n` leaves `n` writes after this one.
     */
    minSeqnum?: ValueSeqNum;
}

/**
 * Options that override defaults for open_dht_record
 */
export interface OpenDHTRecordOptions {
    /**
     * Defaults to true. If false, opening a record this node already holds does not queue a
     * check that the network still carries it.
     */
    rehydrate?: boolean;
}

/**
 * Options that override defaults for set_dht_value
 */
export interface SetDHTValueOptions {
    /**
     * Override writer key pair for this operation
     */
    writer?: KeyPair;
    /**
     * Defaults to true. If false, the value will not be written if the node is offline,
     * and a TryAgain error will be returned.
     */
    allowOffline?: AllowOffline;
    /**
     * Raise the sequence number to at least this, after the automatic increment.
     * `veilidClient.VALUE_SEQ_NUM_MAX` minus `n` leaves `n` writes after this one.
     */
    minSeqnum?: ValueSeqNum;
}

/**
 * Options that override defaults for transact_dht_records
 */
export interface TransactDHTRecordsOptions {
    /**
     * Default writer key pair used to sign records in the transaction
     */
    defaultSigningKeypair?: KeyPair;
}

/**
 * Ordering of RPC message delivery over a route or for RPC messages sent to a target
 *   * `SequencingOrdering::Unordered`: unordered delivery, messages may be received in any order, and may be dropped unreliably
 *   * `SequencingOrdering::Ordered`: ordered delivery, messages will be received in the order they were sent, and delivered reliably
 *
 * Neither SequenceOrdering guarantees delivery under all conditions, as there is no queuing/buffering in the network
 */
declare namespace SequenceOrdering {
    /**
     * Unordered delivery, messages may be received in any order, and may be dropped unreliably
     */
    export type Unordered = "Unordered";
    /**
     * Ordered delivery, messages will be received in the order they were sent, and delivered reliably
     */
    export type Ordered = "Ordered";
}

/**
 * Ordering of RPC message delivery over a route or for RPC messages sent to a target
 *   * `SequencingOrdering::Unordered`: unordered delivery, messages may be received in any order, and may be dropped unreliably
 *   * `SequencingOrdering::Ordered`: ordered delivery, messages will be received in the order they were sent, and delivered reliably
 *
 * Neither SequenceOrdering guarantees delivery under all conditions, as there is no queuing/buffering in the network
 */
export type SequenceOrdering = SequenceOrdering.Unordered | SequenceOrdering.Ordered;

/**
 * Preferred ordering of RPC message delivery over a route or for RPC messages sent to a target
 *   * `Sequencing::PreferUnordered`: any `SequenceOrdering` is acceptable, but `SequenceOrdering::Unordered` will be chosen if available
 *   * `Sequencing::PreferOrdered`: any `SequenceOrdering` is acceptable, but `SequenceOrdering::Ordered` will be chosen if available
 *   * `Sequencing::EnsureOrdered`: only `SequenceOrdering::Ordered` is acceptable, and if not available, the route will not be created or the message will not be sent
 *
 * No sequencing preference guarantees delivery under all conditions, as there is no queuing/buffering in the network
 */
declare namespace Sequencing {
    /**
     * Any `SequenceOrdering` is acceptable, but `SequenceOrdering::Unordered` will be chosen if available
     */
    export type PreferUnordered = "PreferUnordered";
    /**
     * Any `SequenceOrdering` is acceptable, but `SequenceOrdering::Ordered` will be chosen if available
     */
    export type PreferOrdered = "PreferOrdered";
    /**
     * Only `SequenceOrdering::Ordered` is acceptable, and if not available, the route will not be created or the message will not be sent
     */
    export type EnsureOrdered = "EnsureOrdered";
}

/**
 * Preferred ordering of RPC message delivery over a route or for RPC messages sent to a target
 *   * `Sequencing::PreferUnordered`: any `SequenceOrdering` is acceptable, but `SequenceOrdering::Unordered` will be chosen if available
 *   * `Sequencing::PreferOrdered`: any `SequenceOrdering` is acceptable, but `SequenceOrdering::Ordered` will be chosen if available
 *   * `Sequencing::EnsureOrdered`: only `SequenceOrdering::Ordered` is acceptable, and if not available, the route will not be created or the message will not be sent
 *
 * No sequencing preference guarantees delivery under all conditions, as there is no queuing/buffering in the network
 */
export type Sequencing = Sequencing.PreferUnordered | Sequencing.PreferOrdered | Sequencing.EnsureOrdered;

/**
 * Privacy preferences for routes.
 *
 * ```yaml
 * privacy:
 *     require_inbound_relay: false
 *     country_code_denylist: [] # only with `--features=geolocation`
 * ```
 */
export interface VeilidConfigPrivacy {
    /**
     * Always use an inbound relay; never accept direct inbound connections.
     */
    requireInboundRelay: boolean;
}

/**
 * Private spec
 */
export interface PrivateSpec {
    /**
     * Crypto kinds to allow for the route; empty uses all available kinds
     */
    cryptoKinds?: CryptoKind[];
    /**
     * Number of hops in the private route; zero uses the default hop count
     */
    hopCount?: number;
    /**
     * Prefer reliability over speed
     */
    stability?: Stability;
    /**
     * Prefer connection-oriented sequenced protocols
     */
    sequencing?: Sequencing;
}

/**
 * Protected store configuration: where secrets such as the device encryption key are kept.
 */
export interface VeilidConfigProtectedStore {
    /**
     * Fall back to insecure file storage if no OS keychain/keyring is available.
     */
    allowInsecureFallback: boolean;
    /**
     * Always use insecure file storage, ignoring any OS keychain/keyring.
     */
    alwaysUseInsecureStorage: boolean;
    /**
     * Directory for insecure-fallback storage (empty = platform default).
     */
    directory: string;
    /**
     * Delete the protected store on startup.
     */
    delete: boolean;
    /**
     * Password used to encrypt the device encryption key.
     */
    deviceEncryptionKeyPassword: string;
    /**
     * New password to re-encrypt the device encryption key with, triggering a rotation.
     */
    newDeviceEncryptionKeyPassword?: string;
    /**
     * Storage backend for secrets (`PlatformDefault` chooses per platform and runtime context).
     */
    backend: VeilidConfigProtectedStoreBackend;
}

/**
 * Route blob
 */
export interface RouteBlob {
    /**
     * Id of the route this blob describes
     */
    routeId: RouteId;
    /**
     * Serialized route blob bytes
     */
    blob: Uint8Array;
}

/**
 * Safety spec
 */
export interface SafetySpec {
    /**
     * Number of hops in the safety route; zero uses the default hop count
     */
    hopCount?: number;
    /**
     * Prefer reliability over speed
     */
    stability?: Stability;
    /**
     * Prefer connection-oriented sequenced protocols
     */
    sequencing?: Sequencing;
    /**
     * Preferred safety route id, used if it still exists
     */
    preferredRoute?: RouteId;
}

/**
 * Semantic version of the Veilid core library.
 */
export interface VeilidVersion {
    /**
     * Major version.
     */
    major: number;
    /**
     * Minor version.
     */
    minor: number;
    /**
     * Patch version.
     */
    patch: number;
}

/**
 * Simple DHT Schema (SMPL)
 */
export interface DHTSchemaSMPL {
    /**
     * Owner subkey count
     */
    oCnt: number;
    /**
     * Members
     */
    members: DHTSchemaSMPLMember[];
}

/**
 * Simple DHT Schema (SMPL) Member
 */
export interface DHTSchemaSMPLMember {
    /**
     * Member key
     */
    mKey: BareMemberId;
    /**
     * Member subkey count
     */
    mCnt: number;
}

/**
 * Startup configuration for the Veilid WASM module.
 */
export interface VeilidWASMConfig {
    /**
     * Logging configuration.
     */
    logging?: VeilidWASMConfigLogging;
}

/**
 * Table store configuration: the encrypted key-value database backing node state.
 */
export interface VeilidConfigTableStore {
    /**
     * Directory holding the table store database (empty = platform default).
     */
    directory: string;
    /**
     * Delete the table store on startup.
     */
    delete: boolean;
    /**
     * Wipe the table store on an invalid device encryption key, rather than failing.
     */
    wipeOnInvalidDeviceEncryptionKey: boolean;
    /**
     * Maximum size of a single stored value, in megabytes.
     */
    maxValueSizeMb: number;
}

/**
 * The choice of safety route to include in compiled routes.
 */
declare namespace Target {
    /**
     * Node by its node id
     */
    export type NodeId = { NodeId: NodeId };
    /**
     * Remote private route by its id.
     */
    export type RouteId = { RouteId: RouteId };
}

/**
 * The choice of safety route to include in compiled routes.
 */
export type Target = Target.NodeId | Target.RouteId;

/**
 * Top level of the Veilid configuration tree
 */
export interface VeilidConfig {
    /**
     * An identifier used to describe the program using veilid-core.
     * Used to partition storage locations in places like the ProtectedStore.
     * Must be non-empty and a valid filename for all Veilid-capable systems, which means
     * no backslashes or forward slashes in the name. Stick to a-z,0-9,_ and space and you should be fine.
     *
     * Caution: If you change this string, there is no migration support. Your app's protected store and
     * table store will very likely experience data loss. Pick a program name and stick with it. This is
     * not a 'visible' identifier and it should uniquely identify your application.
     */
    programName: string;
    /**
     * To run multiple Veilid nodes within the same application, either through a single process running
     * api_startup/api_startup_json multiple times, or your application running mulitple times side-by-side
     * there needs to be a key used to partition the application's storage (in the TableStore, ProtectedStore, etc).
     * An empty value here is the default, but if you run multiple veilid nodes concurrently, you should set this
     * to a string that uniquely identifies this -instance- within the same 'program_name'.
     * Must be a valid filename for all Veilid-capable systems, which means no backslashes or forward slashes
     * in the name. Stick to a-z,0-9,_ and space and you should be fine.
     */
    namespace: string;
    /**
     * Capabilities to enable for your application/node
     */
    capabilities: VeilidConfigCapabilities;
    /**
     * Configuring the protected store (keychain/keyring/etc)
     */
    protectedStore: VeilidConfigProtectedStore;
    /**
     * Configuring the table store (persistent encrypted database)
     */
    tableStore: VeilidConfigTableStore;
    /**
     * Configuring the block store (storage of large content-addressable content)
     */
    blockStore: VeilidConfigBlockStore;
    /**
     * Configuring how Veilid interacts with the low level network
     */
    network: VeilidConfigNetwork;
    /**
     * Configuring how the node attaches to the network
     */
    attachment?: VeilidConfigAttachment;
    /**
     * Internal "footgun" tuning. `None` uses safe defaults. Only honored with the
     * `footgun-config` feature; otherwise ignored (a warning is logged at startup).
     */
    internal?: VeilidConfigInternal;
}

/**
 * Transfer statistics in both directions: from a node to us (down) and from us
 * to the node (up).
 */
export interface TransferStatsDownUp {
    /**
     * Transfer from the node to us.
     */
    down: TransferStats;
    /**
     * Transfer from us to the node.
     */
    up: TransferStats;
}

/**
 * Value sequence number
 */
export type ValueSeqNum = number | undefined;

/**
 * Value subkey
 */
export type ValueSubkey = number;

/**
 * Where the host application stands in its lifecycle, as the host reports it.
 */
declare namespace VeilidAppLifecycleState {
    /**
     * In front of the user, or doing work its platform keeps it awake for.
     */
    export type Active = "Active";
    /**
     * Put away: its platform may freeze or terminate it without further notice.
     */
    export type Background = "Background";
}

/**
 * Where the host application stands in its lifecycle, as the host reports it.
 */
export type VeilidAppLifecycleState = VeilidAppLifecycleState.Active | VeilidAppLifecycleState.Background;

/**
 * Whether a DHT write may be deferred for later when the node is offline. Defaults to true.
 */
export type AllowOffline = boolean;

/**
 * Which storage backend the protected store uses for secrets.
 *
 * The browser-only variants (`LocalStorage`, `IndexedDb`, `ExtensionStorage`) are rejected on
 * native platforms. `PlatformDefault` chooses per platform and runtime context: the OS keyring on
 * native, `localStorage` in a browser Window, IndexedDB in a worker, and extension storage in a
 * WebExtension.
 */
declare namespace VeilidConfigProtectedStoreBackend {
    /**
     * Choose automatically based on the platform and runtime context.
     */
    export type PlatformDefault = "PlatformDefault";
    /**
     * Browser `localStorage` (Window contexts only).
     */
    export type LocalStorage = "LocalStorage";
    /**
     * Browser IndexedDB (available in worker contexts).
     */
    export type IndexedDb = "IndexedDb";
    /**
     * WebExtension storage (`chrome.storage.local`/`browser.storage.local`).
     */
    export type ExtensionStorage = "ExtensionStorage";
}

/**
 * Which storage backend the protected store uses for secrets.
 *
 * The browser-only variants (`LocalStorage`, `IndexedDb`, `ExtensionStorage`) are rejected on
 * native platforms. `PlatformDefault` chooses per platform and runtime context: the OS keyring on
 * native, `localStorage` in a browser Window, IndexedDB in a worker, and extension storage in a
 * WebExtension.
 */
export type VeilidConfigProtectedStoreBackend = VeilidConfigProtectedStoreBackend.PlatformDefault | VeilidConfigProtectedStoreBackend.LocalStorage | VeilidConfigProtectedStoreBackend.IndexedDb | VeilidConfigProtectedStoreBackend.ExtensionStorage;

type __DHTSchemaDHTSchemaDFLT = DHTSchemaDFLT;
type __DHTSchemaDHTSchemaSMPL = DHTSchemaSMPL;
/**
 * DHT record schema selector
 */
declare namespace DHTSchema {
    /**
     * Default schema (DFLT)
     */
    export type DFLT = { DFLT: __DHTSchemaDHTSchemaDFLT };
    /**
     * Simple member schema (SMPL)
     */
    export type SMPL = { SMPL: __DHTSchemaDHTSchemaSMPL };
}

/**
 * DHT record schema selector
 */
export type DHTSchema = DHTSchema.DFLT | DHTSchema.SMPL;

type __SafetySelectionSafetySpec = SafetySpec;
type __SafetySelectionSequencing = Sequencing;
/**
 * The choice of safety route to include in compiled routes.
 */
declare namespace SafetySelection {
    /**
     * Don't use a safety route, only specify the sequencing preference.
     */
    export type Unsafe = { Unsafe: __SafetySelectionSequencing };
    /**
     * Use a safety route and parameters specified by a SafetySpec.
     */
    export type Safe = { Safe: __SafetySelectionSafetySpec };
}

/**
 * The choice of safety route to include in compiled routes.
 */
export type SafetySelection = SafetySelection.Unsafe | SafetySelection.Safe;


/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareDecapsulationKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareDecapsulationKey): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareDecapsulationKey;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareDecapsulationKey;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareDecapsulationKey;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareEncapsulationKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareEncapsulationKey): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareEncapsulationKey;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareEncapsulationKey;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareEncapsulationKey;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareHashCoordinate {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareHashCoordinate): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareHashCoordinate;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareHashCoordinate;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareHashCoordinate;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareHashDigest {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareHashDigest): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareHashDigest;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareHashDigest;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareHashDigest;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Untyped KEM encapsulation/decapsulation key pair, carrying no cryptosystem kind.
 */
export class BareKemKeyPair {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Encodes the pair as `<encapsulation>:<decapsulation>`, each part base64url-nopad.
     */
    encode(): string;
    /**
     * Decodes a pair from an `<encapsulation>:<decapsulation>` string.
     *
     * Errors with `VeilidAPIError::ParseError` if `input` is not exactly two colon-separated parts,
     * or `VeilidAPIError::Generic` if either part is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareKemKeyPair;
    /**
     * Decodes a pair from `<encapsulation>:<decapsulation>` bytes, requiring exactly two
     * colon-separated parts.
     *
     * Errors with `VeilidAPIError::ParseError` if `b` is not exactly two colon-separated parts,
     * or `VeilidAPIError::Generic` if either part is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareKemKeyPair;
    /**
     * Returns the length of the `encode` string.
     */
    readonly encodedLength: number;
    /**
     * Returns a clone of the encapsulation key.
     */
    readonly key: BareEncapsulationKey;
    /**
     * Returns a clone of the decapsulation key.
     */
    readonly secret: BareDecapsulationKey;
}

/**
 * Untyped public/secret key pair, carrying no cryptosystem kind.
 */
export class BareKeyPair {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Encodes the pair as `<public>:<secret>`, each part base64url-nopad.
     */
    encode(): string;
    /**
     * Decodes a pair from a `<public>:<secret>` string.
     *
     * Errors with `VeilidAPIError::ParseError` if `input` is not exactly two colon-separated parts,
     * or `VeilidAPIError::Generic` if either part is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareKeyPair;
    /**
     * Decodes a pair from `<public>:<secret>` bytes, requiring exactly two colon-separated parts.
     *
     * Errors with `VeilidAPIError::ParseError` if `b` is not exactly two colon-separated parts,
     * or `VeilidAPIError::Generic` if either part is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareKeyPair;
    /**
     * Returns the length of the `encode` string.
     */
    readonly encodedLength: number;
    /**
     * Returns a clone of the public key.
     */
    readonly key: BarePublicKey;
    /**
     * Returns a clone of the secret key.
     */
    readonly secret: BareSecretKey;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareMemberId {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareMemberId): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareMemberId;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareMemberId;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareMemberId;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareNodeId {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareNodeId): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareNodeId;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareNodeId;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareNodeId;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareOpaqueRecordKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareOpaqueRecordKey): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareOpaqueRecordKey;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareOpaqueRecordKey;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareOpaqueRecordKey;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BarePublicKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BarePublicKey): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BarePublicKey;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BarePublicKey;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BarePublicKey;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Untyped DHT record key: an opaque record key with an optional record encryption secret.
 */
export class BareRecordKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Encodes as `<key>` or `<key>:<encryption_key>`, each part base64url-nopad.
     */
    encode(): string;
    /**
     * Decodes from a `<key>` or `<key>:<encryption_key>` string.
     *
     * Errors with `VeilidAPIError::ParseError` if `input` has more than two colon-separated parts,
     * or `VeilidAPIError::Generic` if any part is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareRecordKey;
    /**
     * Decodes from `<key>` or `<key>:<encryption_key>` bytes.
     *
     * Errors with `VeilidAPIError::ParseError` if `b` has more than two colon-separated parts,
     * or `VeilidAPIError::Generic` if any part is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareRecordKey;
    /**
     * Returns the length of the `encode` string.
     */
    readonly encodedLen: number;
    /**
     * Returns a clone of the encryption secret, if present.
     */
    readonly encryptionKey: BareSharedSecret | undefined;
    /**
     * Returns a clone of the opaque record key.
     */
    readonly key: BareOpaqueRecordKey;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareRouteId {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareRouteId): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareRouteId;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareRouteId;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareRouteId;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareSecretKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareSecretKey): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareSecretKey;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareSecretKey;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareSecretKey;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareSharedSecret {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareSharedSecret): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareSharedSecret;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareSharedSecret;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareSharedSecret;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareSignature {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: BareSignature): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): BareSignature;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): BareSignature;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): BareSignature;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * r" A KEM secret key, opening blobs with [`CryptoSystem::hpke_open`](crate::CryptoSystem::hpke_open)
 * r" (DHKEM-X25519 under VLD0, ML-KEM at VLD1). Signing uses [`SecretKey`]; under VLD0 this key
 * r" is derivable from one via
 * r" [`CryptoSystem::decapsulation_key_from_signing_secret`](crate::CryptoSystem::decapsulation_key_from_signing_secret).
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class DecapsulationKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: DecapsulationKey): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareDecapsulationKey);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): DecapsulationKey;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareDecapsulationKey;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class DecapsulationKeyGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: DecapsulationKey): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: DecapsulationKey[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: DecapsulationKey): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: DecapsulationKey[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): DecapsulationKey | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: DecapsulationKeyGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareDecapsulationKey[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): DecapsulationKeyGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): DecapsulationKey | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): DecapsulationKey[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * r" A KEM public key, sealed to with [`CryptoSystem::hpke_seal`](crate::CryptoSystem::hpke_seal)
 * r" (DHKEM-X25519 under VLD0, ML-KEM at VLD1). Signing and identity use [`PublicKey`]; under
 * r" VLD0 this key is derivable from one via
 * r" [`CryptoSystem::encapsulation_key_from_signing_key`](crate::CryptoSystem::encapsulation_key_from_signing_key).
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class EncapsulationKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: EncapsulationKey): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareEncapsulationKey);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): EncapsulationKey;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareEncapsulationKey;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class EncapsulationKeyGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: EncapsulationKey): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: EncapsulationKey[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: EncapsulationKey): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: EncapsulationKey[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): EncapsulationKey | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: EncapsulationKeyGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareEncapsulationKey[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): EncapsulationKeyGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): EncapsulationKey | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): EncapsulationKey[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class HashCoordinate {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: HashCoordinate): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareHashCoordinate);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): HashCoordinate;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareHashCoordinate;
}

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class HashDigest {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: HashDigest): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareHashDigest);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): HashDigest;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareHashDigest;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class HashDigestGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: HashDigest): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: HashDigest[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: HashDigest): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: HashDigest[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): HashDigest | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: HashDigestGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareHashDigest[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): HashDigestGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): HashDigest | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): HashDigest[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class HashDistance {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: HashDistance): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): HashDistance;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): HashDistance;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): HashDistance;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * r" A KEM key pair for HPKE seal/open. Signing key pairs use [`KeyPair`].
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class KemKeyPair {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: KemKeyPair): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareKemKeyPair);
    /**
     * Builds a KEM key pair, taking the cryptosystem kind from the encapsulation key.
     */
    static newFromParts(key: EncapsulationKey, bare_secret: BareDecapsulationKey): KemKeyPair;
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): KemKeyPair;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * Returns the kindless decapsulation key.
     */
    readonly bareSecret: BareDecapsulationKey;
    /**
     * Returns the kinded encapsulation key.
     */
    readonly key: EncapsulationKey;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * Returns the kinded decapsulation key.
     */
    readonly secret: DecapsulationKey;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareKemKeyPair;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class KemKeyPairGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: KemKeyPair): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: KemKeyPair[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: KemKeyPair): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: KemKeyPair[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): KemKeyPair | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: KemKeyPairGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareKemKeyPair[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): KemKeyPairGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): KemKeyPair | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): KemKeyPair[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * r" A signing key pair. KEM key pairs use [`KemKeyPair`].
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class KeyPair {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: KeyPair): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareKeyPair);
    /**
     * Builds a key pair, taking the cryptosystem kind from the public key.
     */
    static newFromParts(key: PublicKey, bare_secret: BareSecretKey): KeyPair;
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): KeyPair;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * Returns the kindless secret key.
     */
    readonly bareSecret: BareSecretKey;
    /**
     * Returns the kinded public key.
     */
    readonly key: PublicKey;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * Returns the kinded secret key.
     */
    readonly secret: SecretKey;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareKeyPair;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class KeyPairGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: KeyPair): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: KeyPair[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: KeyPair): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: KeyPair[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): KeyPair | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: KeyPairGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareKeyPair[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): KeyPairGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): KeyPair | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): KeyPair[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class MemberId {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: MemberId): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareMemberId);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): MemberId;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareMemberId;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class MemberIdGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: MemberId): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: MemberId[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: MemberId): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: MemberId[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): MemberId | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: MemberIdGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareMemberId[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): MemberIdGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): MemberId | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): MemberId[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class NodeId {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: NodeId): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareNodeId);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): NodeId;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareNodeId;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class NodeIdGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: NodeId): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: NodeId[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: NodeId): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: NodeId[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): NodeId | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: NodeIdGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareNodeId[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): NodeIdGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): NodeId | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): NodeId[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class Nonce {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     */
    bit(index: number): boolean;
    /**
     * Encodes the bytes as a base64url-nopad string.
     */
    encode(): string;
    /**
     * Returns `true` if there are no bytes.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both have the same bytes.
     */
    isEqual(other: Nonce): boolean;
    /**
     * Builds a `$name` by copying a byte slice.
     */
    constructor(data: Uint8Array);
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     */
    nibble(index: number): number;
    /**
     * Parses a `$name` from its base64url-nopad string form.
     */
    static parse(s: string): Nonce;
    /**
     * Copies the bytes into a new `Vec<u8>`.
     */
    toArray(): Uint8Array;
    /**
     * Returns the base64url-nopad string form.
     */
    toString(): string;
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     */
    static tryDecode(input: string): Nonce;
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     */
    static tryDecodeBytes(b: Uint8Array): Nonce;
    /**
     * Returns the length of the base64url-nopad encoding.
     */
    readonly encodedLength: number;
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     */
    readonly firstNonZeroBit: number | undefined;
    /**
     * Returns the number of bytes.
     */
    readonly length: number;
}

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class OpaqueRecordKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: OpaqueRecordKey): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareOpaqueRecordKey);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): OpaqueRecordKey;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareOpaqueRecordKey;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class OpaqueRecordKeyGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: OpaqueRecordKey): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: OpaqueRecordKey[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: OpaqueRecordKey): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: OpaqueRecordKey[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): OpaqueRecordKey | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: OpaqueRecordKeyGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareOpaqueRecordKey[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): OpaqueRecordKeyGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): OpaqueRecordKey | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): OpaqueRecordKey[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * r" A signing public key: verification, identity, and node ids (Ed25519 under VLD0, ML-DSA at
 * r" VLD1). KEM encryption to a key uses [`EncapsulationKey`].
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class PublicKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: PublicKey): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BarePublicKey);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): PublicKey;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BarePublicKey;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class PublicKeyGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: PublicKey): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: PublicKey[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: PublicKey): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: PublicKey[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): PublicKey | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: PublicKeyGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BarePublicKey[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): PublicKeyGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): PublicKey | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): PublicKey[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class RecordKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: RecordKey): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareRecordKey);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): RecordKey;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * Returns the kinded encryption secret, if present.
     */
    readonly encryptionKey: SharedSecret | undefined;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareRecordKey;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class RecordKeyGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: RecordKey): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: RecordKey[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: RecordKey): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: RecordKey[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): RecordKey | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: RecordKeyGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareRecordKey[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): RecordKeyGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): RecordKey | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): RecordKey[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class RouteId {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: RouteId): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareRouteId);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): RouteId;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareRouteId;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class RouteIdGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: RouteId): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: RouteId[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: RouteId): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: RouteId[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): RouteId | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: RouteIdGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareRouteId[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): RouteIdGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): RouteId | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): RouteId[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * r" A signing secret key (Ed25519 under VLD0, ML-DSA at VLD1). KEM decryption uses
 * r" [`DecapsulationKey`].
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class SecretKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: SecretKey): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareSecretKey);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): SecretKey;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareSecretKey;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class SecretKeyGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: SecretKey): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: SecretKey[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: SecretKey): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: SecretKey[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): SecretKey | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: SecretKeyGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareSecretKey[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): SecretKeyGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): SecretKey | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): SecretKey[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class SharedSecret {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: SharedSecret): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareSharedSecret);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): SharedSecret;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareSharedSecret;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class SharedSecretGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: SharedSecret): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: SharedSecret[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: SharedSecret): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: SharedSecret[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): SharedSecret | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: SharedSecretGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareSharedSecret[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): SharedSecretGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): SharedSecret | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): SharedSecret[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class Signature {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns `true` if both have the same kind and value.
     */
    isEqual(other: Signature): boolean;
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    constructor(kind: CryptoKind, value: BareSignature);
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     */
    static parse(s: string): Signature;
    /**
     * Returns the `kind:value` string form.
     */
    toString(): string;
    /**
     * The cryptosystem this value belongs to.
     */
    readonly kind: CryptoKind;
    /**
     * A clone of the untagged value.
     */
    readonly value: BareSignature;
}

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class SignatureGroup {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     */
    add(typed_key: Signature): void;
    /**
     * Adds or replaces each value by kind, then re-sorts.
     */
    addAll(typed_keys: Signature[]): void;
    /**
     * Removes all entries.
     */
    clear(): void;
    /**
     * Whether the group contains the given value.
     */
    contains(typed_key: Signature): boolean;
    /**
     * Whether any of the given values is present in the group.
     */
    containsAny(typed_keys: Signature[]): boolean;
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    containsKind(kind: CryptoKind): boolean;
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    get(kind: CryptoKind): Signature | undefined;
    /**
     * Whether the group has no entries.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if both groups hold the same items in the same order.
     */
    isEqual(other: SignatureGroup): boolean;
    /**
     * An empty group.
     */
    constructor();
    /**
     * The untagged values of every entry, in kind-sorted order.
     */
    keys(): BareSignature[];
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     */
    static parse(s: string): SignatureGroup;
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     */
    remove(kind: CryptoKind): Signature | undefined;
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     */
    removeAll(kinds: CryptoKind[]): void;
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     */
    toArray(): Signature[];
    /**
     * Returns the bracketed, comma-separated string form.
     */
    toString(): string;
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     */
    readonly kinds: CryptoKind[];
    /**
     * The number of entries in the group.
     */
    readonly length: number;
}

/**
 * A transaction over a set of DHT records, allowing atomic get/set across them.
 */
export class VeilidDHTTransaction {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Commit the transaction. Performs all actions atomically.
     *
     * The release for [VeilidClient::transactDHTRecords] (the other half is [VeilidDHTTransaction::rollback]). Blocks on the end and commit consensus barriers and requires the node to be online. Completes exactly once: a second commit or a rollback errors with `transaction_not_found`.
     *
     * Throws the same error its core twin `DHTTransaction::commit` returns: `TransactionNotFound` if the transaction was already committed, rolled back, or is unknown, and `TryAgain` (retryable) if the node is offline or the end/commit barriers could not reach consensus. Throws `NotInitialized` if the node is not started.
     */
    commit(): Promise<void>;
    /**
     * Extend the transaction with additional record keys.
     *
     * Records already in the transaction are skipped. Idempotent if no
     * new records are supplied. May return `TryAgain` on Begin contention.
     *
     * Blocks on a network Begin fanout for the new records (online-only).
     *
     * Throws the same error its core twin `DHTTransaction::extend` returns: `TransactionNotFound` if the transaction handle is already completed or unknown, `MissingArgument` if `recordKeys` contains duplicates, `InvalidArgument` if the merged record set would exceed the per-transaction record limit, and `TryAgain` (retryable) if the node is offline or the Begin fanout for the added records could not reach consensus. Throws `NotInitialized` if the node is not started, and `Generic` if `recordKeys` or `options` fail to deserialize.
     */
    extend(recordKeys: RecordKey[], options?: TransactDHTRecordsOptions | null): Promise<void>;
    /**
     * Perform a get_dht_value operation inside the transaction
     *
     * * Will fail if performed offline
     * * Will pull the latest value from the network, will fail if the local value is newer
     * * Will fail if existing offline writes exist for this record key
     *
     * Returns `None` if the value subkey has not yet been set.
     * Returns `Some(data)` if the value subkey has valid data.
     *
     * Blocks on the per-subkey lock (unbounded) and the get RPC to the transaction's node set. Each per-node RPC is bounded by `network.rpc.timeout_ms`, but the lock wait and retry rounds are not, so the whole call has no single-timeout bound.
     *
     * Throws the same error its core twin `DHTTransaction::get` returns: `TransactionNotFound` if the transaction handle is already completed or no longer in the Begin stage, `InvalidArgument` if `recordKey` is not in the transaction or `subkey` is outside the schema range, `Generic` if `recordKey` is malformed (unsupported kind or bad length), and `TryAgain` (retryable) if the node is offline or the network did not return the value that existed at begin time. A non-responding node is retried rather than surfaced as a timeout. Throws `NotInitialized` if the node is not started.
     */
    get(recordKey: RecordKey, subkey: number): Promise<ValueData | undefined>;
    /**
     * Perform a inspect_dht_record operation inside the transaction
     *
     * * Does not perform any network activity, as the transaction state keeps all of the required information after the begin
     *
     * For information on arguments, see [RoutingContext::inspect_dht_record]
     *
     * Returns a DHTRecordReport with the subkey ranges that were returned that overlapped the schema, and sequence numbers for each of the subkeys in the range.
     *
     * Throws the same error its core twin `DHTTransaction::inspect` returns: `TransactionNotFound` if the transaction handle is already completed, unknown, or no longer in the Begin stage, `InvalidArgument` if `recordKey` is not in the transaction (a malformed or wrong-kind key is not found), and `Generic` if the transaction has not started. Performs no network activity and cannot time out. Throws `NotInitialized` if the node is not started.
     */
    inspect(recordKey: RecordKey, subkeys?: ValueSubkeyRangeSet | null, scope?: DHTReportScope | null): Promise<DHTRecordReport>;
    /**
     * Rollback the transaction. Does nothing to the DHT.
     *
     * The release for [VeilidClient::transactDHTRecords] (the other half is [VeilidDHTTransaction::commit]). Blocks sending rollbacks to the network and requires the node to be online. Completes exactly once: a second rollback or a commit errors with `transaction_not_found`.
     *
     * Throws the same error its core twin `DHTTransaction::rollback` returns: `TransactionNotFound` if the transaction was already committed, rolled back, or is unknown, and `TryAgain` (retryable) if the node is offline. Throws `NotInitialized` if the node is not started.
     */
    rollback(): Promise<void>;
    /**
     * Add a set_dht_value operation to the transaction
     *
     * * Will fail if performed offline
     * * Will fail if existing offline writes exist for this record key
     *
     * The writer, if specified, will override the 'default_writer' specified when the record is opened.
     *
     * Returns `None` if the value was successfully set.
     * Returns `Some(data)` if the value set was older than the one available on the network.
     *
     * Blocks on the per-subkey lock (unbounded) and the set RPC to the transaction's node set. Each per-node RPC is bounded by `network.rpc.timeout_ms`, but the lock wait and retry rounds are not, so the whole call has no single-timeout bound.
     *
     * Throws the same error its core twin `DHTTransaction::set` returns: `TransactionNotFound` if the transaction handle is already completed or no longer in the Begin stage, `InvalidArgument` if `recordKey` is not open in the transaction or `subkey` is outside the schema range, `Generic` if `recordKey` is malformed (unsupported kind or bad length) or the subkey has no writer, and `TryAgain` (retryable) if the node is offline or write consensus was not reached this round. A non-responding node is retried rather than surfaced as a timeout. Throws `NotInitialized` if the node is not started, and `Generic` if `options` fails to deserialize.
     */
    set(recordKey: RecordKey, subkey: number, data: Uint8Array, options?: DHTTransactionSetValueOptions | null): Promise<ValueData | undefined>;
}

/**
 * Routing contexts are the way you specify the communication preferences for Veilid.
 *
 * By default routing contexts have 'safety routing' enabled which offers sender privacy.
 * To disable this and send RPC operations straight from the node, use [VeilidRoutingContext::withSafety]
 * with a [SafetySelection::Unsafe] parameter. To enable receiver privacy, send to an imported private
 * route id rather than directly to a node id.
 */
export class VeilidRoutingContext {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * App-level bidirectional call that expects a response to be returned.
     *
     * Veilid apps may use this for arbitrary message passing.
     *
     * @param {Target} target - a private route id, or in 'footgun' mode, a direct node id
     * @param {Uint8Array} message - an arbitrary message blob of up to `32768` bytes.
     * @returns {Uint8Array} an answer blob of up to `32768` bytes.
     *
     * Blocks awaiting the remote answer over the network.
     *
     * Throws the same error its core twin `RoutingContext::app_call` returns: `InvalidTarget` if `target` is a node id (only route ids are allowed without the `footgun-nodeid-target` feature), otherwise `NoConnection` if the route could not be resolved or allocated, `Timeout` if the reply deadline elapsed, or `TryAgain` if a route is temporarily unavailable (all retryable). Throws `NotInitialized` if the node is not started, and `Generic` if `target` is malformed.
     */
    appCall(target: Target, request: Uint8Array): Promise<Uint8Array>;
    /**
     * App-level unidirectional message that does not expect any value to be returned.
     *
     * Veilid apps may use this for arbitrary message passing.
     *
     * @param {string} target - a private route id, or in 'footgun' mode, a direct node id
     * @param {string} message - an arbitrary message blob of up to `32768` bytes.
     *
     * Awaits a network send.
     *
     * Throws the same error its core twin `RoutingContext::app_message` returns: `InvalidTarget` if `target` is a node id (only route ids are allowed without the `footgun-nodeid-target` feature), otherwise `NoConnection` if the route could not be resolved or allocated, `Timeout` if dispatch timed out, or `TryAgain` if a route is temporarily unavailable (all retryable). Throws `NotInitialized` if the node is not started, and `Generic` if `target` is malformed.
     */
    appMessage(target: Target, message: Uint8Array): Promise<void>;
    /**
     * Cancels a watch early.
     *
     * This is a convenience function that cancels watching all subkeys in a range. The subkeys specified here
     * are subtracted from the currently-watched subkey range.
     * If no range is specified, this is equivalent to cancelling the entire range of subkeys.
     * Only the subkey range is changed, the expiration and count remain the same.
     * If no subkeys remain, the watch is entirely cancelled and will receive no more updates.
     *
     * Returns Ok(true) if a watch is active for this record.
     * Returns Ok(false) if the entire watch has been cancelled.
     *
     * A no-op returning `Ok(false)` when no watch is active. Records the reduced watch state and returns without a network round-trip; a background task sends the cancel.
     *
     * Throws the same error its core twin `RoutingContext::cancel_dht_watch` returns: `InvalidArgument` if the record is not open, `Generic` if `recordKey` is an unsupported kind or malformed, and `NotInitialized` if the node is not started.
     */
    cancelDHTWatch(recordKey: RecordKey, subkeys?: ValueSubkeyRangeSet | null): Promise<boolean>;
    /**
     * Closes a DHT record at a specific key that was opened with create_dht_record or open_dht_record.
     *
     * Closing a record allows you to re-open it with a different routing context
     *
     * The release for [VeilidRoutingContext::createDHTRecord] and [VeilidRoutingContext::openDHTRecord]. Closing a record that is local but not open is a no-op; one not in the local store errors. Blocks holding the record lock until pending writes flush to local disk.
     *
     * Throws the same error its core twin `RoutingContext::close_dht_record` returns: `KeyNotFound` if the record is not in the local store, `Generic` if `recordKey` is an unsupported kind or malformed, and `NotInitialized` if the node is not started. None are retryable.
     */
    closeDHTRecord(recordKey: RecordKey): Promise<void>;
    /**
     * Same as `new VeilidRoutingContext()` except easier to chain.
     */
    static create(): VeilidRoutingContext;
    /**
     * Creates a new DHT record
     *
     * The record is considered 'open' after the create operation succeeds.
     * * 'kind' - specify a cryptosystem kind to use
     * * 'schema' - the schema to use when creating the DHT record
     * * 'owner' - optionally specify an owner keypair to use. If you leave this as None then a random one will be generated. If specified, the crypto kind of the owner must match that of the `kind` parameter
     * Returns the newly allocated DHT record's key if successful.
     *
     * Note: if you pass in an owner keypair this call is a deterministic! This means that if you try to create a new record for a given owner and schema that already exists it *will* fail.
     *
     * Opens the record; the caller must later release it via [VeilidRoutingContext::closeDHTRecord] or it leaks. Local-only: builds the record in the local store without network fanout.
     *
     * Throws the same error its core twin `RoutingContext::create_dht_record` returns: `Generic` if `kind` is unsupported, `schema` has an invalid size or fourcc, or `owner` is a malformed keypair; `InvalidArgument` if `schema` has an invalid subkey/member/writer count, `owner` is the wrong crypto kind for `kind`, or this node's id would be a schema member; and `NotInitialized` if the node is not started. Also throws a parse error if `kind` or `owner` fail to deserialize, or `Generic`/`InvalidArgument` if `schema` fails to deserialize.
     */
    createDHTRecord(kind: CryptoKind, schema: DHTSchema, owner?: KeyPair | null): Promise<DHTRecordDescriptor>;
    /**
     * Deletes a DHT record at a specific key.
     *
     * If the record is opened, it must be closed before it is deleted.
     * Deleting a record does not delete it from the network, but will remove the storage of the record
     * locally, and will prevent its value from being refreshed on the network by this node.
     *
     * Throws the same error its core twin `RoutingContext::delete_dht_record` returns: `Generic` if `recordKey` is an unsupported kind or malformed, `KeyNotFound` if the record is not in the local store, and `NotInitialized` if the node is not started. None are retryable.
     */
    deleteDHTRecord(recordKey: RecordKey): Promise<void>;
    /**
     * Waits for any pending offline subkey writes for a DHT record to be flushed to the network.
     * `timeoutMs` is the maximum time to wait in milliseconds, or `undefined` to wait indefinitely.
     * Returns `true` if all pending writes were flushed, `false` if the timeout elapsed first.
     *
     * Blocks until the queued offline writes drain to the network or `timeoutMs` elapses.
     *
     * Throws the same error its core twin `RoutingContext::flush_dht_record` returns: `Generic` if `recordKey` is an unsupported kind or malformed, and `NotInitialized` if the node shuts down while waiting or is not started.
     */
    flushDHTRecord(recordKey: RecordKey, timeoutMs?: number | null): Promise<boolean>;
    /**
     * Gets the latest value of a subkey.
     *
     * May pull the latest value from the network, but by setting `forceRefresh` you can force a network data refresh.
     *
     * Returns `undefined` if the value subkey has not yet been set.
     * Returns a Uint8Array of `data` if the value subkey has valid data.
     *
     * A network get takes the newest sequence number the nodes it reaches hold. Where they hold
     * different values at it, the value most of them hold wins, with a tie going to the value held
     * closest to the record key, as in `setDHTValue`. A newer value replaces the local copy; a
     * different value at the same sequence number replaces it only with `forceRefresh`.
     *
     * Returns the local value without network access unless `forceRefresh` is set, which awaits a network get fanout.
     *
     * Throws the same error its core twin `RoutingContext::get_dht_value` returns: `InvalidArgument` if the record is not open or `recordKey` is malformed, `Generic` if `recordKey` is an unsupported kind, `TryAgain` (retryable) if a network refresh is needed and the node is offline, `KeyNotFound` if the record no longer exists, and `NotInitialized` if the node is not started.
     */
    getDHTValue(recordKey: RecordKey, subkey: number, forceRefresh: boolean): Promise<ValueData | undefined>;
    /**
     * Inspects a DHT record for subkey state.
     * This is useful for checking if you should push new subkeys to the network, or retrieve the current state of a record from the network
     * to see what needs updating locally.
     *
     * * `key` is the record key to watch. it must first be opened for reading or writing.
     * * `subkeys` is the the range of subkeys to inspect. The range must not exceed 512 discrete non-overlapping or adjacent subranges.
     *    If no range is specified, this is equivalent to inspecting the entire range of subkeys. In total, the list of subkeys returned will be truncated at 512 elements.
     * * `scope` is what kind of range the inspection has:
     *
     *   - DHTReportScope::Local
     *     Results will be only for a locally stored record.
     *     Useful for seeing what subkeys you have locally and which ones have not been retrieved
     *
     *   - DHTReportScope::SyncGet
     *     Return the local sequence numbers and the network sequence numbers with GetValue fanout parameters
     *     Provides an independent view of both the local sequence numbers and the network sequence numbers for nodes that
     *     would be reached as if the local copy did not exist locally.
     *     Useful for determining if the current local copy should be updated from the network.
     *
     *   - DHTReportScope::SyncSet
     *     Return the local sequence numbers and the network sequence numbers with SetValue fanout parameters
     *     Provides an independent view of both the local sequence numbers and the network sequence numbers for nodes that
     *     would be reached as if the local copy did not exist locally.
     *     Useful for determining if the unchanged local copy should be pushed to the network.
     *
     *   - DHTReportScope::UpdateGet
     *     Return the local sequence numbers and the network sequence numbers with GetValue fanout parameters
     *     Provides an view of both the local sequence numbers and the network sequence numbers for nodes that
     *     would be reached as if a GetValue operation were being performed, including accepting newer values from the network.
     *     Useful for determining which subkeys would change with a GetValue operation
     *
     *   - DHTReportScope::UpdateSet
     *     Return the local sequence numbers and the network sequence numbers with SetValue fanout parameters
     *     Provides an view of both the local sequence numbers and the network sequence numbers for nodes that
     *     would be reached as if a SetValue operation were being performed, including accepting newer values from the network.
     *     This simulates a SetValue with the initial sequence number incremented by 1, like a real SetValue would when updating.
     *     Useful for determine which subkeys would change with an SetValue operation
     *
     * Returns a DHTRecordReport with the subkey ranges that were returned that overlapped the schema, and sequence numbers for each of the subkeys in the range.
     *
     * `DHTReportScope::Local` (the default) is local-only and non-blocking; the Sync/Update scopes block on a network inspect fanout and return `TryAgain` if offline.
     *
     * Throws the same error its core twin `RoutingContext::inspect_dht_record` returns: `InvalidArgument` if the record is not open, `Generic` if `recordKey` is an unsupported kind or malformed, `TryAgain` (retryable) if a Sync/Update scope is used while offline, and `NotInitialized` if the node is not started.
     */
    inspectDHTRecord(recordKey: RecordKey, subkeys?: ValueSubkeyRangeSet | null, scope?: DHTReportScope | null): Promise<DHTRecordReport>;
    /**
     * Opens a DHT record at a specific key.
     *
     * Associates a 'default_writer' secret if one is provided to provide writer capability. The
     * writer can be overridden if specified here via the set_dht_value writer.
     *
     * Records may only be opened or created. If a record is re-opened it will use the new writer and routing context
     * ignoring the settings of the last time it was opened. This allows one to open a record a second time
     * without first closing it, which will keep the active 'watches' on the record but change the default writer or
     * safety selection.
     *
     * @returns the DHT record descriptor for the opened record if successful.
     * @param {string} recordKey - key of the DHT record.
     * @param {string} defaultWriter - the writer keypair to use for set value operations by default
     * @param {OpenDHTRecordOptions} options - `rehydrate: false` skips queueing a check that the network still carries a record this node already holds
     *
     * The open half of the open/close pair; release with [VeilidRoutingContext::closeDHTRecord] or it leaks. Re-opening an already-open record replaces its writer and routing context while keeping active watches. May await network.
     *
     * Throws the same error its core twin `RoutingContext::open_dht_record` returns: `Generic` if `recordKey` is an unsupported kind or malformed or `defaultWriter` is a malformed keypair; `TryAgain` (retryable) if the record is not yet local and the node is offline or no node answered; `KeyNotFound` if the record does not exist on the network; and `NotInitialized` if the node is not started. Also throws a parse error if `defaultWriter` fails to deserialize, and `Generic` if `options` fails to deserialize.
     */
    openDHTRecord(recordKey: RecordKey, defaultWriter?: KeyPair | null, options?: OpenDHTRecordOptions | null): Promise<DHTRecordDescriptor>;
    /**
     * Get the safety selection in use on this routing context
     * @returns the SafetySelection currently in use if successful.
     */
    safety(): SafetySelection;
    /**
     * Pushes a changed subkey value to the network.
     * The DHT record must first by opened via open_dht_record or create_dht_record.
     *
     * The writer, if specified, will override the 'default_writer' specified when the record is opened.
     *
     * Returns `undefined` if the value was successfully put.
     * Returns a Uint8Array of `data` if the network holds a newer value, or if nodes hold more than one value
     * at the sequence number written. `data` is the value most of them hold, which can be the one just put.
     *
     * Blocks on a network set fanout; when offline or the fanout fails, queues the write for later flush (if offline writes are allowed) and returns `undefined`.
     *
     * Throws the same error its core twin `RoutingContext::set_dht_value` returns: `InvalidArgument` if the record is not open; `Generic` if `recordKey` is an unsupported kind, the record is not writable, or the value fails schema validation (subkey out of range, `data` over the per-subkey limit, or wrong writer); `TryAgain` (retryable) if the record is currently in a transaction; `KeyNotFound` if the record no longer exists; and `NotInitialized` if the node is not started. A failed network fanout does not throw; the write is deferred. Also throws `Generic` if `options` fails to deserialize.
     */
    setDHTValue(recordKey: RecordKey, subkey: number, data: Uint8Array, options?: SetDHTValueOptions | null): Promise<ValueData | undefined>;
    /**
     * Create a new VeilidRoutingContext, without any privacy or sequencing settings.
     *
     * Throws `NotInitialized` if the node is not started.
     */
    constructor();
    /**
     * Add or update a watch to a DHT value that informs the user via an VeilidUpdate::ValueChange callback when the record has subkeys change.
     * A collection of remote nodes will be selected to perform the watch and they will offer an expiration time based on a suggestion, and make an attempt to
     * continue to report changes via the callback. Nodes that agree to doing watches will be put on our 'ping' list to ensure they are still around
     * otherwise the watch will be cancelled and will have to be re-watched.
     *
     * There is only one watch permitted per record. If a change to a watch is desired, the previous one will be overwritten.
     * * `key` is the record key to watch. it must first be opened for reading or writing.
     * * `subkeys`:
     *   - None: specifies watching the entire range of subkeys.
     *   - Some(range): is the the range of subkeys to watch. The range must not exceed 512 discrete non-overlapping or adjacent subranges. If no range is specified, this is equivalent to watching the entire range of subkeys.
     * * `expiration`:
     *   - None: specifies a watch with no expiration
     *   - Some(timestamp): the desired timestamp of when to automatically terminate the watch, in microseconds. If this value is less than `network.rpc.timeout_ms` milliseconds in the future, this function will return an error immediately.
     * * `count:
     *   - None: specifies a watch count of u32::MAX
     *   - Some(count): is the number of times the watch will be sent, maximum. A zero value here is equivalent to a cancellation.
     *
     * Returns Ok(true) if a watch is active for this record.
     * Returns Ok(false) if the entire watch has been cancelled.
     *
     * DHT watches are accepted with the following conditions:
     * * First-come first-served basis for arbitrary unauthenticated readers, up to network.dht.public_watch_limit per record.
     * * If a member (either the owner or a SMPL schema member) has opened the key for writing (even if no writing is performed) then the watch will be signed and guaranteed network.dht.member_watch_limit per writer.
     *
     * Members can be specified via the SMPL schema and do not need to allocate writable subkeys in order to offer a member watch capability.
     *
     * Re-watching the same record replaces the prior watch's parameters in place. Records the desired watch state and returns without a network round-trip; a background task reconciles it with a remote node.
     *
     * Throws the same error its core twin `RoutingContext::watch_dht_values` returns: `InvalidArgument` if the record is not open, `recordKey` is malformed, or a non-zero `expiration` is sooner than `network.rpc.timeout_ms` in the future; `Generic` if `recordKey` is an unsupported kind or no local record is found; and `NotInitialized` if the node is not started. None are retryable; no network errors surface here since reconciliation is deferred to a background task.
     */
    watchDhtValues(recordKey: RecordKey, subkeys?: ValueSubkeyRangeSet | null, expiration?: Timestamp | null, count?: number | null): Promise<boolean>;
    /**
     * Turn on sender privacy, enabling the use of safety routes. This is the default and
     * calling this function is only necessary if you have previously disable safety or used other parameters.
     * Returns a new instance of VeilidRoutingContext - does not mutate.
     *
     * Default values for hop count, stability and sequencing preferences are used.
     *
     * * Hop count default is dependent on config, but is set to 1 extra hop.
     * * Stability default is to choose 'low latency' routes, preferring them over long-term reliability.
     * * Sequencing default is to have no preference for ordered vs unordered message delivery
     *
     * To customize the safety selection in use, use [VeilidRoutingContext::withSafety].
     *
     * Throws `NotInitialized` if the node is not started.
     */
    withDefaultSafety(): VeilidRoutingContext;
    /**
     * Use a custom [SafetySelection]. Can be used to disable safety via [SafetySelection::Unsafe]
     * Returns a new instance of VeilidRoutingContext - does not mutate.
     *
     * Throws `Generic` if `safety_selection` is `Unsafe` without the `footgun-nodeid-target` feature or its hop count exceeds the configured maximum, `InvalidArgument` if its `preferred_route` is not a known route id, and `NotInitialized` if the node is not started.
     */
    withSafety(safety_selection: SafetySelection): VeilidRoutingContext;
    /**
     * Use a specified `Sequencing` preference.
     * Returns a new instance of VeilidRoutingContext - does not mutate.
     */
    withSequencing(sequencing: Sequencing): VeilidRoutingContext;
}

/**
 * A handle to an opened encrypted key-value table.
 */
export class VeilidTableDB {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Start a TableDB write transaction.
     * The transaction object must be committed or rolled back before dropping.
     *
     * Release the returned handle via [VeilidTableDBTransaction::commit] or [VeilidTableDBTransaction::rollback]; dropping it without either logs an error. Local, does not block.
     *
     * Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     */
    createTransaction(): Promise<VeilidTableDBTransaction>;
    /**
     * Delete key with from a column in the TableDB.
     *
     * Opens the table if needed, then awaits a disk write.
     *
     * Returns `undefined` if the key was absent. Throws the same error its core twin `TableDB::delete` returns: `Generic` if `columnId` is at or above the opened column count, the backing-store delete fails, or the prior value is too short to decrypt. Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     */
    delete(columnId: number, key: Uint8Array): Promise<Uint8Array | undefined>;
    /**
     * Delete this TableDB.
     *
     * Drops this object's open handle, then deletes the table from disk. Awaits a disk delete.
     *
     * Returns `false` if no table by that name exists. Throws the same error its core twin `TableStore::delete` returns: `InvalidArgument` if `tableName` has characters other than alphanumeric, `_`, or `-`; `Generic` if the table is still open elsewhere (drop all handles first) or the backing-store delete fails; and `NotInitialized` if the node is not started.
     */
    deleteTable(): Promise<boolean>;
    /**
     * Get the list of keys in a column of the TableDB.
     *
     * Returns an array of Uint8Array keys.
     *
     * Opens the table if needed, then awaits a disk read.
     *
     * Throws the same error its core twin `TableDB::get_keys` returns: `Generic` if `columnId` is at or above the opened column count, the backing-store read fails, or a stored key is too short to decrypt. Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     */
    getKeys(columnId: number): Promise<Uint8Array[]>;
    /**
     * Read a key from a column in the TableDB immediately.
     *
     * Opens the table if needed, then awaits a disk read.
     *
     * Returns `undefined` if the key is absent. Throws the same error its core twin `TableDB::load` returns: `Generic` if `columnId` is at or above the opened column count, the backing-store read fails, or the stored value is too short to decrypt. Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     */
    load(columnId: number, key: Uint8Array): Promise<Uint8Array | undefined>;
    /**
     * If the column count is greater than an existing TableDB's column count,
     * the database will be upgraded to add the missing columns.
     */
    constructor(tableName: string, columnCount: number);
    /**
     * Get or create the TableDB database table.
     * This is called automatically when performing actions on the TableDB.
     *
     * Holds the opened table handle on this object until `deleteTable` or the object is dropped. Re-opening when already open replaces the handle. Awaits a disk open.
     *
     * Throws the same error its core twin `TableStore::open` returns: `InvalidArgument` if `columnCount` is zero or `tableName` has characters other than alphanumeric, `_`, or `-`; `Generic` if the table is already open elsewhere with a smaller column count or the backing-store open fails; and `NotInitialized` if the node is not started or stored data fails to decrypt.
     */
    openTable(): Promise<void>;
    /**
     * Rename this TableDB.
     *
     * Drops this object's open handle, renames the table, then points this object at the new name. Awaits a disk flush.
     *
     * Throws the same error its core twin `TableStore::rename` returns: `InvalidArgument` if either name has characters other than alphanumeric, `_`, or `-`; `Generic` if `newTableName` already exists or this table does not exist; and `NotInitialized` if the node is not started.
     */
    renameTable(newTableName: string): Promise<void>;
    /**
     * Store a key with a value in a column in the TableDB.
     * Performs a single transaction immediately.
     *
     * Opens the table if needed, then awaits a disk write.
     *
     * Throws the same error its core twin `TableDB::store` returns: `Generic` if `columnId` is at or above the opened column count or the backing-store write fails. Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     */
    store(columnId: number, key: Uint8Array, value: Uint8Array): Promise<void>;
}

/**
 * A TableDB write transaction. Atomically commits a group of writes or deletes to the TableDB.
 */
export class VeilidTableDBTransaction {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Commit the transaction. Performs all actions atomically.
     *
     * The release for [VeilidTableDB::createTransaction] (the other half is [VeilidTableDBTransaction::rollback]). An empty transaction commits as a no-op; otherwise blocks on the serialized commit lock and the disk write. Calling commit or rollback again errors with "transaction already completed".
     *
     * Throws the same error its core twin `TableDBTransaction::commit` returns: `Generic` if this transaction was already committed or rolled back, or if the atomic backing-store write fails (the buffered writes are then lost).
     */
    commit(): Promise<void>;
    /**
     * Delete key with from a column in the TableDB
     * Does not modify TableDB until `.commit()` is called.
     *
     * Throws the same error its core twin `TableDBTransaction::delete` returns: `Generic` if `col` is at or above the opened column count, or if this transaction was already committed or rolled back.
     */
    deleteKey(col: number, key: Uint8Array): Promise<void>;
    /**
     * Rollback the transaction. Does nothing to the TableDB.
     *
     * The release for [VeilidTableDB::createTransaction] (the other half is [VeilidTableDBTransaction::commit]). Discards the buffered writes locally without blocking.
     */
    rollback(): Promise<void>;
    /**
     * Store a key with a value in a column in the TableDB.
     * Does not modify TableDB until `.commit()` is called.
     *
     * Throws the same error its core twin `TableDBTransaction::store` returns: `Generic` if `col` is at or above the opened column count, or if this transaction was already committed or rolled back.
     */
    store(col: number, key: Uint8Array, value: Uint8Array): Promise<void>;
}

/**
 * Makes every error thrown out of wasm an instance of the `VeilidAPIError` class
 * hierarchy in `js/veilid_errors.js`.
 *
 * Registering with veilid-core rather than converting here covers the fallible items
 * veilid-core exports itself, such as `RecordKey.parse`. Runs during `init()`, before
 * any export is reachable.
 */
export function register_error_factory(): void;

/**
 * Namespace of node-level Veilid operations: startup, shutdown, state, crypto, routes, and config.
 */
export class veilidClient {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Respond to an AppCall received over a VeilidUpdate::AppCall.
     *
     * * `call_id` - specifies which call to reply to, and it comes from a VeilidUpdate::AppCall, specifically the VeilidAppCall::id() value.
     * * `message` - is an answer blob to be returned by the remote node's RoutingContext::app_call() function, and may be up to 32768 bytes
     *
     * Awaits a network send of the answer.
     *
     * Throws a parse error if `callId` is not a valid operation id. Otherwise throws the same error its core twin `VeilidAPI::app_call_reply` returns: `Generic` if the `callId` is unknown or already answered, `TryAgain` if the node is mid-shutdown, and `NotInitialized` if the node is not started.
     */
    static appCallReply(callId: string, message: Uint8Array): Promise<void>;
    /**
     * Connect to the network.
     *
     * Moves the attachment to `Attaching` and returns; it stays there, waiting to bind if it must, until the node attaches or `detach` is called. Succeeds while already attaching.
     *
     * Throws the same error its core twin `VeilidAPI::attach` returns: `Generic` if already attached, and `NotInitialized` if the node is not started.
     */
    static attach(): Promise<void>;
    /**
     * Replace the configuration of a detached node; the new values apply at the next `attach`. A config as `getState` reports it, with its secrets blanked, keeps the current secrets.
     *
     * Throws the same error its core twin `VeilidAPI::change_config` returns: `Generic` unless the node is detached, `InvalidArgument` for a key that needs a restart, and `NotInitialized` if the node is not started.
     */
    static changeConfig(config: VeilidConfig): void;
    /**
     * Apply ignore-list changes to a logging layer by name, or to all layers when `layer` is "all".
     */
    static changeLogIgnore(layer: string, changes: string[]): void;
    /**
     * Apply tracing directives to a logging layer by name, or to all layers when `layer` is "all".
     *
     * Throws a parse error if `directive` is not a valid log directive string. An unknown `layer` name is a no-op, not an error.
     */
    static changeLogLevel(layer: string, directive: string): void;
    /**
     * Execute an 'internal debug command'.
     *
     * Throws a parse error if `command` cannot be tokenized, `Generic` if it is an unknown command, `InvalidArgument` if a known command's arguments are invalid, and `NotInitialized` if the node is not started. Individual commands may throw their own errors.
     */
    static debug(command: string): Promise<string>;
    /**
     * Return the default veilid configuration, in string format
     */
    static defaultConfig(): VeilidConfig;
    /**
     * Remove every user secret stored for this node's namespace.
     */
    static deleteAllUserSecrets(): Promise<void>;
    /**
     * Disconnect from the network.
     *
     * Moves the attachment to `Detaching` and returns, cancelling an attach in progress; the network teardown proceeds in the background tick loop. Succeeds while already detaching.
     *
     * Throws the same error its core twin `VeilidAPI::detach` returns: `Generic` if already detached, and `NotInitialized` if the node is not started.
     */
    static detach(): Promise<void>;
    /**
     * Return the features that were enabled when veilid-core was built.
     */
    static features(): string[];
    /**
     * Create a new MemberId for use with in creating `DHTSchema`s.
     *
     * Throws the same error its core twin `VeilidAPI::generate_member_id` returns: `Generic` if `writer_key` is an unsupported crypto kind, and `NotInitialized` if the node is not started.
     */
    static generateMemberId(writer_key: PublicKey): MemberId;
    /**
     * Generate multiple signatures with multiple cryptosystems
     *
     * Unsupported crypto kinds in `keyPairs` are silently dropped. Throws `Generic` if a keypair has the wrong kind or length or if `keyPairs` fails to deserialize, `ParseError` or `Internal` if a keypair does not form a valid signing pair, and `NotInitialized` if the node is not started.
     */
    static generateSignatures(data: Uint8Array, keyPairs: KeyPair[]): Signature[];
    /**
     * Get a cryptosystem by its kind
     *
     * Throws `InvalidArgument` if `kind` is not a cryptosystem this build supports, `NotInitialized` if the node is not started, and a parse error if `kind` fails to deserialize.
     */
    static getCrypto(kind: CryptoKind): veilidCrypto;
    /**
     * Deterministicly builds the record key for a given schema and owner public key.
     * The crypto kind of the record key will be that of the `owner` public key
     *
     * Local crypto computation only; despite being `async` it makes no network round-trip. The same inputs always yield the same key.
     *
     * Throws the same error its core twin `VeilidAPI::get_dht_record_key` returns: `InvalidArgument` or `Generic` if `schema` is malformed, `Generic` if `owner` or `encryptionKey` is an unsupported crypto kind, and `NotInitialized` if the node is not started. Also throws `Generic` (or `InvalidArgument` for `schema`) if `schema` or `encryptionKey` fail to deserialize.
     */
    static getDHTRecordKey(schema: DHTSchema, owner: PublicKey, encryptionKey?: SharedSecret | null): Promise<RecordKey>;
    /**
     * Get a full copy of the current state of Veilid.
     *
     * Throws `NotInitialized` if the node is not started.
     */
    static getState(): Promise<VeilidState>;
    /**
     * Import a private route blob as a remote private route.
     *
     * Returns a route id that can be used to send private messages to the node creating this route.
     *
     * Local import, no network round-trip. The returned route id holds an imported route the caller must free with [VeilidClient::releasePrivateRoute] or it leaks.
     *
     * Throws the same error its core twin `VeilidAPI::import_remote_private_route` returns: `InvalidArgument` if `blob` is empty or names too many crypto kinds, `ParseError` if it is malformed, `Generic` if the decoded route has no first hop, and `NotInitialized` if the node is not started.
     */
    static importRemotePrivateRoute(blob: Uint8Array): RouteId;
    /**
     * Initialize the WASM platform: panic hook and tracing layers from the platform config.
     *
     * Idempotent; only the first call has any effect. Must run before `startupCore`.
     */
    static initializeCore(platformConfig: VeilidWASMConfig): Promise<void>;
    /**
     * Check if Veilid is shutdown.
     */
    static isShutdown(): boolean;
    /**
     * List the key names of the user secrets stored for this node's namespace.
     */
    static listUserSecrets(): Promise<string[]>;
    /**
     * Load a user secret from the protected store, or `undefined` if not present.
     */
    static loadUserSecret(key: string): Promise<Uint8Array | undefined>;
    /**
     * Allocate a new private route and specify a specific cryptosystem, stability and sequencing preference.
     * Returns a route id and a publishable 'blob' with the route encrypted with each crypto kind.
     * Those nodes importing the blob will have their choice of which crypto kind to use.
     *
     * Returns a route id and 'blob' that can be published over some means (DHT or otherwise) to be imported by another Veilid node.
     *
     * Blocks on the network to allocate and test the route. The returned route id holds an allocated route the caller must free with [VeilidClient::releasePrivateRoute] or it leaks.
     *
     * Throws the same error its core twin `VeilidAPI::new_custom_private_route` returns: `Generic` if `private_spec` names an invalid crypto kind, `InvalidArgument` if its hop count exceeds the configured maximum, `TryAgain` (retryable) if there is no valid PublicInternet network class yet, not enough nodes are known, or the route failed its reachability test, and `NotInitialized` if the node is not started.
     */
    static newCustomPrivateRoute(private_spec: PrivateSpec): Promise<RouteBlob>;
    /**
     * Allocate a new private route set with default cryptography and network options.
     * Returns a route id and a publishable 'blob' with the route encrypted with each crypto kind.
     * Those nodes importing the blob will have their choice of which crypto kind to use.
     *
     * Returns a route id and 'blob' that can be published over some means (DHT or otherwise) to be imported by another Veilid node.
     *
     * Blocks on the network to allocate and test the route. The returned route id holds an allocated route the caller must free with [VeilidClient::releasePrivateRoute] or it leaks.
     *
     * Throws the same error its core twin `VeilidAPI::new_private_route` returns: `TryAgain` (retryable) if there is no valid PublicInternet network class yet, not enough nodes are known to build the route, or the route failed its reachability test, and `NotInitialized` if the node is not started.
     */
    static newPrivateRoute(): Promise<RouteBlob>;
    /**
     * Get the current timestamp, in string format
     */
    static now(): string;
    /**
     * Get a strictly increasing timestamp, in string format. Successive
     * calls return values that are strictly greater than any previous call,
     * bumping by at least 1µs if the underlying clock has not advanced
     * (e.g. on the web where Date.now() has ms resolution).
     */
    static nowIncreasing(): string;
    /**
     * Get a monotonically non-decreasing timestamp, in string format.
     * Successive calls return values that are never less than a previous call.
     */
    static nowNonDecreasing(): string;
    /**
     * Release either a locally allocated or remotely imported private route.
     *
     * This will deactivate the route and free its resources and it can no longer be sent to or received from.
     *
     * The release for [VeilidClient::newPrivateRoute], [VeilidClient::newCustomPrivateRoute], and [VeilidClient::importRemotePrivateRoute]. Local, no network round-trip. Releasing a route id that is unknown, already released, or malformed errors with `InvalidArgument`; throws `NotInitialized` if the node is not started.
     */
    static releasePrivateRoute(route_id: RouteId): void;
    /**
     * Remove a user secret from the protected store. Returns true if it existed.
     */
    static removeUserSecret(key: string): Promise<boolean>;
    /**
     * Report where the host application stands in its lifecycle.
     *
     * The node follows this itself in a web page and a service worker, and a report counts there only when `attachment.appLifecycle.autoDetectState` is off. A dedicated or shared worker sees no lifecycle, so there the host page's reports are all it has.
     *
     * Throws the same error its core twin `VeilidAPI::report_app_lifecycle_state` returns: `NotInitialized` if the node is not started.
     */
    static reportAppLifecycleState(state: VeilidAppLifecycleState): void;
    /**
     * Save a user secret to the protected store. Returns true if a value already existed.
     */
    static saveUserSecret(key: string, value: Uint8Array): Promise<boolean>;
    /**
     * Shut down Veilid and terminate the API.
     *
     * The release for [VeilidClient::startupCore]. Blocks until the core finishes shutting down. A second call after shutdown errors with `NotInitialized`.
     *
     * Throws `NotInitialized` if the node is not running.
     */
    static shutdownCore(): Promise<void>;
    /**
     * Initialize a Veilid node, with the configuration in JSON format
     *
     * Must be called only once at the start of an application
     *
     * @param {UpdateVeilidFunction} updateCallbackJS - called when internal state of the Veilid node changes, for example, when app-level messages are received, when private routes die and need to be reallocated, or when routing table states change
     * @param {VeilidConfig} config - the configuration object to use for the instance
     *
     * The open half of the startup/shutdown pair; release with [VeilidClient::shutdownCore]. Errors with `AlreadyInitialized` if a node is already running. Blocks bringing the core up.
     *
     * Throws `AlreadyInitialized` if a node is already running, otherwise the error from core startup (`Generic` on a bad config or a failure bringing the core up).
     */
    static startupCore(updateCallbackJS: UpdateVeilidFunction, config: VeilidConfig): Promise<void>;
    /**
     * Start a transaction on a set of DHT records
     * Record keys must have been opened via a routing context already when passed to this function
     * Options can be specified that supply a default signing keypair for records that are not opened for writing
     *
     * Blocks on a network Begin fanout across the record nodes (online-only). The returned [VeilidDHTTransaction] holds a network-side resource the caller must release via [VeilidDHTTransaction::commit] or [VeilidDHTTransaction::rollback]; dropping it without either tears the transaction down in the background.
     *
     * Throws the same error its core twin `VeilidAPI::transact_dht_records` returns: `InvalidArgument` if a record is not open or more than 32 records are passed, `MissingArgument` if `recordKeys` is empty or has duplicates, `Generic` if a record key is malformed or its encryption key does not match the opened record, `TryAgain` (retryable) if the DHT is offline, the records are contended, or Begin consensus was not reached, and `NotInitialized` if the node is not started. Network failures surface as `Timeout` or `NoConnection`. Also throws `Generic` if `recordKeys` or `options` fail to deserialize.
     */
    static transactDHTRecords(recordKeys: RecordKey[], options?: TransactDHTRecordsOptions | null): Promise<VeilidDHTTransaction>;
    /**
     * Verify multiple signatures with multiple cryptosystems
     *
     * Returns `undefined` if any supported signature fails to validate; otherwise the set of public keys that did validate. Throws `Generic` if a public key or signature has the wrong kind or length or if `publicKeys` or `signatures` fail to deserialize, `ParseError` if a matching public key is not a valid ed25519 point, and `NotInitialized` if the node is not started.
     */
    static verifySignatures(publicKeys: PublicKey[], data: Uint8Array, signatures: Signature[]): PublicKey[] | undefined;
    /**
     * Return the cargo package version of veilid-core, in object format.
     */
    static version(): VeilidVersion;
    /**
     * Return the cargo package version of veilid-core, in string format.
     */
    static versionString(): string;
    /**
     * Wait until the attachment state satisfies a condition.
     *
     * Returns the first attachment state that satisfies `condition`, at once if the current state does. A `condition` field left unset is not checked. Without a `condition`, waits until the node is attached, at any strength, with PublicInternet ready.
     *
     * Throws the same error its core twin `VeilidAPI::wait_for_attachment_condition` returns: `Timeout` once `timeoutMs` elapses (without one it waits indefinitely), `InvalidArgument` if the condition's least state is above its most, and `NotInitialized` if the node shuts down while waiting.
     */
    static waitForAttachmentCondition(condition?: VeilidStateAttachmentCondition | null, timeoutMs?: number | null): Promise<VeilidStateAttachment>;
    /**
     * All connectivity capabilites of this version of Veilid
     */
    static readonly CONNECTIVITY_CAPABILITIES: VeilidCapability[];
    /**
     * All distance metric capabilites of this version of Veilid
     */
    static readonly DISTANCE_METRIC_CAPABILITIES: VeilidCapability[];
    /**
     * The largest DHT value sequence number. Subtract `n` for a `minSeqnum` that leaves `n` writes
     */
    static readonly VALUE_SEQ_NUM_MAX: ValueSeqNum;
    /**
     * The APPM capability
     */
    static readonly VEILID_CAPABILITY_APPMESSAGE: VeilidCapability;
    /**
     * The BLOC capability, which this build lacks: throws Unimplemented
     */
    static readonly VEILID_CAPABILITY_BLOCKSTORE: VeilidCapability;
    /**
     * The DHTV capability
     */
    static readonly VEILID_CAPABILITY_DHT: VeilidCapability;
    /**
     * The RLAY capability
     */
    static readonly VEILID_CAPABILITY_RELAY: VeilidCapability;
    /**
     * The ROUTE capability
     */
    static readonly VEILID_CAPABILITY_ROUTE: VeilidCapability;
    /**
     * The SGNL capability
     */
    static readonly VEILID_CAPABILITY_SIGNAL: VeilidCapability;
    /**
     * The TUNL capability, which this build lacks: throws Unimplemented
     */
    static readonly VEILID_CAPABILITY_TUNNEL: VeilidCapability;
    /**
     * The DIAL capability
     */
    static readonly VEILID_CAPABILITY_VALIDATE_DIAL_INFO: VeilidCapability;
}

/**
 * A handle to a single cryptosystem, selected by [`CryptoKind`], exposing its
 * crypto operations to JavaScript.
 */
export class veilidCrypto {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Bytes an AEAD operation adds to the ciphertext (the authentication tag length).
     */
    aeadOverhead(): number;
    /**
     * Diffie-Hellman shared secret for the given public/secret key pair, memoized in the
     * DH cache to avoid recomputing the same exchange. See `computeDh`.
     *
     * Throws `Generic` if `key` or `secret` has the wrong kind or length, and on a cache miss the same errors as `computeDh`. Every method on this object also throws `InvalidArgument` if this cryptosystem kind is unavailable and `NotInitialized` if the node is not started.
     */
    cachedDh(key: PublicKey, secret: SecretKey): SharedSecret;
    /**
     * Verify a hash digest carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `digest` has the wrong kind or length.
     */
    checkHashDigest(digest: HashDigest): void;
    /**
     * Verify a nonce has the correct length.
     *
     * Throws `Generic` if `nonce` has the wrong length.
     */
    checkNonce(nonce: Nonce): void;
    /**
     * Verify a public key carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `key` has the wrong kind or length.
     */
    checkPublicKey(key: PublicKey): void;
    /**
     * Verify a secret key carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `key` has the wrong kind or length.
     */
    checkSecretKey(key: SecretKey): void;
    /**
     * Verify a shared secret carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `secret` has the wrong kind or length.
     */
    checkSharedSecret(secret: SharedSecret): void;
    /**
     * Verify a signature carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `signature` has the wrong kind or length.
     */
    checkSignature(signature: Signature): void;
    /**
     * Raw Diffie-Hellman shared secret for the given public/secret key pair, with no caching.
     *
     * Throws `Internal` if `key` is not a valid curve point, and `Generic` if the exchange is non-contributory (low-order public key).
     */
    computeDh(key: PublicKey, secret: SecretKey): SharedSecret;
    /**
     * Apply the stream cipher to `body`, without authentication. Same operation for both
     * directions: re-applying with the same nonce and secret reverses it. Provides confidentiality
     * only, no integrity; callers needing tamper detection must use the AEAD variants.
     *
     * Throws `Generic` if `nonce` or `shared_secret` has the wrong kind or length, and `Internal` on an internal length conversion failure.
     */
    cryptNoAuth(body: Uint8Array, nonce: Nonce, shared_secret: SharedSecret): Uint8Array;
    /**
     * Derive the KEM decapsulation key corresponding to a signing secret key.
     *
     * VLD0-only bridge (ed25519 to x25519): kinds whose signing and KEM keys are unrelated
     * throw `Unimplemented`. Throws `InvalidArgument` if `secret` is not a valid signing secret key.
     */
    decapsulationKeyFromSigningSecret(secret: SecretKey): DecapsulationKey;
    /**
     * Byte length of a KEM decapsulation key.
     */
    decapsulationKeyLength(): number;
    /**
     * Decrypt and authenticate `body`, returning the plaintext. `associatedData` must match what
     * was supplied at encryption. Errors if authentication fails (tampered ciphertext, wrong
     * key/nonce, or mismatched associated data).
     *
     * Throws `Generic` if `nonce` or `shared_secret` has the wrong kind or length or if authentication fails, and `Internal` on an internal length conversion failure.
     */
    decryptAead(body: Uint8Array, nonce: Nonce, shared_secret: SharedSecret, associated_data?: Uint8Array | null): Uint8Array;
    /**
     * Default salt length in bytes for password hashing and KDF operations.
     */
    defaultSaltLength(): number;
    /**
     * Derive a shared secret from a password and salt via a password-hashing KDF. Deterministic:
     * the same password and salt always yield the same secret. Distinct from
     * `generateSharedSecret`, which uses key exchange.
     *
     * Throws `Generic` if `salt` length is outside the Argon2 bounds or the KDF fails.
     */
    deriveSharedSecret(password: Uint8Array, salt: Uint8Array): SharedSecret;
    /**
     * Derive the KEM encapsulation key corresponding to a signing public key.
     *
     * VLD0-only bridge (ed25519 to x25519): kinds whose signing and KEM keys are unrelated
     * throw `Unimplemented`. Throws `InvalidArgument` if `key` is not a valid signing public key.
     */
    encapsulationKeyFromSigningKey(key: PublicKey): EncapsulationKey;
    /**
     * Byte length of a KEM encapsulation key.
     */
    encapsulationKeyLength(): number;
    /**
     * Encrypt and authenticate `body`, returning the ciphertext with appended tag. `associatedData`
     * is authenticated but not encrypted, and must be supplied again at decryption. The same nonce
     * must never be reused with the same shared secret.
     *
     * Throws `Generic` if `nonce` or `shared_secret` has the wrong kind or length, and `Internal` on an internal length conversion failure.
     */
    encryptAead(body: Uint8Array, nonce: Nonce, shared_secret: SharedSecret, associated_data?: Uint8Array | null): Uint8Array;
    /**
     * Hash a byte slice, returning a digest tagged with this cryptosystem's kind.
     */
    generateHash(data: Uint8Array): HashDigest;
    /**
     * Generate a fresh random KEM key pair for this cryptosystem.
     */
    generateKemKeyPair(): KemKeyPair;
    /**
     * Generate a fresh random signing key pair for this cryptosystem.
     */
    generateKeyPair(): KeyPair;
    /**
     * Derive a domain-separated shared secret from a key exchange: computes the DH secret, then
     * hashes it together with `domain` and the Veilid API domain tag. Distinct `domain` values
     * yield independent secrets from the same key pair.
     *
     * Throws the `computeDh` errors if the key exchange fails.
     */
    generateSharedSecret(key: PublicKey, secret: SecretKey, domain: Uint8Array): SharedSecret;
    /**
     * Byte length of a hash digest.
     */
    hashDigestLength(): number;
    /**
     * Hash a password with the given salt, returning a self-describing PHC hash string suitable
     * for storage and later `verifyPassword`.
     *
     * Throws `Generic` if `salt` length is outside the Argon2 bounds or the KDF fails, and `ParseError` if the salt fails base64 encoding.
     */
    hashPassword(password: Uint8Array, salt: Uint8Array): string;
    /**
     * Open a sealed blob produced by `hpkeSeal` with the recipient `secret`. `aad` must match
     * what was supplied at seal. Only the recipient can open a sealed blob; the sealer cannot.
     *
     * Throws `ParseError` if the blob is truncated or its version is unknown, `InvalidArgument`
     * if the blob's kind is not this cryptosystem's kind or `secret` is not a valid key, and
     * `Generic` if decryption fails.
     */
    hpkeOpen(secret: DecapsulationKey, aad: Uint8Array, sealed: Uint8Array): Uint8Array;
    /**
     * Seal `plaintext` to `recipient` with HPKE base mode (RFC 9180), single-shot. `aad` is
     * authenticated but not encrypted. Returns a self-describing sealed blob.
     *
     * Sealing is one-way: only the holder of the recipient `DecapsulationKey` can open the
     * blob, and the sealer cannot decrypt what it just sealed. This differs from the DH
     * pattern, where the shared secret let the encrypting party decrypt its own blobs. A
     * sealer that needs to re-read stored blobs must also seal them to its own key. Callers
     * who already share a symmetric key want `encryptAead` instead; HPKE is for encrypting to
     * a recipient's key when no shared secret exists.
     *
     * Throws `InvalidArgument` if `recipient` is not a valid key, and `Generic` if encapsulation
     * fails (including a low-order key).
     */
    hpkeSeal(recipient: EncapsulationKey, aad: Uint8Array, plaintext: Uint8Array): Uint8Array;
    /**
     * Byte length of a nonce.
     */
    nonceLength(): number;
    /**
     * Byte length of a public key.
     */
    publicKeyLength(): number;
    /**
     * Fill a new buffer of `len` bytes from the cryptographic RNG.
     */
    randomBytes(len: number): Uint8Array;
    /**
     * A fresh random nonce of `nonceLength` bytes.
     */
    randomNonce(): Nonce;
    /**
     * A fresh random shared secret of `sharedSecretLength` bytes.
     */
    randomSharedSecret(): SharedSecret;
    /**
     * Byte length of a secret key.
     */
    secretKeyLength(): number;
    /**
     * Byte length of a shared secret.
     */
    sharedSecretLength(): number;
    /**
     * Sign `data` with the given key pair, returning a detached signature.
     *
     * Throws `Generic` if `key` or `secret` has the wrong kind or length, `ParseError` if they do not form a valid ed25519 keypair, and `Internal` if signing fails.
     */
    sign(key: PublicKey, secret: SecretKey, data: Uint8Array): Signature;
    /**
     * Byte length of a signature.
     */
    signatureLength(): number;
    /**
     * Recompute the hash of `data` and compare it against `hash`. Returns `true` on match.
     *
     * Throws `Generic` if `hash` has the wrong kind or length.
     */
    validateHash(data: Uint8Array, hash: HashDigest): boolean;
    /**
     * Check that a public and secret key form a usable signing pair by signing test data and
     * verifying it. Returns `false` if they do not match; errors only on a malformed key.
     *
     * Throws `Generic` if `key` or `secret` has the wrong kind or length.
     */
    validateKeyPair(key: PublicKey, secret: SecretKey): boolean;
    /**
     * Verify a detached `signature` over `data` for `key`. Returns `true` if valid,
     * `false` if not; errors only on a malformed key or signature.
     *
     * Throws `Generic` if `key` or `signature` has the wrong kind or length, and `ParseError` or `Internal` if `key` is not a valid ed25519 point. A signature that does not match returns `false`, not an error.
     */
    verify(key: PublicKey, data: Uint8Array, signature: Signature): boolean;
    /**
     * Check a password against a PHC hash string produced by `hashPassword`.
     * Returns `false` on mismatch; errors only on a malformed hash string.
     *
     * Throws `ParseError` if `password_hash` is not a valid PHC string.
     */
    verifyPassword(password: Uint8Array, password_hash: string): boolean;
    /**
     * The NONE crypto kind, which this build lacks: throws Unimplemented
     */
    static readonly CRYPTO_KIND_NONE: CryptoKind;
    /**
     * The VLD0 crypto kind
     */
    static readonly CRYPTO_KIND_VLD0: CryptoKind;
    /**
     * All crypto kinds supported by this configuration of Veilid
     */
    static readonly VALID_CRYPTO_KINDS: CryptoKind[];
    /**
     * The [`CryptoKind`] fourcc identifying this cryptosystem.
     */
    readonly kind: CryptoKind;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_veilidclient_free: (a: number, b: number) => void;
    readonly __wbg_veilidcrypto_free: (a: number, b: number) => void;
    readonly __wbg_veiliddhttransaction_free: (a: number, b: number) => void;
    readonly __wbg_veilidroutingcontext_free: (a: number, b: number) => void;
    readonly __wbg_veilidtabledb_free: (a: number, b: number) => void;
    readonly __wbg_veilidtabledbtransaction_free: (a: number, b: number) => void;
    readonly register_error_factory: () => void;
    readonly veilidclient_CONNECTIVITY_CAPABILITIES: () => any;
    readonly veilidclient_DISTANCE_METRIC_CAPABILITIES: () => any;
    readonly veilidclient_VALUE_SEQ_NUM_MAX: () => any;
    readonly veilidclient_VEILID_CAPABILITY_APPMESSAGE: () => any;
    readonly veilidclient_VEILID_CAPABILITY_BLOCKSTORE: () => [number, number, number];
    readonly veilidclient_VEILID_CAPABILITY_DHT: () => any;
    readonly veilidclient_VEILID_CAPABILITY_RELAY: () => any;
    readonly veilidclient_VEILID_CAPABILITY_ROUTE: () => any;
    readonly veilidclient_VEILID_CAPABILITY_SIGNAL: () => any;
    readonly veilidclient_VEILID_CAPABILITY_TUNNEL: () => [number, number, number];
    readonly veilidclient_VEILID_CAPABILITY_VALIDATE_DIAL_INFO: () => any;
    readonly veilidclient_appCallReply: (a: number, b: number, c: number, d: number) => any;
    readonly veilidclient_attach: () => any;
    readonly veilidclient_changeConfig: (a: any) => [number, number];
    readonly veilidclient_changeLogIgnore: (a: number, b: number, c: number, d: number) => void;
    readonly veilidclient_changeLogLevel: (a: number, b: number, c: number, d: number) => [number, number];
    readonly veilidclient_debug: (a: number, b: number) => any;
    readonly veilidclient_defaultConfig: () => [number, number, number];
    readonly veilidclient_deleteAllUserSecrets: () => any;
    readonly veilidclient_detach: () => any;
    readonly veilidclient_features: () => [number, number];
    readonly veilidclient_generateMemberId: (a: number) => [number, number, number];
    readonly veilidclient_generateSignatures: (a: number, b: number, c: any) => [number, number, number, number];
    readonly veilidclient_getCrypto: (a: any) => [number, number, number];
    readonly veilidclient_getDHTRecordKey: (a: any, b: number, c: number) => any;
    readonly veilidclient_getState: () => any;
    readonly veilidclient_importRemotePrivateRoute: (a: number, b: number) => [number, number, number];
    readonly veilidclient_initializeCore: (a: any) => any;
    readonly veilidclient_isShutdown: () => [number, number, number];
    readonly veilidclient_listUserSecrets: () => any;
    readonly veilidclient_loadUserSecret: (a: number, b: number) => any;
    readonly veilidclient_newCustomPrivateRoute: (a: any) => any;
    readonly veilidclient_newPrivateRoute: () => any;
    readonly veilidclient_now: () => [number, number];
    readonly veilidclient_nowIncreasing: () => [number, number];
    readonly veilidclient_nowNonDecreasing: () => [number, number];
    readonly veilidclient_releasePrivateRoute: (a: number) => [number, number];
    readonly veilidclient_removeUserSecret: (a: number, b: number) => any;
    readonly veilidclient_reportAppLifecycleState: (a: any) => [number, number];
    readonly veilidclient_saveUserSecret: (a: number, b: number, c: number, d: number) => any;
    readonly veilidclient_shutdownCore: () => any;
    readonly veilidclient_startupCore: (a: any, b: any) => any;
    readonly veilidclient_transactDHTRecords: (a: any, b: number) => any;
    readonly veilidclient_verifySignatures: (a: any, b: number, c: number, d: any) => [number, number, number, number];
    readonly veilidclient_version: () => [number, number, number];
    readonly veilidclient_versionString: () => [number, number];
    readonly veilidclient_waitForAttachmentCondition: (a: number, b: number) => any;
    readonly veilidcrypto_CRYPTO_KIND_NONE: () => [number, number, number];
    readonly veilidcrypto_CRYPTO_KIND_VLD0: () => any;
    readonly veilidcrypto_VALID_CRYPTO_KINDS: () => any;
    readonly veilidcrypto_aeadOverhead: (a: number) => [number, number, number];
    readonly veilidcrypto_cachedDh: (a: number, b: number, c: number) => [number, number, number];
    readonly veilidcrypto_checkHashDigest: (a: number, b: number) => [number, number];
    readonly veilidcrypto_checkNonce: (a: number, b: number) => [number, number];
    readonly veilidcrypto_checkPublicKey: (a: number, b: number) => [number, number];
    readonly veilidcrypto_checkSecretKey: (a: number, b: number) => [number, number];
    readonly veilidcrypto_checkSharedSecret: (a: number, b: number) => [number, number];
    readonly veilidcrypto_checkSignature: (a: number, b: number) => [number, number];
    readonly veilidcrypto_computeDh: (a: number, b: number, c: number) => [number, number, number];
    readonly veilidcrypto_cryptNoAuth: (a: number, b: number, c: number, d: number, e: number) => [number, number, number, number];
    readonly veilidcrypto_decapsulationKeyFromSigningSecret: (a: number, b: number) => [number, number, number];
    readonly veilidcrypto_decapsulationKeyLength: (a: number) => [number, number, number];
    readonly veilidcrypto_decryptAead: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number, number, number];
    readonly veilidcrypto_defaultSaltLength: (a: number) => [number, number, number];
    readonly veilidcrypto_deriveSharedSecret: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
    readonly veilidcrypto_encapsulationKeyFromSigningKey: (a: number, b: number) => [number, number, number];
    readonly veilidcrypto_encapsulationKeyLength: (a: number) => [number, number, number];
    readonly veilidcrypto_encryptAead: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number, number, number];
    readonly veilidcrypto_generateHash: (a: number, b: number, c: number) => [number, number, number];
    readonly veilidcrypto_generateKemKeyPair: (a: number) => [number, number, number];
    readonly veilidcrypto_generateKeyPair: (a: number) => [number, number, number];
    readonly veilidcrypto_generateSharedSecret: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
    readonly veilidcrypto_hashDigestLength: (a: number) => [number, number, number];
    readonly veilidcrypto_hashPassword: (a: number, b: number, c: number, d: number, e: number) => [number, number, number, number];
    readonly veilidcrypto_hpkeOpen: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly veilidcrypto_hpkeSeal: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly veilidcrypto_kind: (a: number) => any;
    readonly veilidcrypto_nonceLength: (a: number) => [number, number, number];
    readonly veilidcrypto_publicKeyLength: (a: number) => [number, number, number];
    readonly veilidcrypto_randomBytes: (a: number, b: number) => [number, number, number, number];
    readonly veilidcrypto_randomNonce: (a: number) => [number, number, number];
    readonly veilidcrypto_randomSharedSecret: (a: number) => [number, number, number];
    readonly veilidcrypto_secretKeyLength: (a: number) => [number, number, number];
    readonly veilidcrypto_sharedSecretLength: (a: number) => [number, number, number];
    readonly veilidcrypto_sign: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
    readonly veilidcrypto_signatureLength: (a: number) => [number, number, number];
    readonly veilidcrypto_validateHash: (a: number, b: number, c: number, d: number) => [number, number, number];
    readonly veilidcrypto_validateKeyPair: (a: number, b: number, c: number) => [number, number, number];
    readonly veilidcrypto_verify: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
    readonly veilidcrypto_verifyPassword: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
    readonly veiliddhttransaction_commit: (a: number) => any;
    readonly veiliddhttransaction_extend: (a: number, b: any, c: number) => any;
    readonly veiliddhttransaction_get: (a: number, b: number, c: number) => any;
    readonly veiliddhttransaction_inspect: (a: number, b: number, c: number, d: number) => any;
    readonly veiliddhttransaction_rollback: (a: number) => any;
    readonly veiliddhttransaction_set: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
    readonly veilidroutingcontext_appCall: (a: number, b: any, c: number, d: number) => any;
    readonly veilidroutingcontext_appMessage: (a: number, b: any, c: number, d: number) => any;
    readonly veilidroutingcontext_cancelDHTWatch: (a: number, b: number, c: number) => any;
    readonly veilidroutingcontext_closeDHTRecord: (a: number, b: number) => any;
    readonly veilidroutingcontext_create: () => [number, number, number];
    readonly veilidroutingcontext_createDHTRecord: (a: number, b: any, c: any, d: number) => any;
    readonly veilidroutingcontext_deleteDHTRecord: (a: number, b: number) => any;
    readonly veilidroutingcontext_flushDHTRecord: (a: number, b: number, c: number) => any;
    readonly veilidroutingcontext_getDHTValue: (a: number, b: number, c: number, d: number) => any;
    readonly veilidroutingcontext_inspectDHTRecord: (a: number, b: number, c: number, d: number) => any;
    readonly veilidroutingcontext_openDHTRecord: (a: number, b: number, c: number, d: number) => any;
    readonly veilidroutingcontext_safety: (a: number) => [number, number, number];
    readonly veilidroutingcontext_setDHTValue: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
    readonly veilidroutingcontext_watchDhtValues: (a: number, b: number, c: number, d: number, e: number) => any;
    readonly veilidroutingcontext_withDefaultSafety: (a: number) => [number, number, number];
    readonly veilidroutingcontext_withSafety: (a: number, b: any) => [number, number, number];
    readonly veilidroutingcontext_withSequencing: (a: number, b: any) => [number, number, number];
    readonly veilidtabledb_createTransaction: (a: number) => any;
    readonly veilidtabledb_delete: (a: number, b: number, c: number, d: number) => any;
    readonly veilidtabledb_deleteTable: (a: number) => any;
    readonly veilidtabledb_getKeys: (a: number, b: number) => any;
    readonly veilidtabledb_load: (a: number, b: number, c: number, d: number) => any;
    readonly veilidtabledb_new: (a: number, b: number, c: number) => number;
    readonly veilidtabledb_openTable: (a: number) => any;
    readonly veilidtabledb_renameTable: (a: number, b: number, c: number) => any;
    readonly veilidtabledb_store: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
    readonly veilidtabledbtransaction_commit: (a: number) => any;
    readonly veilidtabledbtransaction_deleteKey: (a: number, b: number, c: number, d: number) => any;
    readonly veilidtabledbtransaction_rollback: (a: number) => any;
    readonly veilidtabledbtransaction_store: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
    readonly veilidroutingcontext_try_new: () => [number, number, number];
    readonly __wbg_baredecapsulationkey_free: (a: number, b: number) => void;
    readonly __wbg_barekemkeypair_free: (a: number, b: number) => void;
    readonly __wbg_barerecordkey_free: (a: number, b: number) => void;
    readonly __wbg_decapsulationkey_free: (a: number, b: number) => void;
    readonly __wbg_decapsulationkeygroup_free: (a: number, b: number) => void;
    readonly __wbg_kemkeypair_free: (a: number, b: number) => void;
    readonly __wbg_kemkeypairgroup_free: (a: number, b: number) => void;
    readonly __wbg_keypair_free: (a: number, b: number) => void;
    readonly __wbg_keypairgroup_free: (a: number, b: number) => void;
    readonly __wbg_nodeidgroup_free: (a: number, b: number) => void;
    readonly __wbg_recordkey_free: (a: number, b: number) => void;
    readonly __wbg_recordkeygroup_free: (a: number, b: number) => void;
    readonly __wbg_secretkeygroup_free: (a: number, b: number) => void;
    readonly baredecapsulationkey_bit: (a: number, b: number) => number;
    readonly baredecapsulationkey_encode: (a: number) => [number, number];
    readonly baredecapsulationkey_encodedLength: (a: number) => number;
    readonly baredecapsulationkey_firstNonZeroBit: (a: number) => number;
    readonly baredecapsulationkey_isEmpty: (a: number) => number;
    readonly baredecapsulationkey_isEqual: (a: number, b: number) => number;
    readonly baredecapsulationkey_js_new: (a: number, b: number) => number;
    readonly baredecapsulationkey_length: (a: number) => number;
    readonly baredecapsulationkey_nibble: (a: number, b: number) => number;
    readonly baredecapsulationkey_parse: (a: number, b: number) => [number, number, number];
    readonly baredecapsulationkey_toArray: (a: number) => [number, number];
    readonly baredecapsulationkey_toString: (a: number) => [number, number];
    readonly baredecapsulationkey_tryDecode: (a: number, b: number) => [number, number, number];
    readonly bareencapsulationkey_bit: (a: number, b: number) => number;
    readonly bareencapsulationkey_nibble: (a: number, b: number) => number;
    readonly barehashcoordinate_bit: (a: number, b: number) => number;
    readonly barehashcoordinate_nibble: (a: number, b: number) => number;
    readonly barehashdigest_bit: (a: number, b: number) => number;
    readonly barehashdigest_nibble: (a: number, b: number) => number;
    readonly barehashdigest_toString: (a: number) => [number, number];
    readonly barekemkeypair_encode: (a: number) => [number, number];
    readonly barekemkeypair_encodedLength: (a: number) => number;
    readonly barekemkeypair_key: (a: number) => number;
    readonly barekemkeypair_secret: (a: number) => number;
    readonly barekemkeypair_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barekeypair_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barememberid_bit: (a: number, b: number) => number;
    readonly barememberid_nibble: (a: number, b: number) => number;
    readonly barenodeid_bit: (a: number, b: number) => number;
    readonly barenodeid_nibble: (a: number, b: number) => number;
    readonly bareopaquerecordkey_bit: (a: number, b: number) => number;
    readonly bareopaquerecordkey_nibble: (a: number, b: number) => number;
    readonly barepublickey_bit: (a: number, b: number) => number;
    readonly barepublickey_nibble: (a: number, b: number) => number;
    readonly barerecordkey_encode: (a: number) => [number, number];
    readonly barerecordkey_encodedLen: (a: number) => number;
    readonly barerecordkey_encryptionKey: (a: number) => number;
    readonly barerecordkey_key: (a: number) => number;
    readonly barerecordkey_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barerouteid_bit: (a: number, b: number) => number;
    readonly barerouteid_nibble: (a: number, b: number) => number;
    readonly baresecretkey_bit: (a: number, b: number) => number;
    readonly baresecretkey_nibble: (a: number, b: number) => number;
    readonly baresharedsecret_bit: (a: number, b: number) => number;
    readonly baresharedsecret_nibble: (a: number, b: number) => number;
    readonly baresignature_bit: (a: number, b: number) => number;
    readonly baresignature_nibble: (a: number, b: number) => number;
    readonly decapsulationkey_isEqual: (a: number, b: number) => number;
    readonly decapsulationkey_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly decapsulationkey_kind: (a: number) => [number, number];
    readonly decapsulationkey_parse: (a: number, b: number) => [number, number, number];
    readonly decapsulationkey_toString: (a: number) => [number, number];
    readonly decapsulationkey_value: (a: number) => number;
    readonly decapsulationkeygroup_add: (a: number, b: number) => void;
    readonly decapsulationkeygroup_addAll: (a: number, b: number, c: number) => void;
    readonly decapsulationkeygroup_clear: (a: number) => void;
    readonly decapsulationkeygroup_contains: (a: number, b: number) => number;
    readonly decapsulationkeygroup_containsAny: (a: number, b: number, c: number) => number;
    readonly decapsulationkeygroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly decapsulationkeygroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly decapsulationkeygroup_isEmpty: (a: number) => number;
    readonly decapsulationkeygroup_isEqual: (a: number, b: number) => number;
    readonly decapsulationkeygroup_js_new: () => number;
    readonly decapsulationkeygroup_keys: (a: number) => [number, number];
    readonly decapsulationkeygroup_kinds: (a: number) => [number, number];
    readonly decapsulationkeygroup_length: (a: number) => number;
    readonly decapsulationkeygroup_parse: (a: number, b: number) => [number, number, number];
    readonly decapsulationkeygroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly decapsulationkeygroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly decapsulationkeygroup_toArray: (a: number) => [number, number];
    readonly decapsulationkeygroup_toString: (a: number) => [number, number];
    readonly encapsulationkey_parse: (a: number, b: number) => [number, number, number];
    readonly encapsulationkey_toString: (a: number) => [number, number];
    readonly encapsulationkeygroup_addAll: (a: number, b: number, c: number) => void;
    readonly encapsulationkeygroup_containsAny: (a: number, b: number, c: number) => number;
    readonly encapsulationkeygroup_keys: (a: number) => [number, number];
    readonly encapsulationkeygroup_parse: (a: number, b: number) => [number, number, number];
    readonly encapsulationkeygroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly encapsulationkeygroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly encapsulationkeygroup_toArray: (a: number) => [number, number];
    readonly encapsulationkeygroup_toString: (a: number) => [number, number];
    readonly hashcoordinate_isEqual: (a: number, b: number) => number;
    readonly hashcoordinate_parse: (a: number, b: number) => [number, number, number];
    readonly hashcoordinate_toString: (a: number) => [number, number];
    readonly hashdigest_parse: (a: number, b: number) => [number, number, number];
    readonly hashdigest_toString: (a: number) => [number, number];
    readonly hashdigestgroup_addAll: (a: number, b: number, c: number) => void;
    readonly hashdigestgroup_containsAny: (a: number, b: number, c: number) => number;
    readonly hashdigestgroup_keys: (a: number) => [number, number];
    readonly hashdigestgroup_parse: (a: number, b: number) => [number, number, number];
    readonly hashdigestgroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly hashdigestgroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly hashdigestgroup_toArray: (a: number) => [number, number];
    readonly hashdigestgroup_toString: (a: number) => [number, number];
    readonly hashdistance_bit: (a: number, b: number) => number;
    readonly hashdistance_encodedLength: (a: number) => number;
    readonly hashdistance_firstNonZeroBit: (a: number) => number;
    readonly hashdistance_nibble: (a: number, b: number) => number;
    readonly hashdistance_parse: (a: number, b: number) => [number, number, number];
    readonly hashdistance_toArray: (a: number) => [number, number];
    readonly hashdistance_toString: (a: number) => [number, number];
    readonly hashdistance_tryDecode: (a: number, b: number) => [number, number, number];
    readonly kemkeypair_bareSecret: (a: number) => number;
    readonly kemkeypair_isEqual: (a: number, b: number) => number;
    readonly kemkeypair_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly kemkeypair_key: (a: number) => number;
    readonly kemkeypair_kind: (a: number) => [number, number];
    readonly kemkeypair_newFromParts: (a: number, b: number) => number;
    readonly kemkeypair_parse: (a: number, b: number) => [number, number, number];
    readonly kemkeypair_secret: (a: number) => number;
    readonly kemkeypair_toString: (a: number) => [number, number];
    readonly kemkeypair_value: (a: number) => number;
    readonly kemkeypairgroup_add: (a: number, b: number) => void;
    readonly kemkeypairgroup_addAll: (a: number, b: number, c: number) => void;
    readonly kemkeypairgroup_clear: (a: number) => void;
    readonly kemkeypairgroup_contains: (a: number, b: number) => number;
    readonly kemkeypairgroup_containsAny: (a: number, b: number, c: number) => number;
    readonly kemkeypairgroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly kemkeypairgroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly kemkeypairgroup_isEmpty: (a: number) => number;
    readonly kemkeypairgroup_isEqual: (a: number, b: number) => number;
    readonly kemkeypairgroup_keys: (a: number) => [number, number];
    readonly kemkeypairgroup_kinds: (a: number) => [number, number];
    readonly kemkeypairgroup_length: (a: number) => number;
    readonly kemkeypairgroup_parse: (a: number, b: number) => [number, number, number];
    readonly kemkeypairgroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly kemkeypairgroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly kemkeypairgroup_toArray: (a: number) => [number, number];
    readonly kemkeypairgroup_toString: (a: number) => [number, number];
    readonly keypair_parse: (a: number, b: number) => [number, number, number];
    readonly keypair_toString: (a: number) => [number, number];
    readonly keypairgroup_add: (a: number, b: number) => void;
    readonly keypairgroup_addAll: (a: number, b: number, c: number) => void;
    readonly keypairgroup_clear: (a: number) => void;
    readonly keypairgroup_contains: (a: number, b: number) => number;
    readonly keypairgroup_containsAny: (a: number, b: number, c: number) => number;
    readonly keypairgroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly keypairgroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly keypairgroup_isEmpty: (a: number) => number;
    readonly keypairgroup_isEqual: (a: number, b: number) => number;
    readonly keypairgroup_keys: (a: number) => [number, number];
    readonly keypairgroup_kinds: (a: number) => [number, number];
    readonly keypairgroup_length: (a: number) => number;
    readonly keypairgroup_parse: (a: number, b: number) => [number, number, number];
    readonly keypairgroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly keypairgroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly keypairgroup_toArray: (a: number) => [number, number];
    readonly keypairgroup_toString: (a: number) => [number, number];
    readonly memberid_parse: (a: number, b: number) => [number, number, number];
    readonly memberid_toString: (a: number) => [number, number];
    readonly memberidgroup_addAll: (a: number, b: number, c: number) => void;
    readonly memberidgroup_containsAny: (a: number, b: number, c: number) => number;
    readonly memberidgroup_keys: (a: number) => [number, number];
    readonly memberidgroup_parse: (a: number, b: number) => [number, number, number];
    readonly memberidgroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly memberidgroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly memberidgroup_toArray: (a: number) => [number, number];
    readonly memberidgroup_toString: (a: number) => [number, number];
    readonly nodeid_parse: (a: number, b: number) => [number, number, number];
    readonly nodeid_toString: (a: number) => [number, number];
    readonly nodeidgroup_add: (a: number, b: number) => void;
    readonly nodeidgroup_addAll: (a: number, b: number, c: number) => void;
    readonly nodeidgroup_clear: (a: number) => void;
    readonly nodeidgroup_contains: (a: number, b: number) => number;
    readonly nodeidgroup_containsAny: (a: number, b: number, c: number) => number;
    readonly nodeidgroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly nodeidgroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly nodeidgroup_isEmpty: (a: number) => number;
    readonly nodeidgroup_isEqual: (a: number, b: number) => number;
    readonly nodeidgroup_keys: (a: number) => [number, number];
    readonly nodeidgroup_kinds: (a: number) => [number, number];
    readonly nodeidgroup_length: (a: number) => number;
    readonly nodeidgroup_parse: (a: number, b: number) => [number, number, number];
    readonly nodeidgroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly nodeidgroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly nodeidgroup_toArray: (a: number) => [number, number];
    readonly nodeidgroup_toString: (a: number) => [number, number];
    readonly nonce_bit: (a: number, b: number) => number;
    readonly nonce_nibble: (a: number, b: number) => number;
    readonly opaquerecordkey_parse: (a: number, b: number) => [number, number, number];
    readonly opaquerecordkey_toString: (a: number) => [number, number];
    readonly opaquerecordkeygroup_addAll: (a: number, b: number, c: number) => void;
    readonly opaquerecordkeygroup_containsAny: (a: number, b: number, c: number) => number;
    readonly opaquerecordkeygroup_isEqual: (a: number, b: number) => number;
    readonly opaquerecordkeygroup_keys: (a: number) => [number, number];
    readonly opaquerecordkeygroup_parse: (a: number, b: number) => [number, number, number];
    readonly opaquerecordkeygroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly opaquerecordkeygroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly opaquerecordkeygroup_toArray: (a: number) => [number, number];
    readonly opaquerecordkeygroup_toString: (a: number) => [number, number];
    readonly publickey_parse: (a: number, b: number) => [number, number, number];
    readonly publickey_toString: (a: number) => [number, number];
    readonly publickeygroup_add: (a: number, b: number) => void;
    readonly publickeygroup_addAll: (a: number, b: number, c: number) => void;
    readonly publickeygroup_containsAny: (a: number, b: number, c: number) => number;
    readonly publickeygroup_keys: (a: number) => [number, number];
    readonly publickeygroup_parse: (a: number, b: number) => [number, number, number];
    readonly publickeygroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly publickeygroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly publickeygroup_toArray: (a: number) => [number, number];
    readonly publickeygroup_toString: (a: number) => [number, number];
    readonly recordkey_encryptionKey: (a: number) => number;
    readonly recordkey_isEqual: (a: number, b: number) => number;
    readonly recordkey_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly recordkey_kind: (a: number) => [number, number];
    readonly recordkey_parse: (a: number, b: number) => [number, number, number];
    readonly recordkey_toString: (a: number) => [number, number];
    readonly recordkey_value: (a: number) => number;
    readonly recordkeygroup_add: (a: number, b: number) => void;
    readonly recordkeygroup_addAll: (a: number, b: number, c: number) => void;
    readonly recordkeygroup_clear: (a: number) => void;
    readonly recordkeygroup_contains: (a: number, b: number) => number;
    readonly recordkeygroup_containsAny: (a: number, b: number, c: number) => number;
    readonly recordkeygroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly recordkeygroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly recordkeygroup_isEmpty: (a: number) => number;
    readonly recordkeygroup_isEqual: (a: number, b: number) => number;
    readonly recordkeygroup_keys: (a: number) => [number, number];
    readonly recordkeygroup_kinds: (a: number) => [number, number];
    readonly recordkeygroup_length: (a: number) => number;
    readonly recordkeygroup_parse: (a: number, b: number) => [number, number, number];
    readonly recordkeygroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly recordkeygroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly recordkeygroup_toArray: (a: number) => [number, number];
    readonly recordkeygroup_toString: (a: number) => [number, number];
    readonly routeid_parse: (a: number, b: number) => [number, number, number];
    readonly routeid_toString: (a: number) => [number, number];
    readonly routeidgroup_addAll: (a: number, b: number, c: number) => void;
    readonly routeidgroup_containsAny: (a: number, b: number, c: number) => number;
    readonly routeidgroup_keys: (a: number) => [number, number];
    readonly routeidgroup_parse: (a: number, b: number) => [number, number, number];
    readonly routeidgroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly routeidgroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly routeidgroup_toArray: (a: number) => [number, number];
    readonly routeidgroup_toString: (a: number) => [number, number];
    readonly secretkey_parse: (a: number, b: number) => [number, number, number];
    readonly secretkey_toString: (a: number) => [number, number];
    readonly secretkeygroup_addAll: (a: number, b: number, c: number) => void;
    readonly secretkeygroup_containsAny: (a: number, b: number, c: number) => number;
    readonly secretkeygroup_isEqual: (a: number, b: number) => number;
    readonly secretkeygroup_keys: (a: number) => [number, number];
    readonly secretkeygroup_parse: (a: number, b: number) => [number, number, number];
    readonly secretkeygroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly secretkeygroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly secretkeygroup_toArray: (a: number) => [number, number];
    readonly secretkeygroup_toString: (a: number) => [number, number];
    readonly sharedsecret_parse: (a: number, b: number) => [number, number, number];
    readonly sharedsecret_toString: (a: number) => [number, number];
    readonly sharedsecretgroup_addAll: (a: number, b: number, c: number) => void;
    readonly sharedsecretgroup_containsAny: (a: number, b: number, c: number) => number;
    readonly sharedsecretgroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly sharedsecretgroup_keys: (a: number) => [number, number];
    readonly sharedsecretgroup_parse: (a: number, b: number) => [number, number, number];
    readonly sharedsecretgroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly sharedsecretgroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly sharedsecretgroup_toArray: (a: number) => [number, number];
    readonly sharedsecretgroup_toString: (a: number) => [number, number];
    readonly signature_parse: (a: number, b: number) => [number, number, number];
    readonly signature_toString: (a: number) => [number, number];
    readonly signaturegroup_addAll: (a: number, b: number, c: number) => void;
    readonly signaturegroup_containsAny: (a: number, b: number, c: number) => number;
    readonly signaturegroup_keys: (a: number) => [number, number];
    readonly signaturegroup_parse: (a: number, b: number) => [number, number, number];
    readonly signaturegroup_remove: (a: number, b: number, c: number) => [number, number, number];
    readonly signaturegroup_removeAll: (a: number, b: number, c: number) => [number, number];
    readonly signaturegroup_toArray: (a: number) => [number, number];
    readonly signaturegroup_toString: (a: number) => [number, number];
    readonly recordkeygroup_js_new: () => number;
    readonly routeidgroup_js_new: () => number;
    readonly nodeidgroup_js_new: () => number;
    readonly publickeygroup_js_new: () => number;
    readonly memberidgroup_js_new: () => number;
    readonly secretkeygroup_js_new: () => number;
    readonly signaturegroup_js_new: () => number;
    readonly keypairgroup_js_new: () => number;
    readonly kemkeypairgroup_js_new: () => number;
    readonly sharedsecretgroup_js_new: () => number;
    readonly opaquerecordkeygroup_js_new: () => number;
    readonly hashdigestgroup_js_new: () => number;
    readonly encapsulationkeygroup_js_new: () => number;
    readonly barerouteid_js_new: (a: number, b: number) => number;
    readonly barenodeid_js_new: (a: number, b: number) => number;
    readonly barememberid_js_new: (a: number, b: number) => number;
    readonly barepublickey_js_new: (a: number, b: number) => number;
    readonly baresecretkey_js_new: (a: number, b: number) => number;
    readonly baresignature_js_new: (a: number, b: number) => number;
    readonly barehashdigest_js_new: (a: number, b: number) => number;
    readonly baresharedsecret_js_new: (a: number, b: number) => number;
    readonly hashdistance_js_new: (a: number, b: number) => number;
    readonly bareopaquerecordkey_js_new: (a: number, b: number) => number;
    readonly barehashcoordinate_js_new: (a: number, b: number) => number;
    readonly bareencapsulationkey_js_new: (a: number, b: number) => number;
    readonly nonce_js_new: (a: number, b: number) => number;
    readonly __wbg_sharedsecret_free: (a: number, b: number) => void;
    readonly __wbg_opaquerecordkey_free: (a: number, b: number) => void;
    readonly __wbg_hashdigest_free: (a: number, b: number) => void;
    readonly __wbg_encapsulationkey_free: (a: number, b: number) => void;
    readonly __wbg_nodeid_free: (a: number, b: number) => void;
    readonly __wbg_routeid_free: (a: number, b: number) => void;
    readonly __wbg_memberid_free: (a: number, b: number) => void;
    readonly __wbg_publickey_free: (a: number, b: number) => void;
    readonly __wbg_secretkey_free: (a: number, b: number) => void;
    readonly __wbg_signature_free: (a: number, b: number) => void;
    readonly __wbg_barerouteid_free: (a: number, b: number) => void;
    readonly __wbg_barepublickey_free: (a: number, b: number) => void;
    readonly __wbg_baresecretkey_free: (a: number, b: number) => void;
    readonly __wbg_baresignature_free: (a: number, b: number) => void;
    readonly __wbg_barememberid_free: (a: number, b: number) => void;
    readonly __wbg_baresharedsecret_free: (a: number, b: number) => void;
    readonly __wbg_hashdistance_free: (a: number, b: number) => void;
    readonly __wbg_bareopaquerecordkey_free: (a: number, b: number) => void;
    readonly __wbg_barehashdigest_free: (a: number, b: number) => void;
    readonly __wbg_bareencapsulationkey_free: (a: number, b: number) => void;
    readonly __wbg_nonce_free: (a: number, b: number) => void;
    readonly barememberid_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly nonce_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly nonce_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barenodeid_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly barenodeid_tryDecode: (a: number, b: number) => [number, number, number];
    readonly bareopaquerecordkey_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly bareopaquerecordkey_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barerouteid_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly barerouteid_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barememberid_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barehashdigest_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly baresharedsecret_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly baresharedsecret_tryDecode: (a: number, b: number) => [number, number, number];
    readonly baresignature_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly baresignature_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barehashdigest_tryDecode: (a: number, b: number) => [number, number, number];
    readonly bareencapsulationkey_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly bareencapsulationkey_tryDecode: (a: number, b: number) => [number, number, number];
    readonly baredecapsulationkey_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly barepublickey_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly barepublickey_tryDecode: (a: number, b: number) => [number, number, number];
    readonly baresecretkey_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly baresecretkey_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barerecordkey_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly barehashcoordinate_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly __wbg_barekeypair_free: (a: number, b: number) => void;
    readonly __wbg_barenodeid_free: (a: number, b: number) => void;
    readonly __wbg_hashcoordinate_free: (a: number, b: number) => void;
    readonly __wbg_barehashcoordinate_free: (a: number, b: number) => void;
    readonly sharedsecret_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly opaquerecordkey_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly hashcoordinate_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly encapsulationkey_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly nodeid_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly routeid_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly memberid_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly publickey_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly keypair_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly secretkey_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly signature_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly barekemkeypair_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly barehashcoordinate_tryDecode: (a: number, b: number) => [number, number, number];
    readonly barerouteid_parse: (a: number, b: number) => [number, number, number];
    readonly barememberid_parse: (a: number, b: number) => [number, number, number];
    readonly barepublickey_parse: (a: number, b: number) => [number, number, number];
    readonly baresecretkey_parse: (a: number, b: number) => [number, number, number];
    readonly baresignature_parse: (a: number, b: number) => [number, number, number];
    readonly barehashdigest_parse: (a: number, b: number) => [number, number, number];
    readonly baresharedsecret_parse: (a: number, b: number) => [number, number, number];
    readonly hashdistance_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly bareopaquerecordkey_parse: (a: number, b: number) => [number, number, number];
    readonly barehashcoordinate_parse: (a: number, b: number) => [number, number, number];
    readonly bareencapsulationkey_parse: (a: number, b: number) => [number, number, number];
    readonly nonce_parse: (a: number, b: number) => [number, number, number];
    readonly barekeypair_tryDecodeBytes: (a: number, b: number) => [number, number, number];
    readonly keypair_newFromParts: (a: number, b: number) => number;
    readonly hashdigest_js_new: (a: number, b: number, c: number) => [number, number, number];
    readonly barenodeid_parse: (a: number, b: number) => [number, number, number];
    readonly __wbg_sharedsecretgroup_free: (a: number, b: number) => void;
    readonly __wbg_routeidgroup_free: (a: number, b: number) => void;
    readonly __wbg_encapsulationkeygroup_free: (a: number, b: number) => void;
    readonly __wbg_opaquerecordkeygroup_free: (a: number, b: number) => void;
    readonly __wbg_hashdigestgroup_free: (a: number, b: number) => void;
    readonly __wbg_memberidgroup_free: (a: number, b: number) => void;
    readonly __wbg_publickeygroup_free: (a: number, b: number) => void;
    readonly __wbg_signaturegroup_free: (a: number, b: number) => void;
    readonly sharedsecret_value: (a: number) => number;
    readonly sharedsecret_kind: (a: number) => [number, number];
    readonly sharedsecret_isEqual: (a: number, b: number) => number;
    readonly hashdigest_value: (a: number) => number;
    readonly hashdigest_kind: (a: number) => [number, number];
    readonly opaquerecordkey_value: (a: number) => number;
    readonly opaquerecordkey_kind: (a: number) => [number, number];
    readonly memberid_isEqual: (a: number, b: number) => number;
    readonly hashcoordinate_value: (a: number) => number;
    readonly hashcoordinate_kind: (a: number) => [number, number];
    readonly hashdigest_isEqual: (a: number, b: number) => number;
    readonly encapsulationkey_value: (a: number) => number;
    readonly encapsulationkey_kind: (a: number) => [number, number];
    readonly encapsulationkey_isEqual: (a: number, b: number) => number;
    readonly nodeid_value: (a: number) => number;
    readonly nodeid_kind: (a: number) => [number, number];
    readonly opaquerecordkey_isEqual: (a: number, b: number) => number;
    readonly keypair_secret: (a: number) => number;
    readonly keypair_key: (a: number) => number;
    readonly keypair_bareSecret: (a: number) => number;
    readonly keypair_value: (a: number) => number;
    readonly keypair_kind: (a: number) => [number, number];
    readonly keypair_isEqual: (a: number, b: number) => number;
    readonly routeid_value: (a: number) => number;
    readonly routeid_kind: (a: number) => [number, number];
    readonly nodeid_isEqual: (a: number, b: number) => number;
    readonly memberid_value: (a: number) => number;
    readonly memberid_kind: (a: number) => [number, number];
    readonly routeid_isEqual: (a: number, b: number) => number;
    readonly publickey_value: (a: number) => number;
    readonly publickey_kind: (a: number) => [number, number];
    readonly publickey_isEqual: (a: number, b: number) => number;
    readonly secretkey_value: (a: number) => number;
    readonly secretkey_kind: (a: number) => [number, number];
    readonly secretkey_isEqual: (a: number, b: number) => number;
    readonly signature_value: (a: number) => number;
    readonly signature_kind: (a: number) => [number, number];
    readonly signature_isEqual: (a: number, b: number) => number;
    readonly barerouteid_toString: (a: number) => [number, number];
    readonly barerouteid_isEqual: (a: number, b: number) => number;
    readonly barerouteid_isEmpty: (a: number) => number;
    readonly barerouteid_toArray: (a: number) => [number, number];
    readonly barerouteid_encode: (a: number) => [number, number];
    readonly barerouteid_length: (a: number) => number;
    readonly barerouteid_firstNonZeroBit: (a: number) => number;
    readonly barerouteid_encodedLength: (a: number) => number;
    readonly barenodeid_isEqual: (a: number, b: number) => number;
    readonly barenodeid_isEmpty: (a: number) => number;
    readonly barenodeid_toArray: (a: number) => [number, number];
    readonly barenodeid_encode: (a: number) => [number, number];
    readonly barenodeid_length: (a: number) => number;
    readonly barenodeid_firstNonZeroBit: (a: number) => number;
    readonly barenodeid_encodedLength: (a: number) => number;
    readonly barememberid_isEqual: (a: number, b: number) => number;
    readonly barememberid_isEmpty: (a: number) => number;
    readonly barememberid_encode: (a: number) => [number, number];
    readonly barememberid_length: (a: number) => number;
    readonly barepublickey_toString: (a: number) => [number, number];
    readonly barepublickey_isEqual: (a: number, b: number) => number;
    readonly barepublickey_isEmpty: (a: number) => number;
    readonly barepublickey_toArray: (a: number) => [number, number];
    readonly barepublickey_encode: (a: number) => [number, number];
    readonly barepublickey_length: (a: number) => number;
    readonly barepublickey_firstNonZeroBit: (a: number) => number;
    readonly barepublickey_encodedLength: (a: number) => number;
    readonly baresecretkey_toString: (a: number) => [number, number];
    readonly baresecretkey_isEqual: (a: number, b: number) => number;
    readonly baresecretkey_isEmpty: (a: number) => number;
    readonly baresecretkey_toArray: (a: number) => [number, number];
    readonly baresecretkey_encode: (a: number) => [number, number];
    readonly baresecretkey_length: (a: number) => number;
    readonly baresecretkey_firstNonZeroBit: (a: number) => number;
    readonly baresecretkey_encodedLength: (a: number) => number;
    readonly baresignature_toString: (a: number) => [number, number];
    readonly baresignature_isEqual: (a: number, b: number) => number;
    readonly baresignature_isEmpty: (a: number) => number;
    readonly baresignature_toArray: (a: number) => [number, number];
    readonly baresignature_encode: (a: number) => [number, number];
    readonly baresignature_length: (a: number) => number;
    readonly baresignature_firstNonZeroBit: (a: number) => number;
    readonly baresignature_encodedLength: (a: number) => number;
    readonly barememberid_toString: (a: number) => [number, number];
    readonly barehashdigest_isEqual: (a: number, b: number) => number;
    readonly barehashdigest_isEmpty: (a: number) => number;
    readonly barehashdigest_toArray: (a: number) => [number, number];
    readonly barehashdigest_encode: (a: number) => [number, number];
    readonly barehashdigest_length: (a: number) => number;
    readonly barehashdigest_firstNonZeroBit: (a: number) => number;
    readonly barehashdigest_encodedLength: (a: number) => number;
    readonly baresharedsecret_toString: (a: number) => [number, number];
    readonly baresharedsecret_isEqual: (a: number, b: number) => number;
    readonly baresharedsecret_isEmpty: (a: number) => number;
    readonly baresharedsecret_toArray: (a: number) => [number, number];
    readonly baresharedsecret_encode: (a: number) => [number, number];
    readonly baresharedsecret_length: (a: number) => number;
    readonly baresharedsecret_firstNonZeroBit: (a: number) => number;
    readonly baresharedsecret_encodedLength: (a: number) => number;
    readonly barenodeid_toString: (a: number) => [number, number];
    readonly hashdistance_isEqual: (a: number, b: number) => number;
    readonly hashdistance_isEmpty: (a: number) => number;
    readonly barememberid_toArray: (a: number) => [number, number];
    readonly hashdistance_encode: (a: number) => [number, number];
    readonly hashdistance_length: (a: number) => number;
    readonly barememberid_firstNonZeroBit: (a: number) => number;
    readonly barememberid_encodedLength: (a: number) => number;
    readonly bareopaquerecordkey_toString: (a: number) => [number, number];
    readonly bareopaquerecordkey_isEqual: (a: number, b: number) => number;
    readonly bareopaquerecordkey_isEmpty: (a: number) => number;
    readonly bareopaquerecordkey_toArray: (a: number) => [number, number];
    readonly bareopaquerecordkey_encode: (a: number) => [number, number];
    readonly bareopaquerecordkey_length: (a: number) => number;
    readonly bareopaquerecordkey_firstNonZeroBit: (a: number) => number;
    readonly bareopaquerecordkey_encodedLength: (a: number) => number;
    readonly barehashcoordinate_toString: (a: number) => [number, number];
    readonly barehashcoordinate_isEqual: (a: number, b: number) => number;
    readonly barehashcoordinate_isEmpty: (a: number) => number;
    readonly barehashcoordinate_toArray: (a: number) => [number, number];
    readonly barehashcoordinate_encode: (a: number) => [number, number];
    readonly barehashcoordinate_length: (a: number) => number;
    readonly barehashcoordinate_firstNonZeroBit: (a: number) => number;
    readonly barehashcoordinate_encodedLength: (a: number) => number;
    readonly bareencapsulationkey_toString: (a: number) => [number, number];
    readonly bareencapsulationkey_isEqual: (a: number, b: number) => number;
    readonly bareencapsulationkey_isEmpty: (a: number) => number;
    readonly bareencapsulationkey_toArray: (a: number) => [number, number];
    readonly bareencapsulationkey_encode: (a: number) => [number, number];
    readonly bareencapsulationkey_length: (a: number) => number;
    readonly bareencapsulationkey_firstNonZeroBit: (a: number) => number;
    readonly bareencapsulationkey_encodedLength: (a: number) => number;
    readonly nonce_toString: (a: number) => [number, number];
    readonly nonce_isEqual: (a: number, b: number) => number;
    readonly nonce_isEmpty: (a: number) => number;
    readonly nonce_toArray: (a: number) => [number, number];
    readonly nonce_encode: (a: number) => [number, number];
    readonly nonce_length: (a: number) => number;
    readonly nonce_firstNonZeroBit: (a: number) => number;
    readonly nonce_encodedLength: (a: number) => number;
    readonly barekeypair_secret: (a: number) => number;
    readonly barekeypair_encode: (a: number) => [number, number];
    readonly barekeypair_key: (a: number) => number;
    readonly barekeypair_encodedLength: (a: number) => number;
    readonly sharedsecretgroup_clear: (a: number) => void;
    readonly sharedsecretgroup_kinds: (a: number) => [number, number];
    readonly sharedsecretgroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly sharedsecretgroup_isEmpty: (a: number) => number;
    readonly sharedsecretgroup_contains: (a: number, b: number) => number;
    readonly sharedsecretgroup_length: (a: number) => number;
    readonly sharedsecretgroup_isEqual: (a: number, b: number) => number;
    readonly memberidgroup_clear: (a: number) => void;
    readonly memberidgroup_kinds: (a: number) => [number, number];
    readonly memberidgroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly memberidgroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly memberidgroup_isEmpty: (a: number) => number;
    readonly memberidgroup_contains: (a: number, b: number) => number;
    readonly memberidgroup_length: (a: number) => number;
    readonly memberidgroup_isEqual: (a: number, b: number) => number;
    readonly encapsulationkeygroup_clear: (a: number) => void;
    readonly encapsulationkeygroup_kinds: (a: number) => [number, number];
    readonly encapsulationkeygroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly encapsulationkeygroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly encapsulationkeygroup_isEmpty: (a: number) => number;
    readonly encapsulationkeygroup_contains: (a: number, b: number) => number;
    readonly encapsulationkeygroup_length: (a: number) => number;
    readonly encapsulationkeygroup_isEqual: (a: number, b: number) => number;
    readonly opaquerecordkeygroup_clear: (a: number) => void;
    readonly opaquerecordkeygroup_kinds: (a: number) => [number, number];
    readonly opaquerecordkeygroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly opaquerecordkeygroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly opaquerecordkeygroup_isEmpty: (a: number) => number;
    readonly opaquerecordkeygroup_contains: (a: number, b: number) => number;
    readonly opaquerecordkeygroup_length: (a: number) => number;
    readonly hashdigestgroup_clear: (a: number) => void;
    readonly hashdigestgroup_kinds: (a: number) => [number, number];
    readonly hashdigestgroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly hashdigestgroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly hashdigestgroup_isEmpty: (a: number) => number;
    readonly hashdigestgroup_contains: (a: number, b: number) => number;
    readonly hashdigestgroup_length: (a: number) => number;
    readonly hashdigestgroup_isEqual: (a: number, b: number) => number;
    readonly routeidgroup_clear: (a: number) => void;
    readonly routeidgroup_kinds: (a: number) => [number, number];
    readonly routeidgroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly routeidgroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly routeidgroup_isEmpty: (a: number) => number;
    readonly routeidgroup_contains: (a: number, b: number) => number;
    readonly routeidgroup_length: (a: number) => number;
    readonly routeidgroup_isEqual: (a: number, b: number) => number;
    readonly publickeygroup_clear: (a: number) => void;
    readonly publickeygroup_kinds: (a: number) => [number, number];
    readonly publickeygroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly publickeygroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly publickeygroup_isEmpty: (a: number) => number;
    readonly publickeygroup_contains: (a: number, b: number) => number;
    readonly publickeygroup_length: (a: number) => number;
    readonly publickeygroup_isEqual: (a: number, b: number) => number;
    readonly secretkeygroup_clear: (a: number) => void;
    readonly secretkeygroup_kinds: (a: number) => [number, number];
    readonly secretkeygroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly secretkeygroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly secretkeygroup_isEmpty: (a: number) => number;
    readonly secretkeygroup_contains: (a: number, b: number) => number;
    readonly secretkeygroup_length: (a: number) => number;
    readonly signaturegroup_clear: (a: number) => void;
    readonly signaturegroup_kinds: (a: number) => [number, number];
    readonly signaturegroup_get: (a: number, b: number, c: number) => [number, number, number];
    readonly signaturegroup_containsKind: (a: number, b: number, c: number) => [number, number, number];
    readonly signaturegroup_isEmpty: (a: number) => number;
    readonly signaturegroup_contains: (a: number, b: number) => number;
    readonly signaturegroup_length: (a: number) => number;
    readonly signaturegroup_isEqual: (a: number, b: number) => number;
    readonly sharedsecretgroup_add: (a: number, b: number) => void;
    readonly memberidgroup_add: (a: number, b: number) => void;
    readonly encapsulationkeygroup_add: (a: number, b: number) => void;
    readonly hashdigestgroup_add: (a: number, b: number) => void;
    readonly routeidgroup_add: (a: number, b: number) => void;
    readonly secretkeygroup_add: (a: number, b: number) => void;
    readonly signaturegroup_add: (a: number, b: number) => void;
    readonly opaquerecordkeygroup_add: (a: number, b: number) => void;
    readonly wasm_bindgen_9199ecc63999252___convert__closures_____invoke___wasm_bindgen_9199ecc63999252___JsValue__core_7d5f0a2ba6a62c33___result__Result_____wasm_bindgen_9199ecc63999252___JsError___true_: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen_9199ecc63999252___convert__closures_____invoke___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined_______true_: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen_9199ecc63999252___convert__closures_____invoke___web_sys_97a79a69a39dd424___features__gen_CloseEvent__CloseEvent______true_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_9199ecc63999252___convert__closures_____invoke___web_sys_97a79a69a39dd424___features__gen_MessageEvent__MessageEvent______true_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_9199ecc63999252___convert__closures________invoke___web_sys_97a79a69a39dd424___features__gen_Event__Event______true_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_9199ecc63999252___convert__closures________invoke___web_sys_97a79a69a39dd424___features__gen_Event__Event______true__1_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_9199ecc63999252___convert__closures_____invoke_______true_: (a: number, b: number) => void;
    readonly wasm_bindgen_9199ecc63999252___convert__closures_____invoke_______true__1_: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_destroy_closure: (a: number, b: number) => void;
    readonly __externref_drop_slice: (a: number, b: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
export * from './veilid_errors.js';
