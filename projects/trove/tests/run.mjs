// trove engine tests — pure ranking math, no network or model required.
// Run: node projects/trove/tests/run.mjs
import {
  tokenize, l2normalize, topKByDot, lexicalOverlap, blend, fnv1a,
} from '../search.mjs';

let passed = 0;
let failed = 0;
function check(name, cond) {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.error(`  ✗ ${name}`); }
}
const approx = (a, b, eps = 1e-5) => Math.abs(a - b) < eps;

console.log('tokenize');
{
  const t = tokenize('The Industrial Eclectic STYLE, industrial!');
  check('lowercases + strips punctuation', t.includes('industrial') && t.includes('eclectic'));
  check('drops stopwords ("the", "style")', !t.includes('the') && !t.includes('style'));
  check('dedupes repeats', t.filter((x) => x === 'industrial').length === 1);
  check('drops <2 char tokens', tokenize('a ab abc').join(',') === 'ab,abc');
}

console.log('l2normalize');
{
  const n = l2normalize(new Float32Array([3, 4]));
  check('scales to unit length', approx(Math.hypot(n[0], n[1]), 1));
  check('preserves direction', approx(n[0], 0.6) && approx(n[1], 0.8));
  check('handles zero vector without NaN', !Number.isNaN(l2normalize(new Float32Array([0, 0]))[0]));
}

console.log('topKByDot');
{
  const dims = 3;
  const matrix = new Float32Array([
    1, 0, 0,     // row 0
    0, 1, 0,     // row 1
    0.9, 0.1, 0, // row 2 (close to row 0)
  ]);
  const query = new Float32Array([1, 0, 0]);
  const ranked = topKByDot(query, matrix, dims, 3);
  check('ranks most-similar first', ranked[0].index === 0);
  check('second-closest beats orthogonal', ranked[1].index === 2 && ranked[2].index === 1);
  check('respects k limit', topKByDot(query, matrix, dims, 3, 2).length === 2);
  check('reports cosine for unit vectors', approx(ranked[0].sim, 1));
}

console.log('lexicalOverlap');
{
  const doc = new Set(['industrial', 'pipe', 'shelf']);
  check('full overlap = 1', approx(lexicalOverlap(['industrial', 'pipe'], doc), 1));
  check('partial overlap', approx(lexicalOverlap(['industrial', 'glam'], doc), 0.5));
  check('no tokens = 0', lexicalOverlap([], doc) === 0);
}

console.log('blend');
{
  check('weights semantic vs lexical', approx(blend(0.5, 1.0, 0.2), 0.5 * 0.8 + 1.0 * 0.2));
  check('pure semantic at weight 0', approx(blend(0.42, 1, 0), 0.42));
}

console.log('fnv1a');
{
  check('deterministic', fnv1a('sample-001') === fnv1a('sample-001'));
  check('distinct inputs differ', fnv1a('sample-001') !== fnv1a('sample-002'));
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
