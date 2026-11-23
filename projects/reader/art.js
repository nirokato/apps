// The offerings, drawn as one flat SVG set so the altar looks the same on every platform.
// Each entry is the inside of a 48x48 viewBox, sitting on the ground at y = 46.
// Style: flat fills, one darker shade for form, one light highlight. No outlines, no gradients.
// Candles, tea lights, wreaths, ribbons and painted stones are drawn by the page itself.

const petals = (n, cx, cy, dist, rx, ry, fill, turn = 0) =>
  Array.from({ length: n }, (_, i) =>
    `<ellipse cx="${cx}" cy="${cy - dist}" rx="${rx}" ry="${ry}" fill="${fill}" transform="rotate(${(360 / n) * i + turn} ${cx} ${cy})"/>`).join('');

const starPath = (cx, cy, R, r) =>
  'M' + Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2, d = i % 2 ? r : R;
    return `${(cx + Math.cos(a) * d).toFixed(1)} ${(cy + Math.sin(a) * d).toFixed(1)}`;
  }).join('L') + 'z';

const G1 = '#3f7d3a', G2 = '#57a34d';
const stem = (top = 20) =>
  `<path d="M24 46V${top}" stroke="${G1}" stroke-width="2.6" stroke-linecap="round" fill="none"/>` +
  `<path d="M24 38q-10-1-12-10 10 0 12 10z" fill="${G2}"/><path d="M24 34q9-2 10-9-9 1-10 9z" fill="${G1}"/>`;
const steam = '<path d="M19 17q-3-3 0-6t0-6M28 17q-3-3 0-6t0-6" stroke="#fff" stroke-opacity=".75" stroke-width="1.8" stroke-linecap="round" fill="none"/>';
const flower5 = (cx, cy, r, fill, mid) => petals(5, cx, cy, r * 0.9, r * 0.75, r * 0.9, fill) + `<circle cx="${cx}" cy="${cy}" r="${(r * 0.45).toFixed(1)}" fill="${mid}"/>`;

