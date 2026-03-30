// ULID: Universally Unique Lexicographically Sortable Identifier
// 10 chars timestamp (48-bit ms) + 16 chars randomness (80-bit), Crockford base32

const C = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
let lastTime = 0;
const lastRand = new Uint8Array(10);

function encodeTime(ms, len) {
  let s = '';
  for (let i = len; i > 0; i--) {
    s = C[ms % 32] + s;
    ms = Math.floor(ms / 32);
  }
  return s;
}

function encodeRandom(bytes) {
  // Encode 10 bytes (80 bits) as 16 base32 chars
  // Process 5 bytes at a time → 8 chars each
  let s = '';
  for (let block = 0; block < 2; block++) {
    const off = block * 5;
    const b0 = bytes[off], b1 = bytes[off + 1], b2 = bytes[off + 2];
    const b3 = bytes[off + 3], b4 = bytes[off + 4];
    s += C[(b0 >> 3) & 31];
    s += C[((b0 << 2) | (b1 >> 6)) & 31];
    s += C[(b1 >> 1) & 31];
    s += C[((b1 << 4) | (b2 >> 4)) & 31];
    s += C[((b2 << 1) | (b3 >> 7)) & 31];
    s += C[(b3 >> 2) & 31];
    s += C[((b3 << 3) | (b4 >> 5)) & 31];
    s += C[b4 & 31];
  }
  return s;
}

export function ulid() {
  let now = Date.now();
  if (now <= lastTime) {
    // Monotonic: increment random part
    now = lastTime;
    for (let i = 9; i >= 0; i--) {
      if (lastRand[i] < 255) { lastRand[i]++; break; }
      lastRand[i] = 0;
    }
  } else {
    lastTime = now;
    crypto.getRandomValues(lastRand);
  }
  return encodeTime(now, 10) + encodeRandom(lastRand);
}
