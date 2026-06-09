#!/usr/bin/env node
// trove-ingest — build the trove search index from Printables metadata.
//
// Zero runtime dependencies: uses only Node built-ins + global fetch (Node 18+),
// matching this repo's "no package.json / no node_modules" convention. The
// optional --embed path is the one exception (see bottom).
//
// Output: projects/trove/data/index.json  (normalized metadata; the browser
// embeds it client-side). With --embed it also writes embeddings.bin.
//
// Usage:
//   node tools/trove-ingest/ingest.mjs [--limit 400] [--out <path>] [--dry-run]
//   node tools/trove-ingest/ingest.mjs --embed        # also precompute vectors
//
// Datacenter IPs are Cloudflare-blocked by Printables; set SCRAPER_API_KEY (and
// optionally SCRAPER_API_TIER) to route through a residential unblocker. See the
// SCRAPER block below.
//
// ─── IMPORTANT: schema drift ────────────────────────────────────────────────
// Printables' GraphQL API is unofficial and undocumented; field/operation names
// change without notice. If a run returns 0 items or errors, re-derive the
// current query from your browser's Network tab on printables.com (filter:
// graphql) and update GQL_QUERY + normalize() below. Nothing else — and not the
// web app, which only consumes our normalized JSON — depends on this shape.
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUT = resolve(HERE, '../../projects/trove/data/index.json');

const CONFIG = {
  endpoint: 'https://api.printables.com/graphql/',
  mediaBase: 'https://media.printables.com/',
  // Broad, decor-oriented seed queries → a corpus worth searching by aesthetic.
  // The aesthetic itself is NOT encoded here; these just gather candidates that
  // the browser then ranks against whatever vibe the user types.
  queries: [
    'home decor', 'wall art', 'vase', 'planter', 'lamp shade', 'shelf bracket',
    'candle holder', 'wall clock', 'desk organizer', 'picture frame',
    'ornament', 'coaster', 'bookend', 'jewelry holder',
  ],
  pageSize: 36,
  pagesPerQuery: 2,        // 36 * 2 = up to 72 candidates per query before dedupe
  ordering: '-likes',      // popular first
  delayMs: 600,            // be polite between requests
  model: 'Xenova/all-MiniLM-L6-v2',
  dims: 384,
};

// Best-effort query — VERIFY against the live schema (see note above).
const GQL_QUERY = `
query SearchModels($query: String!, $limit: Int!, $offset: Int!, $ordering: String) {
  result: prints(query: $query, limit: $limit, offset: $offset, ordering: $ordering) {
    items {
      id
      name
      slug
      summary
      likesCount
      downloadCount
      datePublished
      user { publicUsername }
      image { filePath }
      tags { name }
      license { name }
      category { name }
    }
  }
}`;

// Browser-identity headers. Printables' API sits behind Cloudflare, which 403s
// requests that don't look like the site's own XHR (Node's default fetch sends
// no/!browser User-Agent). These emulate a normal Chrome request from the
// frontend. NOTE: if Cloudflare escalates to a JS/Turnstile challenge, no header
// set will pass — the logged 403 body will show that, and the right move is a
// sanctioned API (Thingiverse/MyMiniFactory) rather than challenge-solving.
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Content-Type': 'application/json',
  'Origin': 'https://www.printables.com',
  'Referer': 'https://www.printables.com/',
  'sec-ch-ua': '"Chromium";v="126", "Not.A/Brand";v="24", "Google Chrome";v="126"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
};

// Optional residential-unblocker route. Datacenter IPs (GitHub Actions, cloud
// sandboxes) get Cloudflare-403'd regardless of headers; an unblocker service
// re-issues the request from a residential IP. Set SCRAPER_API_KEY to enable
// (default provider: ScraperAPI); without it the request goes direct.
//   SCRAPER_API_KEY   – provider API key (use a repo secret, never commit it)
//   SCRAPER_API_TIER  – standard | premium (residential, default) | ultra_premium
// ToS note: this routes around Printables' bot protection — acceptable for
// low-volume public-metadata indexing with attribution; revisit with a
// sanctioned API for anything permanent.
const SCRAPER = {
  apiKey: process.env.SCRAPER_API_KEY || '',
  tier: process.env.SCRAPER_API_TIER || 'premium',
};

