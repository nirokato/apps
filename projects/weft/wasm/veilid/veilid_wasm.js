/* @ts-self-types="./veilid_wasm.d.ts" */
import * as import1 from "./snippets/veilid-wasm-7657eecffc3085bb/js/veilid_errors_bridge.js"


/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareDecapsulationKey {
    static __wrap(ptr) {
        const obj = Object.create(BareDecapsulationKey.prototype);
        obj.__wbg_ptr = ptr;
        BareDecapsulationKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareDecapsulationKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_baredecapsulationkey_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.baredecapsulationkey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baredecapsulationkey_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.baredecapsulationkey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareDecapsulationKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareDecapsulationKey);
        const ret = wasm.baredecapsulationkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareDecapsulationKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.baredecapsulationkey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareDecapsulationKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareDecapsulationKey.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.baredecapsulationkey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baredecapsulationkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareDecapsulationKey}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareDecapsulationKey.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareDecapsulationKey}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareDecapsulationKey.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareDecapsulationKey.prototype[Symbol.dispose] = BareDecapsulationKey.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareEncapsulationKey {
    static __wrap(ptr) {
        const obj = Object.create(BareEncapsulationKey.prototype);
        obj.__wbg_ptr = ptr;
        BareEncapsulationKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareEncapsulationKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bareencapsulationkey_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.bareencapsulationkey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.bareencapsulationkey_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.bareencapsulationkey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.bareencapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.bareencapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareEncapsulationKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareEncapsulationKey);
        const ret = wasm.bareencapsulationkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bareencapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareEncapsulationKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.bareencapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.bareencapsulationkey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareEncapsulationKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bareencapsulationkey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareEncapsulationKey.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.bareencapsulationkey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.bareencapsulationkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareEncapsulationKey}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bareencapsulationkey_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareEncapsulationKey.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareEncapsulationKey}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bareencapsulationkey_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareEncapsulationKey.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareEncapsulationKey.prototype[Symbol.dispose] = BareEncapsulationKey.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareHashCoordinate {
    static __wrap(ptr) {
        const obj = Object.create(BareHashCoordinate.prototype);
        obj.__wbg_ptr = ptr;
        BareHashCoordinateFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareHashCoordinateFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barehashcoordinate_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barehashcoordinate_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barehashcoordinate_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barehashcoordinate_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.barehashcoordinate_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.barehashcoordinate_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareHashCoordinate} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareHashCoordinate);
        const ret = wasm.barehashcoordinate_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barehashcoordinate_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareHashCoordinateFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.barehashcoordinate_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barehashcoordinate_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareHashCoordinate}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barehashcoordinate_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareHashCoordinate.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barehashcoordinate_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barehashcoordinate_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareHashCoordinate}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barehashcoordinate_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareHashCoordinate.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareHashCoordinate}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barehashcoordinate_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareHashCoordinate.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareHashCoordinate.prototype[Symbol.dispose] = BareHashCoordinate.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareHashDigest {
    static __wrap(ptr) {
        const obj = Object.create(BareHashDigest.prototype);
        obj.__wbg_ptr = ptr;
        BareHashDigestFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareHashDigestFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barehashdigest_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barehashdigest_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barehashdigest_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barehashdigest_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.barehashdigest_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.barehashdigest_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareHashDigest} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareHashDigest);
        const ret = wasm.barehashdigest_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barehashdigest_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareHashDigestFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.barehashdigest_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barehashdigest_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareHashDigest}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barehashdigest_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareHashDigest.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barehashdigest_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barehashdigest_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareHashDigest}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barehashdigest_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareHashDigest.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareHashDigest}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barehashdigest_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareHashDigest.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareHashDigest.prototype[Symbol.dispose] = BareHashDigest.prototype.free;

/**
 * Untyped KEM encapsulation/decapsulation key pair, carrying no cryptosystem kind.
 */
