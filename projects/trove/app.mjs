// trove — UI layer. Wires TroveEngine to the DOM.
import { TroveEngine, fnv1a } from './search.mjs';

const engine = new TroveEngine({ indexUrl: 'data/index.json' });

const EXAMPLES = [
  'industrial eclectic loft',
  'amsterdam canal house',
  'scandinavian minimal warm',
  'japandi calm zen',
  'cottagecore cozy whimsical',
  'art deco gatsby glam',
  'mid-century modern atomic',
  'brutalist raw concrete',
];

const $ = (id) => document.getElementById(id);
const els = {};

// --- tiny DOM builder ---
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v != null) node.setAttribute(k, v);
  }
  for (const c of children.flat()) if (c != null) node.append(c);
  return node;
}

function setStatus(text, busy = false) {
  els.status.textContent = text;
  els.status.classList.toggle('busy', busy);
}

function modelUrl(m) {
  if (m.url) return m.url;
  if (m.slug && m.id && !String(m.id).startsWith('sample')) {
    return `https://www.printables.com/model/${m.id}-${m.slug}`;
  }
  return `https://www.printables.com/search/models?q=${encodeURIComponent(m.name)}`;
}

function thumbTile(m) {
  if (m.thumb) {
    return el('img', { class: 'thumb', src: m.thumb, alt: m.name, loading: 'lazy' });
  }
  // Deterministic gradient placeholder keyed off the model id.
  const h = parseInt(fnv1a(m.id || m.name).slice(0, 6), 16);
  const hue = h % 360;
  const tile = el('div', { class: 'thumb thumb-ph' },
    el('span', { text: (m.name[0] || '?').toUpperCase() }));
  tile.style.background = `linear-gradient(135deg, hsl(${hue} 30% 22%), hsl(${(hue + 40) % 360} 28% 14%))`;
  return tile;
}

function licenseBadge(m) {
  const dotTitle = m.commercialUse ? 'Commercial use OK' : 'Personal use';
  return el('span', { class: 'lic' },
    el('span', { class: `dot ${m.commercialUse ? 'ok' : 'no'}`, title: dotTitle }),
    el('span', { text: m.license || 'Unknown' }));
}

function resultCard({ model, match }) {
  const stats = [];
  if (model.likes) stats.push(`♥ ${model.likes.toLocaleString()}`);
  if (model.downloads) stats.push(`↓ ${model.downloads.toLocaleString()}`);

  return el('a', { class: 'result', href: modelUrl(model), target: '_blank', rel: 'noopener noreferrer' },
    thumbTile(model),
    el('div', { class: 'result-body' },
      el('div', { class: 'result-name', text: model.name }),
      model.summary ? el('div', { class: 'result-desc', text: model.summary }) : null,
      el('div', { class: 'tags' }, (model.tags || []).slice(0, 5).map((t) => el('span', { class: 'tag', text: t }))),
      el('div', { class: 'result-meta' },
        licenseBadge(model),
        stats.length ? el('span', { class: 'stats', text: stats.join('  ·  ') }) : null),
      el('div', { class: 'match', title: 'Relative match' },
        el('div', { class: 'match-bar', style: `width:${Math.round(match * 100)}%` }))));
}

function renderResults(results, query) {
  els.results.replaceChildren();
  if (!results.length) {
    els.results.append(el('p', { class: 'empty', text: `No matches for “${query}”.` }));
    return;
  }
  for (const r of results) els.results.append(resultCard(r));
}

function onProgress(p) {
  if (p.phase === 'model') {
    const pct = Math.round((p.loaded / p.total) * 100);
    setStatus(`Loading search model — ${pct}% (one-time, then cached)…`, true);
  } else if (p.phase === 'embed') {
    setStatus(`Preparing index — ${p.loaded}/${p.total}…`, true);
  }
}

let searching = false;
async function runSearch(query) {
  query = (query || els.q.value).trim();
  if (!query || searching) return;
  searching = true;
  els.go.disabled = true;
  els.note.textContent = '';
  setStatus('Searching…', true);

  try {
    let results;
    try {
      if (!engine.vectors) await engine.buildVectors(onProgress);
      results = await engine.search(query, currentOpts());
    } catch (err) {
      // Embedding model unavailable — degrade to keyword matching.
      console.warn('Semantic search unavailable, falling back to keywords:', err);
      els.note.textContent = 'Semantic model unavailable — showing keyword matches.';
      results = engine.searchLexical(query, currentOpts());
    }
    renderResults(results, query);
    setStatus(`${results.length} match${results.length === 1 ? '' : 'es'} for “${query}”`);
  } catch (err) {
    setStatus(`Something went wrong: ${err.message}`);
  } finally {
    searching = false;
    els.go.disabled = false;
  }
}

function currentOpts() {
  return { k: 60, licenseFilter: els.license.value, sort: els.sort.value };
}

function buildChips() {
  for (const ex of EXAMPLES) {
    els.chips.append(el('button', {
      class: 'chip', type: 'button', text: ex,
      onclick: () => { els.q.value = ex; runSearch(ex); },
    }));
  }
}

async function init() {
  els.q = $('q');
  els.go = $('go');
  els.chips = $('chips');
  els.status = $('status');
  els.note = $('note');
  els.results = $('results');
  els.license = $('license');
  els.sort = $('sort');
  els.banner = $('banner');
  els.count = $('count');
  els.updated = $('updated');

  buildChips();
  els.go.addEventListener('click', () => runSearch());
  els.q.addEventListener('keydown', (e) => { if (e.key === 'Enter') runSearch(); });
  for (const sel of [els.license, els.sort]) {
    sel.addEventListener('change', () => { if (els.q.value.trim()) runSearch(); });
  }

  setStatus('Loading catalog…', true);
  try {
    const meta = await engine.loadIndex();
    els.count.textContent = `${meta.count ?? engine.models.length} models`;
    if (meta.generatedAt) {
      els.updated.textContent = `updated ${new Date(meta.generatedAt).toLocaleDateString()}`;
    }
    if (meta.source === 'sample') els.banner.hidden = false;
    setStatus('Describe a vibe and hit search.');
    engine.tryRestore().catch(() => {}); // warm cache if vectors already exist
  } catch (err) {
    setStatus(`Couldn't load the catalog: ${err.message}`);
  }
}

init();
