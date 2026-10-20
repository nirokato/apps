#!/usr/bin/env node
// github-uptime-ingest: build github-uptime's monthly dataset from githubstatus.com.
//
// Zero dependencies: Node built-ins + global fetch (Node 18+), matching this
// repo's "no package.json / no node_modules" convention.
//
// The status page (Atlassian Statuspage) serves its uptime history as JSON:
//   GET https://www.githubstatus.com/uptime/<component_id>?page=N
//   Accept: application/json
// Each page holds 3 months, newest first. Pages keep coming forever into the
// past (all green, synthetic), so paging stops at --floor.
//
// Output: projects/github-uptime/data/uptime.json, one entry per component with
// per-month uptime (fraction), partial-outage seconds and major-outage seconds.
// Months still in progress are dropped. The browser only reads this file.
//
// Months before a component was added to the status page come back as filler
// (100%, or 0% for Codespaces/Copilot), so each component starts at `since`: the
// first full month after its created_at. Those months are null, not 100%.
//
// Usage:
//   node tools/github-uptime-ingest/ingest.mjs [--floor 2016-04] [--out <path>]
//   node tools/github-uptime-ingest/ingest.mjs --save-raw raw.json   # keep the scrape
//   node tools/github-uptime-ingest/ingest.mjs --from raw.json       # rebuild offline
//
// Ported from scrape-data.py + webapp/src/historicalData.ts in
// https://github.com/DaMrNelson/github-historical-uptime (MIT, Nelson Schramm).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUT = resolve(HERE, '../../projects/github-uptime/data/uptime.json');

const CONFIG = {
  base: 'https://www.githubstatus.com',
  delayMs: 700,            // be polite between requests
  maxPages: 80,            // per component; 80 pages = 20 years
  userAgent: 'github-uptime-ingest/1.0 (+https://github-uptime.apps.andymolenda.com)',
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseArgs(argv) {
  const args = { floor: '2016-04', out: DEFAULT_OUT, from: null, saveRaw: null, force: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--floor') args.floor = argv[++i];
    else if (a === '--out') args.out = resolve(argv[++i]);
    else if (a === '--from') args.from = resolve(argv[++i]);
    else if (a === '--save-raw') args.saveRaw = resolve(argv[++i]);
    else if (a === '--force') args.force = true;
    else throw new Error(`unknown argument: ${a}`);
  }
  if (!/^\d{4}-\d{2}$/.test(args.floor)) throw new Error('--floor must be YYYY-MM');
  return args;
}

async function getJson(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': CONFIG.userAgent },
    });
    if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
    if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status}`), { fatal: true });
    return await res.json();
  } catch (err) {
    if (!err.fatal && attempt <= 6) {
      const backoff = 15000 * attempt;
      console.warn(`  ! ${url} failed (${err.message}); retry in ${backoff / 1000}s`);
      await sleep(backoff);
      return getJson(url, attempt + 1);
    }
    throw err;
  }
}

const monthKey = (m) => `${m.year}-${String(MONTHS.indexOf(m.name) + 1).padStart(2, '0')}`;

// First full month on the status page: the creation month itself unless created on the 1st.
function sinceKey(createdAt) {
  const [y, m, d] = createdAt.slice(0, 10).split('-').map(Number);
  if (d === 1) return createdAt.slice(0, 7);
  return m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`;
}

async function scrape(floor) {
  const first = await getJson(`${CONFIG.base}/uptime`);
  const components = first.component_select_list || [];
  if (components.length === 0) throw new Error('no component_select_list in /uptime response');
  console.log(`${components.length} components: ${components.map((c) => c.name).join(', ')}`);

  const pages = [];
  for (const comp of components) {
    for (let page = 1; page <= CONFIG.maxPages; page++) {
      await sleep(CONFIG.delayMs);
      const data = await getJson(`${CONFIG.base}/uptime/${comp.value}?page=${page}`);
      const months = data.months || [];
      if (months.length === 0) break;
      pages.push(data);
      const keys = months.map(monthKey).sort();
      console.log(`  ${comp.name} page ${page}: ${keys[0]} .. ${keys[keys.length - 1]}`);
      // Nothing older than the component itself is real data.
      const since = data.component.created_at ? sinceKey(data.component.created_at) : floor;
      if (keys[0] <= floor || keys[0] <= since) break;
    }
  }
  return pages;
}

