// Everything that can be laid at the altar, and every word that can go with it.
// Shared by the page (index.html) and the worker (_worker.js). The worker only
// accepts ids and indexes from these lists, so no visitor-typed text is ever stored.
//
// The lists are append-only: stored offerings point at PHRASES and SIGS by index
// and at KINDS by key, so reordering or deleting entries rewrites history.

export const CATEGORIES = [
  { id: 'flowers',  name: 'Flowers',  many: 'flowers',           blurb: 'Fresh blooms wilt after a few days. The silk one never does.' },
  { id: 'candles',  name: 'Candles',  many: 'candles',           blurb: 'A candle burns for a day and a half. Best seen at night.' },
  { id: 'wreaths',  name: 'Wreaths',  many: 'wreaths and ribbons', blurb: 'Wreaths and ribbons, in the colors of the cause.' },
  { id: 'notes',    name: 'Notes',    many: 'cards and notes',   blurb: 'A card needs a few words. Pick them below.' },
  { id: 'mementos', name: 'Mementos', many: 'mementos',          blurb: 'Things it would have recognised.' },
  { id: 'trinkets', name: 'Trinkets', many: 'trinkets',          blurb: 'Small things, left the way people leave stones.' },
  { id: 'food',     name: 'Food',     many: 'food and drinks',   blurb: 'Something to share. It kept a lot of mornings company.' },
];

// e: emoji art. art: drawn by the page (candle, tealight, wreath, ribbon, pebble).
// fresh: wilts with age. note: must carry a phrase. variants: [label, value] pairs.
const RIBBONS = [['RSS orange', '#f26522'], ['Reader blue', '#3b6fd4'], ['white', '#f4f1e8'], ['black', '#26262b']];

export const KINDS = {
  tulip:     { c: 'flowers', e: '🌷', n: 'a tulip', fresh: true },
  rose:      { c: 'flowers', e: '🌹', n: 'a rose', fresh: true },
  sunflower: { c: 'flowers', e: '🌻', n: 'a sunflower', fresh: true },
  daisy:     { c: 'flowers', e: '🌼', n: 'a daisy', fresh: true },
  blossom:   { c: 'flowers', e: '🌸', n: 'a cherry blossom', fresh: true },
  hibiscus:  { c: 'flowers', e: '🌺', n: 'a hibiscus', fresh: true },
  bouquet:   { c: 'flowers', e: '💐', n: 'a bouquet', fresh: true },
  silk:      { c: 'flowers', e: '🏵️', n: 'a silk flower' },

  candle:    { c: 'candles', art: 'candle', n: 'a candle', burns: true,
               variants: [['ivory', '#f1e7cd'], ['RSS orange', '#f08a3c'], ['Reader blue', '#7d9fe6'], ['red', '#c9473d']] },
  tealight:  { c: 'candles', art: 'tealight', n: 'a tea light', burns: true },
  lantern:   { c: 'candles', e: '🏮', n: 'a paper lantern', glow: true },

  wreath:    { c: 'wreaths', art: 'wreath', n: 'a wreath', variants: RIBBONS, vword: 'ribbon' },
  ribbon:    { c: 'wreaths', art: 'ribbon', n: 'a ribbon', variants: RIBBONS },

  card:      { c: 'notes', e: '💌', n: 'a card', note: true },
  note:      { c: 'notes', e: '📝', n: 'a handwritten note', note: true },
  letter:    { c: 'notes', e: '✉️', n: 'a sealed letter', note: true },
  bookmark:  { c: 'notes', e: '🔖', n: 'a bookmark, so it can find its place', note: true },

  star:      { c: 'mementos', e: '⭐', n: 'a starred item' },
  paper:     { c: 'mementos', e: '📰', n: 'the morning paper' },
  floppy:    { c: 'mementos', e: '💾', n: 'a subscriptions.xml, saved to disk' },
  photo:     { c: 'mementos', e: '📷', n: 'a photo of an old reading list' },
  bear:      { c: 'mementos', e: '🧸', n: 'a stuffed bear' },
  keyboard:  { c: 'mementos', e: '⌨️', n: 'a keyboard with j and k worn smooth' },

  pebble:    { c: 'trinkets', art: 'pebble', n: 'a painted stone',
               variants: [['j', 'j'], ['k', 'k'], ['1000+', '1000+'], ['a star', '★'], ['r', 'r'], ['g a', 'g a']], vword: 'says' },
  stone:     { c: 'trinkets', e: '🪨', n: 'a plain stone' },
  coin:      { c: 'trinkets', e: '🪙', n: 'a coin' },
  shell:     { c: 'trinkets', e: '🐚', n: 'a shell' },

  coffee:    { c: 'food', e: '☕', n: 'a cup of coffee' },
  tea:       { c: 'food', e: '🍵', n: 'a cup of tea' },
  beer:      { c: 'food', e: '🍺', n: 'a beer' },
  whiskey:   { c: 'food', e: '🥃', n: 'a small glass of something strong' },
  sake:      { c: 'food', e: '🍶', n: 'a flask of sake' },
  orange:    { c: 'food', e: '🍊', n: 'an orange, the right color' },
  cookie:    { c: 'food', e: '🍪', n: 'a cookie' },
  rice:      { c: 'food', e: '🍚', n: 'a bowl of rice' },
};

