// trove — semantic search engine
//
// Two layers:
//   1. Pure ranking math (tokenize / l2normalize / topKByDot / lexicalOverlap /
//      blend). No browser or network dependencies, so it is unit-testable under
//      plain `node` (see tests/run.mjs).
//   2. TroveEngine: loads the prebuilt index, lazily pulls a sentence-embedding
//      model from a CDN (transformers.js), embeds the corpus in the browser
//      (caching vectors in IndexedDB), and ranks models against a free-text
//      aesthetic query. Falls back to keyword matching if the model can't load.
//
// The aesthetic is never hardcoded — any phrase the user types is embedded and
// matched. "Industrial eclectic Amsterdam" is just one query among infinitely
// many.

// ---------------------------------------------------------------------------
// Pure ranking math
// ---------------------------------------------------------------------------

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'a', 'an', 'of', 'to', 'in',
  'on', 'at', 'is', 'it', 'as', 'or', 'by', 'be', 'are', 'my', 'me', 'i',
  'style', 'look', 'vibe', 'aesthetic', 'feel', 'something', 'print', 'prints',
]);

export function tokenize(text) {
  const out = [];
  const seen = new Set();
  for (const raw of String(text).toLowerCase().match(/[a-z0-9]+/g) || []) {
    if (raw.length < 2 || STOPWORDS.has(raw) || seen.has(raw)) continue;
    seen.add(raw);
    out.push(raw);
  }
  return out;
}

export function l2normalize(vec) {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) sum += vec[i] * vec[i];
  const norm = Math.sqrt(sum) || 1;
  const out = new Float32Array(vec.length);
  for (let i = 0; i < vec.length; i++) out[i] = vec[i] / norm;
  return out;
}

// Cosine similarity (assuming unit vectors) of `query` against each row of a
// flat [count * dims] matrix. Returns the top-k as [{ index, sim }] desc.
export function topKByDot(query, matrix, dims, count, k = count) {
  const scored = new Array(count);
  for (let row = 0; row < count; row++) {
    const base = row * dims;
    let dot = 0;
    for (let d = 0; d < dims; d++) dot += query[d] * matrix[base + d];
    scored[row] = { index: row, sim: dot };
  }
  scored.sort((a, b) => b.sim - a.sim);
  return k >= count ? scored : scored.slice(0, k);
}

// Fraction of query tokens present in a document's token set (0..1).
export function lexicalOverlap(queryTokens, docTokenSet) {
  if (queryTokens.length === 0) return 0;
  let hits = 0;
  for (const t of queryTokens) if (docTokenSet.has(t)) hits++;
  return hits / queryTokens.length;
}

// Blend semantic cosine (~ -1..1, usually 0..0.6) with lexical overlap (0..1).
export function blend(semantic, lexical, lexicalWeight = 0.15) {
  return semantic * (1 - lexicalWeight) + lexical * lexicalWeight;
}

// Small stable hash for cache-keying the corpus (FNV-1a).
export function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h.toString(16);
}

// ---------------------------------------------------------------------------
// IndexedDB vector cache (browser only)
// ---------------------------------------------------------------------------

const DB_NAME = 'trove-cache';
const STORE = 'vectors';

function openDb() {
  return new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') return resolve(null);
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null); // cache is best-effort
  });
}

async function idbGet(key) {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readonly').objectStore(STORE).get(key);
    tx.onsuccess = () => resolve(tx.result || null);
    tx.onerror = () => resolve(null);
  });
}