// Raw pages -> { months: [...], components: { name: { uptime, partial, major } } }.
// A month is kept only once every day in it has an events array; future days in
// the current month have none.
function aggregate(pages, floor) {
  const byComp = new Map();
  let conflicts = 0;
  let incomplete = 0;

  const since = new Map();
  for (const page of pages) {
    const name = page.component.name;
    if (!byComp.has(name)) byComp.set(name, new Map());
    const series = byComp.get(name);
    const start = page.component.created_at ? sinceKey(page.component.created_at) : floor;
    since.set(name, start > floor ? start : floor);

    for (const month of page.months) {
      const key = monthKey(month);
      if (key < since.get(name)) continue;
      if (month.days.some((d) => d.events === undefined)) { incomplete++; continue; }

      const entry = {
        uptime: Math.round(month.uptime_percentage * 1e7) / 1e7,
        partial: month.days.reduce((s, d) => s + (d.p ?? 0), 0),
        major: month.days.reduce((s, d) => s + (d.m ?? 0), 0),
      };
      const seen = series.get(key);
      if (seen) {
        if (seen.uptime !== entry.uptime) {
          console.warn(`  ! ${name} ${key}: conflicting uptime ${seen.uptime} vs ${entry.uptime}`);
          conflicts++;
        }
        continue;
      }
      series.set(key, entry);
    }
  }

  const months = [...new Set([...byComp.values()].flatMap((s) => [...s.keys()]))].sort();
  const components = {};
  for (const [name, series] of [...byComp].sort(([a], [b]) => a.localeCompare(b))) {
    components[name] = { since: since.get(name), uptime: [], partial: [], major: [] };
    for (const key of months) {
      const e = series.get(key);
      components[name].uptime.push(e ? e.uptime : null);
      components[name].partial.push(e ? e.partial : null);
      components[name].major.push(e ? e.major : null);
    }
  }
  return { months, components, conflicts, incomplete };
}

// One line per series keeps diffs readable without pretty-printing every number.
function serialize(meta, months, components) {
  const names = Object.keys(components);
  return [
    '{',
    `  "meta": ${JSON.stringify(meta)},`,
    `  "months": ${JSON.stringify(months)},`,
    '  "components": {',
    ...names.map((n, i) => `    ${JSON.stringify(n)}: ${JSON.stringify(components[n])}${i < names.length - 1 ? ',' : ''}`),
    '  }',
    '}',
    '',
  ].join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (typeof fetch !== 'function') {
    console.error('Global fetch unavailable — use Node 18 or newer.');
    process.exit(1);
  }

  let pages;
  if (args.from) {
    pages = JSON.parse(readFileSync(args.from, 'utf8'));
    console.log(`github-uptime-ingest: ${pages.length} raw pages from ${args.from}`);
  } else {
    console.log(`github-uptime-ingest: scraping ${CONFIG.base}/uptime back to ${args.floor}…`);
    pages = await scrape(args.floor);
    if (args.saveRaw) {
      writeFileSync(args.saveRaw, JSON.stringify(pages));
      console.log(`Saved ${pages.length} raw pages → ${args.saveRaw}`);
    }
  }

  const { months, components, conflicts, incomplete } = aggregate(pages, args.floor);
  console.log(`${Object.keys(components).length} components, ${months.length} complete months (${months[0]} .. ${months[months.length - 1]}); skipped ${incomplete} in-progress component-months, ${conflicts} conflicts`);

  // A short or broken scrape must never replace a longer committed dataset.
  if (existsSync(args.out) && !args.force) {
    const prev = JSON.parse(readFileSync(args.out, 'utf8'));
    if (months.length < prev.months.length) {
      console.error(`Refusing to shrink ${args.out}: ${prev.months.length} -> ${months.length} months (use --force)`);
      process.exit(2);
    }
  }

  const meta = {
    source: `${CONFIG.base}/uptime`,
    generatedAt: new Date().toISOString(),
    through: months[months.length - 1],
  };
  mkdirSync(dirname(args.out), { recursive: true });
  writeFileSync(args.out, serialize(meta, months, components));
  console.log(`Wrote ${args.out}`);
}

main().catch((err) => {
  console.error('ingest failed:', err);
  process.exit(1);
});