export class BareKemKeyPair {
    static __wrap(ptr) {
        const obj = Object.create(BareKemKeyPair.prototype);
        obj.__wbg_ptr = ptr;
        BareKemKeyPairFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareKemKeyPairFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barekemkeypair_free(ptr, 0);
    }
    /**
     * Encodes the pair as `<encapsulation>:<decapsulation>`, each part base64url-nopad.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barekemkeypair_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the `encode` string.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barekemkeypair_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns a clone of the encapsulation key.
     * @returns {BareEncapsulationKey}
     */
    get key() {
        const ret = wasm.barekemkeypair_key(this.__wbg_ptr);
        return BareEncapsulationKey.__wrap(ret);
    }
    /**
     * Returns a clone of the decapsulation key.
     * @returns {BareDecapsulationKey}
     */
    get secret() {
        const ret = wasm.barekemkeypair_secret(this.__wbg_ptr);
        return BareDecapsulationKey.__wrap(ret);
    }
    /**
     * Decodes a pair from an `<encapsulation>:<decapsulation>` string.
     *
     * Errors with `VeilidAPIError::ParseError` if `input` is not exactly two colon-separated parts,
     * or `VeilidAPIError::Generic` if either part is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareKemKeyPair}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barekemkeypair_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareKemKeyPair.__wrap(ret[0]);
    }
    /**
     * Decodes a pair from `<encapsulation>:<decapsulation>` bytes, requiring exactly two
     * colon-separated parts.
     *
     * Errors with `VeilidAPIError::ParseError` if `b` is not exactly two colon-separated parts,
     * or `VeilidAPIError::Generic` if either part is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareKemKeyPair}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barekemkeypair_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareKemKeyPair.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareKemKeyPair.prototype[Symbol.dispose] = BareKemKeyPair.prototype.free;

/**
 * Untyped public/secret key pair, carrying no cryptosystem kind.
 */
export class BareKeyPair {
    static __wrap(ptr) {
        const obj = Object.create(BareKeyPair.prototype);
        obj.__wbg_ptr = ptr;
        BareKeyPairFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareKeyPairFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barekeypair_free(ptr, 0);
    }
    /**
     * Encodes the pair as `<public>:<secret>`, each part base64url-nopad.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barekeypair_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the `encode` string.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barekeypair_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns a clone of the public key.
     * @returns {BarePublicKey}
     */
    get key() {
        const ret = wasm.barekeypair_key(this.__wbg_ptr);
        return BarePublicKey.__wrap(ret);
    }
    /**
     * Returns a clone of the secret key.
     * @returns {BareSecretKey}
     */
    get secret() {
        const ret = wasm.barekeypair_secret(this.__wbg_ptr);
        return BareSecretKey.__wrap(ret);
    }
    /**
     * Decodes a pair from a `<public>:<secret>` string.
     *
     * Errors with `VeilidAPIError::ParseError` if `input` is not exactly two colon-separated parts,
     * or `VeilidAPIError::Generic` if either part is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareKeyPair}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barekeypair_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareKeyPair.__wrap(ret[0]);
    }
    /**
     * Decodes a pair from `<public>:<secret>` bytes, requiring exactly two colon-separated parts.
     *
     * Errors with `VeilidAPIError::ParseError` if `b` is not exactly two colon-separated parts,
     * or `VeilidAPIError::Generic` if either part is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareKeyPair}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barekeypair_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareKeyPair.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareKeyPair.prototype[Symbol.dispose] = BareKeyPair.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareMemberId {
    static __wrap(ptr) {
        const obj = Object.create(BareMemberId.prototype);
        obj.__wbg_ptr = ptr;
        BareMemberIdFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareMemberIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barememberid_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barememberid_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barememberid_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barememberid_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.barememberid_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.barememberid_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareMemberId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareMemberId);
        const ret = wasm.barememberid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barememberid_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareMemberIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.barememberid_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barememberid_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareMemberId}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barememberid_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareMemberId.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barememberid_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barememberid_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareMemberId}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barememberid_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareMemberId.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareMemberId}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barememberid_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareMemberId.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareMemberId.prototype[Symbol.dispose] = BareMemberId.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareNodeId {
    static __wrap(ptr) {
        const obj = Object.create(BareNodeId.prototype);
        obj.__wbg_ptr = ptr;
        BareNodeIdFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareNodeIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barenodeid_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barenodeid_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barenodeid_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barenodeid_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.barenodeid_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.barenodeid_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareNodeId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareNodeId);
        const ret = wasm.barenodeid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barenodeid_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareNodeIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.barenodeid_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barenodeid_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareNodeId}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barenodeid_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareNodeId.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barenodeid_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barenodeid_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareNodeId}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barenodeid_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareNodeId.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareNodeId}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barenodeid_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareNodeId.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareNodeId.prototype[Symbol.dispose] = BareNodeId.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareOpaqueRecordKey {
    static __wrap(ptr) {
        const obj = Object.create(BareOpaqueRecordKey.prototype);
        obj.__wbg_ptr = ptr;
        BareOpaqueRecordKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareOpaqueRecordKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bareopaquerecordkey_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.bareopaquerecordkey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.bareopaquerecordkey_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.bareopaquerecordkey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.bareopaquerecordkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.bareopaquerecordkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareOpaqueRecordKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareOpaqueRecordKey);
        const ret = wasm.bareopaquerecordkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bareopaquerecordkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareOpaqueRecordKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.bareopaquerecordkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.bareopaquerecordkey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareOpaqueRecordKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bareopaquerecordkey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareOpaqueRecordKey.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.bareopaquerecordkey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.bareopaquerecordkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareOpaqueRecordKey}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bareopaquerecordkey_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareOpaqueRecordKey.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareOpaqueRecordKey}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.bareopaquerecordkey_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareOpaqueRecordKey.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareOpaqueRecordKey.prototype[Symbol.dispose] = BareOpaqueRecordKey.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BarePublicKey {
    static __wrap(ptr) {
        const obj = Object.create(BarePublicKey.prototype);
        obj.__wbg_ptr = ptr;
        BarePublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BarePublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barepublickey_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barepublickey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barepublickey_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barepublickey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.barepublickey_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.barepublickey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BarePublicKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BarePublicKey);
        const ret = wasm.barepublickey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barepublickey_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BarePublicKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.barepublickey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barepublickey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BarePublicKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barepublickey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BarePublicKey.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barepublickey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barepublickey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BarePublicKey}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barepublickey_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BarePublicKey.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BarePublicKey}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barepublickey_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BarePublicKey.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BarePublicKey.prototype[Symbol.dispose] = BarePublicKey.prototype.free;

/**
 * Untyped DHT record key: an opaque record key with an optional record encryption secret.
 */
export class BareRecordKey {
    static __wrap(ptr) {
        const obj = Object.create(BareRecordKey.prototype);
        obj.__wbg_ptr = ptr;
        BareRecordKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareRecordKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barerecordkey_free(ptr, 0);
    }
    /**
     * Encodes as `<key>` or `<key>:<encryption_key>`, each part base64url-nopad.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barerecordkey_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the `encode` string.
     * @returns {number}
     */
    get encodedLen() {
        const ret = wasm.barerecordkey_encodedLen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns a clone of the encryption secret, if present.
     * @returns {BareSharedSecret | undefined}
     */
    get encryptionKey() {
        const ret = wasm.barerecordkey_encryptionKey(this.__wbg_ptr);
        return ret === 0 ? undefined : BareSharedSecret.__wrap(ret);
    }
    /**
     * Returns a clone of the opaque record key.
     * @returns {BareOpaqueRecordKey}
     */
    get key() {
        const ret = wasm.barerecordkey_key(this.__wbg_ptr);
        return BareOpaqueRecordKey.__wrap(ret);
    }
    /**
     * Decodes from a `<key>` or `<key>:<encryption_key>` string.
     *
     * Errors with `VeilidAPIError::ParseError` if `input` has more than two colon-separated parts,
     * or `VeilidAPIError::Generic` if any part is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareRecordKey}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barerecordkey_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareRecordKey.__wrap(ret[0]);
    }
    /**
     * Decodes from `<key>` or `<key>:<encryption_key>` bytes.
     *
     * Errors with `VeilidAPIError::ParseError` if `b` has more than two colon-separated parts,
     * or `VeilidAPIError::Generic` if any part is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareRecordKey}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barerecordkey_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareRecordKey.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareRecordKey.prototype[Symbol.dispose] = BareRecordKey.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareRouteId {
    static __wrap(ptr) {
        const obj = Object.create(BareRouteId.prototype);
        obj.__wbg_ptr = ptr;
        BareRouteIdFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareRouteIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_barerouteid_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barerouteid_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barerouteid_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barerouteid_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.barerouteid_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.barerouteid_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareRouteId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareRouteId);
        const ret = wasm.barerouteid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barerouteid_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareRouteIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.barerouteid_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barerouteid_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareRouteId}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barerouteid_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareRouteId.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barerouteid_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barerouteid_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareRouteId}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barerouteid_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareRouteId.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareRouteId}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.barerouteid_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareRouteId.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareRouteId.prototype[Symbol.dispose] = BareRouteId.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareSecretKey {
    static __wrap(ptr) {
        const obj = Object.create(BareSecretKey.prototype);
        obj.__wbg_ptr = ptr;
        BareSecretKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareSecretKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_baresecretkey_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.baresecretkey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baresecretkey_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.baresecretkey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baresecretkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baresecretkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareSecretKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareSecretKey);
        const ret = wasm.baresecretkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresecretkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareSecretKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.baresecretkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.baresecretkey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareSecretKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresecretkey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareSecretKey.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.baresecretkey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baresecretkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareSecretKey}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresecretkey_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareSecretKey.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareSecretKey}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresecretkey_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareSecretKey.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareSecretKey.prototype[Symbol.dispose] = BareSecretKey.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareSharedSecret {
    static __wrap(ptr) {
        const obj = Object.create(BareSharedSecret.prototype);
        obj.__wbg_ptr = ptr;
        BareSharedSecretFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareSharedSecretFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_baresharedsecret_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.baresharedsecret_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baresharedsecret_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.baresharedsecret_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baresharedsecret_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baresharedsecret_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareSharedSecret} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareSharedSecret);
        const ret = wasm.baresharedsecret_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresharedsecret_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareSharedSecretFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.baresharedsecret_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.baresharedsecret_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareSharedSecret}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresharedsecret_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareSharedSecret.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.baresharedsecret_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baresharedsecret_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareSharedSecret}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresharedsecret_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareSharedSecret.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareSharedSecret}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresharedsecret_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareSharedSecret.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareSharedSecret.prototype[Symbol.dispose] = BareSharedSecret.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class BareSignature {
    static __wrap(ptr) {
        const obj = Object.create(BareSignature.prototype);
        obj.__wbg_ptr = ptr;
        BareSignatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BareSignatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_baresignature_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.baresignature_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baresignature_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.baresignature_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baresignature_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baresignature_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {BareSignature} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareSignature);
        const ret = wasm.baresignature_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresignature_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        BareSignatureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.baresignature_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.baresignature_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {BareSignature}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresignature_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareSignature.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.baresignature_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baresignature_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {BareSignature}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresignature_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareSignature.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {BareSignature}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baresignature_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BareSignature.__wrap(ret[0]);
    }
}
if (Symbol.dispose) BareSignature.prototype[Symbol.dispose] = BareSignature.prototype.free;

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
    static __wrap(ptr) {
        const obj = Object.create(DecapsulationKey.prototype);
        obj.__wbg_ptr = ptr;
        DecapsulationKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof DecapsulationKey)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DecapsulationKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_decapsulationkey_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {DecapsulationKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, DecapsulationKey);
        const ret = wasm.decapsulationkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareDecapsulationKey} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareDecapsulationKey);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.decapsulationkey_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        DecapsulationKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.decapsulationkey_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {DecapsulationKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.decapsulationkey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return DecapsulationKey.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.decapsulationkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareDecapsulationKey}
     */
    get value() {
        const ret = wasm.decapsulationkey_value(this.__wbg_ptr);
        return BareDecapsulationKey.__wrap(ret);
    }
}
if (Symbol.dispose) DecapsulationKey.prototype[Symbol.dispose] = DecapsulationKey.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class DecapsulationKeyGroup {
    static __wrap(ptr) {
        const obj = Object.create(DecapsulationKeyGroup.prototype);
        obj.__wbg_ptr = ptr;
        DecapsulationKeyGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DecapsulationKeyGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_decapsulationkeygroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {DecapsulationKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, DecapsulationKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.decapsulationkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {DecapsulationKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.decapsulationkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.decapsulationkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {DecapsulationKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, DecapsulationKey);
        const ret = wasm.decapsulationkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {DecapsulationKey[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.decapsulationkeygroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.decapsulationkeygroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {DecapsulationKey | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.decapsulationkeygroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : DecapsulationKey.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {DecapsulationKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, DecapsulationKeyGroup);
        const ret = wasm.decapsulationkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret;
        DecapsulationKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareDecapsulationKey[]}
     */
    keys() {
        const ret = wasm.decapsulationkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.decapsulationkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {DecapsulationKeyGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.decapsulationkeygroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return DecapsulationKeyGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {DecapsulationKey | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.decapsulationkeygroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : DecapsulationKey.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.decapsulationkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {DecapsulationKey[]}
     */
    toArray() {
        const ret = wasm.decapsulationkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.decapsulationkeygroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) DecapsulationKeyGroup.prototype[Symbol.dispose] = DecapsulationKeyGroup.prototype.free;

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
    static __wrap(ptr) {
        const obj = Object.create(EncapsulationKey.prototype);
        obj.__wbg_ptr = ptr;
        EncapsulationKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof EncapsulationKey)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EncapsulationKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_encapsulationkey_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {EncapsulationKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, EncapsulationKey);
        const ret = wasm.encapsulationkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareEncapsulationKey} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareEncapsulationKey);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.encapsulationkey_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        EncapsulationKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.encapsulationkey_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {EncapsulationKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.encapsulationkey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return EncapsulationKey.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.encapsulationkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareEncapsulationKey}
     */
    get value() {
        const ret = wasm.encapsulationkey_value(this.__wbg_ptr);
        return BareEncapsulationKey.__wrap(ret);
    }
}
if (Symbol.dispose) EncapsulationKey.prototype[Symbol.dispose] = EncapsulationKey.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class EncapsulationKeyGroup {
    static __wrap(ptr) {
        const obj = Object.create(EncapsulationKeyGroup.prototype);
        obj.__wbg_ptr = ptr;
        EncapsulationKeyGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EncapsulationKeyGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_encapsulationkeygroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {EncapsulationKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, EncapsulationKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.encapsulationkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {EncapsulationKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.encapsulationkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.encapsulationkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {EncapsulationKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, EncapsulationKey);
        const ret = wasm.encapsulationkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {EncapsulationKey[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.encapsulationkeygroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.encapsulationkeygroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {EncapsulationKey | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.encapsulationkeygroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : EncapsulationKey.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.encapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {EncapsulationKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, EncapsulationKeyGroup);
        const ret = wasm.encapsulationkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.encapsulationkeygroup_js_new();
        this.__wbg_ptr = ret;
        EncapsulationKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareEncapsulationKey[]}
     */
    keys() {
        const ret = wasm.encapsulationkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.encapsulationkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.encapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {EncapsulationKeyGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.encapsulationkeygroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return EncapsulationKeyGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {EncapsulationKey | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.encapsulationkeygroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : EncapsulationKey.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.encapsulationkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {EncapsulationKey[]}
     */
    toArray() {
        const ret = wasm.encapsulationkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.encapsulationkeygroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) EncapsulationKeyGroup.prototype[Symbol.dispose] = EncapsulationKeyGroup.prototype.free;

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class HashCoordinate {
    static __wrap(ptr) {
        const obj = Object.create(HashCoordinate.prototype);
        obj.__wbg_ptr = ptr;
        HashCoordinateFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashCoordinateFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hashcoordinate_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {HashCoordinate} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, HashCoordinate);
        const ret = wasm.hashcoordinate_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareHashCoordinate} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareHashCoordinate);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.hashcoordinate_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        HashCoordinateFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashcoordinate_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {HashCoordinate}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashcoordinate_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return HashCoordinate.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashcoordinate_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareHashCoordinate}
     */
    get value() {
        const ret = wasm.hashcoordinate_value(this.__wbg_ptr);
        return BareHashCoordinate.__wrap(ret);
    }
}
if (Symbol.dispose) HashCoordinate.prototype[Symbol.dispose] = HashCoordinate.prototype.free;

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class HashDigest {
    static __wrap(ptr) {
        const obj = Object.create(HashDigest.prototype);
        obj.__wbg_ptr = ptr;
        HashDigestFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof HashDigest)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashDigestFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hashdigest_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {HashDigest} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, HashDigest);
        const ret = wasm.hashdigest_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareHashDigest} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareHashDigest);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.hashdigest_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        HashDigestFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashdigest_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {HashDigest}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdigest_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return HashDigest.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashdigest_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareHashDigest}
     */
    get value() {
        const ret = wasm.hashdigest_value(this.__wbg_ptr);
        return BareHashDigest.__wrap(ret);
    }
}
if (Symbol.dispose) HashDigest.prototype[Symbol.dispose] = HashDigest.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class HashDigestGroup {
    static __wrap(ptr) {
        const obj = Object.create(HashDigestGroup.prototype);
        obj.__wbg_ptr = ptr;
        HashDigestGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashDigestGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hashdigestgroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {HashDigest} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, HashDigest);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.hashdigestgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {HashDigest[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.hashdigestgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.hashdigestgroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {HashDigest} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, HashDigest);
        const ret = wasm.hashdigestgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {HashDigest[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdigestgroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdigestgroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {HashDigest | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdigestgroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : HashDigest.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.hashdigestgroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {HashDigestGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, HashDigestGroup);
        const ret = wasm.hashdigestgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.hashdigestgroup_js_new();
        this.__wbg_ptr = ret;
        HashDigestGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareHashDigest[]}
     */
    keys() {
        const ret = wasm.hashdigestgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.hashdigestgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.hashdigestgroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {HashDigestGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdigestgroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return HashDigestGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {HashDigest | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdigestgroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : HashDigest.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdigestgroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {HashDigest[]}
     */
    toArray() {
        const ret = wasm.hashdigestgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashdigestgroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) HashDigestGroup.prototype[Symbol.dispose] = HashDigestGroup.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class HashDistance {
    static __wrap(ptr) {
        const obj = Object.create(HashDistance.prototype);
        obj.__wbg_ptr = ptr;
        HashDistanceFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashDistanceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hashdistance_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.hashdistance_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashdistance_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.hashdistance_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.hashdistance_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.hashdistance_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {HashDistance} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, HashDistance);
        const ret = wasm.hashdistance_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdistance_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        HashDistanceFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.hashdistance_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.hashdistance_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {HashDistance}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdistance_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return HashDistance.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.hashdistance_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashdistance_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {HashDistance}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdistance_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return HashDistance.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {HashDistance}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashdistance_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return HashDistance.__wrap(ret[0]);
    }
}
if (Symbol.dispose) HashDistance.prototype[Symbol.dispose] = HashDistance.prototype.free;

/**
 * r" A KEM key pair for HPKE seal/open. Signing key pairs use [`KeyPair`].
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class KemKeyPair {
    static __wrap(ptr) {
        const obj = Object.create(KemKeyPair.prototype);
        obj.__wbg_ptr = ptr;
        KemKeyPairFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof KemKeyPair)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KemKeyPairFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_kemkeypair_free(ptr, 0);
    }
    /**
     * Returns the kindless decapsulation key.
     * @returns {BareDecapsulationKey}
     */
    get bareSecret() {
        const ret = wasm.kemkeypair_bareSecret(this.__wbg_ptr);
        return BareDecapsulationKey.__wrap(ret);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {KemKeyPair} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, KemKeyPair);
        const ret = wasm.kemkeypair_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareKemKeyPair} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareKemKeyPair);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.kemkeypair_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        KemKeyPairFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the kinded encapsulation key.
     * @returns {EncapsulationKey}
     */
    get key() {
        const ret = wasm.kemkeypair_key(this.__wbg_ptr);
        return EncapsulationKey.__wrap(ret);
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.kemkeypair_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Builds a KEM key pair, taking the cryptosystem kind from the encapsulation key.
     * @param {EncapsulationKey} key
     * @param {BareDecapsulationKey} bare_secret
     * @returns {KemKeyPair}
     */
    static newFromParts(key, bare_secret) {
        _assertClass(key, EncapsulationKey);
        var ptr0 = key.__destroy_into_raw();
        _assertClass(bare_secret, BareDecapsulationKey);
        var ptr1 = bare_secret.__destroy_into_raw();
        const ret = wasm.kemkeypair_newFromParts(ptr0, ptr1);
        return KemKeyPair.__wrap(ret);
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {KemKeyPair}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.kemkeypair_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return KemKeyPair.__wrap(ret[0]);
    }
    /**
     * Returns the kinded decapsulation key.
     * @returns {DecapsulationKey}
     */
    get secret() {
        const ret = wasm.kemkeypair_secret(this.__wbg_ptr);
        return DecapsulationKey.__wrap(ret);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.kemkeypair_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareKemKeyPair}
     */
    get value() {
        const ret = wasm.kemkeypair_value(this.__wbg_ptr);
        return BareKemKeyPair.__wrap(ret);
    }
}
if (Symbol.dispose) KemKeyPair.prototype[Symbol.dispose] = KemKeyPair.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class KemKeyPairGroup {
    static __wrap(ptr) {
        const obj = Object.create(KemKeyPairGroup.prototype);
        obj.__wbg_ptr = ptr;
        KemKeyPairGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KemKeyPairGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_kemkeypairgroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {KemKeyPair} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, KemKeyPair);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.kemkeypairgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {KemKeyPair[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.kemkeypairgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.kemkeypairgroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {KemKeyPair} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, KemKeyPair);
        const ret = wasm.kemkeypairgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {KemKeyPair[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.kemkeypairgroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.kemkeypairgroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {KemKeyPair | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.kemkeypairgroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : KemKeyPair.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.kemkeypairgroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {KemKeyPairGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, KemKeyPairGroup);
        const ret = wasm.kemkeypairgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.kemkeypairgroup_js_new();
        this.__wbg_ptr = ret;
        KemKeyPairGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareKemKeyPair[]}
     */
    keys() {
        const ret = wasm.kemkeypairgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.kemkeypairgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.kemkeypairgroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {KemKeyPairGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.kemkeypairgroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return KemKeyPairGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {KemKeyPair | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.kemkeypairgroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : KemKeyPair.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.kemkeypairgroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {KemKeyPair[]}
     */
    toArray() {
        const ret = wasm.kemkeypairgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.kemkeypairgroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) KemKeyPairGroup.prototype[Symbol.dispose] = KemKeyPairGroup.prototype.free;

/**
 * r" A signing key pair. KEM key pairs use [`KemKeyPair`].
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class KeyPair {
    static __wrap(ptr) {
        const obj = Object.create(KeyPair.prototype);
        obj.__wbg_ptr = ptr;
        KeyPairFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof KeyPair)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KeyPairFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_keypair_free(ptr, 0);
    }
    /**
     * Returns the kindless secret key.
     * @returns {BareSecretKey}
     */
    get bareSecret() {
        const ret = wasm.keypair_bareSecret(this.__wbg_ptr);
        return BareSecretKey.__wrap(ret);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {KeyPair} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, KeyPair);
        const ret = wasm.keypair_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareKeyPair} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareKeyPair);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.keypair_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        KeyPairFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the kinded public key.
     * @returns {PublicKey}
     */
    get key() {
        const ret = wasm.keypair_key(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.keypair_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Builds a key pair, taking the cryptosystem kind from the public key.
     * @param {PublicKey} key
     * @param {BareSecretKey} bare_secret
     * @returns {KeyPair}
     */
    static newFromParts(key, bare_secret) {
        _assertClass(key, PublicKey);
        var ptr0 = key.__destroy_into_raw();
        _assertClass(bare_secret, BareSecretKey);
        var ptr1 = bare_secret.__destroy_into_raw();
        const ret = wasm.keypair_newFromParts(ptr0, ptr1);
        return KeyPair.__wrap(ret);
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {KeyPair}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypair_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return KeyPair.__wrap(ret[0]);
    }
    /**
     * Returns the kinded secret key.
     * @returns {SecretKey}
     */
    get secret() {
        const ret = wasm.keypair_secret(this.__wbg_ptr);
        return SecretKey.__wrap(ret);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.keypair_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareKeyPair}
     */
    get value() {
        const ret = wasm.keypair_value(this.__wbg_ptr);
        return BareKeyPair.__wrap(ret);
    }
}
if (Symbol.dispose) KeyPair.prototype[Symbol.dispose] = KeyPair.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class KeyPairGroup {
    static __wrap(ptr) {
        const obj = Object.create(KeyPairGroup.prototype);
        obj.__wbg_ptr = ptr;
        KeyPairGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KeyPairGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_keypairgroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {KeyPair} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, KeyPair);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.keypairgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {KeyPair[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.keypairgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.keypairgroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {KeyPair} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, KeyPair);
        const ret = wasm.keypairgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {KeyPair[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypairgroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypairgroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {KeyPair | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypairgroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : KeyPair.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.keypairgroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {KeyPairGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, KeyPairGroup);
        const ret = wasm.keypairgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.keypairgroup_js_new();
        this.__wbg_ptr = ret;
        KeyPairGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareKeyPair[]}
     */
    keys() {
        const ret = wasm.keypairgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.keypairgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.keypairgroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {KeyPairGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypairgroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return KeyPairGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {KeyPair | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypairgroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : KeyPair.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypairgroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {KeyPair[]}
     */
    toArray() {
        const ret = wasm.keypairgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.keypairgroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) KeyPairGroup.prototype[Symbol.dispose] = KeyPairGroup.prototype.free;

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class MemberId {
    static __wrap(ptr) {
        const obj = Object.create(MemberId.prototype);
        obj.__wbg_ptr = ptr;
        MemberIdFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof MemberId)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MemberIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_memberid_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {MemberId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, MemberId);
        const ret = wasm.memberid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareMemberId} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareMemberId);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.memberid_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        MemberIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.memberid_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {MemberId}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.memberid_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return MemberId.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.memberid_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareMemberId}
     */
    get value() {
        const ret = wasm.memberid_value(this.__wbg_ptr);
        return BareMemberId.__wrap(ret);
    }
}
if (Symbol.dispose) MemberId.prototype[Symbol.dispose] = MemberId.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class MemberIdGroup {
    static __wrap(ptr) {
        const obj = Object.create(MemberIdGroup.prototype);
        obj.__wbg_ptr = ptr;
        MemberIdGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MemberIdGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_memberidgroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {MemberId} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, MemberId);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.memberidgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {MemberId[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.memberidgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.memberidgroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {MemberId} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, MemberId);
        const ret = wasm.memberidgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {MemberId[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.memberidgroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.memberidgroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {MemberId | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.memberidgroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : MemberId.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.memberidgroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {MemberIdGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, MemberIdGroup);
        const ret = wasm.memberidgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.memberidgroup_js_new();
        this.__wbg_ptr = ret;
        MemberIdGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareMemberId[]}
     */
    keys() {
        const ret = wasm.memberidgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.memberidgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.memberidgroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {MemberIdGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.memberidgroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return MemberIdGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {MemberId | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.memberidgroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : MemberId.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.memberidgroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {MemberId[]}
     */
    toArray() {
        const ret = wasm.memberidgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.memberidgroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) MemberIdGroup.prototype[Symbol.dispose] = MemberIdGroup.prototype.free;

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class NodeId {
    static __wrap(ptr) {
        const obj = Object.create(NodeId.prototype);
        obj.__wbg_ptr = ptr;
        NodeIdFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof NodeId)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NodeIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nodeid_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {NodeId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, NodeId);
        const ret = wasm.nodeid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareNodeId} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareNodeId);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.nodeid_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        NodeIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nodeid_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {NodeId}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nodeid_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return NodeId.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nodeid_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareNodeId}
     */
    get value() {
        const ret = wasm.nodeid_value(this.__wbg_ptr);
        return BareNodeId.__wrap(ret);
    }
}
if (Symbol.dispose) NodeId.prototype[Symbol.dispose] = NodeId.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class NodeIdGroup {
    static __wrap(ptr) {
        const obj = Object.create(NodeIdGroup.prototype);
        obj.__wbg_ptr = ptr;
        NodeIdGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NodeIdGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nodeidgroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {NodeId} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, NodeId);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.nodeidgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {NodeId[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.nodeidgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.nodeidgroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {NodeId} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, NodeId);
        const ret = wasm.nodeidgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {NodeId[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nodeidgroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nodeidgroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {NodeId | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nodeidgroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : NodeId.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.nodeidgroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {NodeIdGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, NodeIdGroup);
        const ret = wasm.nodeidgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.nodeidgroup_js_new();
        this.__wbg_ptr = ret;
        NodeIdGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareNodeId[]}
     */
    keys() {
        const ret = wasm.nodeidgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.nodeidgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.nodeidgroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {NodeIdGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nodeidgroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return NodeIdGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {NodeId | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nodeidgroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : NodeId.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nodeidgroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {NodeId[]}
     */
    toArray() {
        const ret = wasm.nodeidgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nodeidgroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) NodeIdGroup.prototype[Symbol.dispose] = NodeIdGroup.prototype.free;

/**
 * Fixed-purpose byte array holding the raw bytes of a `$name`.
 *
 * Serializes as a base64url-nopad string. Ordering, hashing, and equality are over the raw bytes.
 */
export class Nonce {
    static __wrap(ptr) {
        const obj = Object.create(Nonce.prototype);
        obj.__wbg_ptr = ptr;
        NonceFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NonceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nonce_free(ptr, 0);
    }
    /**
     * Returns the bit at `index`, big-endian (bit 0 is the most significant bit of the first byte).
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.nonce_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
     * Encodes the bytes as a base64url-nopad string.
     * @returns {string}
     */
    encode() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nonce_encode(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the length of the base64url-nopad encoding.
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.nonce_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the index of the first set bit, big-endian, or `None` if all bytes are zero.
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.nonce_firstNonZeroBit(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns `true` if there are no bytes.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.nonce_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both have the same bytes.
     * @param {Nonce} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, Nonce);
        const ret = wasm.nonce_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Builds a `$name` by copying a byte slice.
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nonce_js_new(ptr0, len0);
        this.__wbg_ptr = ret;
        NonceFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Returns the number of bytes.
     * @returns {number}
     */
    get length() {
        const ret = wasm.nonce_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Returns the nibble at `index`, big-endian (nibble 0 is the high nibble of the first byte).
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.nonce_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * Parses a `$name` from its base64url-nopad string form.
     * @param {string} s
     * @returns {Nonce}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nonce_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Nonce.__wrap(ret[0]);
    }
    /**
     * Copies the bytes into a new `Vec<u8>`.
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.nonce_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Returns the base64url-nopad string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nonce_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Decodes a `$name` from a base64url-nopad string. An empty string yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `input` is not valid base64url-nopad.
     * @param {string} input
     * @returns {Nonce}
     */
    static tryDecode(input) {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nonce_tryDecode(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Nonce.__wrap(ret[0]);
    }
    /**
     * Decodes a `$name` from base64url-nopad bytes. An empty input yields the default value.
     *
     * Errors with `VeilidAPIError::Generic` if `b` is not valid base64url-nopad.
     * @param {Uint8Array} b
     * @returns {Nonce}
     */
    static tryDecodeBytes(b) {
        const ptr0 = passArray8ToWasm0(b, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.nonce_tryDecodeBytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Nonce.__wrap(ret[0]);
    }
}
if (Symbol.dispose) Nonce.prototype[Symbol.dispose] = Nonce.prototype.free;

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class OpaqueRecordKey {
    static __wrap(ptr) {
        const obj = Object.create(OpaqueRecordKey.prototype);
        obj.__wbg_ptr = ptr;
        OpaqueRecordKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof OpaqueRecordKey)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OpaqueRecordKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_opaquerecordkey_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {OpaqueRecordKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, OpaqueRecordKey);
        const ret = wasm.opaquerecordkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareOpaqueRecordKey} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareOpaqueRecordKey);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.opaquerecordkey_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        OpaqueRecordKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.opaquerecordkey_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {OpaqueRecordKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.opaquerecordkey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return OpaqueRecordKey.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.opaquerecordkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareOpaqueRecordKey}
     */
    get value() {
        const ret = wasm.opaquerecordkey_value(this.__wbg_ptr);
        return BareOpaqueRecordKey.__wrap(ret);
    }
}
if (Symbol.dispose) OpaqueRecordKey.prototype[Symbol.dispose] = OpaqueRecordKey.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class OpaqueRecordKeyGroup {
    static __wrap(ptr) {
        const obj = Object.create(OpaqueRecordKeyGroup.prototype);
        obj.__wbg_ptr = ptr;
        OpaqueRecordKeyGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OpaqueRecordKeyGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_opaquerecordkeygroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {OpaqueRecordKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, OpaqueRecordKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.opaquerecordkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {OpaqueRecordKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.opaquerecordkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.opaquerecordkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {OpaqueRecordKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, OpaqueRecordKey);
        const ret = wasm.opaquerecordkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {OpaqueRecordKey[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.opaquerecordkeygroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.opaquerecordkeygroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {OpaqueRecordKey | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.opaquerecordkeygroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : OpaqueRecordKey.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.opaquerecordkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {OpaqueRecordKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, OpaqueRecordKeyGroup);
        const ret = wasm.opaquerecordkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.opaquerecordkeygroup_js_new();
        this.__wbg_ptr = ret;
        OpaqueRecordKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareOpaqueRecordKey[]}
     */
    keys() {
        const ret = wasm.opaquerecordkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.opaquerecordkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.opaquerecordkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {OpaqueRecordKeyGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.opaquerecordkeygroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return OpaqueRecordKeyGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {OpaqueRecordKey | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.opaquerecordkeygroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : OpaqueRecordKey.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.opaquerecordkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {OpaqueRecordKey[]}
     */
    toArray() {
        const ret = wasm.opaquerecordkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.opaquerecordkeygroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) OpaqueRecordKeyGroup.prototype[Symbol.dispose] = OpaqueRecordKeyGroup.prototype.free;

/**
 * r" A signing public key: verification, identity, and node ids (Ed25519 under VLD0, ML-DSA at
 * r" VLD1). KEM encryption to a key uses [`EncapsulationKey`].
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class PublicKey {
    static __wrap(ptr) {
        const obj = Object.create(PublicKey.prototype);
        obj.__wbg_ptr = ptr;
        PublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof PublicKey)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_publickey_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {PublicKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, PublicKey);
        const ret = wasm.publickey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BarePublicKey} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BarePublicKey);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.publickey_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        PublicKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.publickey_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {PublicKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PublicKey.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.publickey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BarePublicKey}
     */
    get value() {
        const ret = wasm.publickey_value(this.__wbg_ptr);
        return BarePublicKey.__wrap(ret);
    }
}
if (Symbol.dispose) PublicKey.prototype[Symbol.dispose] = PublicKey.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class PublicKeyGroup {
    static __wrap(ptr) {
        const obj = Object.create(PublicKeyGroup.prototype);
        obj.__wbg_ptr = ptr;
        PublicKeyGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PublicKeyGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_publickeygroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {PublicKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, PublicKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.publickeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {PublicKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.publickeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.publickeygroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {PublicKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, PublicKey);
        const ret = wasm.publickeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {PublicKey[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickeygroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickeygroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {PublicKey | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickeygroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : PublicKey.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.publickeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {PublicKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, PublicKeyGroup);
        const ret = wasm.publickeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.publickeygroup_js_new();
        this.__wbg_ptr = ret;
        PublicKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BarePublicKey[]}
     */
    keys() {
        const ret = wasm.publickeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.publickeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.publickeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {PublicKeyGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickeygroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PublicKeyGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {PublicKey | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickeygroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : PublicKey.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {PublicKey[]}
     */
    toArray() {
        const ret = wasm.publickeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.publickeygroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) PublicKeyGroup.prototype[Symbol.dispose] = PublicKeyGroup.prototype.free;

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class RecordKey {
    static __wrap(ptr) {
        const obj = Object.create(RecordKey.prototype);
        obj.__wbg_ptr = ptr;
        RecordKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof RecordKey)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RecordKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_recordkey_free(ptr, 0);
    }
    /**
     * Returns the kinded encryption secret, if present.
     * @returns {SharedSecret | undefined}
     */
    get encryptionKey() {
        const ret = wasm.recordkey_encryptionKey(this.__wbg_ptr);
        return ret === 0 ? undefined : SharedSecret.__wrap(ret);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {RecordKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, RecordKey);
        const ret = wasm.recordkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareRecordKey} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareRecordKey);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.recordkey_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        RecordKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.recordkey_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {RecordKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.recordkey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RecordKey.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.recordkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareRecordKey}
     */
    get value() {
        const ret = wasm.recordkey_value(this.__wbg_ptr);
        return BareRecordKey.__wrap(ret);
    }
}
if (Symbol.dispose) RecordKey.prototype[Symbol.dispose] = RecordKey.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class RecordKeyGroup {
    static __wrap(ptr) {
        const obj = Object.create(RecordKeyGroup.prototype);
        obj.__wbg_ptr = ptr;
        RecordKeyGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RecordKeyGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_recordkeygroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {RecordKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, RecordKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.recordkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {RecordKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.recordkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.recordkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {RecordKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, RecordKey);
        const ret = wasm.recordkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {RecordKey[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.recordkeygroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.recordkeygroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {RecordKey | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.recordkeygroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : RecordKey.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.recordkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {RecordKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, RecordKeyGroup);
        const ret = wasm.recordkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.recordkeygroup_js_new();
        this.__wbg_ptr = ret;
        RecordKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareRecordKey[]}
     */
    keys() {
        const ret = wasm.recordkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.recordkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.recordkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {RecordKeyGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.recordkeygroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RecordKeyGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {RecordKey | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.recordkeygroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : RecordKey.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.recordkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {RecordKey[]}
     */
    toArray() {
        const ret = wasm.recordkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.recordkeygroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) RecordKeyGroup.prototype[Symbol.dispose] = RecordKeyGroup.prototype.free;

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class RouteId {
    static __wrap(ptr) {
        const obj = Object.create(RouteId.prototype);
        obj.__wbg_ptr = ptr;
        RouteIdFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof RouteId)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RouteIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_routeid_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {RouteId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, RouteId);
        const ret = wasm.routeid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareRouteId} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareRouteId);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.routeid_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        RouteIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.routeid_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {RouteId}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.routeid_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RouteId.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.routeid_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareRouteId}
     */
    get value() {
        const ret = wasm.routeid_value(this.__wbg_ptr);
        return BareRouteId.__wrap(ret);
    }
}
if (Symbol.dispose) RouteId.prototype[Symbol.dispose] = RouteId.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class RouteIdGroup {
    static __wrap(ptr) {
        const obj = Object.create(RouteIdGroup.prototype);
        obj.__wbg_ptr = ptr;
        RouteIdGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RouteIdGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_routeidgroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {RouteId} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, RouteId);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.routeidgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {RouteId[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.routeidgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.routeidgroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {RouteId} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, RouteId);
        const ret = wasm.routeidgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {RouteId[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.routeidgroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.routeidgroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {RouteId | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.routeidgroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : RouteId.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.routeidgroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {RouteIdGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, RouteIdGroup);
        const ret = wasm.routeidgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.routeidgroup_js_new();
        this.__wbg_ptr = ret;
        RouteIdGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareRouteId[]}
     */
    keys() {
        const ret = wasm.routeidgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.routeidgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.routeidgroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {RouteIdGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.routeidgroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RouteIdGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {RouteId | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.routeidgroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : RouteId.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.routeidgroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {RouteId[]}
     */
    toArray() {
        const ret = wasm.routeidgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.routeidgroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) RouteIdGroup.prototype[Symbol.dispose] = RouteIdGroup.prototype.free;

/**
 * r" A signing secret key (Ed25519 under VLD0, ML-DSA at VLD1). KEM decryption uses
 * r" [`DecapsulationKey`].
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class SecretKey {
    static __wrap(ptr) {
        const obj = Object.create(SecretKey.prototype);
        obj.__wbg_ptr = ptr;
        SecretKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof SecretKey)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SecretKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_secretkey_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {SecretKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SecretKey);
        const ret = wasm.secretkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareSecretKey} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareSecretKey);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.secretkey_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        SecretKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.secretkey_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {SecretKey}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.secretkey_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SecretKey.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.secretkey_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareSecretKey}
     */
    get value() {
        const ret = wasm.secretkey_value(this.__wbg_ptr);
        return BareSecretKey.__wrap(ret);
    }
}
if (Symbol.dispose) SecretKey.prototype[Symbol.dispose] = SecretKey.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class SecretKeyGroup {
    static __wrap(ptr) {
        const obj = Object.create(SecretKeyGroup.prototype);
        obj.__wbg_ptr = ptr;
        SecretKeyGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SecretKeyGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_secretkeygroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {SecretKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, SecretKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.secretkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {SecretKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.secretkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.secretkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {SecretKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, SecretKey);
        const ret = wasm.secretkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {SecretKey[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.secretkeygroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.secretkeygroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {SecretKey | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.secretkeygroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : SecretKey.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.secretkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {SecretKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SecretKeyGroup);
        const ret = wasm.secretkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.secretkeygroup_js_new();
        this.__wbg_ptr = ret;
        SecretKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareSecretKey[]}
     */
    keys() {
        const ret = wasm.secretkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.secretkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.secretkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {SecretKeyGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.secretkeygroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SecretKeyGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {SecretKey | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.secretkeygroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : SecretKey.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.secretkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {SecretKey[]}
     */
    toArray() {
        const ret = wasm.secretkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.secretkeygroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) SecretKeyGroup.prototype[Symbol.dispose] = SecretKeyGroup.prototype.free;

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class SharedSecret {
    static __wrap(ptr) {
        const obj = Object.create(SharedSecret.prototype);
        obj.__wbg_ptr = ptr;
        SharedSecretFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof SharedSecret)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SharedSecretFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sharedsecret_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {SharedSecret} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SharedSecret);
        const ret = wasm.sharedsecret_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareSharedSecret} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareSharedSecret);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.sharedsecret_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        SharedSecretFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.sharedsecret_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {SharedSecret}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sharedsecret_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SharedSecret.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.sharedsecret_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareSharedSecret}
     */
    get value() {
        const ret = wasm.sharedsecret_value(this.__wbg_ptr);
        return BareSharedSecret.__wrap(ret);
    }
}
if (Symbol.dispose) SharedSecret.prototype[Symbol.dispose] = SharedSecret.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class SharedSecretGroup {
    static __wrap(ptr) {
        const obj = Object.create(SharedSecretGroup.prototype);
        obj.__wbg_ptr = ptr;
        SharedSecretGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SharedSecretGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sharedsecretgroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {SharedSecret} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, SharedSecret);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.sharedsecretgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {SharedSecret[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sharedsecretgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.sharedsecretgroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {SharedSecret} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, SharedSecret);
        const ret = wasm.sharedsecretgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {SharedSecret[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sharedsecretgroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sharedsecretgroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {SharedSecret | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sharedsecretgroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : SharedSecret.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.sharedsecretgroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {SharedSecretGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SharedSecretGroup);
        const ret = wasm.sharedsecretgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.sharedsecretgroup_js_new();
        this.__wbg_ptr = ret;
        SharedSecretGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareSharedSecret[]}
     */
    keys() {
        const ret = wasm.sharedsecretgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.sharedsecretgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.sharedsecretgroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {SharedSecretGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sharedsecretgroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SharedSecretGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {SharedSecret | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sharedsecretgroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : SharedSecret.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sharedsecretgroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {SharedSecret[]}
     */
    toArray() {
        const ret = wasm.sharedsecretgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.sharedsecretgroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) SharedSecretGroup.prototype[Symbol.dispose] = SharedSecretGroup.prototype.free;

/**
 * A value tagged with the `CryptoKind` of the cryptosystem it belongs to.
 *
 * Ordering compares the kind first (by cryptosystem preference) then the value.
 * Parses and displays as `kind:value`; a bare value with no `kind:` prefix decodes against the best available kind.
 */
export class Signature {
    static __wrap(ptr) {
        const obj = Object.create(Signature.prototype);
        obj.__wbg_ptr = ptr;
        SignatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof Signature)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SignatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_signature_free(ptr, 0);
    }
    /**
     * Returns `true` if both have the same kind and value.
     * @param {Signature} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, Signature);
        const ret = wasm.signature_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Pairs a value with the `CryptoKind` it belongs to.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @param {BareSignature} value
     */
    constructor(kind, value) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(value, BareSignature);
        var ptr1 = value.__destroy_into_raw();
        const ret = wasm.signature_js_new(ptr0, len0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        SignatureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The cryptosystem this value belongs to.
     * @returns {CryptoKind}
     */
    get kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.signature_kind(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Parses a `$name` from its `kind:value` string form; a bare value with no `kind:` prefix decodes against the best available kind.
     *
     * Errors with `VeilidAPIError::Generic` if the value part is not valid base64url-nopad.
     * @param {string} s
     * @returns {Signature}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signature_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Signature.__wrap(ret[0]);
    }
    /**
     * Returns the `kind:value` string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.signature_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * A clone of the untagged value.
     * @returns {BareSignature}
     */
    get value() {
        const ret = wasm.signature_value(this.__wbg_ptr);
        return BareSignature.__wrap(ret);
    }
}
if (Symbol.dispose) Signature.prototype[Symbol.dispose] = Signature.prototype.free;

/**
 * An ordered group of typed values holding at most one entry per `CryptoKind`.
 *
 * Entries are kept sorted by kind so the first is the most-preferred cryptosystem.
 * Adding a value whose kind is already present replaces that entry.
 * Derefs to a `[..]` slice, so slice methods like `first` and `iter` are available.
 */
export class SignatureGroup {
    static __wrap(ptr) {
        const obj = Object.create(SignatureGroup.prototype);
        obj.__wbg_ptr = ptr;
        SignatureGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SignatureGroupFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_signaturegroup_free(ptr, 0);
    }
    /**
     * Adds a value, or replaces the existing entry of the same kind, then re-sorts.
     * @param {Signature} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, Signature);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.signaturegroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * Adds or replaces each value by kind, then re-sorts.
     * @param {Signature[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.signaturegroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Removes all entries.
     */
    clear() {
        wasm.signaturegroup_clear(this.__wbg_ptr);
    }
    /**
     * Whether the group contains the given value.
     * @param {Signature} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, Signature);
        const ret = wasm.signaturegroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether any of the given values is present in the group.
     * @param {Signature[]} typed_keys
     * @returns {boolean}
     */
    containsAny(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signaturegroup_containsAny(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Whether the group holds an entry for the given kind.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    containsKind(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signaturegroup_containsKind(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * The entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {Signature | undefined}
     */
    get(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signaturegroup_get(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : Signature.__wrap(ret[0]);
    }
    /**
     * Whether the group has no entries.
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.signaturegroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if both groups hold the same items in the same order.
     * @param {SignatureGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SignatureGroup);
        const ret = wasm.signaturegroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * An empty group.
     */
    constructor() {
        const ret = wasm.signaturegroup_js_new();
        this.__wbg_ptr = ret;
        SignatureGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The untagged values of every entry, in kind-sorted order.
     * @returns {BareSignature[]}
     */
    keys() {
        const ret = wasm.signaturegroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The kinds present in the group, sorted by cryptosystem preference.
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.signaturegroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The number of entries in the group.
     * @returns {number}
     */
    get length() {
        const ret = wasm.signaturegroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Parses a group from its bracketed, comma-separated string form.
     *
     * Errors with `VeilidAPIError::ParseError` if `s` is not bracketed (`[..]`),
     * or `VeilidAPIError::Generic` if any element fails to parse.
     * @param {string} s
     * @returns {SignatureGroup}
     */
    static parse(s) {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signaturegroup_parse(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SignatureGroup.__wrap(ret[0]);
    }
    /**
     * Removes and returns the entry for the given kind, if present.
     *
     * Errors with `VeilidAPIError::ParseError` if `kind` is not a four-character code.
     * @param {CryptoKind} kind
     * @returns {Signature | undefined}
     */
    remove(kind) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signaturegroup_remove(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : Signature.__wrap(ret[0]);
    }
    /**
     * Removes the entries for all of the given kinds.
     *
     * Errors with `VeilidAPIError::ParseError` if any kind is not a four-character code.
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signaturegroup_removeAll(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * A copy of the entries as a vector, in kind-sorted order.
     * @returns {Signature[]}
     */
    toArray() {
        const ret = wasm.signaturegroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the bracketed, comma-separated string form.
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.signaturegroup_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) SignatureGroup.prototype[Symbol.dispose] = SignatureGroup.prototype.free;

/**
 * A transaction over a set of DHT records, allowing atomic get/set across them.
 */
export class VeilidDHTTransaction {
    static __wrap(ptr) {
        const obj = Object.create(VeilidDHTTransaction.prototype);
        obj.__wbg_ptr = ptr;
        VeilidDHTTransactionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VeilidDHTTransactionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_veiliddhttransaction_free(ptr, 0);
    }
    /**
     * Commit the transaction. Performs all actions atomically.
     *
     * The release for [VeilidClient::transactDHTRecords] (the other half is [VeilidDHTTransaction::rollback]). Blocks on the end and commit consensus barriers and requires the node to be online. Completes exactly once: a second commit or a rollback errors with `transaction_not_found`.
     *
     * Throws the same error its core twin `DHTTransaction::commit` returns: `TransactionNotFound` if the transaction was already committed, rolled back, or is unknown, and `TryAgain` (retryable) if the node is offline or the end/commit barriers could not reach consensus. Throws `NotInitialized` if the node is not started.
     * @returns {Promise<void>}
     */
    commit() {
        const ret = wasm.veiliddhttransaction_commit(this.__wbg_ptr);
        return ret;
    }
    /**
     * Extend the transaction with additional record keys.
     *
     * Records already in the transaction are skipped. Idempotent if no
     * new records are supplied. May return `TryAgain` on Begin contention.
     *
     * Blocks on a network Begin fanout for the new records (online-only).
     *
     * Throws the same error its core twin `DHTTransaction::extend` returns: `TransactionNotFound` if the transaction handle is already completed or unknown, `MissingArgument` if `recordKeys` contains duplicates, `InvalidArgument` if the merged record set would exceed the per-transaction record limit, and `TryAgain` (retryable) if the node is offline or the Begin fanout for the added records could not reach consensus. Throws `NotInitialized` if the node is not started, and `Generic` if `recordKeys` or `options` fail to deserialize.
     * @param {RecordKey[]} recordKeys
     * @param {TransactDHTRecordsOptions | null} [options]
     * @returns {Promise<void>}
     */
    extend(recordKeys, options) {
        const ret = wasm.veiliddhttransaction_extend(this.__wbg_ptr, recordKeys, isLikeNone(options) ? 0 : addToExternrefTable0(options));
        return ret;
    }
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
     * @param {RecordKey} recordKey
     * @param {number} subkey
     * @returns {Promise<ValueData | undefined>}
     */
    get(recordKey, subkey) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veiliddhttransaction_get(this.__wbg_ptr, recordKey.__wbg_ptr, subkey);
        return ret;
    }
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
     * @param {RecordKey} recordKey
     * @param {ValueSubkeyRangeSet | null} [subkeys]
     * @param {DHTReportScope | null} [scope]
     * @returns {Promise<DHTRecordReport>}
     */
    inspect(recordKey, subkeys, scope) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veiliddhttransaction_inspect(this.__wbg_ptr, recordKey.__wbg_ptr, isLikeNone(subkeys) ? 0 : addToExternrefTable0(subkeys), isLikeNone(scope) ? 0 : addToExternrefTable0(scope));
        return ret;
    }
    /**
     * Rollback the transaction. Does nothing to the DHT.
     *
     * The release for [VeilidClient::transactDHTRecords] (the other half is [VeilidDHTTransaction::commit]). Blocks sending rollbacks to the network and requires the node to be online. Completes exactly once: a second rollback or a commit errors with `transaction_not_found`.
     *
     * Throws the same error its core twin `DHTTransaction::rollback` returns: `TransactionNotFound` if the transaction was already committed, rolled back, or is unknown, and `TryAgain` (retryable) if the node is offline. Throws `NotInitialized` if the node is not started.
     * @returns {Promise<void>}
     */
    rollback() {
        const ret = wasm.veiliddhttransaction_rollback(this.__wbg_ptr);
        return ret;
    }
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
     * @param {RecordKey} recordKey
     * @param {number} subkey
     * @param {Uint8Array} data
     * @param {DHTTransactionSetValueOptions | null} [options]
     * @returns {Promise<ValueData | undefined>}
     */
    set(recordKey, subkey, data, options) {
        _assertClass(recordKey, RecordKey);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veiliddhttransaction_set(this.__wbg_ptr, recordKey.__wbg_ptr, subkey, ptr0, len0, isLikeNone(options) ? 0 : addToExternrefTable0(options));
        return ret;
    }
}
if (Symbol.dispose) VeilidDHTTransaction.prototype[Symbol.dispose] = VeilidDHTTransaction.prototype.free;

/**
 * Routing contexts are the way you specify the communication preferences for Veilid.
 *
 * By default routing contexts have 'safety routing' enabled which offers sender privacy.
 * To disable this and send RPC operations straight from the node, use [VeilidRoutingContext::withSafety]
 * with a [SafetySelection::Unsafe] parameter. To enable receiver privacy, send to an imported private
 * route id rather than directly to a node id.
 */
export class VeilidRoutingContext {
    static __wrap(ptr) {
        const obj = Object.create(VeilidRoutingContext.prototype);
        obj.__wbg_ptr = ptr;
        VeilidRoutingContextFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VeilidRoutingContextFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_veilidroutingcontext_free(ptr, 0);
    }
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
     * @param {Target} target
     * @param {Uint8Array} request
     * @returns {Promise<Uint8Array>}
     */
    appCall(target, request) {
        const ptr0 = passArray8ToWasm0(request, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidroutingcontext_appCall(this.__wbg_ptr, target, ptr0, len0);
        return ret;
    }
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
     * @param {Target} target
     * @param {Uint8Array} message
     * @returns {Promise<void>}
     */
    appMessage(target, message) {
        const ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidroutingcontext_appMessage(this.__wbg_ptr, target, ptr0, len0);
        return ret;
    }
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
     * @param {RecordKey} recordKey
     * @param {ValueSubkeyRangeSet | null} [subkeys]
     * @returns {Promise<boolean>}
     */
    cancelDHTWatch(recordKey, subkeys) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_cancelDHTWatch(this.__wbg_ptr, recordKey.__wbg_ptr, isLikeNone(subkeys) ? 0 : addToExternrefTable0(subkeys));
        return ret;
    }
    /**
     * Closes a DHT record at a specific key that was opened with create_dht_record or open_dht_record.
     *
     * Closing a record allows you to re-open it with a different routing context
     *
     * The release for [VeilidRoutingContext::createDHTRecord] and [VeilidRoutingContext::openDHTRecord]. Closing a record that is local but not open is a no-op; one not in the local store errors. Blocks holding the record lock until pending writes flush to local disk.
     *
     * Throws the same error its core twin `RoutingContext::close_dht_record` returns: `KeyNotFound` if the record is not in the local store, `Generic` if `recordKey` is an unsupported kind or malformed, and `NotInitialized` if the node is not started. None are retryable.
     * @param {RecordKey} recordKey
     * @returns {Promise<void>}
     */
    closeDHTRecord(recordKey) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_closeDHTRecord(this.__wbg_ptr, recordKey.__wbg_ptr);
        return ret;
    }
    /**
     * Same as `new VeilidRoutingContext()` except easier to chain.
     * @returns {VeilidRoutingContext}
     */
    static create() {
        const ret = wasm.veilidroutingcontext_create();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return VeilidRoutingContext.__wrap(ret[0]);
    }
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
     * @param {CryptoKind} kind
     * @param {DHTSchema} schema
     * @param {KeyPair | null} [owner]
     * @returns {Promise<DHTRecordDescriptor>}
     */
    createDHTRecord(kind, schema, owner) {
        const ret = wasm.veilidroutingcontext_createDHTRecord(this.__wbg_ptr, kind, schema, isLikeNone(owner) ? 0 : addToExternrefTable0(owner));
        return ret;
    }
    /**
     * Deletes a DHT record at a specific key.
     *
     * If the record is opened, it must be closed before it is deleted.
     * Deleting a record does not delete it from the network, but will remove the storage of the record
     * locally, and will prevent its value from being refreshed on the network by this node.
     *
     * Throws the same error its core twin `RoutingContext::delete_dht_record` returns: `Generic` if `recordKey` is an unsupported kind or malformed, `KeyNotFound` if the record is not in the local store, and `NotInitialized` if the node is not started. None are retryable.
     * @param {RecordKey} recordKey
     * @returns {Promise<void>}
     */
    deleteDHTRecord(recordKey) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_deleteDHTRecord(this.__wbg_ptr, recordKey.__wbg_ptr);
        return ret;
    }
    /**
     * Waits for any pending offline subkey writes for a DHT record to be flushed to the network.
     * `timeoutMs` is the maximum time to wait in milliseconds, or `undefined` to wait indefinitely.
     * Returns `true` if all pending writes were flushed, `false` if the timeout elapsed first.
     *
     * Blocks until the queued offline writes drain to the network or `timeoutMs` elapses.
     *
     * Throws the same error its core twin `RoutingContext::flush_dht_record` returns: `Generic` if `recordKey` is an unsupported kind or malformed, and `NotInitialized` if the node shuts down while waiting or is not started.
     * @param {RecordKey} recordKey
     * @param {number | null} [timeoutMs]
     * @returns {Promise<boolean>}
     */
    flushDHTRecord(recordKey, timeoutMs) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_flushDHTRecord(this.__wbg_ptr, recordKey.__wbg_ptr, isLikeNone(timeoutMs) ? Number.MAX_SAFE_INTEGER : (timeoutMs) >>> 0);
        return ret;
    }
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
     * @param {RecordKey} recordKey
     * @param {number} subkey
     * @param {boolean} forceRefresh
     * @returns {Promise<ValueData | undefined>}
     */
    getDHTValue(recordKey, subkey, forceRefresh) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_getDHTValue(this.__wbg_ptr, recordKey.__wbg_ptr, subkey, forceRefresh);
        return ret;
    }
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
     * @param {RecordKey} recordKey
     * @param {ValueSubkeyRangeSet | null} [subkeys]
     * @param {DHTReportScope | null} [scope]
     * @returns {Promise<DHTRecordReport>}
     */
    inspectDHTRecord(recordKey, subkeys, scope) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_inspectDHTRecord(this.__wbg_ptr, recordKey.__wbg_ptr, isLikeNone(subkeys) ? 0 : addToExternrefTable0(subkeys), isLikeNone(scope) ? 0 : addToExternrefTable0(scope));
        return ret;
    }
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
     * @param {RecordKey} recordKey
     * @param {KeyPair | null} [defaultWriter]
     * @param {OpenDHTRecordOptions | null} [options]
     * @returns {Promise<DHTRecordDescriptor>}
     */
    openDHTRecord(recordKey, defaultWriter, options) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_openDHTRecord(this.__wbg_ptr, recordKey.__wbg_ptr, isLikeNone(defaultWriter) ? 0 : addToExternrefTable0(defaultWriter), isLikeNone(options) ? 0 : addToExternrefTable0(options));
        return ret;
    }
    /**
     * Get the safety selection in use on this routing context
     * @returns the SafetySelection currently in use if successful.
     * @returns {SafetySelection}
     */
    safety() {
        const ret = wasm.veilidroutingcontext_safety(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
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
     * @param {RecordKey} recordKey
     * @param {number} subkey
     * @param {Uint8Array} data
     * @param {SetDHTValueOptions | null} [options]
     * @returns {Promise<ValueData | undefined>}
     */
    setDHTValue(recordKey, subkey, data, options) {
        _assertClass(recordKey, RecordKey);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidroutingcontext_setDHTValue(this.__wbg_ptr, recordKey.__wbg_ptr, subkey, ptr0, len0, isLikeNone(options) ? 0 : addToExternrefTable0(options));
        return ret;
    }
    /**
     * Create a new VeilidRoutingContext, without any privacy or sequencing settings.
     *
     * Throws `NotInitialized` if the node is not started.
     */
    constructor() {
        const ret = wasm.veilidroutingcontext_try_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        VeilidRoutingContextFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
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
     * @param {RecordKey} recordKey
     * @param {ValueSubkeyRangeSet | null} [subkeys]
     * @param {Timestamp | null} [expiration]
     * @param {number | null} [count]
     * @returns {Promise<boolean>}
     */
    watchDhtValues(recordKey, subkeys, expiration, count) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_watchDhtValues(this.__wbg_ptr, recordKey.__wbg_ptr, isLikeNone(subkeys) ? 0 : addToExternrefTable0(subkeys), isLikeNone(expiration) ? 0 : addToExternrefTable0(expiration), isLikeNone(count) ? Number.MAX_SAFE_INTEGER : (count) >>> 0);
        return ret;
    }
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
     * @returns {VeilidRoutingContext}
     */
    withDefaultSafety() {
        const ret = wasm.veilidroutingcontext_withDefaultSafety(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return VeilidRoutingContext.__wrap(ret[0]);
    }
    /**
     * Use a custom [SafetySelection]. Can be used to disable safety via [SafetySelection::Unsafe]
     * Returns a new instance of VeilidRoutingContext - does not mutate.
     *
     * Throws `Generic` if `safety_selection` is `Unsafe` without the `footgun-nodeid-target` feature or its hop count exceeds the configured maximum, `InvalidArgument` if its `preferred_route` is not a known route id, and `NotInitialized` if the node is not started.
     * @param {SafetySelection} safety_selection
     * @returns {VeilidRoutingContext}
     */
    withSafety(safety_selection) {
        const ret = wasm.veilidroutingcontext_withSafety(this.__wbg_ptr, safety_selection);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return VeilidRoutingContext.__wrap(ret[0]);
    }
    /**
     * Use a specified `Sequencing` preference.
     * Returns a new instance of VeilidRoutingContext - does not mutate.
     * @param {Sequencing} sequencing
     * @returns {VeilidRoutingContext}
     */
    withSequencing(sequencing) {
        const ret = wasm.veilidroutingcontext_withSequencing(this.__wbg_ptr, sequencing);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return VeilidRoutingContext.__wrap(ret[0]);
    }
}
if (Symbol.dispose) VeilidRoutingContext.prototype[Symbol.dispose] = VeilidRoutingContext.prototype.free;

/**
 * A handle to an opened encrypted key-value table.
 */
export class VeilidTableDB {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VeilidTableDBFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_veilidtabledb_free(ptr, 0);
    }
    /**
     * Start a TableDB write transaction.
     * The transaction object must be committed or rolled back before dropping.
     *
     * Release the returned handle via [VeilidTableDBTransaction::commit] or [VeilidTableDBTransaction::rollback]; dropping it without either logs an error. Local, does not block.
     *
     * Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     * @returns {Promise<VeilidTableDBTransaction>}
     */
    createTransaction() {
        const ret = wasm.veilidtabledb_createTransaction(this.__wbg_ptr);
        return ret;
    }
    /**
     * Delete key with from a column in the TableDB.
     *
     * Opens the table if needed, then awaits a disk write.
     *
     * Returns `undefined` if the key was absent. Throws the same error its core twin `TableDB::delete` returns: `Generic` if `columnId` is at or above the opened column count, the backing-store delete fails, or the prior value is too short to decrypt. Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     * @param {number} columnId
     * @param {Uint8Array} key
     * @returns {Promise<Uint8Array | undefined>}
     */
    delete(columnId, key) {
        const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidtabledb_delete(this.__wbg_ptr, columnId, ptr0, len0);
        return ret;
    }
    /**
     * Delete this TableDB.
     *
     * Drops this object's open handle, then deletes the table from disk. Awaits a disk delete.
     *
     * Returns `false` if no table by that name exists. Throws the same error its core twin `TableStore::delete` returns: `InvalidArgument` if `tableName` has characters other than alphanumeric, `_`, or `-`; `Generic` if the table is still open elsewhere (drop all handles first) or the backing-store delete fails; and `NotInitialized` if the node is not started.
     * @returns {Promise<boolean>}
     */
    deleteTable() {
        const ret = wasm.veilidtabledb_deleteTable(this.__wbg_ptr);
        return ret;
    }
    /**
     * Get the list of keys in a column of the TableDB.
     *
     * Returns an array of Uint8Array keys.
     *
     * Opens the table if needed, then awaits a disk read.
     *
     * Throws the same error its core twin `TableDB::get_keys` returns: `Generic` if `columnId` is at or above the opened column count, the backing-store read fails, or a stored key is too short to decrypt. Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     * @param {number} columnId
     * @returns {Promise<Uint8Array[]>}
     */
    getKeys(columnId) {
        const ret = wasm.veilidtabledb_getKeys(this.__wbg_ptr, columnId);
        return ret;
    }
    /**
     * Read a key from a column in the TableDB immediately.
     *
     * Opens the table if needed, then awaits a disk read.
     *
     * Returns `undefined` if the key is absent. Throws the same error its core twin `TableDB::load` returns: `Generic` if `columnId` is at or above the opened column count, the backing-store read fails, or the stored value is too short to decrypt. Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     * @param {number} columnId
     * @param {Uint8Array} key
     * @returns {Promise<Uint8Array | undefined>}
     */
    load(columnId, key) {
        const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidtabledb_load(this.__wbg_ptr, columnId, ptr0, len0);
        return ret;
    }
    /**
     * If the column count is greater than an existing TableDB's column count,
     * the database will be upgraded to add the missing columns.
     * @param {string} tableName
     * @param {number} columnCount
     */
    constructor(tableName, columnCount) {
        const ptr0 = passStringToWasm0(tableName, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidtabledb_new(ptr0, len0, columnCount);
        this.__wbg_ptr = ret;
        VeilidTableDBFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Get or create the TableDB database table.
     * This is called automatically when performing actions on the TableDB.
     *
     * Holds the opened table handle on this object until `deleteTable` or the object is dropped. Re-opening when already open replaces the handle. Awaits a disk open.
     *
     * Throws the same error its core twin `TableStore::open` returns: `InvalidArgument` if `columnCount` is zero or `tableName` has characters other than alphanumeric, `_`, or `-`; `Generic` if the table is already open elsewhere with a smaller column count or the backing-store open fails; and `NotInitialized` if the node is not started or stored data fails to decrypt.
     * @returns {Promise<void>}
     */
    openTable() {
        const ret = wasm.veilidtabledb_openTable(this.__wbg_ptr);
        return ret;
    }
    /**
     * Rename this TableDB.
     *
     * Drops this object's open handle, renames the table, then points this object at the new name. Awaits a disk flush.
     *
     * Throws the same error its core twin `TableStore::rename` returns: `InvalidArgument` if either name has characters other than alphanumeric, `_`, or `-`; `Generic` if `newTableName` already exists or this table does not exist; and `NotInitialized` if the node is not started.
     * @param {string} newTableName
     * @returns {Promise<void>}
     */
    renameTable(newTableName) {
        const ptr0 = passStringToWasm0(newTableName, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidtabledb_renameTable(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Store a key with a value in a column in the TableDB.
     * Performs a single transaction immediately.
     *
     * Opens the table if needed, then awaits a disk write.
     *
     * Throws the same error its core twin `TableDB::store` returns: `Generic` if `columnId` is at or above the opened column count or the backing-store write fails. Throws `Generic` if the table could not be opened, and `NotInitialized` if the node is not started.
     * @param {number} columnId
     * @param {Uint8Array} key
     * @param {Uint8Array} value
     * @returns {Promise<void>}
     */
    store(columnId, key, value) {
        const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(value, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidtabledb_store(this.__wbg_ptr, columnId, ptr0, len0, ptr1, len1);
        return ret;
    }
}
if (Symbol.dispose) VeilidTableDB.prototype[Symbol.dispose] = VeilidTableDB.prototype.free;

/**
 * A TableDB write transaction. Atomically commits a group of writes or deletes to the TableDB.
 */
export class VeilidTableDBTransaction {
    static __wrap(ptr) {
        const obj = Object.create(VeilidTableDBTransaction.prototype);
        obj.__wbg_ptr = ptr;
        VeilidTableDBTransactionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VeilidTableDBTransactionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_veilidtabledbtransaction_free(ptr, 0);
    }
    /**
     * Commit the transaction. Performs all actions atomically.
     *
     * The release for [VeilidTableDB::createTransaction] (the other half is [VeilidTableDBTransaction::rollback]). An empty transaction commits as a no-op; otherwise blocks on the serialized commit lock and the disk write. Calling commit or rollback again errors with "transaction already completed".
     *
     * Throws the same error its core twin `TableDBTransaction::commit` returns: `Generic` if this transaction was already committed or rolled back, or if the atomic backing-store write fails (the buffered writes are then lost).
     * @returns {Promise<void>}
     */
    commit() {
        const ret = wasm.veilidtabledbtransaction_commit(this.__wbg_ptr);
        return ret;
    }
    /**
     * Delete key with from a column in the TableDB
     * Does not modify TableDB until `.commit()` is called.
     *
     * Throws the same error its core twin `TableDBTransaction::delete` returns: `Generic` if `col` is at or above the opened column count, or if this transaction was already committed or rolled back.
     * @param {number} col
     * @param {Uint8Array} key
     * @returns {Promise<void>}
     */
    deleteKey(col, key) {
        const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidtabledbtransaction_deleteKey(this.__wbg_ptr, col, ptr0, len0);
        return ret;
    }
    /**
     * Rollback the transaction. Does nothing to the TableDB.
     *
     * The release for [VeilidTableDB::createTransaction] (the other half is [VeilidTableDBTransaction::commit]). Discards the buffered writes locally without blocking.
     * @returns {Promise<void>}
     */
    rollback() {
        const ret = wasm.veilidtabledbtransaction_rollback(this.__wbg_ptr);
        return ret;
    }
    /**
     * Store a key with a value in a column in the TableDB.
     * Does not modify TableDB until `.commit()` is called.
     *
     * Throws the same error its core twin `TableDBTransaction::store` returns: `Generic` if `col` is at or above the opened column count, or if this transaction was already committed or rolled back.
     * @param {number} col
     * @param {Uint8Array} key
     * @param {Uint8Array} value
     * @returns {Promise<void>}
     */
    store(col, key, value) {
        const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(value, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidtabledbtransaction_store(this.__wbg_ptr, col, ptr0, len0, ptr1, len1);
        return ret;
    }
}
if (Symbol.dispose) VeilidTableDBTransaction.prototype[Symbol.dispose] = VeilidTableDBTransaction.prototype.free;

/**
 * Makes every error thrown out of wasm an instance of the `VeilidAPIError` class
 * hierarchy in `js/veilid_errors.js`.
 *
 * Registering with veilid-core rather than converting here covers the fallible items
 * veilid-core exports itself, such as `RecordKey.parse`. Runs during `init()`, before
 * any export is reachable.
 */
export function register_error_factory() {
    wasm.register_error_factory();
}

/**
 * Namespace of node-level Veilid operations: startup, shutdown, state, crypto, routes, and config.
 */
export class veilidClient {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        veilidClientFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_veilidclient_free(ptr, 0);
    }
    /**
     * All connectivity capabilites of this version of Veilid
     * @returns {VeilidCapability[]}
     */
    static get CONNECTIVITY_CAPABILITIES() {
        const ret = wasm.veilidclient_CONNECTIVITY_CAPABILITIES();
        return ret;
    }
    /**
     * All distance metric capabilites of this version of Veilid
     * @returns {VeilidCapability[]}
     */
    static get DISTANCE_METRIC_CAPABILITIES() {
        const ret = wasm.veilidclient_DISTANCE_METRIC_CAPABILITIES();
        return ret;
    }
    /**
     * The largest DHT value sequence number. Subtract `n` for a `minSeqnum` that leaves `n` writes
     * @returns {ValueSeqNum}
     */
    static get VALUE_SEQ_NUM_MAX() {
        const ret = wasm.veilidclient_VALUE_SEQ_NUM_MAX();
        return ret;
    }
    /**
     * The APPM capability
     * @returns {VeilidCapability}
     */
    static get VEILID_CAPABILITY_APPMESSAGE() {
        const ret = wasm.veilidclient_VEILID_CAPABILITY_APPMESSAGE();
        return ret;
    }
    /**
     * The BLOC capability, which this build lacks: throws Unimplemented
     * @returns {VeilidCapability}
     */
    static get VEILID_CAPABILITY_BLOCKSTORE() {
        const ret = wasm.veilidclient_VEILID_CAPABILITY_BLOCKSTORE();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * The DHTV capability
     * @returns {VeilidCapability}
     */
    static get VEILID_CAPABILITY_DHT() {
        const ret = wasm.veilidclient_VEILID_CAPABILITY_DHT();
        return ret;
    }
    /**
     * The RLAY capability
     * @returns {VeilidCapability}
     */
    static get VEILID_CAPABILITY_RELAY() {
        const ret = wasm.veilidclient_VEILID_CAPABILITY_RELAY();
        return ret;
    }
    /**
     * The ROUTE capability
     * @returns {VeilidCapability}
     */
    static get VEILID_CAPABILITY_ROUTE() {
        const ret = wasm.veilidclient_VEILID_CAPABILITY_ROUTE();
        return ret;
    }
    /**
     * The SGNL capability
     * @returns {VeilidCapability}
     */
    static get VEILID_CAPABILITY_SIGNAL() {
        const ret = wasm.veilidclient_VEILID_CAPABILITY_SIGNAL();
        return ret;
    }
    /**
     * The TUNL capability, which this build lacks: throws Unimplemented
     * @returns {VeilidCapability}
     */
    static get VEILID_CAPABILITY_TUNNEL() {
        const ret = wasm.veilidclient_VEILID_CAPABILITY_TUNNEL();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * The DIAL capability
     * @returns {VeilidCapability}
     */
    static get VEILID_CAPABILITY_VALIDATE_DIAL_INFO() {
        const ret = wasm.veilidclient_VEILID_CAPABILITY_VALIDATE_DIAL_INFO();
        return ret;
    }
    /**
     * Respond to an AppCall received over a VeilidUpdate::AppCall.
     *
     * * `call_id` - specifies which call to reply to, and it comes from a VeilidUpdate::AppCall, specifically the VeilidAppCall::id() value.
     * * `message` - is an answer blob to be returned by the remote node's RoutingContext::app_call() function, and may be up to 32768 bytes
     *
     * Awaits a network send of the answer.
     *
     * Throws a parse error if `callId` is not a valid operation id. Otherwise throws the same error its core twin `VeilidAPI::app_call_reply` returns: `Generic` if the `callId` is unknown or already answered, `TryAgain` if the node is mid-shutdown, and `NotInitialized` if the node is not started.
     * @param {string} callId
     * @param {Uint8Array} message
     * @returns {Promise<void>}
     */
    static appCallReply(callId, message) {
        const ptr0 = passStringToWasm0(callId, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidclient_appCallReply(ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Connect to the network.
     *
     * Moves the attachment to `Attaching` and returns; it stays there, waiting to bind if it must, until the node attaches or `detach` is called. Succeeds while already attaching.
     *
     * Throws the same error its core twin `VeilidAPI::attach` returns: `Generic` if already attached, and `NotInitialized` if the node is not started.
     * @returns {Promise<void>}
     */
    static attach() {
        const ret = wasm.veilidclient_attach();
        return ret;
    }
    /**
     * Replace the configuration of a detached node; the new values apply at the next `attach`. A config as `getState` reports it, with its secrets blanked, keeps the current secrets.
     *
     * Throws the same error its core twin `VeilidAPI::change_config` returns: `Generic` unless the node is detached, `InvalidArgument` for a key that needs a restart, and `NotInitialized` if the node is not started.
     * @param {VeilidConfig} config
     */
    static changeConfig(config) {
        const ret = wasm.veilidclient_changeConfig(config);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Apply ignore-list changes to a logging layer by name, or to all layers when `layer` is "all".
     * @param {string} layer
     * @param {string[]} changes
     */
    static changeLogIgnore(layer, changes) {
        const ptr0 = passStringToWasm0(layer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayJsValueToWasm0(changes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.veilidclient_changeLogIgnore(ptr0, len0, ptr1, len1);
    }
    /**
     * Apply tracing directives to a logging layer by name, or to all layers when `layer` is "all".
     *
     * Throws a parse error if `directive` is not a valid log directive string. An unknown `layer` name is a no-op, not an error.
     * @param {string} layer
     * @param {string} directive
     */
    static changeLogLevel(layer, directive) {
        const ptr0 = passStringToWasm0(layer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(directive, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidclient_changeLogLevel(ptr0, len0, ptr1, len1);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Execute an 'internal debug command'.
     *
     * Throws a parse error if `command` cannot be tokenized, `Generic` if it is an unknown command, `InvalidArgument` if a known command's arguments are invalid, and `NotInitialized` if the node is not started. Individual commands may throw their own errors.
     * @param {string} command
     * @returns {Promise<string>}
     */
    static debug(command) {
        const ptr0 = passStringToWasm0(command, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidclient_debug(ptr0, len0);
        return ret;
    }
    /**
     * Return the default veilid configuration, in string format
     * @returns {VeilidConfig}
     */
    static defaultConfig() {
        const ret = wasm.veilidclient_defaultConfig();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Remove every user secret stored for this node's namespace.
     * @returns {Promise<void>}
     */
    static deleteAllUserSecrets() {
        const ret = wasm.veilidclient_deleteAllUserSecrets();
        return ret;
    }
    /**
     * Disconnect from the network.
     *
     * Moves the attachment to `Detaching` and returns, cancelling an attach in progress; the network teardown proceeds in the background tick loop. Succeeds while already detaching.
     *
     * Throws the same error its core twin `VeilidAPI::detach` returns: `Generic` if already detached, and `NotInitialized` if the node is not started.
     * @returns {Promise<void>}
     */
    static detach() {
        const ret = wasm.veilidclient_detach();
        return ret;
    }
    /**
     * Return the features that were enabled when veilid-core was built.
     * @returns {string[]}
     */
    static features() {
        const ret = wasm.veilidclient_features();
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Create a new MemberId for use with in creating `DHTSchema`s.
     *
     * Throws the same error its core twin `VeilidAPI::generate_member_id` returns: `Generic` if `writer_key` is an unsupported crypto kind, and `NotInitialized` if the node is not started.
     * @param {PublicKey} writer_key
     * @returns {MemberId}
     */
    static generateMemberId(writer_key) {
        _assertClass(writer_key, PublicKey);
        const ret = wasm.veilidclient_generateMemberId(writer_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return MemberId.__wrap(ret[0]);
    }
    /**
     * Generate multiple signatures with multiple cryptosystems
     *
     * Unsupported crypto kinds in `keyPairs` are silently dropped. Throws `Generic` if a keypair has the wrong kind or length or if `keyPairs` fails to deserialize, `ParseError` or `Internal` if a keypair does not form a valid signing pair, and `NotInitialized` if the node is not started.
     * @param {Uint8Array} data
     * @param {KeyPair[]} keyPairs
     * @returns {Signature[]}
     */
    static generateSignatures(data, keyPairs) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidclient_generateSignatures(ptr0, len0, keyPairs);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Get a cryptosystem by its kind
     *
     * Throws `InvalidArgument` if `kind` is not a cryptosystem this build supports, `NotInitialized` if the node is not started, and a parse error if `kind` fails to deserialize.
     * @param {CryptoKind} kind
     * @returns {veilidCrypto}
     */
    static getCrypto(kind) {
        const ret = wasm.veilidclient_getCrypto(kind);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return veilidCrypto.__wrap(ret[0]);
    }
    /**
     * Deterministicly builds the record key for a given schema and owner public key.
     * The crypto kind of the record key will be that of the `owner` public key
     *
     * Local crypto computation only; despite being `async` it makes no network round-trip. The same inputs always yield the same key.
     *
     * Throws the same error its core twin `VeilidAPI::get_dht_record_key` returns: `InvalidArgument` or `Generic` if `schema` is malformed, `Generic` if `owner` or `encryptionKey` is an unsupported crypto kind, and `NotInitialized` if the node is not started. Also throws `Generic` (or `InvalidArgument` for `schema`) if `schema` or `encryptionKey` fail to deserialize.
     * @param {DHTSchema} schema
     * @param {PublicKey} owner
     * @param {SharedSecret | null} [encryptionKey]
     * @returns {Promise<RecordKey>}
     */
    static getDHTRecordKey(schema, owner, encryptionKey) {
        _assertClass(owner, PublicKey);
        const ret = wasm.veilidclient_getDHTRecordKey(schema, owner.__wbg_ptr, isLikeNone(encryptionKey) ? 0 : addToExternrefTable0(encryptionKey));
        return ret;
    }
    /**
     * Get a full copy of the current state of Veilid.
     *
     * Throws `NotInitialized` if the node is not started.
     * @returns {Promise<VeilidState>}
     */
    static getState() {
        const ret = wasm.veilidclient_getState();
        return ret;
    }
    /**
     * Import a private route blob as a remote private route.
     *
     * Returns a route id that can be used to send private messages to the node creating this route.
     *
     * Local import, no network round-trip. The returned route id holds an imported route the caller must free with [VeilidClient::releasePrivateRoute] or it leaks.
     *
     * Throws the same error its core twin `VeilidAPI::import_remote_private_route` returns: `InvalidArgument` if `blob` is empty or names too many crypto kinds, `ParseError` if it is malformed, `Generic` if the decoded route has no first hop, and `NotInitialized` if the node is not started.
     * @param {Uint8Array} blob
     * @returns {RouteId}
     */
    static importRemotePrivateRoute(blob) {
        const ptr0 = passArray8ToWasm0(blob, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidclient_importRemotePrivateRoute(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RouteId.__wrap(ret[0]);
    }
    /**
     * Initialize the WASM platform: panic hook and tracing layers from the platform config.
     *
     * Idempotent; only the first call has any effect. Must run before `startupCore`.
     * @param {VeilidWASMConfig} platformConfig
     * @returns {Promise<void>}
     */
    static initializeCore(platformConfig) {
        const ret = wasm.veilidclient_initializeCore(platformConfig);
        return ret;
    }
    /**
     * Check if Veilid is shutdown.
     * @returns {boolean}
     */
    static isShutdown() {
        const ret = wasm.veilidclient_isShutdown();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * List the key names of the user secrets stored for this node's namespace.
     * @returns {Promise<string[]>}
     */
    static listUserSecrets() {
        const ret = wasm.veilidclient_listUserSecrets();
        return ret;
    }
    /**
     * Load a user secret from the protected store, or `undefined` if not present.
     * @param {string} key
     * @returns {Promise<Uint8Array | undefined>}
     */
    static loadUserSecret(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidclient_loadUserSecret(ptr0, len0);
        return ret;
    }
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
     * @param {PrivateSpec} private_spec
     * @returns {Promise<RouteBlob>}
     */
    static newCustomPrivateRoute(private_spec) {
        const ret = wasm.veilidclient_newCustomPrivateRoute(private_spec);
        return ret;
    }
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
     * @returns {Promise<RouteBlob>}
     */
    static newPrivateRoute() {
        const ret = wasm.veilidclient_newPrivateRoute();
        return ret;
    }
    /**
     * Get the current timestamp, in string format
     * @returns {string}
     */
    static now() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.veilidclient_now();
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Get a strictly increasing timestamp, in string format. Successive
     * calls return values that are strictly greater than any previous call,
     * bumping by at least 1µs if the underlying clock has not advanced
     * (e.g. on the web where Date.now() has ms resolution).
     * @returns {string}
     */
    static nowIncreasing() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.veilidclient_nowIncreasing();
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Get a monotonically non-decreasing timestamp, in string format.
     * Successive calls return values that are never less than a previous call.
     * @returns {string}
     */
    static nowNonDecreasing() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.veilidclient_nowNonDecreasing();
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Release either a locally allocated or remotely imported private route.
     *
     * This will deactivate the route and free its resources and it can no longer be sent to or received from.
     *
     * The release for [VeilidClient::newPrivateRoute], [VeilidClient::newCustomPrivateRoute], and [VeilidClient::importRemotePrivateRoute]. Local, no network round-trip. Releasing a route id that is unknown, already released, or malformed errors with `InvalidArgument`; throws `NotInitialized` if the node is not started.
     * @param {RouteId} route_id
     */
    static releasePrivateRoute(route_id) {
        _assertClass(route_id, RouteId);
        const ret = wasm.veilidclient_releasePrivateRoute(route_id.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Remove a user secret from the protected store. Returns true if it existed.
     * @param {string} key
     * @returns {Promise<boolean>}
     */
    static removeUserSecret(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidclient_removeUserSecret(ptr0, len0);
        return ret;
    }
    /**
     * Report where the host application stands in its lifecycle.
     *
     * The node follows this itself in a web page and a service worker, and a report counts there only when `attachment.appLifecycle.autoDetectState` is off. A dedicated or shared worker sees no lifecycle, so there the host page's reports are all it has.
     *
     * Throws the same error its core twin `VeilidAPI::report_app_lifecycle_state` returns: `NotInitialized` if the node is not started.
     * @param {VeilidAppLifecycleState} state
     */
    static reportAppLifecycleState(state) {
        const ret = wasm.veilidclient_reportAppLifecycleState(state);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Save a user secret to the protected store. Returns true if a value already existed.
     * @param {string} key
     * @param {Uint8Array} value
     * @returns {Promise<boolean>}
     */
    static saveUserSecret(key, value) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(value, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidclient_saveUserSecret(ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Shut down Veilid and terminate the API.
     *
     * The release for [VeilidClient::startupCore]. Blocks until the core finishes shutting down. A second call after shutdown errors with `NotInitialized`.
     *
     * Throws `NotInitialized` if the node is not running.
     * @returns {Promise<void>}
     */
    static shutdownCore() {
        const ret = wasm.veilidclient_shutdownCore();
        return ret;
    }
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
     * @param {UpdateVeilidFunction} updateCallbackJS
     * @param {VeilidConfig} config
     * @returns {Promise<void>}
     */
    static startupCore(updateCallbackJS, config) {
        const ret = wasm.veilidclient_startupCore(updateCallbackJS, config);
        return ret;
    }
    /**
     * Start a transaction on a set of DHT records
     * Record keys must have been opened via a routing context already when passed to this function
     * Options can be specified that supply a default signing keypair for records that are not opened for writing
     *
     * Blocks on a network Begin fanout across the record nodes (online-only). The returned [VeilidDHTTransaction] holds a network-side resource the caller must release via [VeilidDHTTransaction::commit] or [VeilidDHTTransaction::rollback]; dropping it without either tears the transaction down in the background.
     *
     * Throws the same error its core twin `VeilidAPI::transact_dht_records` returns: `InvalidArgument` if a record is not open or more than 32 records are passed, `MissingArgument` if `recordKeys` is empty or has duplicates, `Generic` if a record key is malformed or its encryption key does not match the opened record, `TryAgain` (retryable) if the DHT is offline, the records are contended, or Begin consensus was not reached, and `NotInitialized` if the node is not started. Network failures surface as `Timeout` or `NoConnection`. Also throws `Generic` if `recordKeys` or `options` fail to deserialize.
     * @param {RecordKey[]} recordKeys
     * @param {TransactDHTRecordsOptions | null} [options]
     * @returns {Promise<VeilidDHTTransaction>}
     */
    static transactDHTRecords(recordKeys, options) {
        const ret = wasm.veilidclient_transactDHTRecords(recordKeys, isLikeNone(options) ? 0 : addToExternrefTable0(options));
        return ret;
    }
    /**
     * Verify multiple signatures with multiple cryptosystems
     *
     * Returns `undefined` if any supported signature fails to validate; otherwise the set of public keys that did validate. Throws `Generic` if a public key or signature has the wrong kind or length or if `publicKeys` or `signatures` fail to deserialize, `ParseError` if a matching public key is not a valid ed25519 point, and `NotInitialized` if the node is not started.
     * @param {PublicKey[]} publicKeys
     * @param {Uint8Array} data
     * @param {Signature[]} signatures
     * @returns {PublicKey[] | undefined}
     */
    static verifySignatures(publicKeys, data, signatures) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidclient_verifySignatures(publicKeys, ptr0, len0, signatures);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v2;
        if (ret[0] !== 0) {
            v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v2;
    }
    /**
     * Return the cargo package version of veilid-core, in object format.
     * @returns {VeilidVersion}
     */
    static version() {
        const ret = wasm.veilidclient_version();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Return the cargo package version of veilid-core, in string format.
     * @returns {string}
     */
    static versionString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.veilidclient_versionString();
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Wait until the attachment state satisfies a condition.
     *
     * Returns the first attachment state that satisfies `condition`, at once if the current state does. A `condition` field left unset is not checked. Without a `condition`, waits until the node is attached, at any strength, with PublicInternet ready.
     *
     * Throws the same error its core twin `VeilidAPI::wait_for_attachment_condition` returns: `Timeout` once `timeoutMs` elapses (without one it waits indefinitely), `InvalidArgument` if the condition's least state is above its most, and `NotInitialized` if the node shuts down while waiting.
     * @param {VeilidStateAttachmentCondition | null} [condition]
     * @param {number | null} [timeoutMs]
     * @returns {Promise<VeilidStateAttachment>}
     */
    static waitForAttachmentCondition(condition, timeoutMs) {
        const ret = wasm.veilidclient_waitForAttachmentCondition(isLikeNone(condition) ? 0 : addToExternrefTable0(condition), isLikeNone(timeoutMs) ? Number.MAX_SAFE_INTEGER : (timeoutMs) >>> 0);
        return ret;
    }
}
if (Symbol.dispose) veilidClient.prototype[Symbol.dispose] = veilidClient.prototype.free;

/**
 * A handle to a single cryptosystem, selected by [`CryptoKind`], exposing its
 * crypto operations to JavaScript.
 */
export class veilidCrypto {
    static __wrap(ptr) {
        const obj = Object.create(veilidCrypto.prototype);
        obj.__wbg_ptr = ptr;
        veilidCryptoFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        veilidCryptoFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_veilidcrypto_free(ptr, 0);
    }
    /**
     * The NONE crypto kind, which this build lacks: throws Unimplemented
     * @returns {CryptoKind}
     */
    static get CRYPTO_KIND_NONE() {
        const ret = wasm.veilidcrypto_CRYPTO_KIND_NONE();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * The VLD0 crypto kind
     * @returns {CryptoKind}
     */
    static get CRYPTO_KIND_VLD0() {
        const ret = wasm.veilidcrypto_CRYPTO_KIND_VLD0();
        return ret;
    }
    /**
     * All crypto kinds supported by this configuration of Veilid
     * @returns {CryptoKind[]}
     */
    static get VALID_CRYPTO_KINDS() {
        const ret = wasm.veilidcrypto_VALID_CRYPTO_KINDS();
        return ret;
    }
    /**
     * Bytes an AEAD operation adds to the ciphertext (the authentication tag length).
     * @returns {number}
     */
    aeadOverhead() {
        const ret = wasm.veilidcrypto_aeadOverhead(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Diffie-Hellman shared secret for the given public/secret key pair, memoized in the
     * DH cache to avoid recomputing the same exchange. See `computeDh`.
     *
     * Throws `Generic` if `key` or `secret` has the wrong kind or length, and on a cache miss the same errors as `computeDh`. Every method on this object also throws `InvalidArgument` if this cryptosystem kind is unavailable and `NotInitialized` if the node is not started.
     * @param {PublicKey} key
     * @param {SecretKey} secret
     * @returns {SharedSecret}
     */
    cachedDh(key, secret) {
        _assertClass(key, PublicKey);
        _assertClass(secret, SecretKey);
        const ret = wasm.veilidcrypto_cachedDh(this.__wbg_ptr, key.__wbg_ptr, secret.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SharedSecret.__wrap(ret[0]);
    }
    /**
     * Verify a hash digest carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `digest` has the wrong kind or length.
     * @param {HashDigest} digest
     */
    checkHashDigest(digest) {
        _assertClass(digest, HashDigest);
        const ret = wasm.veilidcrypto_checkHashDigest(this.__wbg_ptr, digest.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Verify a nonce has the correct length.
     *
     * Throws `Generic` if `nonce` has the wrong length.
     * @param {Nonce} nonce
     */
    checkNonce(nonce) {
        _assertClass(nonce, Nonce);
        const ret = wasm.veilidcrypto_checkNonce(this.__wbg_ptr, nonce.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Verify a public key carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `key` has the wrong kind or length.
     * @param {PublicKey} key
     */
    checkPublicKey(key) {
        _assertClass(key, PublicKey);
        const ret = wasm.veilidcrypto_checkPublicKey(this.__wbg_ptr, key.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Verify a secret key carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `key` has the wrong kind or length.
     * @param {SecretKey} key
     */
    checkSecretKey(key) {
        _assertClass(key, SecretKey);
        const ret = wasm.veilidcrypto_checkSecretKey(this.__wbg_ptr, key.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Verify a shared secret carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `secret` has the wrong kind or length.
     * @param {SharedSecret} secret
     */
    checkSharedSecret(secret) {
        _assertClass(secret, SharedSecret);
        const ret = wasm.veilidcrypto_checkSharedSecret(this.__wbg_ptr, secret.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Verify a signature carries this cryptosystem's kind and the correct length.
     *
     * Throws `Generic` if `signature` has the wrong kind or length.
     * @param {Signature} signature
     */
    checkSignature(signature) {
        _assertClass(signature, Signature);
        const ret = wasm.veilidcrypto_checkSignature(this.__wbg_ptr, signature.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Raw Diffie-Hellman shared secret for the given public/secret key pair, with no caching.
     *
     * Throws `Internal` if `key` is not a valid curve point, and `Generic` if the exchange is non-contributory (low-order public key).
     * @param {PublicKey} key
     * @param {SecretKey} secret
     * @returns {SharedSecret}
     */
    computeDh(key, secret) {
        _assertClass(key, PublicKey);
        _assertClass(secret, SecretKey);
        const ret = wasm.veilidcrypto_computeDh(this.__wbg_ptr, key.__wbg_ptr, secret.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SharedSecret.__wrap(ret[0]);
    }
    /**
     * Apply the stream cipher to `body`, without authentication. Same operation for both
     * directions: re-applying with the same nonce and secret reverses it. Provides confidentiality
     * only, no integrity; callers needing tamper detection must use the AEAD variants.
     *
     * Throws `Generic` if `nonce` or `shared_secret` has the wrong kind or length, and `Internal` on an internal length conversion failure.
     * @param {Uint8Array} body
     * @param {Nonce} nonce
     * @param {SharedSecret} shared_secret
     * @returns {Uint8Array}
     */
    cryptNoAuth(body, nonce, shared_secret) {
        const ptr0 = passArray8ToWasm0(body, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(nonce, Nonce);
        _assertClass(shared_secret, SharedSecret);
        const ret = wasm.veilidcrypto_cryptNoAuth(this.__wbg_ptr, ptr0, len0, nonce.__wbg_ptr, shared_secret.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Derive the KEM decapsulation key corresponding to a signing secret key.
     *
     * VLD0-only bridge (ed25519 to x25519): kinds whose signing and KEM keys are unrelated
     * throw `Unimplemented`. Throws `InvalidArgument` if `secret` is not a valid signing secret key.
     * @param {SecretKey} secret
     * @returns {DecapsulationKey}
     */
    decapsulationKeyFromSigningSecret(secret) {
        _assertClass(secret, SecretKey);
        const ret = wasm.veilidcrypto_decapsulationKeyFromSigningSecret(this.__wbg_ptr, secret.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return DecapsulationKey.__wrap(ret[0]);
    }
    /**
     * Byte length of a KEM decapsulation key.
     * @returns {number}
     */
    decapsulationKeyLength() {
        const ret = wasm.veilidcrypto_decapsulationKeyLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Decrypt and authenticate `body`, returning the plaintext. `associatedData` must match what
     * was supplied at encryption. Errors if authentication fails (tampered ciphertext, wrong
     * key/nonce, or mismatched associated data).
     *
     * Throws `Generic` if `nonce` or `shared_secret` has the wrong kind or length or if authentication fails, and `Internal` on an internal length conversion failure.
     * @param {Uint8Array} body
     * @param {Nonce} nonce
     * @param {SharedSecret} shared_secret
     * @param {Uint8Array | null} [associated_data]
     * @returns {Uint8Array}
     */
    decryptAead(body, nonce, shared_secret, associated_data) {
        const ptr0 = passArray8ToWasm0(body, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(nonce, Nonce);
        _assertClass(shared_secret, SharedSecret);
        var ptr1 = isLikeNone(associated_data) ? 0 : passArray8ToWasm0(associated_data, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidcrypto_decryptAead(this.__wbg_ptr, ptr0, len0, nonce.__wbg_ptr, shared_secret.__wbg_ptr, ptr1, len1);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * Default salt length in bytes for password hashing and KDF operations.
     * @returns {number}
     */
    defaultSaltLength() {
        const ret = wasm.veilidcrypto_defaultSaltLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Derive a shared secret from a password and salt via a password-hashing KDF. Deterministic:
     * the same password and salt always yield the same secret. Distinct from
     * `generateSharedSecret`, which uses key exchange.
     *
     * Throws `Generic` if `salt` length is outside the Argon2 bounds or the KDF fails.
     * @param {Uint8Array} password
     * @param {Uint8Array} salt
     * @returns {SharedSecret}
     */
    deriveSharedSecret(password, salt) {
        const ptr0 = passArray8ToWasm0(password, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(salt, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidcrypto_deriveSharedSecret(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SharedSecret.__wrap(ret[0]);
    }
    /**
     * Derive the KEM encapsulation key corresponding to a signing public key.
     *
     * VLD0-only bridge (ed25519 to x25519): kinds whose signing and KEM keys are unrelated
     * throw `Unimplemented`. Throws `InvalidArgument` if `key` is not a valid signing public key.
     * @param {PublicKey} key
     * @returns {EncapsulationKey}
     */
    encapsulationKeyFromSigningKey(key) {
        _assertClass(key, PublicKey);
        const ret = wasm.veilidcrypto_encapsulationKeyFromSigningKey(this.__wbg_ptr, key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return EncapsulationKey.__wrap(ret[0]);
    }
    /**
     * Byte length of a KEM encapsulation key.
     * @returns {number}
     */
    encapsulationKeyLength() {
        const ret = wasm.veilidcrypto_encapsulationKeyLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Encrypt and authenticate `body`, returning the ciphertext with appended tag. `associatedData`
     * is authenticated but not encrypted, and must be supplied again at decryption. The same nonce
     * must never be reused with the same shared secret.
     *
     * Throws `Generic` if `nonce` or `shared_secret` has the wrong kind or length, and `Internal` on an internal length conversion failure.
     * @param {Uint8Array} body
     * @param {Nonce} nonce
     * @param {SharedSecret} shared_secret
     * @param {Uint8Array | null} [associated_data]
     * @returns {Uint8Array}
     */
    encryptAead(body, nonce, shared_secret, associated_data) {
        const ptr0 = passArray8ToWasm0(body, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(nonce, Nonce);
        _assertClass(shared_secret, SharedSecret);
        var ptr1 = isLikeNone(associated_data) ? 0 : passArray8ToWasm0(associated_data, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidcrypto_encryptAead(this.__wbg_ptr, ptr0, len0, nonce.__wbg_ptr, shared_secret.__wbg_ptr, ptr1, len1);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * Hash a byte slice, returning a digest tagged with this cryptosystem's kind.
     * @param {Uint8Array} data
     * @returns {HashDigest}
     */
    generateHash(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidcrypto_generateHash(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return HashDigest.__wrap(ret[0]);
    }
    /**
     * Generate a fresh random KEM key pair for this cryptosystem.
     * @returns {KemKeyPair}
     */
    generateKemKeyPair() {
        const ret = wasm.veilidcrypto_generateKemKeyPair(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return KemKeyPair.__wrap(ret[0]);
    }
    /**
     * Generate a fresh random signing key pair for this cryptosystem.
     * @returns {KeyPair}
     */
    generateKeyPair() {
        const ret = wasm.veilidcrypto_generateKeyPair(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return KeyPair.__wrap(ret[0]);
    }
    /**
     * Derive a domain-separated shared secret from a key exchange: computes the DH secret, then
     * hashes it together with `domain` and the Veilid API domain tag. Distinct `domain` values
     * yield independent secrets from the same key pair.
     *
     * Throws the `computeDh` errors if the key exchange fails.
     * @param {PublicKey} key
     * @param {SecretKey} secret
     * @param {Uint8Array} domain
     * @returns {SharedSecret}
     */
    generateSharedSecret(key, secret, domain) {
        _assertClass(key, PublicKey);
        _assertClass(secret, SecretKey);
        const ptr0 = passArray8ToWasm0(domain, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidcrypto_generateSharedSecret(this.__wbg_ptr, key.__wbg_ptr, secret.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SharedSecret.__wrap(ret[0]);
    }
    /**
     * Byte length of a hash digest.
     * @returns {number}
     */
    hashDigestLength() {
        const ret = wasm.veilidcrypto_hashDigestLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Hash a password with the given salt, returning a self-describing PHC hash string suitable
     * for storage and later `verifyPassword`.
     *
     * Throws `Generic` if `salt` length is outside the Argon2 bounds or the KDF fails, and `ParseError` if the salt fails base64 encoding.
     * @param {Uint8Array} password
     * @param {Uint8Array} salt
     * @returns {string}
     */
    hashPassword(password, salt) {
        let deferred4_0;
        let deferred4_1;
        try {
            const ptr0 = passArray8ToWasm0(password, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArray8ToWasm0(salt, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ret = wasm.veilidcrypto_hashPassword(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var ptr3 = ret[0];
            var len3 = ret[1];
            if (ret[3]) {
                ptr3 = 0; len3 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
        }
    }
    /**
     * Open a sealed blob produced by `hpkeSeal` with the recipient `secret`. `aad` must match
     * what was supplied at seal. Only the recipient can open a sealed blob; the sealer cannot.
     *
     * Throws `ParseError` if the blob is truncated or its version is unknown, `InvalidArgument`
     * if the blob's kind is not this cryptosystem's kind or `secret` is not a valid key, and
     * `Generic` if decryption fails.
     * @param {DecapsulationKey} secret
     * @param {Uint8Array} aad
     * @param {Uint8Array} sealed
     * @returns {Uint8Array}
     */
    hpkeOpen(secret, aad, sealed) {
        _assertClass(secret, DecapsulationKey);
        const ptr0 = passArray8ToWasm0(aad, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(sealed, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidcrypto_hpkeOpen(this.__wbg_ptr, secret.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
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
     * @param {EncapsulationKey} recipient
     * @param {Uint8Array} aad
     * @param {Uint8Array} plaintext
     * @returns {Uint8Array}
     */
    hpkeSeal(recipient, aad, plaintext) {
        _assertClass(recipient, EncapsulationKey);
        const ptr0 = passArray8ToWasm0(aad, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(plaintext, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidcrypto_hpkeSeal(this.__wbg_ptr, recipient.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * The [`CryptoKind`] fourcc identifying this cryptosystem.
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.veilidcrypto_kind(this.__wbg_ptr);
        return ret;
    }
    /**
     * Byte length of a nonce.
     * @returns {number}
     */
    nonceLength() {
        const ret = wasm.veilidcrypto_nonceLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Byte length of a public key.
     * @returns {number}
     */
    publicKeyLength() {
        const ret = wasm.veilidcrypto_publicKeyLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Fill a new buffer of `len` bytes from the cryptographic RNG.
     * @param {number} len
     * @returns {Uint8Array}
     */
    randomBytes(len) {
        const ret = wasm.veilidcrypto_randomBytes(this.__wbg_ptr, len);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * A fresh random nonce of `nonceLength` bytes.
     * @returns {Nonce}
     */
    randomNonce() {
        const ret = wasm.veilidcrypto_randomNonce(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Nonce.__wrap(ret[0]);
    }
    /**
     * A fresh random shared secret of `sharedSecretLength` bytes.
     * @returns {SharedSecret}
     */
    randomSharedSecret() {
        const ret = wasm.veilidcrypto_randomSharedSecret(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SharedSecret.__wrap(ret[0]);
    }
    /**
     * Byte length of a secret key.
     * @returns {number}
     */
    secretKeyLength() {
        const ret = wasm.veilidcrypto_secretKeyLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Byte length of a shared secret.
     * @returns {number}
     */
    sharedSecretLength() {
        const ret = wasm.veilidcrypto_sharedSecretLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Sign `data` with the given key pair, returning a detached signature.
     *
     * Throws `Generic` if `key` or `secret` has the wrong kind or length, `ParseError` if they do not form a valid ed25519 keypair, and `Internal` if signing fails.
     * @param {PublicKey} key
     * @param {SecretKey} secret
     * @param {Uint8Array} data
     * @returns {Signature}
     */
    sign(key, secret, data) {
        _assertClass(key, PublicKey);
        _assertClass(secret, SecretKey);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.veilidcrypto_sign(this.__wbg_ptr, key.__wbg_ptr, secret.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Signature.__wrap(ret[0]);
    }
    /**
     * Byte length of a signature.
     * @returns {number}
     */
    signatureLength() {
        const ret = wasm.veilidcrypto_signatureLength(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * Recompute the hash of `data` and compare it against `hash`. Returns `true` on match.
     *
     * Throws `Generic` if `hash` has the wrong kind or length.
     * @param {Uint8Array} data
     * @param {HashDigest} hash
     * @returns {boolean}
     */
    validateHash(data, hash) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(hash, HashDigest);
        const ret = wasm.veilidcrypto_validateHash(this.__wbg_ptr, ptr0, len0, hash.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * Check that a public and secret key form a usable signing pair by signing test data and
     * verifying it. Returns `false` if they do not match; errors only on a malformed key.
     *
     * Throws `Generic` if `key` or `secret` has the wrong kind or length.
     * @param {PublicKey} key
     * @param {SecretKey} secret
     * @returns {boolean}
     */
    validateKeyPair(key, secret) {
        _assertClass(key, PublicKey);
        _assertClass(secret, SecretKey);
        const ret = wasm.veilidcrypto_validateKeyPair(this.__wbg_ptr, key.__wbg_ptr, secret.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * Verify a detached `signature` over `data` for `key`. Returns `true` if valid,
     * `false` if not; errors only on a malformed key or signature.
     *
     * Throws `Generic` if `key` or `signature` has the wrong kind or length, and `ParseError` or `Internal` if `key` is not a valid ed25519 point. A signature that does not match returns `false`, not an error.
     * @param {PublicKey} key
     * @param {Uint8Array} data
     * @param {Signature} signature
     * @returns {boolean}
     */
    verify(key, data, signature) {
        _assertClass(key, PublicKey);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(signature, Signature);
        const ret = wasm.veilidcrypto_verify(this.__wbg_ptr, key.__wbg_ptr, ptr0, len0, signature.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * Check a password against a PHC hash string produced by `hashPassword`.
     * Returns `false` on mismatch; errors only on a malformed hash string.
     *
     * Throws `ParseError` if `password_hash` is not a valid PHC string.
     * @param {Uint8Array} password
     * @param {string} password_hash
     * @returns {boolean}
     */
    verifyPassword(password, password_hash) {
        const ptr0 = passArray8ToWasm0(password, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(password_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.veilidcrypto_verifyPassword(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
}
if (Symbol.dispose) veilidCrypto.prototype[Symbol.dispose] = veilidCrypto.prototype.free;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_bce6d499ff0a4aff: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_Number_b7972a139bfbfdf0: function(arg0) {
            const ret = Number(arg0);
            return ret;
        },
        __wbg_String_8564e559799eccda: function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_bigint_get_as_i64_410e28c7b761ad83: function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_boolean_get_2304fb8c853028c8: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_edece8177ad01481: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_07056af4f902c445: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_bigint_aeae3893f30ed54e: function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_falsy_402d3af0d5f09bc6: function(arg0) {
            const ret = !arg0;
            return ret;
        },
        __wbg___wbindgen_is_function_5cd60d5cf78b4eef: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_2042690d351e14f0: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_object_b4593df85baada48: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_dde0fd9020db4434: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_35bb9f4c7fd651d5: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_c0ed08b3e0f393b9: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_0ad77b7717db155c: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_number_get_f73a1244370fcc2c: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_d109740c0d18f4d7: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_9c31b086c2b26051: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_3fa391f3fcdb55f8: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_addEventListener_737cdb55f09bc146: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4);
        }, arguments); },
        __wbg_baredecapsulationkey_new: function(arg0) {
            const ret = BareDecapsulationKey.__wrap(arg0);
            return ret;
        },
        __wbg_bareencapsulationkey_new: function(arg0) {
            const ret = BareEncapsulationKey.__wrap(arg0);
            return ret;
        },
        __wbg_barehashdigest_new: function(arg0) {
            const ret = BareHashDigest.__wrap(arg0);
            return ret;
        },
        __wbg_barekemkeypair_new: function(arg0) {
            const ret = BareKemKeyPair.__wrap(arg0);
            return ret;
        },
        __wbg_barekeypair_new: function(arg0) {
            const ret = BareKeyPair.__wrap(arg0);
            return ret;
        },
        __wbg_barememberid_new: function(arg0) {
            const ret = BareMemberId.__wrap(arg0);
            return ret;
        },
        __wbg_barenodeid_new: function(arg0) {
            const ret = BareNodeId.__wrap(arg0);
            return ret;
        },
        __wbg_bareopaquerecordkey_new: function(arg0) {
            const ret = BareOpaqueRecordKey.__wrap(arg0);
            return ret;
        },
        __wbg_barepublickey_new: function(arg0) {
            const ret = BarePublicKey.__wrap(arg0);
            return ret;
        },
        __wbg_barerecordkey_new: function(arg0) {
            const ret = BareRecordKey.__wrap(arg0);
            return ret;
        },
        __wbg_barerouteid_new: function(arg0) {
            const ret = BareRouteId.__wrap(arg0);
            return ret;
        },
        __wbg_baresecretkey_new: function(arg0) {
            const ret = BareSecretKey.__wrap(arg0);
            return ret;
        },
        __wbg_baresharedsecret_new: function(arg0) {
            const ret = BareSharedSecret.__wrap(arg0);
            return ret;
        },
        __wbg_baresignature_new: function(arg0) {
            const ret = BareSignature.__wrap(arg0);
            return ret;
        },
        __wbg_bound_8d5dfa042d13a74b: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = IDBKeyRange.bound(arg0, arg1, arg2 !== 0, arg3 !== 0);
            return ret;
        }, arguments); },
        __wbg_call_13665d9f14390edc: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_dfde26266607c996: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_call_faa0a261f288f846: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.call(arg1, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_clearTimeout_3629d6209dfcc46e: function(arg0) {
            const ret = clearTimeout(arg0);
            return ret;
        },
        __wbg_close_b66c780bfc7dd92c: function(arg0) {
            arg0.close();
        },
        __wbg_close_e323e9eee669c291: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_code_98ceeaa5ff83fb0b: function(arg0) {
            const ret = arg0.code;
            return ret;
        },
        __wbg_code_b725fad05a5aceb3: function(arg0) {
            const ret = arg0.code;
            return ret;
        },
        __wbg_continue_6f5a7d3d3bc4a125: function() { return handleError(function (arg0) {
            arg0.continue();
        }, arguments); },
        __wbg_createObjectStore_ce6be0d6715f0760: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createObjectStore(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_crypto_38df2bab126b63dc: function(arg0) {
            const ret = arg0.crypto;
            return ret;
        },
        __wbg_data_5fc79a19e47d1531: function(arg0) {
            const ret = arg0.data;
            return ret;
        },
        __wbg_debug_8a28ae940abfb979: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.debug(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_debug_a85b904d7e17d89b: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.debug(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_decapsulationkey_new: function(arg0) {
            const ret = DecapsulationKey.__wrap(arg0);
            return ret;
        },
        __wbg_decapsulationkey_unwrap: function(arg0) {
            const ret = DecapsulationKey.__unwrap(arg0);
            return ret;
        },
        __wbg_deleteDatabase_4335c8782ceae0d9: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.deleteDatabase(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_delete_bc03f88e7f14db56: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.delete(arg1);
            return ret;
        }, arguments); },
        __wbg_delete_c6f3dba6ff302cbe: function() { return handleError(function (arg0, arg1, arg2) {
            delete arg0[getStringFromWasm0(arg1, arg2)];
        }, arguments); },
        __wbg_document_3540635616a18455: function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_done_54b8da57023b7ed2: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_encapsulationkey_new: function(arg0) {
            const ret = EncapsulationKey.__wrap(arg0);
            return ret;
        },
        __wbg_encapsulationkey_unwrap: function(arg0) {
            const ret = EncapsulationKey.__unwrap(arg0);
            return ret;
        },
        __wbg_entries_564a7e8b1e54ede5: function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        },
        __wbg_error_124eb09f2c11487b: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_error_5e438217a71a08e7: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_from_fa561fa561dc8031: function(arg0) {
            const ret = Array.from(arg0);
            return ret;
        },
        __wbg_getItem_88cc26174f98c20c: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getItem(getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getPrototypeOf_206423fa7bce3ced: function(arg0) {
            const ret = Object.getPrototypeOf(arg0);
            return ret;
        },
        __wbg_getRandomValues_c44a50d8cfdaebeb: function() { return handleError(function (arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments); },
        __wbg_getUTCDate_926769f3c3a9f1c1: function(arg0) {
            const ret = arg0.getUTCDate();
            return ret;
        },
        __wbg_getUTCFullYear_9bd16e1cad4c92ce: function(arg0) {
            const ret = arg0.getUTCFullYear();
            return ret;
        },
        __wbg_getUTCHours_8463a50cb0921c21: function(arg0) {
            const ret = arg0.getUTCHours();
            return ret;
        },
        __wbg_getUTCMilliseconds_e9df22a4159bb75b: function(arg0) {
            const ret = arg0.getUTCMilliseconds();
            return ret;
        },
        __wbg_getUTCMinutes_725715b6d3e60638: function(arg0) {
            const ret = arg0.getUTCMinutes();
            return ret;
        },
        __wbg_getUTCMonth_0f445fa29d1d8880: function(arg0) {
            const ret = arg0.getUTCMonth();
            return ret;
        },
        __wbg_getUTCSeconds_56adbedc779091c4: function(arg0) {
            const ret = arg0.getUTCSeconds();
            return ret;
        },
        __wbg_get_3e9a707ab7d352eb: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_98fdf51d029a75eb: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_dcf82ab8aad1a593: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_unchecked_1dfe6d05ad91d9b7: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        },
        __wbg_has_ef192b1f278770eb: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.has(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_hashdigest_new: function(arg0) {
            const ret = HashDigest.__wrap(arg0);
            return ret;
        },
        __wbg_hashdigest_unwrap: function(arg0) {
            const ret = HashDigest.__unwrap(arg0);
            return ret;
        },
        __wbg_hidden_07ccdf2bb25be8f3: function(arg0) {
            const ret = arg0.hidden;
            return ret;
        },
        __wbg_indexedDB_2e82cb845ce6b3ad: function() { return handleError(function (arg0) {
            const ret = arg0.indexedDB;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_indexedDB_cbfeacc981615a77: function() { return handleError(function (arg0) {
            const ret = arg0.indexedDB;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_instanceof_ArrayBuffer_53db37b06f6b9afe: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Blob_ef93d187bbde5360: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Blob;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DedicatedWorkerGlobalScope_2255a84028fc1cb8: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DedicatedWorkerGlobalScope;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ExtendableEvent_4e2794da75f499d6: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ExtendableEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IdbCursorWithValue_7ce17efb3defd74f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IDBCursorWithValue;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IdbDatabase_102b0fe5255eee9c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IDBDatabase;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IdbRequest_eef501cff5d0b7c1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IDBRequest;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IdbVersionChangeEvent_6e104b2bd0f7103b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IDBVersionChangeEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Object_03924e0dbda74bd8: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Object;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Promise_09012cfa9708520a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Promise;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ServiceWorkerGlobalScope_98c2c09dafac9909: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ServiceWorkerGlobalScope;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_SharedWorkerGlobalScope_d24d7f53d427c6fa: function(arg0) {
            let result;
            try {
                result = arg0 instanceof SharedWorkerGlobalScope;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_abd07d4bd221d50b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_faa5cf994f49cca7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WorkerGlobalScope_a93ee1765e6a23bf: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WorkerGlobalScope;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isArray_94898ed3aad6947b: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isSafeInteger_01e964d144ad3a55: function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        },
        __wbg_is_032c49d03f47f420: function(arg0, arg1) {
            const ret = Object.is(arg0, arg1);
            return ret;
        },
        __wbg_iterator_1441b47f341dc34f: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_kemkeypair_new: function(arg0) {
            const ret = KemKeyPair.__wrap(arg0);
            return ret;
        },
        __wbg_kemkeypair_unwrap: function(arg0) {
            const ret = KemKeyPair.__unwrap(arg0);
            return ret;
        },
        __wbg_key_387cdde352276f3a: function() { return handleError(function (arg0) {
            const ret = arg0.key;
            return ret;
        }, arguments); },
        __wbg_key_8bc53fcef707e629: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg1.key(arg2 >>> 0);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_keypair_new: function(arg0) {
            const ret = KeyPair.__wrap(arg0);
            return ret;
        },
        __wbg_keypair_unwrap: function(arg0) {
            const ret = KeyPair.__unwrap(arg0);
            return ret;
        },
        __wbg_keys_682010b680c9b1f8: function(arg0) {
            const ret = Object.keys(arg0);
            return ret;
        },
        __wbg_length_2591a0f4f659a55c: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_56fcd3e2b7e0299d: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_899bfc15609e2051: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_e6ad7ab13e2a69a6: function() { return handleError(function (arg0) {
            const ret = arg0.length;
            return ret;
        }, arguments); },
        __wbg_localStorage_e3f4a792bb36c514: function() { return handleError(function (arg0) {
            const ret = arg0.localStorage;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_log_0098bb9b105c98cf: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_log_814a7d4d050490a3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.log(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_log_bb0d5906d49ed310: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_lowerBound_832b1ef0ae9da95b: function() { return handleError(function (arg0) {
            const ret = IDBKeyRange.lowerBound(arg0);
            return ret;
        }, arguments); },
        __wbg_mark_799ba62bd05523d9: function(arg0, arg1) {
            performance.mark(getStringFromWasm0(arg0, arg1));
        },
        __wbg_measure_2e5f6d449067fd6b: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            let deferred0_0;
            let deferred0_1;
            let deferred1_0;
            let deferred1_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                deferred1_0 = arg2;
                deferred1_1 = arg3;
                performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
                wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }, arguments); },
        __wbg_memberid_new: function(arg0) {
            const ret = MemberId.__wrap(arg0);
            return ret;
        },
        __wbg_memberid_unwrap: function(arg0) {
            const ret = MemberId.__unwrap(arg0);
            return ret;
        },
        __wbg_message_e88a8d3ba2b91c2a: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_msCrypto_bd5a034af96bcba6: function(arg0) {
            const ret = arg0.msCrypto;
            return ret;
        },
        __wbg_new_02d162bc6cf02f60: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_0_2722fcdb71a888a6: function() {
            const ret = new Date();
            return ret;
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_310879b66b6e95e1: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_7ddec6de44ff8f5d: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_b1280f836646084c: function() { return handleError(function (arg0, arg1) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_d8dfd33fa007511d: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen_9199ecc63999252___convert__closures_____invoke___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined_______true_(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_from_slice_269e35316ed2d061: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_typed_c072c4ce9a2a0cdf: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen_9199ecc63999252___convert__closures_____invoke___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined_______true_(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_with_length_99887c91eae4abab: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_str_sequence_dfd6f579eac5ed31: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_next_2a4e19f4f5083b0f: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_next_6429a146bf756f93: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_node_84ea875411254db1: function(arg0) {
            const ret = arg0.node;
            return ret;
        },
        __wbg_nodeid_new: function(arg0) {
            const ret = NodeId.__wrap(arg0);
            return ret;
        },
        __wbg_nodeid_unwrap: function(arg0) {
            const ret = NodeId.__unwrap(arg0);
            return ret;
        },
        __wbg_now_81363d44c96dd239: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_now_c76fbbef8a06082c: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_objectStoreNames_7eb10221ec542d29: function(arg0) {
            const ret = arg0.objectStoreNames;
            return ret;
        },
        __wbg_objectStore_b28adb984a77902e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.objectStore(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_oldVersion_afd7254bce31480c: function(arg0) {
            const ret = arg0.oldVersion;
            return ret;
        },
        __wbg_opaquerecordkey_new: function(arg0) {
            const ret = OpaqueRecordKey.__wrap(arg0);
            return ret;
        },
        __wbg_opaquerecordkey_unwrap: function(arg0) {
            const ret = OpaqueRecordKey.__unwrap(arg0);
            return ret;
        },
        __wbg_openCursor_3f4e3e61d07887e9: function() { return handleError(function (arg0) {
            const ret = arg0.openCursor();
            return ret;
        }, arguments); },
        __wbg_openCursor_61c49273b7c65183: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.openCursor(arg1);
            return ret;
        }, arguments); },
        __wbg_open_40ab11cdd8f5ac5a: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
            return ret;
        }, arguments); },
        __wbg_open_a9584db064190886: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_process_44c7a14e11e9f69e: function(arg0) {
            const ret = arg0.process;
            return ret;
        },
        __wbg_prototypesetcall_5f9bdc8d75e07276: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_publickey_new: function(arg0) {
            const ret = PublicKey.__wrap(arg0);
            return ret;
        },
        __wbg_publickey_unwrap: function(arg0) {
            const ret = PublicKey.__unwrap(arg0);
            return ret;
        },
        __wbg_push_b77c476b01548d0a: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_put_ad17713e2c2f12fa: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.put(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_queueMicrotask_78d584b53af520f5: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_queueMicrotask_b39ea83c7f01971a: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_randomFillSync_6c25eac9869eb53c: function() { return handleError(function (arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments); },
        __wbg_readyState_a1a00cc8898812ac: function(arg0) {
            const ret = arg0.readyState;
            return ret;
        },
        __wbg_reason_48e6f2ed86d09534: function(arg0, arg1) {
            const ret = arg1.reason;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_recordkey_new: function(arg0) {
            const ret = RecordKey.__wrap(arg0);
            return ret;
        },
        __wbg_recordkey_unwrap: function(arg0) {
            const ret = RecordKey.__unwrap(arg0);
            return ret;
        },
        __wbg_require_b4edbdcf3e2a1ef0: function() { return handleError(function () {
            const ret = module.require;
            return ret;
        }, arguments); },
        __wbg_resolve_d17db9352f5a220e: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_result_c4cb33cd39c97cac: function() { return handleError(function (arg0) {
            const ret = arg0.result;
            return ret;
        }, arguments); },
        __wbg_routeid_new: function(arg0) {
            const ret = RouteId.__wrap(arg0);
            return ret;
        },
        __wbg_routeid_unwrap: function(arg0) {
            const ret = RouteId.__unwrap(arg0);
            return ret;
        },
        __wbg_secretkey_new: function(arg0) {
            const ret = SecretKey.__wrap(arg0);
            return ret;
        },
        __wbg_secretkey_unwrap: function(arg0) {
            const ret = SecretKey.__unwrap(arg0);
            return ret;
        },
        __wbg_send_b9d998a91cbc8429: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getArrayU8FromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_send_e1d2f71ce4473d1e: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_setItem_caab843cd6845dbb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setItem(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setTime_65007937490ba298: function(arg0, arg1) {
            const ret = arg0.setTime(arg1);
            return ret;
        },
        __wbg_setTimeout_4a8f96a1b4261aee: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setTimeout_56bcdccbad22fd44: function() { return handleError(function (arg0, arg1) {
            const ret = setTimeout(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_setTimeout_a2b48e67340623fd: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        },
        __wbg_set_78ea6a19f4818587: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_a0e911be3da02782: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_binaryType_5c0002dfcf194934: function(arg0, arg1) {
            arg0.binaryType = __wbindgen_enum_BinaryType[arg1];
        },
        __wbg_set_capture_eb02e7c1b10ecdab: function(arg0, arg1) {
            arg0.capture = arg1 !== 0;
        },
        __wbg_set_onblocked_92d254048ee5dc3d: function(arg0, arg1) {
            arg0.onblocked = arg1;
        },
        __wbg_set_once_1f7d97545d570128: function(arg0, arg1) {
            arg0.once = arg1 !== 0;
        },
        __wbg_set_onclose_3121e15055418a37: function(arg0, arg1) {
            arg0.onclose = arg1;
        },
        __wbg_set_oncomplete_3f428ec13b20d7cc: function(arg0, arg1) {
            arg0.oncomplete = arg1;
        },
        __wbg_set_onerror_1dd52df6279c8dd2: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onerror_38740b892815eedc: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onerror_457b093a5063c7ec: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onmessage_9eb2cf76e70783ad: function(arg0, arg1) {
            arg0.onmessage = arg1;
        },
        __wbg_set_onopen_6f3fc5e2ad3144f1: function(arg0, arg1) {
            arg0.onopen = arg1;
        },
        __wbg_set_onsuccess_b556141053d02ea7: function(arg0, arg1) {
            arg0.onsuccess = arg1;
        },
        __wbg_set_onupgradeneeded_f885fa17614acd2b: function(arg0, arg1) {
            arg0.onupgradeneeded = arg1;
        },
        __wbg_set_onversionchange_084bce5bba84aeb1: function(arg0, arg1) {
            arg0.onversionchange = arg1;
        },
        __wbg_set_passive_2233318ae781e44d: function(arg0, arg1) {
            arg0.passive = arg1 !== 0;
        },
        __wbg_sharedsecret_new: function(arg0) {
            const ret = SharedSecret.__wrap(arg0);
            return ret;
        },
        __wbg_sharedsecret_unwrap: function(arg0) {
            const ret = SharedSecret.__unwrap(arg0);
            return ret;
        },
        __wbg_signature_new: function(arg0) {
            const ret = Signature.__wrap(arg0);
            return ret;
        },
        __wbg_signature_unwrap: function(arg0) {
            const ret = Signature.__unwrap(arg0);
            return ret;
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_THIS_02344c9b09eb08a9: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_ac6d4ac874d5cd54: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_9b2406c23aeb2023: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_b34d2126934e16ba: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_subarray_7c6a0da8f3b4a1ba: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_target_84e05e84ffc12989: function(arg0) {
            const ret = arg0.target;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_then_837494e384b37459: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_then_bd927500e8905df2: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_transaction_38cea079a9d82352: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.transaction(arg1, __wbindgen_enum_IdbTransactionMode[arg2]);
            return ret;
        }, arguments); },
        __wbg_transaction_fbb22de1d45411c2: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.transaction(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_type_5a96eb5991198f10: function(arg0, arg1) {
            const ret = arg1.type;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_url_0556640de0fe231b: function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_value_308a5bab6b4eb311: function() { return handleError(function (arg0) {
            const ret = arg0.value;
            return ret;
        }, arguments); },
        __wbg_value_9cc0518af87a489c: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_veiliddhttransaction_new: function(arg0) {
            const ret = VeilidDHTTransaction.__wrap(arg0);
            return ret;
        },
        __wbg_veilidtabledbtransaction_new: function(arg0) {
            const ret = VeilidTableDBTransaction.__wrap(arg0);
            return ret;
        },
        __wbg_version_0fcb42f756365cc1: function(arg0) {
            const ret = arg0.version;
            return ret;
        },
        __wbg_versions_276b2795b1c6a219: function(arg0) {
            const ret = arg0.versions;
            return ret;
        },
        __wbg_waitUntil_cdcf969450aa2fa9: function() { return handleError(function (arg0, arg1) {
            arg0.waitUntil(arg1);
        }, arguments); },
        __wbg_warn_7dce610d468b373e: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.warn(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_warn_90f2bdcfdb341ab0: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.warn(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_wasClean_aa6a78fa841a6301: function(arg0) {
            const ret = arg0.wasClean;
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 4173, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_9199ecc63999252___convert__closures_____invoke___wasm_bindgen_9199ecc63999252___JsValue__core_7d5f0a2ba6a62c33___result__Result_____wasm_bindgen_9199ecc63999252___JsError___true_);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("CloseEvent")], shim_idx: 764, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_9199ecc63999252___convert__closures_____invoke___web_sys_97a79a69a39dd424___features__gen_CloseEvent__CloseEvent______true_);
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MessageEvent")], shim_idx: 3851, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_9199ecc63999252___convert__closures_____invoke___web_sys_97a79a69a39dd424___features__gen_MessageEvent__MessageEvent______true_);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Ref(NamedExternref("Event"))], shim_idx: 3710, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_9199ecc63999252___convert__closures________invoke___web_sys_97a79a69a39dd424___features__gen_Event__Event______true_);
            return ret;
        },
        __wbindgen_cast_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Ref(NamedExternref("Event"))], shim_idx: 3919, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_9199ecc63999252___convert__closures________invoke___web_sys_97a79a69a39dd424___features__gen_Event__Event______true__1_);
            return ret;
        },
        __wbindgen_cast_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 3819, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_9199ecc63999252___convert__closures_____invoke_______true_);
            return ret;
        },
        __wbindgen_cast_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 3918, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_9199ecc63999252___convert__closures_____invoke_______true__1_);
            return ret;
        },
        __wbindgen_cast_0000000000000008: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000000a: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000000b: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return ret;
        },
        __wbindgen_cast_000000000000000c: function(arg0, arg1) {
            var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_free(arg0, arg1 * 4, 4);
            // Cast intrinsic for `Vector(NamedExternref("string")) -> Externref`.
            const ret = v0;
            return ret;
        },
        __wbindgen_cast_000000000000000d: function(arg0, arg1) {
            var v0 = getArrayU8FromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_free(arg0, arg1 * 1, 1);
            // Cast intrinsic for `Vector(U8) -> Externref`.
            const ret = v0;
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./veilid_wasm_bg.js": import0,
        "./snippets/veilid-wasm-7657eecffc3085bb/js/veilid_errors_bridge.js": import1,
    };
}

function wasm_bindgen_9199ecc63999252___convert__closures_____invoke_______true_(arg0, arg1) {
    wasm.wasm_bindgen_9199ecc63999252___convert__closures_____invoke_______true_(arg0, arg1);
}

function wasm_bindgen_9199ecc63999252___convert__closures_____invoke_______true__1_(arg0, arg1) {
    wasm.wasm_bindgen_9199ecc63999252___convert__closures_____invoke_______true__1_(arg0, arg1);
}

function wasm_bindgen_9199ecc63999252___convert__closures_____invoke___web_sys_97a79a69a39dd424___features__gen_CloseEvent__CloseEvent______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_9199ecc63999252___convert__closures_____invoke___web_sys_97a79a69a39dd424___features__gen_CloseEvent__CloseEvent______true_(arg0, arg1, arg2);
}

function wasm_bindgen_9199ecc63999252___convert__closures_____invoke___web_sys_97a79a69a39dd424___features__gen_MessageEvent__MessageEvent______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_9199ecc63999252___convert__closures_____invoke___web_sys_97a79a69a39dd424___features__gen_MessageEvent__MessageEvent______true_(arg0, arg1, arg2);
}

function wasm_bindgen_9199ecc63999252___convert__closures________invoke___web_sys_97a79a69a39dd424___features__gen_Event__Event______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_9199ecc63999252___convert__closures________invoke___web_sys_97a79a69a39dd424___features__gen_Event__Event______true_(arg0, arg1, arg2);
}

function wasm_bindgen_9199ecc63999252___convert__closures________invoke___web_sys_97a79a69a39dd424___features__gen_Event__Event______true__1_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_9199ecc63999252___convert__closures________invoke___web_sys_97a79a69a39dd424___features__gen_Event__Event______true__1_(arg0, arg1, arg2);
}

function wasm_bindgen_9199ecc63999252___convert__closures_____invoke___wasm_bindgen_9199ecc63999252___JsValue__core_7d5f0a2ba6a62c33___result__Result_____wasm_bindgen_9199ecc63999252___JsError___true_(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen_9199ecc63999252___convert__closures_____invoke___wasm_bindgen_9199ecc63999252___JsValue__core_7d5f0a2ba6a62c33___result__Result_____wasm_bindgen_9199ecc63999252___JsError___true_(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen_9199ecc63999252___convert__closures_____invoke___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined_______true_(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen_9199ecc63999252___convert__closures_____invoke___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined___js_sys_6fa99c98dcad40e1___Function_fn_wasm_bindgen_9199ecc63999252___JsValue_____wasm_bindgen_9199ecc63999252___sys__Undefined_______true_(arg0, arg1, arg2, arg3);
}


const __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];


const __wbindgen_enum_IdbTransactionMode = ["readonly", "readwrite", "versionchange", "readwriteflush", "cleanup"];
const BareDecapsulationKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_baredecapsulationkey_free(ptr, 1));
const BareEncapsulationKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_bareencapsulationkey_free(ptr, 1));
const BareHashCoordinateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barehashcoordinate_free(ptr, 1));
const BareHashDigestFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barehashdigest_free(ptr, 1));
const BareKemKeyPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barekemkeypair_free(ptr, 1));
const BareKeyPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barekeypair_free(ptr, 1));
const BareMemberIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barememberid_free(ptr, 1));
const BareNodeIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barenodeid_free(ptr, 1));
const BareOpaqueRecordKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_bareopaquerecordkey_free(ptr, 1));
const BarePublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barepublickey_free(ptr, 1));
const BareRecordKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barerecordkey_free(ptr, 1));
const BareRouteIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barerouteid_free(ptr, 1));
const BareSecretKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_baresecretkey_free(ptr, 1));
const BareSharedSecretFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_baresharedsecret_free(ptr, 1));
const BareSignatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_baresignature_free(ptr, 1));
const DecapsulationKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_decapsulationkey_free(ptr, 1));
const DecapsulationKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_decapsulationkeygroup_free(ptr, 1));
const EncapsulationKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_encapsulationkey_free(ptr, 1));
const EncapsulationKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_encapsulationkeygroup_free(ptr, 1));
const HashCoordinateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashcoordinate_free(ptr, 1));
const HashDigestFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashdigest_free(ptr, 1));
const HashDigestGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashdigestgroup_free(ptr, 1));
const HashDistanceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashdistance_free(ptr, 1));
const KemKeyPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_kemkeypair_free(ptr, 1));
const KemKeyPairGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_kemkeypairgroup_free(ptr, 1));
const KeyPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_keypair_free(ptr, 1));
const KeyPairGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_keypairgroup_free(ptr, 1));
const MemberIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_memberid_free(ptr, 1));
const MemberIdGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_memberidgroup_free(ptr, 1));
const NodeIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nodeid_free(ptr, 1));
const NodeIdGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nodeidgroup_free(ptr, 1));
const NonceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nonce_free(ptr, 1));
const OpaqueRecordKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_opaquerecordkey_free(ptr, 1));
const OpaqueRecordKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_opaquerecordkeygroup_free(ptr, 1));
const PublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickey_free(ptr, 1));
const PublicKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickeygroup_free(ptr, 1));
const RecordKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_recordkey_free(ptr, 1));
const RecordKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_recordkeygroup_free(ptr, 1));
const RouteIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_routeid_free(ptr, 1));
const RouteIdGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_routeidgroup_free(ptr, 1));
const SecretKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_secretkey_free(ptr, 1));
const SecretKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_secretkeygroup_free(ptr, 1));
const SharedSecretFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sharedsecret_free(ptr, 1));
const SharedSecretGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sharedsecretgroup_free(ptr, 1));
const SignatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signature_free(ptr, 1));
const SignatureGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signaturegroup_free(ptr, 1));
const veilidClientFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidclient_free(ptr, 1));
const veilidCryptoFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidcrypto_free(ptr, 1));
const VeilidDHTTransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veiliddhttransaction_free(ptr, 1));
const VeilidRoutingContextFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidroutingcontext_free(ptr, 1));
const VeilidTableDBFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidtabledb_free(ptr, 1));
const VeilidTableDBTransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidtabledbtransaction_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('veilid_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
export * from './veilid_errors.js';
