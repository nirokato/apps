// Automated test runner for test.html using Playwright
// Usage: node run-tests.js

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9876;
const WEFT_DIR = path.join(__dirname);
const TIMEOUT = 120_000; // 2 min for WASM + network attachment

// Minimal static file server
function startServer() {
  const MIME = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.wasm': 'application/wasm',
    '.json': 'application/json',
    '.css': 'text/css',
  };

  const server = http.createServer((req, res) => {
    const filePath = path.join(WEFT_DIR, req.url === '/' ? '/test.html' : req.url);
    const ext = path.extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

async function main() {
  const server = await startServer();
  console.log(`Server running on http://localhost:${PORT}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capture console output
  page.on('console', (msg) => {
    const type = msg.type();
    if (type === 'error') {
      console.log(`  [browser:error] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    console.log(`  [browser:exception] ${err.message}`);
  });

  console.log('Loading test.html...');
  await page.goto(`http://localhost:${PORT}/test.html`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });

  // Wait for page to be ready
  await page.waitForSelector('#run-btn', { timeout: 60000 });

  // Set default timeout for all subsequent operations
  page.setDefaultTimeout(TIMEOUT);

  // Click "Run tests"
  console.log('Clicking "Run tests"...');
  await page.click('#run-btn');

  // Wait for tests to complete (button re-enables and says "Run tests again")
  console.log('Waiting for tests to complete...');
  await page.waitForFunction(
    () => {
      const btn = document.getElementById('run-btn');
      return btn && !btn.disabled && btn.textContent.includes('again');
    },
    { timeout: TIMEOUT, polling: 1000 }
  );

  // Extract results
  const results = await page.evaluate(() => {
    const tests = [];
    document.querySelectorAll('.test').forEach((el) => {
      const status = ['pass', 'fail', 'skip', 'running', 'pending']
        .find(s => el.classList.contains(s)) || 'unknown';
      const name = el.querySelector('.label')?.textContent?.trim() || '';
      const detail = el.querySelector('.detail')?.textContent?.trim() || '';
      tests.push({ status, name, detail });
    });

    const logLines = [];
    document.querySelectorAll('#log div').forEach((el) => {
      logLines.push(el.textContent);
    });

    return { tests, logLines };
  });

  // Print results
  console.log('\n=== Test Results ===\n');
  let passed = 0, failed = 0, skipped = 0;
  for (const t of results.tests) {
    const icon = t.status === 'pass' ? '✓' : t.status === 'fail' ? '✗' : '–';
    const color = t.status === 'pass' ? '\x1b[32m' : t.status === 'fail' ? '\x1b[31m' : '\x1b[90m';
    console.log(`${color}  ${icon} ${t.name}\x1b[0m`);
    if (t.detail) console.log(`    ${t.detail}`);
    if (t.status === 'pass') passed++;
    else if (t.status === 'fail') failed++;
    else skipped++;
  }

  console.log(`\n  ${passed} passed, ${failed} failed, ${skipped} skipped\n`);

  // Print event log
  console.log('=== Event Log ===\n');
  for (const line of results.logLines) {
    console.log(`  ${line}`);
  }

  await browser.close();
  server.close();

  // Exit with appropriate code
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('Test runner failed:', e.message);
  process.exit(2);
});
