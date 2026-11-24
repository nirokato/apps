// Cloudflare Pages worker (advanced mode) for the shared altar.
//
//   GET  /api/altar   -> { total, counts, items }
//   POST /api/altar   -> lay one offering, returns the new state
//   GET  /feed.atom   -> the offerings as an Atom feed
//   GET  /feed.rss    -> the same as RSS 2.0
//   anything else     -> static assets
//
// State is one JSON value in KV (binding KV, key "altar"): running totals plus the
// newest MAX_ITEMS offerings. One value means one KV read per page view and one
// write per offering, which fits the free tier (1,000 writes a day). KV has no
// compare-and-set, so two offerings laid in the same instant can lose one; the
// page keeps a visitor's own offerings in localStorage so theirs never vanishes.

import { KINDS, PHRASES, SIGS, describe, capitalize, validOffering } from './catalog.js';

const KEY = 'altar';
const MAX_ITEMS = 500;
const DAILY_CAP = 900;        // stay under the KV free tier's daily writes
const PER_MINUTE = 6;         // per address, per isolate: best effort only
const SITE = 'https://reader.apps.andymolenda.com';

const recent = new Map();     // address -> timestamps (ms)

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === '/api/altar') {
        if (request.method === 'GET') return json(view(await load(env)), 200, { 'cache-control': 'public, max-age=10' });
        if (request.method === 'POST') return await lay(request, env, url);
        return json({ error: 'method' }, 405);
      }
      if (url.pathname === '/feed.atom') return feed(await load(env, true), 'atom');
      if (url.pathname === '/feed.rss') return feed(await load(env, true), 'rss');
    } catch (err) {
      return json({ error: 'unavailable' }, 503);
    }
    return env.ASSETS.fetch(request);
  },
};

const empty = () => ({ v: 1, total: 0, counts: {}, day: '', dayN: 0, items: [] });

async function load(env, lenient = false) {
  if (!env.KV) {
    if (lenient) return empty();
    throw new Error('no KV binding');
  }
  return (await env.KV.get(KEY, 'json')) || empty();
}

const view = (s) => ({ total: s.total, counts: s.counts, items: s.items });

async function lay(request, env, url) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== url.host) return json({ error: 'origin' }, 403);

  const text = await request.text();
  if (text.length > 300) return json({ error: 'invalid' }, 400);
  let o;
  try { o = JSON.parse(text); } catch { return json({ error: 'invalid' }, 400); }
  if (!validOffering(o)) return json({ error: 'invalid' }, 400);

  const now = Date.now();
  const who = request.headers.get('cf-connecting-ip') || 'unknown';
  const times = (recent.get(who) || []).filter((t) => now - t < 60_000);
  if (times.length >= PER_MINUTE) return json({ error: 'slow' }, 429);
  times.push(now);
  recent.set(who, times);
  if (recent.size > 5000) recent.clear();

  const state = await load(env);
  const day = new Date(now).toISOString().slice(0, 10);
  if (state.day !== day) { state.day = day; state.dayN = 0; }
  if (state.dayN >= DAILY_CAP) return json({ error: 'full' }, 429);

  const id = now.toString(36) + Math.random().toString(36).slice(2, 5);
  const cat = KINDS[o.kind].c;
  state.items.unshift([id, Math.floor(now / 1000), o.kind, o.variant, o.phrase, o.sig, o.x, o.y]);
  state.items.length = Math.min(state.items.length, MAX_ITEMS);
  state.total += 1;
  state.dayN += 1;
  state.counts[cat] = (state.counts[cat] || 0) + 1;
  await env.KV.put(KEY, JSON.stringify(state));

  return json({ ...view(state), id }, 201);
}

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
}

const esc = (s) => String(s).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));

function feed(state, kind) {
  const entries = state.items.slice(0, 60).filter((it) => KINDS[it[2]]).map(([id, t, k, v, p, s]) => ({
    id,
    date: new Date(t * 1000),
    title: `${capitalize(describe(k, v))}, from ${SIGS[s] || SIGS[0]}`,
    body: p >= 0 && PHRASES[p] ? `“${PHRASES[p]}”` : 'Left without a note.',
  }));
  const updated = entries[0] ? entries[0].date : new Date(Date.UTC(2013, 6, 1));
  const title = 'Offerings for Google Reader';
  const subtitle = 'Flowers, candles and small things laid at a memorial for Google Reader (2005 to 2013).';

  const xml = kind === 'atom'
    ? `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${esc(title)}</title>
  <subtitle>${esc(subtitle)}</subtitle>
  <id>${SITE}/</id>
  <link rel="self" type="application/atom+xml" href="${SITE}/feed.atom"/>
  <link rel="alternate" type="text/html" href="${SITE}/"/>
  <updated>${updated.toISOString()}</updated>
  <author><name>Visitors to the altar</name></author>
${entries.map((e) => `  <entry>
    <id>${SITE}/#o-${e.id}</id>
    <title>${esc(e.title)}</title>
    <link rel="alternate" type="text/html" href="${SITE}/#o-${e.id}"/>
    <updated>${e.date.toISOString()}</updated>
    <content type="text">${esc(e.body)}</content>
  </entry>`).join('\n')}
</feed>
`
    : `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(title)}</title>
    <link>${SITE}/</link>
    <description>${esc(subtitle)}</description>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <atom:link rel="self" type="application/rss+xml" href="${SITE}/feed.rss"/>
${entries.map((e) => `    <item>
      <guid isPermaLink="true">${SITE}/#o-${e.id}</guid>
      <title>${esc(e.title)}</title>
      <link>${SITE}/#o-${e.id}</link>
      <pubDate>${e.date.toUTCString()}</pubDate>
      <description>${esc(e.body)}</description>
    </item>`).join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'content-type': `application/${kind === 'atom' ? 'atom' : 'rss'}+xml; charset=utf-8`,
      'cache-control': 'public, max-age=300',
    },
  });
}
