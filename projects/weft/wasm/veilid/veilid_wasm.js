/* @ts-self-types="./veilid_wasm.d.ts" */

export class BareDecapsulationKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baredecapsulationkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.baredecapsulationkey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.baredecapsulationkey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareDecapsulationKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareDecapsulationKey);
        const ret = wasm.baredecapsulationkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareDecapsulationKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.baredecapsulationkey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.baredecapsulationkey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareEncapsulationKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.bareencapsulationkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.bareencapsulationkey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.bareencapsulationkey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareEncapsulationKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareEncapsulationKey);
        const ret = wasm.bareencapsulationkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareEncapsulationKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.bareencapsulationkey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.bareencapsulationkey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareHashCoordinate {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barehashcoordinate___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barehashcoordinate_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barehashcoordinate_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareHashCoordinate} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareHashCoordinate);
        const ret = wasm.barehashcoordinate_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareHashCoordinateFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barehashcoordinate_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barehashcoordinate_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareHashDigest {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barehashdigest___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barehashdigest_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barehashdigest_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareHashDigest} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareHashDigest);
        const ret = wasm.barehashdigest_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareHashDigestFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barehashdigest_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barehashdigest_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareKeyPair {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barekeypair___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barekeypair_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {BarePublicKey}
     */
    get key() {
        const ret = wasm.barekeypair_key(this.__wbg_ptr);
        return BarePublicKey.__wrap(ret);
    }
    /**
     * @returns {BareSecretKey}
     */
    get secret() {
        const ret = wasm.barekeypair_secret(this.__wbg_ptr);
        return BareSecretKey.__wrap(ret);
    }
    /**
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

export class BareMemberId {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barememberid___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barememberid_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barememberid_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareMemberId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareMemberId);
        const ret = wasm.barememberid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareMemberIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barememberid_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barememberid_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareNodeId {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barenodeid___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barenodeid_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barenodeid_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareNodeId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareNodeId);
        const ret = wasm.barenodeid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareNodeIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barenodeid_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barenodeid_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareOpaqueRecordKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.bareopaquerecordkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.bareopaquerecordkey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.bareopaquerecordkey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareOpaqueRecordKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareOpaqueRecordKey);
        const ret = wasm.bareopaquerecordkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareOpaqueRecordKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.bareopaquerecordkey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.bareopaquerecordkey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BarePublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barepublickey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barepublickey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barepublickey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BarePublicKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BarePublicKey);
        const ret = wasm.barepublickey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BarePublicKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barepublickey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barepublickey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareRecordKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barerecordkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
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
     * @returns {number}
     */
    get encodedLen() {
        const ret = wasm.barerecordkey_encodedLen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {BareSharedSecret | undefined}
     */
    get encryptionKey() {
        const ret = wasm.barerecordkey_encryptionKey(this.__wbg_ptr);
        return ret === 0 ? undefined : BareSharedSecret.__wrap(ret);
    }
    /**
     * @returns {BareOpaqueRecordKey}
     */
    get key() {
        const ret = wasm.barerecordkey_key(this.__wbg_ptr);
        return BareOpaqueRecordKey.__wrap(ret);
    }
    /**
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

export class BareRouteId {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.barerouteid___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.barerouteid_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.barerouteid_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareRouteId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareRouteId);
        const ret = wasm.barerouteid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareRouteIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.barerouteid_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.barerouteid_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareSecretKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baresecretkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.baresecretkey_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.baresecretkey_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareSecretKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareSecretKey);
        const ret = wasm.baresecretkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareSecretKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.baresecretkey_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.baresecretkey_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareSharedSecret {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baresharedsecret___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.baresharedsecret_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.baresharedsecret_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareSharedSecret} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareSharedSecret);
        const ret = wasm.baresharedsecret_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareSharedSecretFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.baresharedsecret_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.baresharedsecret_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class BareSignature {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.baresignature___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.baresignature_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.baresignature_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {BareSignature} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, BareSignature);
        const ret = wasm.baresignature_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        BareSignatureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.baresignature_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.baresignature_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class DecapsulationKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.decapsulationkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {DecapsulationKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, DecapsulationKey);
        const ret = wasm.decapsulationkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareDecapsulationKey} value
     */
    constructor(kind, value) {
        _assertClass(value, BareDecapsulationKey);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.decapsulationkey_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        DecapsulationKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.decapsulationkey_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareDecapsulationKey}
     */
    get value() {
        const ret = wasm.decapsulationkey_value(this.__wbg_ptr);
        return BareDecapsulationKey.__wrap(ret);
    }
}
if (Symbol.dispose) DecapsulationKey.prototype[Symbol.dispose] = DecapsulationKey.prototype.free;

export class DecapsulationKeyGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.decapsulationkeygroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {DecapsulationKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, DecapsulationKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.decapsulationkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {DecapsulationKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.decapsulationkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.decapsulationkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {DecapsulationKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, DecapsulationKey);
        const ret = wasm.decapsulationkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.decapsulationkeygroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {DecapsulationKey | undefined}
     */
    get(kind) {
        const ret = wasm.decapsulationkeygroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : DecapsulationKey.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {DecapsulationKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, DecapsulationKeyGroup);
        const ret = wasm.decapsulationkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        DecapsulationKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareDecapsulationKey[]}
     */
    keys() {
        const ret = wasm.decapsulationkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.decapsulationkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {DecapsulationKey | undefined}
     */
    remove(kind) {
        const ret = wasm.decapsulationkeygroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : DecapsulationKey.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.decapsulationkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {DecapsulationKey[]}
     */
    toArray() {
        const ret = wasm.decapsulationkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class EncapsulationKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.encapsulationkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {EncapsulationKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, EncapsulationKey);
        const ret = wasm.encapsulationkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareEncapsulationKey} value
     */
    constructor(kind, value) {
        _assertClass(value, BareEncapsulationKey);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.encapsulationkey_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        EncapsulationKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.encapsulationkey_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareEncapsulationKey}
     */
    get value() {
        const ret = wasm.encapsulationkey_value(this.__wbg_ptr);
        return BareEncapsulationKey.__wrap(ret);
    }
}
if (Symbol.dispose) EncapsulationKey.prototype[Symbol.dispose] = EncapsulationKey.prototype.free;

export class EncapsulationKeyGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.encapsulationkeygroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {EncapsulationKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, EncapsulationKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.encapsulationkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {EncapsulationKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.encapsulationkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.encapsulationkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {EncapsulationKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, EncapsulationKey);
        const ret = wasm.encapsulationkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.encapsulationkeygroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {EncapsulationKey | undefined}
     */
    get(kind) {
        const ret = wasm.encapsulationkeygroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : EncapsulationKey.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {EncapsulationKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, EncapsulationKeyGroup);
        const ret = wasm.encapsulationkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        EncapsulationKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareEncapsulationKey[]}
     */
    keys() {
        const ret = wasm.encapsulationkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.encapsulationkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {EncapsulationKey | undefined}
     */
    remove(kind) {
        const ret = wasm.encapsulationkeygroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : EncapsulationKey.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.encapsulationkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {EncapsulationKey[]}
     */
    toArray() {
        const ret = wasm.encapsulationkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class HashCoordinate {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashcoordinate___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {HashCoordinate} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, HashCoordinate);
        const ret = wasm.hashcoordinate_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareHashCoordinate} value
     */
    constructor(kind, value) {
        _assertClass(value, BareHashCoordinate);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.hashcoordinate_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        HashCoordinateFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.hashcoordinate_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareHashCoordinate}
     */
    get value() {
        const ret = wasm.hashcoordinate_value(this.__wbg_ptr);
        return BareHashCoordinate.__wrap(ret);
    }
}
if (Symbol.dispose) HashCoordinate.prototype[Symbol.dispose] = HashCoordinate.prototype.free;

export class HashDigest {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashdigest___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {HashDigest} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, HashDigest);
        const ret = wasm.hashdigest_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareHashDigest} value
     */
    constructor(kind, value) {
        _assertClass(value, BareHashDigest);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.hashdigest_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        HashDigestFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.hashdigest_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareHashDigest}
     */
    get value() {
        const ret = wasm.hashdigest_value(this.__wbg_ptr);
        return BareHashDigest.__wrap(ret);
    }
}
if (Symbol.dispose) HashDigest.prototype[Symbol.dispose] = HashDigest.prototype.free;

export class HashDigestGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashdigestgroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {HashDigest} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, HashDigest);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.hashdigestgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {HashDigest[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.hashdigestgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.hashdigestgroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {HashDigest} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, HashDigest);
        const ret = wasm.hashdigestgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.hashdigestgroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {HashDigest | undefined}
     */
    get(kind) {
        const ret = wasm.hashdigestgroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : HashDigest.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {HashDigestGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, HashDigestGroup);
        const ret = wasm.hashdigestgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        HashDigestGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareHashDigest[]}
     */
    keys() {
        const ret = wasm.hashdigestgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.hashdigestgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {HashDigest | undefined}
     */
    remove(kind) {
        const ret = wasm.hashdigestgroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : HashDigest.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.hashdigestgroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {HashDigest[]}
     */
    toArray() {
        const ret = wasm.hashdigestgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class HashDistance {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashdistance___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.hashdistance_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.hashdistance_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {HashDistance} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, HashDistance);
        const ret = wasm.hashdistance_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        HashDistanceFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.hashdistance_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.hashdistance_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class KeyPair {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.keypair___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {BareSecretKey}
     */
    get bareSecret() {
        const ret = wasm.keypair_bareSecret(this.__wbg_ptr);
        return BareSecretKey.__wrap(ret);
    }
    /**
     * @param {KeyPair} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, KeyPair);
        const ret = wasm.keypair_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareKeyPair} value
     */
    constructor(kind, value) {
        _assertClass(value, BareKeyPair);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.keypair_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        KeyPairFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {PublicKey}
     */
    get key() {
        const ret = wasm.keypair_key(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.keypair_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {SecretKey}
     */
    get secret() {
        const ret = wasm.keypair_secret(this.__wbg_ptr);
        return SecretKey.__wrap(ret);
    }
    /**
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
     * @returns {BareKeyPair}
     */
    get value() {
        const ret = wasm.keypair_value(this.__wbg_ptr);
        return BareKeyPair.__wrap(ret);
    }
}
if (Symbol.dispose) KeyPair.prototype[Symbol.dispose] = KeyPair.prototype.free;

export class KeyPairGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.keypairgroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {KeyPair} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, KeyPair);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.keypairgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {KeyPair[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.keypairgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.keypairgroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {KeyPair} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, KeyPair);
        const ret = wasm.keypairgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.keypairgroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {KeyPair | undefined}
     */
    get(kind) {
        const ret = wasm.keypairgroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : KeyPair.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.keypairgroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {KeyPairGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, KeyPairGroup);
        const ret = wasm.keypairgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        KeyPairGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareKeyPair[]}
     */
    keys() {
        const ret = wasm.keypairgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.keypairgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.keypairgroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {KeyPair | undefined}
     */
    remove(kind) {
        const ret = wasm.keypairgroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : KeyPair.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.keypairgroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {KeyPair[]}
     */
    toArray() {
        const ret = wasm.keypairgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class MemberId {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.memberid___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {MemberId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, MemberId);
        const ret = wasm.memberid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareMemberId} value
     */
    constructor(kind, value) {
        _assertClass(value, BareMemberId);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.memberid_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        MemberIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.memberid_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareMemberId}
     */
    get value() {
        const ret = wasm.memberid_value(this.__wbg_ptr);
        return BareMemberId.__wrap(ret);
    }
}
if (Symbol.dispose) MemberId.prototype[Symbol.dispose] = MemberId.prototype.free;

export class MemberIdGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.memberidgroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {MemberId} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, MemberId);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.memberidgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {MemberId[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.memberidgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.memberidgroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {MemberId} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, MemberId);
        const ret = wasm.memberidgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.memberidgroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {MemberId | undefined}
     */
    get(kind) {
        const ret = wasm.memberidgroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : MemberId.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {MemberIdGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, MemberIdGroup);
        const ret = wasm.memberidgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        MemberIdGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareMemberId[]}
     */
    keys() {
        const ret = wasm.memberidgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.memberidgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {MemberId | undefined}
     */
    remove(kind) {
        const ret = wasm.memberidgroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : MemberId.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.memberidgroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {MemberId[]}
     */
    toArray() {
        const ret = wasm.memberidgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class NodeId {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nodeid___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {NodeId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, NodeId);
        const ret = wasm.nodeid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareNodeId} value
     */
    constructor(kind, value) {
        _assertClass(value, BareNodeId);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.nodeid_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        NodeIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.nodeid_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareNodeId}
     */
    get value() {
        const ret = wasm.nodeid_value(this.__wbg_ptr);
        return BareNodeId.__wrap(ret);
    }
}
if (Symbol.dispose) NodeId.prototype[Symbol.dispose] = NodeId.prototype.free;

export class NodeIdGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nodeidgroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {NodeId} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, NodeId);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.nodeidgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {NodeId[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.nodeidgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.nodeidgroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {NodeId} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, NodeId);
        const ret = wasm.nodeidgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.nodeidgroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {NodeId | undefined}
     */
    get(kind) {
        const ret = wasm.nodeidgroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : NodeId.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {NodeIdGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, NodeIdGroup);
        const ret = wasm.nodeidgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        NodeIdGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareNodeId[]}
     */
    keys() {
        const ret = wasm.nodeidgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.nodeidgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {NodeId | undefined}
     */
    remove(kind) {
        const ret = wasm.nodeidgroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : NodeId.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.nodeidgroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {NodeId[]}
     */
    toArray() {
        const ret = wasm.nodeidgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class Nonce {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nonce___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} index
     * @returns {boolean}
     */
    bit(index) {
        const ret = wasm.nonce_bit(this.__wbg_ptr, index);
        return ret !== 0;
    }
    /**
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
     * @returns {number}
     */
    get encodedLength() {
        const ret = wasm.nonce_encodedLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number | undefined}
     */
    get firstNonZeroBit() {
        const ret = wasm.baredecapsulationkey_firstNonZeroBit(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.baredecapsulationkey_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Nonce} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, Nonce);
        const ret = wasm.nonce_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.baredecapsulationkey_js_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        NonceFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.baredecapsulationkey_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @returns {number}
     */
    nibble(index) {
        const ret = wasm.nonce_nibble(this.__wbg_ptr, index);
        return ret;
    }
    /**
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
     * @returns {Uint8Array}
     */
    toArray() {
        const ret = wasm.nonce_toArray(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
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

export class OpaqueRecordKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.opaquerecordkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {OpaqueRecordKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, OpaqueRecordKey);
        const ret = wasm.opaquerecordkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareOpaqueRecordKey} value
     */
    constructor(kind, value) {
        _assertClass(value, BareOpaqueRecordKey);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.opaquerecordkey_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        OpaqueRecordKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.opaquerecordkey_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareOpaqueRecordKey}
     */
    get value() {
        const ret = wasm.opaquerecordkey_value(this.__wbg_ptr);
        return BareOpaqueRecordKey.__wrap(ret);
    }
}
if (Symbol.dispose) OpaqueRecordKey.prototype[Symbol.dispose] = OpaqueRecordKey.prototype.free;

export class OpaqueRecordKeyGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.opaquerecordkeygroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {OpaqueRecordKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, OpaqueRecordKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.opaquerecordkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {OpaqueRecordKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.opaquerecordkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.opaquerecordkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {OpaqueRecordKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, OpaqueRecordKey);
        const ret = wasm.opaquerecordkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.opaquerecordkeygroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {OpaqueRecordKey | undefined}
     */
    get(kind) {
        const ret = wasm.opaquerecordkeygroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : OpaqueRecordKey.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {OpaqueRecordKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, OpaqueRecordKeyGroup);
        const ret = wasm.opaquerecordkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        OpaqueRecordKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareOpaqueRecordKey[]}
     */
    keys() {
        const ret = wasm.opaquerecordkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.opaquerecordkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {OpaqueRecordKey | undefined}
     */
    remove(kind) {
        const ret = wasm.opaquerecordkeygroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : OpaqueRecordKey.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.opaquerecordkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {OpaqueRecordKey[]}
     */
    toArray() {
        const ret = wasm.opaquerecordkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class PublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.publickey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {PublicKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, PublicKey);
        const ret = wasm.publickey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BarePublicKey} value
     */
    constructor(kind, value) {
        _assertClass(value, BarePublicKey);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.publickey_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        PublicKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.publickey_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BarePublicKey}
     */
    get value() {
        const ret = wasm.publickey_value(this.__wbg_ptr);
        return BarePublicKey.__wrap(ret);
    }
}
if (Symbol.dispose) PublicKey.prototype[Symbol.dispose] = PublicKey.prototype.free;

export class PublicKeyGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.publickeygroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {PublicKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, PublicKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.publickeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PublicKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.publickeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.publickeygroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {PublicKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, PublicKey);
        const ret = wasm.publickeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.publickeygroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {PublicKey | undefined}
     */
    get(kind) {
        const ret = wasm.publickeygroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : PublicKey.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {PublicKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, PublicKeyGroup);
        const ret = wasm.publickeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        PublicKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BarePublicKey[]}
     */
    keys() {
        const ret = wasm.publickeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.publickeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {PublicKey | undefined}
     */
    remove(kind) {
        const ret = wasm.publickeygroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : PublicKey.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.publickeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {PublicKey[]}
     */
    toArray() {
        const ret = wasm.publickeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class RecordKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.recordkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {SharedSecret | undefined}
     */
    get encryptionKey() {
        const ret = wasm.recordkey_encryptionKey(this.__wbg_ptr);
        return ret === 0 ? undefined : SharedSecret.__wrap(ret);
    }
    /**
     * @param {RecordKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, RecordKey);
        const ret = wasm.recordkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareRecordKey} value
     */
    constructor(kind, value) {
        _assertClass(value, BareRecordKey);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.recordkey_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        RecordKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.recordkey_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareRecordKey}
     */
    get value() {
        const ret = wasm.recordkey_value(this.__wbg_ptr);
        return BareRecordKey.__wrap(ret);
    }
}
if (Symbol.dispose) RecordKey.prototype[Symbol.dispose] = RecordKey.prototype.free;

export class RecordKeyGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.recordkeygroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {RecordKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, RecordKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.recordkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {RecordKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.recordkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.recordkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {RecordKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, RecordKey);
        const ret = wasm.recordkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.recordkeygroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {RecordKey | undefined}
     */
    get(kind) {
        const ret = wasm.recordkeygroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : RecordKey.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.keypairgroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {RecordKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, RecordKeyGroup);
        const ret = wasm.recordkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        RecordKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareRecordKey[]}
     */
    keys() {
        const ret = wasm.recordkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.recordkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.keypairgroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {RecordKey | undefined}
     */
    remove(kind) {
        const ret = wasm.recordkeygroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : RecordKey.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.recordkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {RecordKey[]}
     */
    toArray() {
        const ret = wasm.recordkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class RouteId {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.routeid___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {RouteId} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, RouteId);
        const ret = wasm.routeid_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareRouteId} value
     */
    constructor(kind, value) {
        _assertClass(value, BareRouteId);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.routeid_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        RouteIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.routeid_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareRouteId}
     */
    get value() {
        const ret = wasm.routeid_value(this.__wbg_ptr);
        return BareRouteId.__wrap(ret);
    }
}
if (Symbol.dispose) RouteId.prototype[Symbol.dispose] = RouteId.prototype.free;

export class RouteIdGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.routeidgroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {RouteId} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, RouteId);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.routeidgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {RouteId[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.routeidgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.routeidgroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {RouteId} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, RouteId);
        const ret = wasm.routeidgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.routeidgroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {RouteId | undefined}
     */
    get(kind) {
        const ret = wasm.routeidgroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : RouteId.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {RouteIdGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, RouteIdGroup);
        const ret = wasm.routeidgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        RouteIdGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareRouteId[]}
     */
    keys() {
        const ret = wasm.routeidgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.routeidgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {RouteId | undefined}
     */
    remove(kind) {
        const ret = wasm.routeidgroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : RouteId.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.routeidgroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {RouteId[]}
     */
    toArray() {
        const ret = wasm.routeidgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class SecretKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.secretkey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {SecretKey} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SecretKey);
        const ret = wasm.secretkey_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareSecretKey} value
     */
    constructor(kind, value) {
        _assertClass(value, BareSecretKey);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.secretkey_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        SecretKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.secretkey_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareSecretKey}
     */
    get value() {
        const ret = wasm.secretkey_value(this.__wbg_ptr);
        return BareSecretKey.__wrap(ret);
    }
}
if (Symbol.dispose) SecretKey.prototype[Symbol.dispose] = SecretKey.prototype.free;

export class SecretKeyGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.secretkeygroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {SecretKey} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, SecretKey);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.secretkeygroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {SecretKey[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.secretkeygroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.secretkeygroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {SecretKey} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, SecretKey);
        const ret = wasm.secretkeygroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.secretkeygroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {SecretKey | undefined}
     */
    get(kind) {
        const ret = wasm.secretkeygroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : SecretKey.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {SecretKeyGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SecretKeyGroup);
        const ret = wasm.secretkeygroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        SecretKeyGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareSecretKey[]}
     */
    keys() {
        const ret = wasm.secretkeygroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.secretkeygroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {SecretKey | undefined}
     */
    remove(kind) {
        const ret = wasm.secretkeygroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : SecretKey.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.secretkeygroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {SecretKey[]}
     */
    toArray() {
        const ret = wasm.secretkeygroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class SharedSecret {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.sharedsecret___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {SharedSecret} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SharedSecret);
        const ret = wasm.sharedsecret_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareSharedSecret} value
     */
    constructor(kind, value) {
        _assertClass(value, BareSharedSecret);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.sharedsecret_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        SharedSecretFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.sharedsecret_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareSharedSecret}
     */
    get value() {
        const ret = wasm.sharedsecret_value(this.__wbg_ptr);
        return BareSharedSecret.__wrap(ret);
    }
}
if (Symbol.dispose) SharedSecret.prototype[Symbol.dispose] = SharedSecret.prototype.free;

export class SharedSecretGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.sharedsecretgroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {SharedSecret} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, SharedSecret);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.sharedsecretgroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {SharedSecret[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sharedsecretgroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.sharedsecretgroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {SharedSecret} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, SharedSecret);
        const ret = wasm.sharedsecretgroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.sharedsecretgroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {SharedSecret | undefined}
     */
    get(kind) {
        const ret = wasm.sharedsecretgroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : SharedSecret.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {SharedSecretGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SharedSecretGroup);
        const ret = wasm.sharedsecretgroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        SharedSecretGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareSharedSecret[]}
     */
    keys() {
        const ret = wasm.sharedsecretgroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.sharedsecretgroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {SharedSecret | undefined}
     */
    remove(kind) {
        const ret = wasm.sharedsecretgroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : SharedSecret.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sharedsecretgroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {SharedSecret[]}
     */
    toArray() {
        const ret = wasm.sharedsecretgroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class Signature {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.signature___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {Signature} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, Signature);
        const ret = wasm.signature_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {CryptoKindInner} kind
     * @param {BareSignature} value
     */
    constructor(kind, value) {
        _assertClass(value, BareSignature);
        var ptr0 = value.__destroy_into_raw();
        const ret = wasm.signature_js_new(kind, ptr0);
        this.__wbg_ptr = ret >>> 0;
        SignatureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.signature_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
     * @returns {BareSignature}
     */
    get value() {
        const ret = wasm.signature_value(this.__wbg_ptr);
        return BareSignature.__wrap(ret);
    }
}
if (Symbol.dispose) Signature.prototype[Symbol.dispose] = Signature.prototype.free;

export class SignatureGroup {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.signaturegroup___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {Signature} typed_key
     */
    add(typed_key) {
        _assertClass(typed_key, Signature);
        var ptr0 = typed_key.__destroy_into_raw();
        wasm.signaturegroup_add(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Signature[]} typed_keys
     */
    addAll(typed_keys) {
        const ptr0 = passArrayJsValueToWasm0(typed_keys, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.signaturegroup_addAll(this.__wbg_ptr, ptr0, len0);
    }
    clear() {
        wasm.signaturegroup_clear(this.__wbg_ptr);
    }
    /**
     * @param {Signature} typed_key
     * @returns {boolean}
     */
    contains(typed_key) {
        _assertClass(typed_key, Signature);
        const ret = wasm.signaturegroup_contains(this.__wbg_ptr, typed_key.__wbg_ptr);
        return ret !== 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {boolean}
     */
    contains_kind(kind) {
        const ret = wasm.signaturegroup_contains_kind(this.__wbg_ptr, kind);
        return ret !== 0;
    }
    /**
     * @param {CryptoKind} kind
     * @returns {Signature | undefined}
     */
    get(kind) {
        const ret = wasm.signaturegroup_get(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : Signature.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.decapsulationkeygroup_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {SignatureGroup} other
     * @returns {boolean}
     */
    isEqual(other) {
        _assertClass(other, SignatureGroup);
        const ret = wasm.signaturegroup_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    constructor() {
        const ret = wasm.decapsulationkeygroup_js_new();
        this.__wbg_ptr = ret >>> 0;
        SignatureGroupFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {BareSignature[]}
     */
    keys() {
        const ret = wasm.signaturegroup_keys(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {CryptoKind[]}
     */
    get kinds() {
        const ret = wasm.signaturegroup_kinds(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.decapsulationkeygroup_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
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
     * @param {CryptoKind} kind
     * @returns {Signature | undefined}
     */
    remove(kind) {
        const ret = wasm.signaturegroup_remove(this.__wbg_ptr, kind);
        return ret === 0 ? undefined : Signature.__wrap(ret);
    }
    /**
     * @param {CryptoKind[]} kinds
     */
    removeAll(kinds) {
        const ptr0 = passArrayJsValueToWasm0(kinds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.signaturegroup_removeAll(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {Signature[]}
     */
    toArray() {
        const ret = wasm.signaturegroup_toArray(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
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

export class VeilidDHTTransaction {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {Promise<void>}
     */
    commit() {
        const ret = wasm.veiliddhttransaction_commit(this.__wbg_ptr);
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

export class VeilidRoutingContext {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @param {RecordKey} recordKey
     * @returns {Promise<void>}
     */
    deleteDHTRecord(recordKey) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_deleteDHTRecord(this.__wbg_ptr, recordKey.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the latest value of a subkey.
     *
     * May pull the latest value from the network, but by settings 'force_refresh' you can force a network data refresh.
     *
     * Returns `undefined` if the value subkey has not yet been set.
     * Returns a Uint8Array of `data` if the value subkey has valid data.
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
     * Create a new VeilidRoutingContext, without any privacy or sequencing settings.
     */
    constructor() {
        const ret = wasm.veilidroutingcontext_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        VeilidRoutingContextFinalization.register(this, this.__wbg_ptr, this);
        return this;
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
     * @param {RecordKey} recordKey
     * @param {KeyPair | null} [defaultWriter]
     * @returns {Promise<DHTRecordDescriptor>}
     */
    openDHTRecord(recordKey, defaultWriter) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_openDHTRecord(this.__wbg_ptr, recordKey.__wbg_ptr, isLikeNone(defaultWriter) ? 0 : addToExternrefTable0(defaultWriter));
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
     * Returns a Uint8Array of `data` if the value put was older than the one available on the network.
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
     * Add or update a watch to a DHT value that informs the user via an VeilidUpdate::ValueChange callback when the record has subkeys change.
     * One remote node will be selected to perform the watch and it will offer an expiration time based on a suggestion, and make an attempt to
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
     * @param {RecordKey} recordKey
     * @param {ValueSubkeyRangeSet | null} [subkeys]
     * @param {Timestamp | null} [expiration]
     * @param {number | null} [count]
     * @returns {Promise<boolean>}
     */
    watchDhtValues(recordKey, subkeys, expiration, count) {
        _assertClass(recordKey, RecordKey);
        const ret = wasm.veilidroutingcontext_watchDhtValues(this.__wbg_ptr, recordKey.__wbg_ptr, isLikeNone(subkeys) ? 0 : addToExternrefTable0(subkeys), isLikeNone(expiration) ? 0 : addToExternrefTable0(expiration), isLikeNone(count) ? 0x100000001 : (count) >>> 0);
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
     * @returns {Promise<VeilidTableDBTransaction>}
     */
    createTransaction() {
        const ret = wasm.veilidtabledb_createTransaction(this.__wbg_ptr);
        return ret;
    }
    /**
     * Delete key with from a column in the TableDB.
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
     * @param {number} columnId
     * @returns {Promise<Uint8Array[]>}
     */
    getKeys(columnId) {
        const ret = wasm.veilidtabledb_getKeys(this.__wbg_ptr, columnId);
        return ret;
    }
    /**
     * Read a key from a column in the TableDB immediately.
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
        this.__wbg_ptr = ret >>> 0;
        VeilidTableDBFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Get or create the TableDB database table.
     * This is called automatically when performing actions on the TableDB.
     * @returns {Promise<void>}
     */
    openTable() {
        const ret = wasm.veilidtabledb_openTable(this.__wbg_ptr);
        return ret;
    }
    /**
     * Store a key with a value in a column in the TableDB.
     * Performs a single transaction immediately.
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

export class VeilidTableDBTransaction {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {Promise<void>}
     */
    commit() {
        const ret = wasm.veilidtabledbtransaction_commit(this.__wbg_ptr);
        return ret;
    }
    /**
     * Delete key with from a column in the TableDB
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
     * @returns {Promise<void>}
     */
    rollback() {
        const ret = wasm.veilidtabledbtransaction_rollback(this.__wbg_ptr);
        return ret;
    }
    /**
     * Store a key with a value in a column in the TableDB.
     * Does not modify TableDB until `.commit()` is called.
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
     * The APPM capability
     * @returns {VeilidCapability}
     */
    static get VEILID_CAPABILITY_APPMESSAGE() {
        const ret = wasm.veilidclient_VEILID_CAPABILITY_APPMESSAGE();
        return ret;
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
     * @returns {Promise<void>}
     */
    static attach() {
        const ret = wasm.veilidclient_attach();
        return ret;
    }
    /**
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
        return ret;
    }
    /**
     * Disconnect from the network.
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
     * Allocate a new private route and specify a specific cryptosystem, stability and sequencing preference.
     * Returns a route id and a publishable 'blob' with the route encrypted with each crypto kind.
     * Those nodes importing the blob will have their choice of which crypto kind to use.
     *
     * Returns a route id and 'blob' that can be published over some means (DHT or otherwise) to be imported by another Veilid node.
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
     * Release either a locally allocated or remotely imported private route.
     *
     * This will deactivate the route and free its resources and it can no longer be sent to or received from.
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
     * Shut down Veilid and terminate the API.
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
        return ret;
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
}
if (Symbol.dispose) veilidClient.prototype[Symbol.dispose] = veilidClient.prototype.free;

export class veilidCrypto {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
     * @returns {CryptoKind}
     */
    get kind() {
        const ret = wasm.veilidcrypto_kind(this.__wbg_ptr);
        return ret;
    }
    /**
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
        __wbg_Error_8c4e43fe74559d73: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_Number_04624de7d0e8332d: function(arg0) {
            const ret = Number(arg0);
            return ret;
        },
        __wbg_String_8f0eb39a4a4c2f66: function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_bigint_get_as_i64_8fcf4ce7f1ca72a2: function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_boolean_get_bbbb1c18aa2f5e25: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_0bc8482c6e3508ae: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_47fa6863be6f2f25: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_bigint_31b12575b56f32fc: function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_function_0095a73b8b156f76: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_ac34f5003991759a: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_object_5ae8e5880f2c1fbd: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_cd444516edc5b180: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_9e4d92534c42d778: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_11888390b0186270: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_9dd77d8cd6671811: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_number_get_8ff4255516ccad3e: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_72fb696202c56729: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_be289d5034ed271b: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_d9b87ff7982e3b21: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_apply_2e22c45cb4f12415: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.apply(arg0, arg1, arg2);
            return ret;
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
        __wbg_bound_cd56e28886f21887: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = IDBKeyRange.bound(arg0, arg1, arg2 !== 0, arg3 !== 0);
            return ret;
        }, arguments); },
        __wbg_call_389efe28435a9388: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_4708e0c13bdc8e95: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_clearTimeout_96804de0ab838f26: function(arg0) {
            const ret = clearTimeout(arg0);
            return ret;
        },
        __wbg_close_1d08eaf57ed325c0: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_close_53683f4809368fc7: function(arg0) {
            arg0.close();
        },
        __wbg_code_35e4ec59fbc7d427: function(arg0) {
            const ret = arg0.code;
            return ret;
        },
        __wbg_code_a552f1e91eda69b7: function(arg0) {
            const ret = arg0.code;
            return ret;
        },
        __wbg_continue_209e676996911d82: function() { return handleError(function (arg0) {
            arg0.continue();
        }, arguments); },
        __wbg_count_396412b088981cb4: function() { return handleError(function (arg0) {
            const ret = arg0.count();
            return ret;
        }, arguments); },
        __wbg_count_f6accb62f4bdcc6d: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.count(arg1);
            return ret;
        }, arguments); },
        __wbg_createObjectStore_545ee23ffd61e3fc: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createObjectStore(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_crypto_86f2631e91b51511: function(arg0) {
            const ret = arg0.crypto;
            return ret;
        },
        __wbg_data_5330da50312d0bc1: function(arg0) {
            const ret = arg0.data;
            return ret;
        },
        __wbg_debug_6bf53680ed0e1e88: function(arg0, arg1) {
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
        __wbg_debug_a1bd65e4aa156623: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
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
        __wbg_decapsulationkey_new: function(arg0) {
            const ret = DecapsulationKey.__wrap(arg0);
            return ret;
        },
        __wbg_decapsulationkey_unwrap: function(arg0) {
            const ret = DecapsulationKey.__unwrap(arg0);
            return ret;
        },
        __wbg_deleteDatabase_e78e3b00bcb12eec: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.deleteDatabase(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_delete_3f0023dbe540ae60: function() { return handleError(function (arg0, arg1, arg2) {
            delete arg0[getStringFromWasm0(arg1, arg2)];
        }, arguments); },
        __wbg_delete_d6d7f750bd9ed2cd: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.delete(arg1);
            return ret;
        }, arguments); },
        __wbg_done_57b39ecd9addfe81: function(arg0) {
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
        __wbg_entries_58c7934c745daac7: function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        },
        __wbg_error_1042f31bf0fa53ac: function(arg0, arg1) {
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
        __wbg_error_7534b8e9a36f1ab4: function(arg0, arg1) {
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
        __wbg_error_cf3f258a7914f276: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
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
        __wbg_eval_3f0b9f0cbaf45a34: function() { return handleError(function (arg0, arg1) {
            const ret = eval(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_from_bddd64e7d5ff6941: function(arg0) {
            const ret = Array.from(arg0);
            return ret;
        },
        __wbg_getItem_0c792d344808dcf5: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getItem(getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getRandomValues_b3f15fcbfabb0f8b: function() { return handleError(function (arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments); },
        __wbg_getUTCDate_aad14cab5ce3b408: function(arg0) {
            const ret = arg0.getUTCDate();
            return ret;
        },
        __wbg_getUTCFullYear_e2ef808de49a659f: function(arg0) {
            const ret = arg0.getUTCFullYear();
            return ret;
        },
        __wbg_getUTCHours_35ca437eb5eea37f: function(arg0) {
            const ret = arg0.getUTCHours();
            return ret;
        },
        __wbg_getUTCMilliseconds_58ec095535e9de9d: function(arg0) {
            const ret = arg0.getUTCMilliseconds();
            return ret;
        },
        __wbg_getUTCMinutes_f7f7e50da0efa786: function(arg0) {
            const ret = arg0.getUTCMinutes();
            return ret;
        },
        __wbg_getUTCMonth_1225344f80ac9874: function(arg0) {
            const ret = arg0.getUTCMonth();
            return ret;
        },
        __wbg_getUTCSeconds_0974d30103b4f4d9: function(arg0) {
            const ret = arg0.getUTCSeconds();
            return ret;
        },
        __wbg_get_9b94d73e6221f75c: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_b3ed3ad4be2bc8ac: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_with_ref_key_1dc361bd10053bfe: function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        },
        __wbg_has_d4e53238966c12b6: function() { return handleError(function (arg0, arg1) {
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
        __wbg_indexedDB_782f0610ea9fb144: function() { return handleError(function (arg0) {
            const ret = arg0.indexedDB;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_instanceof_ArrayBuffer_c367199e2fa2aa04: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Blob_ce92a9ddd729a84a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Blob;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IdbCursorWithValue_44f92eb9c04854e3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IDBCursorWithValue;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IdbDatabase_8d723b3ff4761c2d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IDBDatabase;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IdbRequest_6388508cc77f8da0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IDBRequest;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_9b9075935c74707c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_ed49b2db8df90359: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window ||
                    (typeof DedicatedWorkerGlobalScope !== 'undefined' && arg0 instanceof DedicatedWorkerGlobalScope);
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isArray_d314bb98fcf08331: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isSafeInteger_bfbc7332a9768d2a: function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        },
        __wbg_iterator_6ff6560ca1568e55: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_key_c27cb3b734638d81: function() { return handleError(function (arg0) {
            const ret = arg0.key;
            return ret;
        }, arguments); },
        __wbg_keypair_new: function(arg0) {
            const ret = KeyPair.__wrap(arg0);
            return ret;
        },
        __wbg_keypair_unwrap: function(arg0) {
            const ret = KeyPair.__unwrap(arg0);
            return ret;
        },
        __wbg_length_32ed9a279acd054c: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_35a7bace40f36eac: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_4c6eb4059a3635c9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_localStorage_a22d31b9eacc4594: function() { return handleError(function (arg0) {
            const ret = arg0.localStorage;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_log_035945865ecb8103: function(arg0, arg1) {
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
        __wbg_log_0d4cd784ed1ba806: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_log_c558e8c3e7b7aa38: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
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
        __wbg_lowerBound_f77cbe9a440379f6: function() { return handleError(function (arg0) {
            const ret = IDBKeyRange.lowerBound(arg0);
            return ret;
        }, arguments); },
        __wbg_mark_330cdf38dc5e0f0d: function(arg0, arg1) {
            performance.mark(getStringFromWasm0(arg0, arg1));
        },
        __wbg_measure_2c1f8f6152a873b1: function() { return handleError(function (arg0, arg1, arg2, arg3) {
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
        __wbg_message_0b2b0298a231b0d4: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_msCrypto_d562bbe83e0d4b91: function(arg0) {
            const ret = arg0.msCrypto;
            return ret;
        },
        __wbg_new_057993d5b5e07835: function() { return handleError(function (arg0, arg1) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_0_73afc35eb544e539: function() {
            const ret = new Date();
            return ret;
        },
        __wbg_new_361308b2356cecd0: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_3eb36ae241fe6f44: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_8a6f238a6ece86ea: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_b5d9e2fb389fef91: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen__convert__closures_____invoke__h32ef659e43285efa(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = state0.b = 0;
            }
        },
        __wbg_new_dd2b680c8bf6ae29: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_from_slice_a3d2629dc1826784: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_no_args_1c7c842f08d00ebb: function(arg0, arg1) {
            const ret = new Function(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_with_length_a2c39cbe88fd8ff1: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_str_sequence_b67b3919b8b11238: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_next_3482f54c49e8af19: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_next_418f80d8f5303233: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_node_e1f24f89a7336c2e: function(arg0) {
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
        __wbg_now_a3af9a2f4bbaa4d1: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_now_a872ee3d8141a832: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_objectStoreNames_d2c5d2377420ad78: function(arg0) {
            const ret = arg0.objectStoreNames;
            return ret;
        },
        __wbg_objectStore_d56e603390dcc165: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.objectStore(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_opaquerecordkey_new: function(arg0) {
            const ret = OpaqueRecordKey.__wrap(arg0);
            return ret;
        },
        __wbg_opaquerecordkey_unwrap: function(arg0) {
            const ret = OpaqueRecordKey.__unwrap(arg0);
            return ret;
        },
        __wbg_openCursor_0b21622d2de8f313: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.openCursor(arg1);
            return ret;
        }, arguments); },
        __wbg_openCursor_2df325852ae85998: function() { return handleError(function (arg0) {
            const ret = arg0.openCursor();
            return ret;
        }, arguments); },
        __wbg_open_1b21db8aeca0eea9: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_open_82db86fd5b087109: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
            return ret;
        }, arguments); },
        __wbg_process_3975fd6c72f520aa: function(arg0) {
            const ret = arg0.process;
            return ret;
        },
        __wbg_prototypesetcall_bdcdcc5842e4d77d: function(arg0, arg1, arg2) {
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
        __wbg_push_8ffdcb2063340ba5: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_put_b34701a38436f20a: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.put(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_queueMicrotask_0aa0a927f78f5d98: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_queueMicrotask_5bb536982f78a56f: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_randomFillSync_f8c153b79f285817: function() { return handleError(function (arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments); },
        __wbg_readyState_1bb73ec7b8a54656: function(arg0) {
            const ret = arg0.readyState;
            return ret;
        },
        __wbg_reason_35fce8e55dd90f31: function(arg0, arg1) {
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
        __wbg_require_b74f47fc2d022fd6: function() { return handleError(function () {
            const ret = module.require;
            return ret;
        }, arguments); },
        __wbg_resolve_002c4b7d9d8f6b64: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_result_233b2d68aae87a05: function() { return handleError(function (arg0) {
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
        __wbg_send_542f95dea2df7994: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getArrayU8FromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_send_bc0336a1b5ce4fb7: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.send(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_setItem_cf340bb2edbd3089: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setItem(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setTime_7ff687e524801ea2: function(arg0, arg1) {
            const ret = arg0.setTime(arg1);
            return ret;
        },
        __wbg_setTimeout_eefe7f4c234b0c6b: function() { return handleError(function (arg0, arg1) {
            const ret = setTimeout(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_set_3f1d0b984ed272ed: function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        },
        __wbg_set_binaryType_5bbf62e9f705dc1a: function(arg0, arg1) {
            arg0.binaryType = __wbindgen_enum_BinaryType[arg1];
        },
        __wbg_set_f43e577aea94465b: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_onclose_d382f3e2c2b850eb: function(arg0, arg1) {
            arg0.onclose = arg1;
        },
        __wbg_set_oncomplete_76d4a772a6c8cab6: function(arg0, arg1) {
            arg0.oncomplete = arg1;
        },
        __wbg_set_onerror_377f18bf4569bf85: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onerror_d0db7c6491b9399d: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onerror_dc0e606b09e1792f: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onmessage_2114aa5f4f53051e: function(arg0, arg1) {
            arg0.onmessage = arg1;
        },
        __wbg_set_onopen_b7b52d519d6c0f11: function(arg0, arg1) {
            arg0.onopen = arg1;
        },
        __wbg_set_onsuccess_0edec1acb4124784: function(arg0, arg1) {
            arg0.onsuccess = arg1;
        },
        __wbg_set_onupgradeneeded_c887b74722b6ce77: function(arg0, arg1) {
            arg0.onupgradeneeded = arg1;
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
        __wbg_stack_0ed75d68575b0f3c: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_12837167ad935116: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_e628e89ab3b1c95f: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_a621d3dfbb60d0ce: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_f8727f0cf888e0bd: function() {
            const ret = typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : null);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_subarray_a96e1fef17ed23cb: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_target_521be630ab05b11e: function(arg0) {
            const ret = arg0.target;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_then_b9e7b3b5f1a9e1b5: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_transaction_bf0a35e0542d8e7a: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.transaction(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_transaction_c407989db8e62119: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.transaction(arg1, __wbindgen_enum_IdbTransactionMode[arg2]);
            return ret;
        }, arguments); },
        __wbg_type_4edffca24c42b74d: function(arg0, arg1) {
            const ret = arg1.type;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_url_cb4d34db86c24df9: function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_value_0546255b415e96c1: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_value_30a10f975c5e9af8: function() { return handleError(function (arg0) {
            const ret = arg0.value;
            return ret;
        }, arguments); },
        __wbg_veiliddhttransaction_new: function(arg0) {
            const ret = VeilidDHTTransaction.__wrap(arg0);
            return ret;
        },
        __wbg_veilidtabledbtransaction_new: function(arg0) {
            const ret = VeilidTableDBTransaction.__wrap(arg0);
            return ret;
        },
        __wbg_version_66b40438281015ef: function(arg0) {
            const ret = arg0.version;
            return ret;
        },
        __wbg_versions_4e31226f5e8dc909: function(arg0) {
            const ret = arg0.versions;
            return ret;
        },
        __wbg_warn_01f84fd2e11c3585: function(arg0, arg1) {
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
        __wbg_warn_594644211cb013f8: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
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
        __wbg_wasClean_a9c77a7100d8534f: function(arg0) {
            const ret = arg0.wasClean;
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { dtor_idx: 3847, function: Function { arguments: [NamedExternref("CloseEvent")], shim_idx: 3848, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__h13550bef4cfadba2, wasm_bindgen__convert__closures_____invoke__hbbcda065958ec79c);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { dtor_idx: 4188, function: Function { arguments: [], shim_idx: 4189, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__h67e7f18ef1093be6, wasm_bindgen__convert__closures_____invoke__h3d123557dfe3810f);
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { dtor_idx: 4357, function: Function { arguments: [Ref(NamedExternref("Event"))], shim_idx: 4358, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__h1f1456949e7feebc, wasm_bindgen__convert__closures________invoke__hf8b04ab3e157a9c7);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { dtor_idx: 4357, function: Function { arguments: [], shim_idx: 4360, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__h1f1456949e7feebc, wasm_bindgen__convert__closures_____invoke__hbc720186ca49f6fc);
            return ret;
        },
        __wbindgen_cast_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { dtor_idx: 4425, function: Function { arguments: [NamedExternref("MessageEvent")], shim_idx: 4426, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__hef1819e17944f779, wasm_bindgen__convert__closures_____invoke__h612e37a05935440f);
            return ret;
        },
        __wbindgen_cast_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { dtor_idx: 4442, function: Function { arguments: [Externref], shim_idx: 4443, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__h18cb94768b1b0c14, wasm_bindgen__convert__closures_____invoke__hd570f2e2ea2c70e1);
            return ret;
        },
        __wbindgen_cast_0000000000000007: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000000a: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
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
    };
}

function wasm_bindgen__convert__closures_____invoke__h3d123557dfe3810f(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h3d123557dfe3810f(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__hbc720186ca49f6fc(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__hbc720186ca49f6fc(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__hbbcda065958ec79c(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__hbbcda065958ec79c(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures________invoke__hf8b04ab3e157a9c7(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures________invoke__hf8b04ab3e157a9c7(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h612e37a05935440f(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h612e37a05935440f(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__hd570f2e2ea2c70e1(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__hd570f2e2ea2c70e1(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h32ef659e43285efa(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures_____invoke__h32ef659e43285efa(arg0, arg1, arg2, arg3);
}


const __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];


const __wbindgen_enum_IdbTransactionMode = ["readonly", "readwrite", "versionchange", "readwriteflush", "cleanup"];
const BareDecapsulationKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_baredecapsulationkey_free(ptr >>> 0, 1));
const BareEncapsulationKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_bareencapsulationkey_free(ptr >>> 0, 1));
const BareHashCoordinateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barehashcoordinate_free(ptr >>> 0, 1));
const BareHashDigestFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barehashdigest_free(ptr >>> 0, 1));
const BareKeyPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barekeypair_free(ptr >>> 0, 1));
const BareMemberIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barememberid_free(ptr >>> 0, 1));
const BareNodeIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barenodeid_free(ptr >>> 0, 1));
const BareOpaqueRecordKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_bareopaquerecordkey_free(ptr >>> 0, 1));
const BarePublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barepublickey_free(ptr >>> 0, 1));
const BareRecordKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barerecordkey_free(ptr >>> 0, 1));
const BareRouteIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_barerouteid_free(ptr >>> 0, 1));
const BareSecretKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_baresecretkey_free(ptr >>> 0, 1));
const BareSharedSecretFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_baresharedsecret_free(ptr >>> 0, 1));
const BareSignatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_baresignature_free(ptr >>> 0, 1));
const DecapsulationKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_decapsulationkey_free(ptr >>> 0, 1));
const DecapsulationKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_decapsulationkeygroup_free(ptr >>> 0, 1));
const EncapsulationKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_encapsulationkey_free(ptr >>> 0, 1));
const EncapsulationKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_encapsulationkeygroup_free(ptr >>> 0, 1));
const HashCoordinateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashcoordinate_free(ptr >>> 0, 1));
const HashDigestFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashdigest_free(ptr >>> 0, 1));
const HashDigestGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashdigestgroup_free(ptr >>> 0, 1));
const HashDistanceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashdistance_free(ptr >>> 0, 1));
const KeyPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_keypair_free(ptr >>> 0, 1));
const KeyPairGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_keypairgroup_free(ptr >>> 0, 1));
const MemberIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_memberid_free(ptr >>> 0, 1));
const MemberIdGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_memberidgroup_free(ptr >>> 0, 1));
const NodeIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nodeid_free(ptr >>> 0, 1));
const NodeIdGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nodeidgroup_free(ptr >>> 0, 1));
const NonceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nonce_free(ptr >>> 0, 1));
const OpaqueRecordKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_opaquerecordkey_free(ptr >>> 0, 1));
const OpaqueRecordKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_opaquerecordkeygroup_free(ptr >>> 0, 1));
const PublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickey_free(ptr >>> 0, 1));
const PublicKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickeygroup_free(ptr >>> 0, 1));
const RecordKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_recordkey_free(ptr >>> 0, 1));
const RecordKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_recordkeygroup_free(ptr >>> 0, 1));
const RouteIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_routeid_free(ptr >>> 0, 1));
const RouteIdGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_routeidgroup_free(ptr >>> 0, 1));
const SecretKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_secretkey_free(ptr >>> 0, 1));
const SecretKeyGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_secretkeygroup_free(ptr >>> 0, 1));
const SharedSecretFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sharedsecret_free(ptr >>> 0, 1));
const SharedSecretGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sharedsecretgroup_free(ptr >>> 0, 1));
const SignatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signature_free(ptr >>> 0, 1));
const SignatureGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signaturegroup_free(ptr >>> 0, 1));
const VeilidDHTTransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veiliddhttransaction_free(ptr >>> 0, 1));
const VeilidRoutingContextFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidroutingcontext_free(ptr >>> 0, 1));
const VeilidTableDBFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidtabledb_free(ptr >>> 0, 1));
const VeilidTableDBTransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidtabledbtransaction_free(ptr >>> 0, 1));
const veilidClientFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidclient_free(ptr >>> 0, 1));
const veilidCryptoFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_veilidcrypto_free(ptr >>> 0, 1));

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
    : new FinalizationRegistry(state => state.dtor(state.a, state.b));

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
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
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

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
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
            state.dtor(state.a, state.b);
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

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
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