export const ART = {
  // ── Flowers ──
  tulip: stem(22) +
    '<path d="M14 9q4 4 5 0l5-6 5 6q1 4 5 0v9a10 10 0 0 1-20 0z" fill="#ef5d8a"/>' +
    '<path d="M24 3l5 6q1 4 5 0v9a10 10 0 0 1-10 10z" fill="#d6426f"/><path d="M17 14v5a7 7 0 0 0 3 5" stroke="#ffb3cb" stroke-width="1.8" stroke-linecap="round" fill="none"/>',
  rose: stem(22) +
    '<path d="M17 24l7-4 7 4-7 3z" fill="#2c6231"/><circle cx="24" cy="14" r="10.5" fill="#c9243f"/>' +
    '<path d="M24 3.5a10.5 10.5 0 0 1 0 21z" fill="#a81a33"/>' +
    '<path d="M24 14m-5.5 1a5.5 5.5 0 1 1 5.5 4.5M24 14m-2 0a2 2 0 1 1 2 2.4" stroke="#7d1226" stroke-width="1.7" stroke-linecap="round" fill="none"/>' +
    '<path d="M16.500 10a8 8 0 0 1 4-4" stroke="#f0728a" stroke-width="1.6" stroke-linecap="round" fill="none"/>',
  sunflower: stem(24) + petals(14, 24, 15, 9, 2.9, 5.4, '#f6b623') + petals(14, 24, 15, 8, 2.2, 4.2, '#ffd35c', 12.8) +
    '<circle cx="24" cy="15" r="6.6" fill="#6b3f1d"/><circle cx="24" cy="15" r="3.6" fill="#8a5527"/><circle cx="22" cy="13" r="1" fill="#b57a3d"/>',
  daisy: stem(24) + petals(11, 24, 15, 8, 2.6, 5.4, '#fdfdf8') +
    '<circle cx="24" cy="15" r="4.6" fill="#f6c02c"/><path d="M24 10.400a4.600 4.600 0 0 1 0 9.200z" fill="#e0a516"/>',
  blossom:
    '<path d="M8 46q10-14 14-22t12-16" stroke="#6b4a35" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
    '<path d="M22 24q-6-2-9-8" stroke="#6b4a35" stroke-width="2" stroke-linecap="round" fill="none"/>' +
    flower5(33, 10, 6, '#ffc2d6', '#e8587f') + flower5(13, 15, 5.4, '#ffd3e1', '#e8587f') + flower5(25, 27, 5.6, '#ffb1ca', '#e8587f') +
    '<circle cx="17" cy="34" r="2.2" fill="#ffc2d6"/><circle cx="29" cy="18" r="1.8" fill="#ffd3e1"/>',
  hibiscus: stem(24) + petals(5, 24, 15, 7.5, 6.4, 7.6, '#f0483e') + petals(5, 24, 15, 4, 2.6, 4, '#c22a2a') +
    '<path d="M24 15l7-9" stroke="#f6c02c" stroke-width="2" stroke-linecap="round"/><circle cx="31.500" cy="5.500" r="2.2" fill="#f6c02c"/>',
  bouquet:
    '<path d="M9 18q6-10 15-10t15 10l-9 6H18z" fill="#57a34d"/><path d="M24 8q9 0 15 10l-9 6h-6z" fill="#3f7d3a"/>' +
    '<circle cx="15" cy="15" r="5.2" fill="#ef5d8a"/><circle cx="33" cy="15" r="5.2" fill="#f6b623"/><circle cx="24" cy="10" r="5.6" fill="#fdfdf8"/>' +
    '<circle cx="24" cy="10" r="2.2" fill="#f6c02c"/><circle cx="19.500" cy="20" r="4.6" fill="#b79be0"/><circle cx="29" cy="20.500" r="4.6" fill="#f0483e"/>' +
    '<path d="M12 22h24l-9 24h-6z" fill="#f1e8d3"/><path d="M24 22h12l-9 24h-3z" fill="#ded2b6"/>' +
    '<path d="M17 34h14l-1.500 4h-11z" fill="#e8601c"/>',
  silk:
    '<path d="M24 46V22" stroke="#7f8a6d" stroke-width="2.2" stroke-linecap="round"/><path d="M24 36q8-1 10-7-8 0-10 7z" fill="#8fa37c"/>' +
    petals(8, 24, 14, 7.5, 4.2, 6, '#b79be0') + petals(8, 24, 14, 4.4, 2.8, 4, '#d6c4f2', 22.5) +
    '<circle cx="24" cy="14" r="3" fill="#f3ecff"/><circle cx="24" cy="14" r="1.2" fill="#8d6cc4"/>' +
    '<path d="M24 30l7 3" stroke="#c9c2b0" stroke-width="1"/><rect x="30" y="31" width="7" height="4.600" rx=".8" fill="#fbf7ee" transform="rotate(12 33 33)"/>',

  // ── Light ──
  lantern:
    '<path d="M18 7q6-6 12 0" stroke="#3a3330" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="24" cy="26" rx="14" ry="16" fill="#d8402f"/><ellipse cx="24" cy="26" rx="7.500" ry="16" fill="#e9573f"/>' +
    '<ellipse cx="24" cy="27" rx="5" ry="9" fill="#ffc15e" opacity=".85"/>' +
    '<path d="M11 20h26M10 26h28M11 32h26" stroke="#a82a1d" stroke-width="1.3"/>' +
    '<rect x="17" y="7" width="14" height="4.500" rx="1.2" fill="#3a3330"/><rect x="17" y="40.500" width="14" height="4.500" rx="1.2" fill="#3a3330"/>',

  // ── Cards and notes ──
  card:
    '<path d="M33 13l8 5v28l-8-4z" fill="#ddd4c0"/><path d="M9 17l24-4v29L9 46z" fill="#fbf7ee"/>' +
    '<path d="M21 34q-7-4.500-7-9a3.600 3.600 0 0 1 7-1.200 3.600 3.600 0 0 1 7 1.200q0 4.500-7 9z" fill="#d8402f" transform="rotate(-8 21 28)"/>',
  note:
    '<path d="M9 17l27-4 4 27-27 5z" fill="#fff6c9"/><path d="M36 13l4 27-6 1z" fill="#efe2a3"/>' +
    '<path d="M14 22l17-2.500M15 27l17-2.500M16 32l17-2.500M17 37l10-1.500" stroke="#8d8767" stroke-width="1.5" stroke-linecap="round"/>',
  letter:
    '<rect x="5" y="19" width="38" height="26" rx="2" fill="#f4efe4"/><path d="M5 43l14-12h10l14 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" fill="#e2dac8"/>' +
    '<path d="M5 21l19 15 19-15" stroke="#cfc5ae" stroke-width="1.6" fill="none" stroke-linejoin="round"/>' +
    '<circle cx="24" cy="35" r="4.600" fill="#b3261e"/><circle cx="23" cy="34" r="1.6" fill="#d9544a"/>',
  bookmark:
    '<path d="M24 8q-6-6-9 0" stroke="#c9a23a" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M16 8h16v38l-8-7-8 7z" fill="#d8402f"/><path d="M24 8h8v38l-8-7z" fill="#b93223"/>' +
    `<path d="${starPath(24, 21, 5, 2.1)}" fill="#ffd35c"/>`,

  // ── Mementos ──
  star: `<path d="${starPath(24, 26, 20, 8.4)}" fill="#f6c02c" stroke="#f6c02c" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M24 6l5.200 12.600 13.800 1.200-10.400 9L35.700 42 24 34.800z" fill="#e0a516"/>` +
    '<path d="M17 20l3-7" stroke="#fff3c4" stroke-width="2" stroke-linecap="round"/>',
  paper:
    '<path d="M5 24h38v20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" fill="#eeeee8"/><path d="M5 24h38v5H5z" fill="#d9d9d0"/>' +
    '<rect x="9" y="31" width="30" height="3.600" fill="#3a3d45"/>' +
    '<path d="M9 38h13M9 41h13M9 44h9M26 38h13M26 41h13M26 44h10" stroke="#9a9b98" stroke-width="1.3"/>' +
    '<path d="M5 24l4-4h30l4 4z" fill="#f8f8f4"/>',
  floppy:
    '<path d="M8 10h28l4 4v28a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z" fill="#3b4150"/><path d="M24 10h12l4 4v28a2 2 0 0 1-2 2H24z" fill="#2f3441"/>' +
    '<rect x="15" y="10" width="17" height="12" fill="#c9cdd6"/><rect x="25" y="12" width="4.500" height="8" rx=".8" fill="#3b4150"/>' +
    '<rect x="13" y="27" width="22" height="17" fill="#f6f2e7"/><path d="M16 32h16M16 36h16M16 40h10" stroke="#e8601c" stroke-width="1.5"/>',
  photo:
    '<g transform="rotate(-7 24 28)"><rect x="9" y="9" width="30" height="36" rx="1.500" fill="#fbfaf5"/>' +
    '<rect x="12" y="12" width="24" height="23" fill="#eaf0fb"/><rect x="12" y="12" width="24" height="5" fill="#c2cff1"/>' +
    '<path d="M15 21h18M15 25h18M15 29h18M15 33h12" stroke="#7d93c9" stroke-width="1.6"/>' +
    '<circle cx="14.500" cy="14.500" r="1" fill="#f6c02c"/></g>',
  bear:
    '<circle cx="15" cy="9" r="4.600" fill="#a0672f"/><circle cx="33" cy="9" r="4.600" fill="#a0672f"/><circle cx="15" cy="9" r="2.200" fill="#e3bf8f"/><circle cx="33" cy="9" r="2.200" fill="#e3bf8f"/>' +
    '<ellipse cx="10.500" cy="30" rx="4" ry="6.500" fill="#a0672f" transform="rotate(24 10.500 30)"/><ellipse cx="37.500" cy="30" rx="4" ry="6.500" fill="#a0672f" transform="rotate(-24 37.500 30)"/>' +
    '<ellipse cx="24" cy="34" rx="11" ry="11.500" fill="#b5793e"/><ellipse cx="24" cy="35.500" rx="6" ry="7" fill="#d9a968"/>' +
    '<ellipse cx="15.500" cy="43" rx="5" ry="3.600" fill="#a0672f"/><ellipse cx="32.500" cy="43" rx="5" ry="3.600" fill="#a0672f"/>' +
    '<ellipse cx="15.500" cy="43.300" rx="2.600" ry="1.800" fill="#e3bf8f"/><ellipse cx="32.500" cy="43.300" rx="2.600" ry="1.800" fill="#e3bf8f"/>' +
    '<circle cx="24" cy="16" r="10" fill="#b5793e"/><ellipse cx="24" cy="19.500" rx="4.600" ry="3.600" fill="#e3bf8f"/>' +
    '<ellipse cx="24" cy="18" rx="1.700" ry="1.200" fill="#3a2a1c"/><circle cx="19.500" cy="14" r="1.300" fill="#3a2a1c"/><circle cx="28.500" cy="14" r="1.300" fill="#3a2a1c"/>' +
    '<path d="M24 26l-6-3v6zM24 26l6-3v6z" fill="#3b6fd4"/><circle cx="24" cy="26" r="1.700" fill="#2a56ad"/>',
  keyboard:
    '<path d="M6 28h36l3 15a2 2 0 0 1-2 2.500H5A2 2 0 0 1 3 43z" fill="#c8ccd6"/><path d="M6 28h36l1 5H5z" fill="#e3e6ec"/>' +
    [0, 1, 2].map((r) => Array.from({ length: 7 }, (_, c) => {
      const hot = r === 1 && (c === 4 || c === 5);
      return `<rect x="${(7.5 + c * 4.9 - r * 0.5).toFixed(1)}" y="${30.5 + r * 4.4}" width="3.8" height="3.2" rx=".7" fill="${hot ? '#e8601c' : '#f8f9fb'}"/>`;
    }).join('')).join('') + '<rect x="15" y="43" width="18" height="1.6" rx=".8" fill="#f8f9fb"/>',
  glasses:
    '<path d="M8 30l-3-10M40 30l3-10" stroke="#2f3340" stroke-width="2.4" stroke-linecap="round"/>' +
    '<circle cx="14" cy="35" r="8.500" fill="#d9e8f7" fill-opacity=".75"/><circle cx="34" cy="35" r="8.500" fill="#d9e8f7" fill-opacity=".75"/>' +
    '<circle cx="14" cy="35" r="8.500" fill="none" stroke="#2f3340" stroke-width="2.6"/><circle cx="34" cy="35" r="8.500" fill="none" stroke="#2f3340" stroke-width="2.6"/>' +
    '<path d="M22.300 34q1.700-2 3.400 0" stroke="#2f3340" stroke-width="2.4" fill="none"/><path d="M10 32l3-3M30 32l3-3" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>',

  // ── Trinkets ──
  stone:
    '<path d="M6 40l5-12 11-7 13 3 8 13-3 9H10z" fill="#8a8e96"/><path d="M11 28l11-7 3 12-8 5z" fill="#a9adb3"/><path d="M22 21l13 3 8 13-18-4z" fill="#9a9ea6"/>' +
    '<path d="M6 40l11-2 8-5 18 4-3 9H10z" fill="#74787f"/>',
  coin:
    '<ellipse cx="24" cy="38.500" rx="17" ry="7.500" fill="#b9861a"/><path d="M7 34.500h34v4H7z" fill="#b9861a"/><ellipse cx="24" cy="34.500" rx="17" ry="7.500" fill="#f2c230"/>' +
    '<ellipse cx="24" cy="34.500" rx="12.500" ry="5" fill="none" stroke="#d9a520" stroke-width="1.6"/>' +
    '<circle cx="20.500" cy="36" r="1.300" fill="#c9961a"/><path d="M19.500 33a4.500 2.200 0 0 1 5 2.600M19.500 30.800a8.500 4 0 0 1 9 4.600" stroke="#c9961a" stroke-width="1.5" stroke-linecap="round" fill="none"/>' +
    '<path d="M10 32q4-3.500 10-4.500" stroke="#fff0b0" stroke-width="1.6" stroke-linecap="round" fill="none"/>',
  shell:
    '<path d="M24 45L5 27a19.500 19.500 0 0 1 38 0z" fill="#f6d9c4"/><path d="M24 45l19-18a19.500 19.500 0 0 0-19-15z" fill="#eec3a8"/>' +
    '<path d="M24 44L9 21M24 44l-8-29M24 44V12M24 44l8-29M24 44l15-23" stroke="#d99f80" stroke-width="1.5" stroke-linecap="round"/>' +
    '<path d="M18 42h12l-2 4h-8z" fill="#d99f80"/>',

  // ── Food and drink ──
  coffee: steam +
    '<ellipse cx="24" cy="43" rx="18" ry="3.600" fill="#dcd6c8"/><ellipse cx="24" cy="42.300" rx="18" ry="3.200" fill="#f1ece0"/>' +
    '<path d="M35 26h3.500a4.500 4.500 0 0 1 0 9H34" stroke="#f1ece0" stroke-width="3" fill="none"/>' +
    '<path d="M10 22h26v8a13 12.500 0 0 1-26 0z" fill="#fbfaf6"/><path d="M24 22h12v8a13 12.500 0 0 1-12 12.500z" fill="#e6e1d4"/>' +
    '<ellipse cx="23" cy="22" rx="13" ry="3.400" fill="#fbfaf6"/><ellipse cx="23" cy="22.300" rx="11" ry="2.500" fill="#6b4226"/>',
  tea: steam +
    '<path d="M12 20h24l-2.500 22a3 3 0 0 1-3 2.600h-13a3 3 0 0 1-3-2.600z" fill="#8fb7a5"/><path d="M24 20h12l-2.500 22a3 3 0 0 1-3 2.600H24z" fill="#76a08d"/>' +
    '<ellipse cx="24" cy="20" rx="12" ry="3.200" fill="#a9cbbb"/><ellipse cx="24" cy="20.300" rx="10" ry="2.300" fill="#b9c44a"/>' +
    '<path d="M16 26l1.500 13" stroke="#c4ddd1" stroke-width="1.8" stroke-linecap="round"/>',
  beer:
    '<path d="M33 24h4a4.500 4.500 0 0 1 4.500 4.500v6A4.500 4.500 0 0 1 37 39h-4" stroke="#e9eef3" stroke-width="3.200" fill="none"/>' +
    '<rect x="11" y="16" width="23" height="29" rx="2.500" fill="#f0b429"/><rect x="24" y="16" width="10" height="29" rx="2.500" fill="#d99a14"/>' +
    '<path d="M15 24v15M20 24v15" stroke="#ffd876" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M9 17a4 4 0 0 1 3-6 5 5 0 0 1 8-3 5.500 5.500 0 0 1 9 1 4.500 4.500 0 0 1 7 5 3.500 3.500 0 0 1-1 6.500H12A3.500 3.500 0 0 1 9 17z" fill="#fffdf6"/>' +
    '<path d="M14 20.500v4a1.800 1.800 0 0 0 3.600 0v-4z" fill="#fffdf6"/>',
  whiskey:
    '<path d="M11 20h26l-2.500 23a2.500 2.500 0 0 1-2.500 2.200H16a2.500 2.500 0 0 1-2.500-2.200z" fill="#dfe9f2" fill-opacity=".55"/>' +
    '<path d="M12.500 32h23l-1 11a2.500 2.500 0 0 1-2.500 2.200H16a2.500 2.500 0 0 1-2.500-2.200z" fill="#c9792a"/><path d="M24 32h11.500l-1 11a2.500 2.500 0 0 1-2.500 2.200h-8z" fill="#ad6420"/>' +
    '<rect x="16" y="27" width="8.500" height="8.500" rx="1.500" fill="#f2f8fc" fill-opacity=".9" transform="rotate(-12 20 31)"/>' +
    '<path d="M11 20h26" stroke="#f4f8fb" stroke-width="1.8" stroke-linecap="round"/><path d="M15 23l1.500 17" stroke="#fff" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round"/>',
  sake:
    '<path d="M14 8h8v3.500q0 3 2 5.500 4 5 4 12v13a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V29q0-7 4-12 2-2.500 2-5.500z" fill="#f4f2ea"/>' +
    '<path d="M18 8h4v3.500q0 3 2 5.500 4 5 4 12v13a3 3 0 0 1-3 3h-7z" fill="#dedbd0"/>' +
    '<path d="M8.200 27h19.600v6H8.200z" fill="#3b6fd4"/><rect x="13" y="6" width="10" height="3" rx="1.500" fill="#dedbd0"/>' +
    '<path d="M31 36h13l-1.500 7a2.500 2.500 0 0 1-2.500 2h-5a2.500 2.500 0 0 1-2.500-2z" fill="#f4f2ea"/><path d="M31 36h13l-.5 2.400H31.500z" fill="#3b6fd4"/>',
  orange:
    '<circle cx="24" cy="30" r="15.500" fill="#f28a1c"/><path d="M24 14.500a15.500 15.500 0 0 1 0 31z" fill="#de7410"/>' +
    '<path d="M24 15v-4" stroke="#6b4a35" stroke-width="2.2" stroke-linecap="round"/><path d="M24 13q7-7 13-3-5 6-13 3z" fill="#57a34d"/>' +
    '<path d="M13.500 26a11 11 0 0 1 6-7" stroke="#ffc37a" stroke-width="2.2" stroke-linecap="round" fill="none"/><circle cx="24" cy="17.500" r="1.100" fill="#b85c08"/>',
  cookie:
    '<circle cx="24" cy="30" r="15.500" fill="#b9793c"/><circle cx="23" cy="29" r="14.500" fill="#d39a58"/>' +
    '<circle cx="17" cy="24" r="2.400" fill="#5a3a1e"/><circle cx="27" cy="21" r="2" fill="#5a3a1e"/><circle cx="31" cy="30" r="2.500" fill="#5a3a1e"/>' +
    '<circle cx="21" cy="33" r="2.200" fill="#5a3a1e"/><circle cx="28.500" cy="38" r="1.800" fill="#5a3a1e"/><circle cx="14" cy="32.500" r="1.600" fill="#5a3a1e"/>' +
    '<path d="M12 23a12 12 0 0 1 6-6" stroke="#ecc083" stroke-width="1.8" stroke-linecap="round" fill="none"/>',
  rice:
    '<path d="M11 28q-1-9 5-11 2-5 8-5t8 5q6 2 5 11z" fill="#fdfdf8"/><path d="M24 12q6 0 8 5 6 2 5 11H24z" fill="#ecebe2"/>' +
    '<path d="M17 21l2-1M24 17l2 1M29 23l2-1M21 25l2 1" stroke="#d6d4c6" stroke-width="1.4" stroke-linecap="round"/>' +
    '<path d="M6 28h36a18 14.500 0 0 1-36 0z" fill="#2f4f8f"/><path d="M24 28h18a18 14.500 0 0 1-18 14.500z" fill="#263f73"/>' +
    '<path d="M6 28h36l-.400 3H6.400z" fill="#f4f2ea"/><rect x="17" y="42" width="14" height="4" rx="1" fill="#263f73"/>',
};
