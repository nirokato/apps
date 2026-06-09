# trove

Search 3D-printable models by **decor style or aesthetic** — not just tags.

Type a vibe ("industrial eclectic Amsterdam canal house", "warm japandi", "art
deco glam") and trove semantically ranks a prebuilt index of Printables models,
showing thumbnail, designer, license, popularity, and a deep link to the
original listing. The aesthetic is never hardcoded — any phrase works.

Live: https://trove.apps.andymolenda.com

## How it works

```
                         (offline / CI)                         (in the browser)
  Printables GraphQL ──► tools/trove-ingest ──► data/index.json ──► trove app
                          (metadata only)        (normalized)        │
                                                                     ├─ transformers.js (CDN)
                                                                     │   MiniLM embeddings
                                                                     ├─ cosine + lexical rank
                                                                     └─ IndexedDB vector cache
```

1. **Ingest (offline/CI):** A zero-dependency Node script pulls model *metadata*
   from the Printables GraphQL API into a normalized `data/index.json`. This is
   the only component that talks to Printables, and it never runs in a user's
   browser — so there's no CORS problem and no per-visitor API traffic.
2. **Search (browser):** The app loads `data/index.json`, lazily fetches a small
   sentence-embedding model (`Xenova/all-MiniLM-L6-v2`, ~23 MB, cached) from a
   CDN via [transformers.js](https://github.com/xenova/transformers.js), embeds
   every model's text once (cached in IndexedDB), embeds your query, and ranks
   by cosine similarity blended with a light keyword overlap. If the model can't
   load, it falls back to keyword-only matching.

No backend, no API keys, no build step. Just static files + a CDN model.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Markup + styles (repo design system) |
| `app.mjs` | UI: search box, chips, filters, result cards |
| `search.mjs` | `TroveEngine` + pure ranking math (`tokenize`, `topKByDot`, …) |
| `data/index.json` | Prebuilt metadata index (sample data until first refresh) |
| `tests/run.mjs` | Unit tests for the ranking math |

## Data format (`data/index.json`)

```jsonc
{
  "meta": {
    "version": 1,
    "source": "printables",        // or "sample"
    "generatedAt": "2026-…Z",
    "model": "Xenova/all-MiniLM-L6-v2",
    "dims": 384,
    "count": 400,
    "embeddingsUrl": "embeddings.bin" // optional: precomputed vectors
  },
  "models": [
    {
      "id": "123456", "name": "Pipe Bracket Wall Shelf", "slug": "pipe-…",
      "url": "https://www.printables.com/model/123456-pipe-…",
      "summary": "…", "tags": ["industrial","pipe","shelf"],
      "designer": "someuser", "license": "CC-BY", "commercialUse": false,
      "category": "Home Decor", "likes": 1240, "downloads": 8800,
      "thumb": "https://media.printables.com/…"
    }
  ]
}
```

If `meta.embeddingsUrl` is present the app uses those precomputed vectors and
skips in-browser corpus embedding (instant load). Otherwise it embeds the corpus
client-side on first visit and caches the result.

## Refreshing the index

Automated by **`.github/workflows/trove-refresh.yml`** (weekly + manual
dispatch): it runs the ingest on a CI runner and commits the updated index to
`main`, which re-deploys trove.

Run it yourself:

```bash
node tools/trove-ingest/ingest.mjs --limit 400        # metadata only
node tools/trove-ingest/ingest.mjs --dry-run          # preview, write nothing
npm i @xenova/transformers && \
  node tools/trove-ingest/ingest.mjs --embed          # also precompute vectors
```

> ⚠️ **The Printables API is unofficial and undocumented.** If a run errors or
> indexes 0 models, the GraphQL schema has drifted. Re-derive the query from the
> browser Network tab on printables.com (filter: `graphql`) and update
> `GQL_QUERY` + `normalize()` in `tools/trove-ingest/ingest.mjs`. Nothing else
> depends on that shape — the app only consumes the normalized JSON.

## Testing

```bash
node projects/trove/tests/run.mjs
```

Covers the pure ranking math (tokenization, normalization, cosine top-k,
lexical overlap, blending). The embedding/model path needs a real browser +
network and is exercised by loading the app.

## Etiquette & licensing

trove indexes **metadata only** and always links out to the original Printables
listing — it never rehosts model files. Models remain © their designers under
the license shown on each card. The ingest rate-limits its requests. Use
responsibly and in line with Printables' terms.
