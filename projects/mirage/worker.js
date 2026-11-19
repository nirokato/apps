// Mirage engine worker: owns the Cactus WebAssembly module and the weights, so
// a describe call never blocks the page. Messages in: {type:'load'} and
// {type:'describe', id, rgb, width, height}. Messages out: progress, ready,
// result, error.

importScripts('./vendor/cactus.js');

const ENGINE_WASM = './vendor/cactus.wasm';

// Weights come straight from Hugging Face, pinned to one commit and checked
// against its SHA-256 before they reach the engine. Bump all three together.
const MODEL = {
  url: 'https://huggingface.co/Cactus-Compute/mirage/resolve/3d03cee88c0acbe4e71b94b567ab14e6e55f40c9/mirage.cact',
  size: 21611043,
  sha256: '4249a0f7515272ff76b9414bec17d7e7daf84b15b66c7fb4f17fce1e66f9f237',
};
// The download answers `cache-control: no-store`, so the HTTP cache never keeps
// it. Cache Storage does. Stale entries from older pins are dropped on load.
const CACHE_PREFIX = 'mirage-weights-';
const CACHE_NAME = CACHE_PREFIX + MODEL.sha256.slice(0, 12);

const CACTUS_VISION = 4;         // cactus.h
const OUT_CAPACITY = 16 << 20;   // what Cactus's own Python binding allocates

let engine = null;   // Emscripten module once the weights are loaded
let loading = null;  // in-flight load, shared by concurrent requests
let outPtr = 0;

function progress(part, received, total, cached = false) {
  postMessage({ type: 'progress', part, received, total, cached });
}

async function fetchBytes(url, part, expectedSize) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${part}: HTTP ${res.status}`);
  const total = Number(res.headers.get('content-length')) || expectedSize || 0;
  if (!res.body) {
    const all = new Uint8Array(await res.arrayBuffer());
    progress(part, all.length, all.length);
    return all;
  }
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    progress(part, received, total);
  }
  const bytes = new Uint8Array(received);
  let at = 0;
  for (const c of chunks) { bytes.set(c, at); at += c.length; }
  progress(part, received, received);
  return bytes;
}

async function sha256Hex(bytes) {
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return Array.from(digest, (b) => b.toString(16).padStart(2, '0')).join('');
}

// Cache Storage is missing or throws in some private windows; the model then
// simply downloads each visit.
async function openCache() {
  try {
    for (const name of await caches.keys()) {
      if (name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME) await caches.delete(name);
    }
    return await caches.open(CACHE_NAME);
  } catch {
    return null;
  }
}

async function loadWeights() {
  const cache = await openCache();
  if (cache) {
    try {
      const hit = await cache.match(MODEL.url);
      if (hit) {
        const bytes = new Uint8Array(await hit.arrayBuffer());
        if (await sha256Hex(bytes) === MODEL.sha256) {
          progress('model', bytes.length, bytes.length, true);
          return bytes;
        }
        await cache.delete(MODEL.url);
      }
    } catch { /* fall through to the network */ }
  }
  const bytes = await fetchBytes(MODEL.url, 'model', MODEL.size);
  if (await sha256Hex(bytes) !== MODEL.sha256) {
    throw new Error('mirage.cact failed its checksum; the download was cut short or altered');
  }
  if (cache) {
    try {
      await cache.put(MODEL.url, new Response(bytes, {
        headers: { 'content-type': 'application/octet-stream', 'content-length': String(bytes.length) },
      }));
    } catch { /* over quota: keep going uncached */ }
  }
  return bytes;
}

function cString(M, ptr, max) {
  const heap = M.HEAPU8;
  let end = ptr;
  const limit = ptr + max;
  while (end < limit && heap[end] !== 0) end++;
  // Copy out of the heap: TextDecoder refuses views on a growable buffer in some browsers.
  return new TextDecoder().decode(heap.slice(ptr, end));
}

function lastError(M, fallback) {
  const ptr = M._cactus_last_error();
  return (ptr && cString(M, ptr, 4096)) || fallback;
}

async function load() {
  if (engine) return engine;
  if (!loading) {
    loading = (async () => {
      // Fetch the .wasm ourselves so the page can show byte progress.
      const wasmBinary = await fetchBytes(ENGINE_WASM, 'engine');
      const M = await createCactus({ wasmBinary });
      const weights = await loadWeights();

      const ptr = M._malloc(weights.length);
      if (!ptr) throw new Error('out of memory loading the weights');
      M.HEAPU8.set(weights, ptr);
      const code = M._cactus_load(ptr, BigInt(weights.length));
      M._free(ptr);
      if (code < 0) throw new Error(lastError(M, 'cactus_load failed'));
      if (!(M._cactus_models() & CACTUS_VISION)) throw new Error('the weights are not a Mirage vision model');

      outPtr = M._malloc(OUT_CAPACITY);
      if (!outPtr) throw new Error('out of memory allocating the output buffer');
      engine = M;
      return M;
    })().finally(() => { loading = null; });
  }
  return loading;
}

async function describe({ id, rgb, width, height }) {
  const M = await load();
  const started = performance.now();
  const rgbPtr = M._malloc(rgb.length);
  const optsPtr = M._malloc(3);
  try {
    if (!rgbPtr || !optsPtr) throw new Error('out of memory');
    // Read HEAPU8 fresh after each malloc: growing the heap replaces the buffer.
    M.HEAPU8.set(rgb, rgbPtr);
    M.HEAPU8.set([0x7b, 0x7d, 0], optsPtr); // "{}"
    const code = M._cactus_describe(rgbPtr, width, height, optsPtr, 0, 0, outPtr, OUT_CAPACITY);
    if (code < 0) throw new Error(lastError(M, 'cactus_describe failed'));
    const json = cString(M, outPtr, OUT_CAPACITY);
    postMessage({ type: 'result', id, json, ms: performance.now() - started });
  } finally {
    M._free(rgbPtr);
    M._free(optsPtr);
  }
}

self.onmessage = async ({ data }) => {
  try {
    if (data.type === 'load') {
      await load();
      postMessage({ type: 'ready' });
    } else if (data.type === 'describe') {
      await describe(data);
    }
  } catch (err) {
    postMessage({ type: 'error', id: data.id ?? null, message: String(err?.message || err) });
  }
};