export const PHRASES = [
  'Marked as read. Never forgotten.',
  'You were my morning paper.',
  'j, k, j, k, forever.',
  '1000+ thanks.',
  'Still starred.',
  'I never did export my starred items.',
  'The web felt smaller with you.',
  'You kept me subscribed to my friends.',
  'Mark all as read. Rest now.',
  'I found my favorite blogs through you.',
  'Shared with note: thank you.',
  'No new items. Just gratitude.',
  'My feeds still remember you.',
  'For everyone who met in Shared items.',
  'Gone, but still in my OPML.',
  'You showed me the web was a river.',
  'Pressing r one last time.',
  'Thank you, Reader team.',
  'Unread count: zero. Finally.',
  'Long live RSS.',
  'Long live Atom.',
  'Rest in feeds.',
  'I still type your URL sometimes.',
  'Nothing since has felt like home.',
];

export const SIGS = [
  'a former subscriber',
  'a list view loyalist',
  'an expanded view partisan',
  'a keyboard shortcut devotee',
  'someone with 1000+ unread',
  'a Shared items regular',
  'an OPML hoarder',
  'a blogger you once fetched',
  'a feed that still validates',
  'someone who arrived late',
  'a self-hoster',
  'someone who moved to another reader',
  'a passer-by',
];

const clampIndex = (list, i) => (Number.isInteger(i) && i >= 0 && i < list.length ? i : 0);

// "a wreath with a Reader blue ribbon", "a painted stone that says “j”"
export function describe(kindId, variant) {
  const k = KINDS[kindId];
  if (!k) return 'something';
  if (!k.variants) return k.n;
  const label = k.variants[clampIndex(k.variants, variant)][0];
  if (k.vword === 'ribbon') return `${k.n} with a ${label} ribbon`;
  if (k.vword === 'says') return `${k.n} that says “${label}”`;
  return k.n.replace(/^(an?) /, (_, a) => `${/^[aeiou]/i.test(label) ? 'an' : 'a'} ${label} `);
}

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Offerings travel as tuples: [id, unixSeconds, kind, variant, phrase (-1 = none), sig, x, y]
export function validOffering(o) {
  if (!o || typeof o !== 'object') return false;
  const k = Object.hasOwn(KINDS, o.kind) ? KINDS[o.kind] : null;
  const int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
  return !!k
    && int(o.variant, 0, k.variants ? k.variants.length - 1 : 0)
    && int(o.phrase, k.note ? 0 : -1, PHRASES.length - 1)
    && int(o.sig, 0, SIGS.length - 1)
    && int(o.x, 0, 999) && int(o.y, 0, 999);
}