// The URL we actually POST to: ScraperAPI passthrough when keyed, else direct.
// ScraperAPI forwards our method/body/headers (keep_headers) and re-issues the
// request from a residential IP, returning Printables' response verbatim.
function endpointUrl() {
  if (!SCRAPER.apiKey) return CONFIG.endpoint;
  const params = new URLSearchParams({
    api_key: SCRAPER.apiKey,
    url: CONFIG.endpoint,
    keep_headers: 'true',
  });
  if (SCRAPER.tier === 'premium') params.set('premium', 'true');
  else if (SCRAPER.tier === 'ultra_premium') params.set('ultra_premium', 'true');
  return `https://api.scraperapi.com/?${params.toString()}`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseArgs(argv) {
  const args = { limit: 400, out: DEFAULT_OUT, dryRun: false, embed: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--limit') args.limit = parseInt(argv[++i], 10);
    else if (a === '--out') args.out = resolve(argv[++i]);
    else if (a === '--dry-run') args.dryRun = true;
    else if (a === '--embed') args.embed = true;
  }
  return args;
}

async function gqlFetch(query, offset, attempt = 1) {
  let res;
  try {
    res = await fetch(endpointUrl(), {
      method: 'POST',
      headers: BROWSER_HEADERS,
      body: JSON.stringify({
        query: GQL_QUERY,
        variables: { query, limit: CONFIG.pageSize, offset, ordering: CONFIG.ordering },
      }),
    });
  } catch (err) {
    return retryOrThrow(query, offset, attempt, `network: ${err.message}`);
  }

  if (!res.ok) {
    const body = (await res.text().catch(() => '')).replace(/\s+/g, ' ').trim().slice(0, 400);
    // Auth/blocks (401/403) won't resolve by retrying — fail fast with the body
    // so we can tell a simple WAF block from a JS challenge.
    if (res.status === 401 || res.status === 403) {
      throw new Error(`HTTP ${res.status} access blocked. Response body: ${body || '(empty)'}`);
    }
    return retryOrThrow(query, offset, attempt, `HTTP ${res.status}: ${body}`);
  }

  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL: ${JSON.stringify(json.errors).slice(0, 300)}`);
  return json?.data?.result?.items || [];
}

async function retryOrThrow(query, offset, attempt, reason) {
  if (attempt <= 4) {
    const backoff = 2 ** attempt * 1000;
    console.warn(`  ! "${query}" offset ${offset} failed (${reason}); retry in ${backoff}ms`);
    await sleep(backoff);
    return gqlFetch(query, offset, attempt + 1);
  }
  throw new Error(reason);
}

// Derive a commercial-use flag from the license name (CC *-NC variants and
// "Standard Digital File" are personal-use).
function allowsCommercial(licenseName) {
  if (!licenseName) return false;
  const n = licenseName.toLowerCase();
  if (n.includes('-nc') || n.includes('noncommercial') || n.includes('non-commercial')) return false;
  if (n.includes('standard digital file')) return false;
  if (n.includes('cc0') || n.includes('public domain') || n.includes('cc-by') || n.includes('attribution')) return true;
  return false;
}

function normalize(item) {
  const filePath = item?.image?.filePath;
  return {
    id: String(item.id),
    name: item.name,
    slug: item.slug || '',
    url: item.slug && item.id ? `https://www.printables.com/model/${item.id}-${item.slug}` : null,
    summary: (item.summary || '').replace(/\s+/g, ' ').trim().slice(0, 280),
    tags: (item.tags || []).map((t) => t.name).filter(Boolean).slice(0, 12),
    designer: item?.user?.publicUsername || 'Unknown',
    license: item?.license?.name || 'Unknown',
    commercialUse: allowsCommercial(item?.license?.name),
    category: item?.category?.name || null,
    likes: item.likesCount || 0,
    downloads: item.downloadCount || 0,
    thumb: filePath ? CONFIG.mediaBase + filePath : null,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (typeof fetch !== 'function') {
    console.error('Global fetch unavailable — use Node 18 or newer.');
    process.exit(1);
  }

  const route = SCRAPER.apiKey ? `via ScraperAPI (${SCRAPER.tier})` : 'direct';
  console.log(`trove-ingest: gathering up to ${args.limit} models across ${CONFIG.queries.length} queries… [${route}]`);
  const byId = new Map();

  outer:
  for (const q of CONFIG.queries) {
    for (let page = 0; page < CONFIG.pagesPerQuery; page++) {
      const items = await gqlFetch(q, page * CONFIG.pageSize);
      for (const item of items) {
        if (!item?.id || !item?.name) continue;
        const rec = normalize(item);
        if (!byId.has(rec.id)) byId.set(rec.id, rec);
      }
      console.log(`  "${q}" page ${page + 1}: +${items.length} (total unique ${byId.size})`);
      if (byId.size >= args.limit) break outer;
      await sleep(CONFIG.delayMs);
    }
  }

  // Most-liked first, capped.
  const models = [...byId.values()].sort((a, b) => b.likes - a.likes).slice(0, args.limit);
  const index = {
    meta: {
      version: 1,
      source: 'printables',
      generatedAt: new Date().toISOString(),
      model: CONFIG.model,
      dims: CONFIG.dims,
      count: models.length,
      queries: CONFIG.queries,
    },
    models,
  };

  if (args.embed) await embedInto(index, args.out);

  if (args.dryRun) {
    console.log(`\n[dry-run] ${models.length} models; first few:`);
    console.log(models.slice(0, 5).map((m) => `  - ${m.name} (${m.license})`).join('\n'));
    return;
  }

  mkdirSync(dirname(args.out), { recursive: true });
  writeFileSync(args.out, JSON.stringify(index, null, 2) + '\n');
  console.log(`\nWrote ${models.length} models → ${args.out}`);
  if (models.length === 0) {
    console.warn('WARNING: 0 models — the GraphQL schema has likely drifted. See the note at the top of this file.');
    process.exit(2);
  }
}

// Optional: precompute embeddings so the published app loads instantly.
// Requires `npm i @xenova/transformers` (transient, not committed). The default
// workflow skips this; the browser embeds + caches the corpus on first visit.
async function embedInto(index, outPath) {
  let transformers;
  try {
    transformers = await import('@xenova/transformers');
  } catch {
    console.error('--embed requires @xenova/transformers (run: npm i @xenova/transformers). Skipping.');
    return;
  }
  const { pipeline, env } = transformers;
  env.allowLocalModels = false;
  const extractor = await pipeline('feature-extraction', CONFIG.model, { quantized: true });
  const { dims } = CONFIG;
  const vectors = new Float32Array(index.models.length * dims);
  for (let i = 0; i < index.models.length; i++) {
    const m = index.models[i];
    const text = `${m.name}. ${m.summary || ''} ${(m.tags || []).join(' ')}`.trim();
    const out = await extractor(text, { pooling: 'mean', normalize: true });
    vectors.set(out.data, i * dims);
    if (i % 25 === 0) console.log(`  embedded ${i}/${index.models.length}`);
  }
  const binPath = resolve(dirname(outPath), 'embeddings.bin');
  writeFileSync(binPath, Buffer.from(vectors.buffer));
  index.meta.embeddingsUrl = 'embeddings.bin';
  console.log(`Wrote precomputed embeddings → ${binPath}`);
}

main().catch((err) => {
  console.error('ingest failed:', err);
  process.exit(1);
});
