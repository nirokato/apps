# reader

A memorial for Google Reader (October 7, 2005 to July 1, 2013): a headstone, and grass in front of it where visitors lay flowers, candles, wreaths, notes, mementos, trinkets and food. Everyone sees the same altar. The offerings are also published as Atom and RSS feeds.

Not affiliated with Google.

## Files

| File | What it is |
|------|------------|
| `index.html` | The page: scene, picker, Reader-style list of offerings, memorabilia |
| `catalog.js` | Every kind of offering, every phrase and every signature. Imported by the page and the worker |
| `_worker.js` | Pages worker (advanced mode): `/api/altar`, `/feed.atom`, `/feed.rss`, static assets for the rest |

## How it works

- **No visitor-typed text.** An offering is a kind, a variant, a phrase index, a signature index and a position, all checked against `catalog.js` by the worker. There is nothing to moderate. The lists are append-only, because stored offerings point into them by index.
- **Storage** is one JSON value in Workers KV (binding `KV`, key `altar`): totals plus the newest 500 offerings. One read per page view, one write per offering. The worker stops accepting offerings at 900 a day to stay inside the KV free tier, and limits each address to 6 a minute (per isolate, best effort).
- **KV has no compare-and-set**, so two offerings in the same instant can lose one. The page keeps a visitor's own offerings in `localStorage` and merges them back in, so theirs never vanishes for them.
- **Without the API** (plain static server, or KV not bound yet) the page still works: offerings stay in the visitor's browser and the list says so.
- **Aging:** fresh flowers wilt after 5 days and are cleared from the grass after 30. Candles burn for 36 hours, then sit as stubs for 14 days. Everything else stays until it falls out of the newest 500. The feeds and the list are not affected.
- **Sky** follows the visitor's clock (dawn, day, dusk, night); the button in the corner cycles it.
- **Touch:** the first tap on the grass only sets the offering down to look; "Leave it here" commits it. Mouse users get a hover preview and place with one click. Repeat taps on one spot walk down through overlapping offerings.
- **Keyboard:** Reader's shortcuts work on the list (`j k n p o s m Shift+a v r`, `g a`, `g s`, `?`), and the Konami code does what it did in June 2008. The list footer has a switch to turn the single-key shortcuts off.

## Local development

The page alone:

```
python3 -m http.server 8000
```

With the worker and a local KV (needs wrangler, nothing is committed):

```
npx wrangler pages dev projects/reader --kv KV
```

## Clearing the altar

Delete the `altar` key from the `andy-apps-reader` KV namespace. To remove one offering, edit that key's JSON.