async function idbPut(key, value) {
  const db = await openDb();
  if (!db) return;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

const TRANSFORMERS_CDN = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

export class TroveEngine {
  constructor(opts = {}) {
    this.indexUrl = opts.indexUrl || 'data/index.json';
    this.lexicalWeight = opts.lexicalWeight ?? 0.15;
    this.meta = null;
    this.models = [];
    this.docTokenSets = [];
    this.vectors = null; // Float32Array [count * dims], unit rows
    this.dims = 384;
    this.extractor = null;
    this._modelPromise = null;
  }

  // Load the prebuilt metadata index and precompute per-doc token sets.
  async loadIndex() {
    const res = await fetch(this.indexUrl, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to load index (${res.status})`);
    const data = await res.json();
    this.meta = data.meta || {};
    this.models = data.models || [];
    this.dims = this.meta.dims || 384;
    this.docTokenSets = this.models.map(
      (m) => new Set(tokenize(`${m.name} ${m.summary || ''} ${(m.tags || []).join(' ')}`)),
    );
    return this.meta;
  }

  docText(m) {
    return `${m.name}. ${m.summary || ''} ${(m.tags || []).join(' ')}`.trim();
  }

  cacheKey() {
    const ids = this.models.map((m) => m.id).join(',');
    return `${this.meta.model}|v${this.meta.version}|${this.meta.source}|${this.models.length}|${fnv1a(ids)}`;
  }

  // Cheap, no-model restore of corpus vectors. Used on page load so we never
  // trigger a multi-MB model download until the user actually searches.
  // Returns true if vectors are ready.
  async tryRestore() {
    if (this.vectors) return true;
    if (this.meta.embeddingsUrl) {
      const res = await fetch(new URL(this.meta.embeddingsUrl, new URL(this.indexUrl, location.href)));
      this.vectors = new Float32Array(await res.arrayBuffer());
      return true;
    }
    const cached = await idbGet(this.cacheKey());
    if (cached && cached.buffer && cached.count === this.models.length) {
      this.vectors = new Float32Array(cached.buffer);
      return true;
    }
    return false;
  }

  // Lazily import transformers.js and instantiate the feature-extraction
  // pipeline. Cached after first call.
  async loadModel(onProgress) {
    if (this.extractor) return this.extractor;
    if (this._modelPromise) return this._modelPromise;
    this._modelPromise = (async () => {
      const { pipeline, env } = await import(/* @vite-ignore */ TRANSFORMERS_CDN);
      env.allowLocalModels = false;
      env.useBrowserCache = true;
      this.extractor = await pipeline('feature-extraction', this.meta.model || 'Xenova/all-MiniLM-L6-v2', {
        quantized: true,
        progress_callback: (p) => {
          if (onProgress && p.status === 'progress' && p.total) {
            onProgress({ phase: 'model', loaded: p.loaded, total: p.total, file: p.file });
          }
        },
      });
      return this.extractor;
    })();
    return this._modelPromise;
  }

  // Ensure the corpus vector matrix exists: restore if possible, else embed in
  // the browser and cache the result.
  async buildVectors(onProgress) {
    if (await this.tryRestore()) return;
    await this.loadModel(onProgress);
    const count = this.models.length;
    const vectors = new Float32Array(count * this.dims);
    const BATCH = 32;
    for (let i = 0; i < count; i += BATCH) {
      const slice = this.models.slice(i, i + BATCH).map((m) => this.docText(m));
      const out = await this.extractor(slice, { pooling: 'mean', normalize: true });
      vectors.set(out.data, i * this.dims);
      if (onProgress) onProgress({ phase: 'embed', loaded: Math.min(i + BATCH, count), total: count });
      await new Promise((r) => setTimeout(r, 0)); // yield to keep UI responsive
    }
    this.vectors = vectors;
    await idbPut(this.cacheKey(), { buffer: vectors.buffer, count, dims: this.dims });
  }

  async embedQuery(text) {
    await this.loadModel();
    const out = await this.extractor(text, { pooling: 'mean', normalize: true });
    return new Float32Array(out.data);
  }

  // Semantic ranking against a free-text aesthetic query.
  async search(query, opts = {}) {
    if (!this.vectors) throw new Error('Index not ready');
    const qTokens = tokenize(query);
    const qVec = await this.embedQuery(query);
    const sims = topKByDot(qVec, this.vectors, this.dims, this.models.length);
    const results = sims.map(({ index, sim }) => {
      const lex = lexicalOverlap(qTokens, this.docTokenSets[index]);
      return { model: this.models[index], semantic: sim, lexical: lex, score: blend(sim, lex, this.lexicalWeight) };
    });
    return this._finalize(results, opts);
  }

  // Keyword-only fallback when the embedding model is unavailable (offline,
  // blocked CDN, etc.). Ranks purely by token overlap.
  searchLexical(query, opts = {}) {
    const qTokens = tokenize(query);
    const results = this.models.map((model, i) => {
      const lex = lexicalOverlap(qTokens, this.docTokenSets[i]);
      return { model, semantic: 0, lexical: lex, score: lex };
    });
    return this._finalize(results, opts);
  }

  _finalize(results, { k = 60, licenseFilter = 'any', sort = 'relevance' } = {}) {
    results.sort((a, b) => b.score - a.score);
    if (licenseFilter === 'commercial') results = results.filter((r) => r.model.commercialUse);
    const top = results.slice(0, k);
    if (sort === 'popular') top.sort((a, b) => (b.model.likes || 0) - (a.model.likes || 0));
    const best = top.length ? Math.max(...top.map((r) => r.score)) : 1;
    for (const r of top) r.match = best > 0 ? Math.max(0, r.score / best) : 0;
    return top;
  }
}
