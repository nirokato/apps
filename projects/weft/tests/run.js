// Test runner — discovers and runs all *.test.html files via Playwright
// Usage: node tests/run.js [optional-glob]

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9900;
const WEFT_DIR = path.resolve(__dirname, '..');
const TEST_DIR = __dirname;
const TIMEOUT = 60_000; // 60s per test file

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.wasm': 'application/wasm',
  '.json': 'application/json',
  '.css': 'text/css',
};

// --- Static file server ---

function startServer() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let fp = path.join(WEFT_DIR, url);
    if (fp.endsWith('/')) fp += 'index.html';

    if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(fp);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(fp).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

// --- Discover test files ---

function discoverTests(filterArg) {
  const files = fs.readdirSync(TEST_DIR)
    .filter(f => f.endsWith('.test.html'))
    .sort();

  if (filterArg) {
    return files.filter(f => f.includes(filterArg));
  }
  return files;
}

// --- Run a single test file ---

async function runTestFile(browser, filename) {
  const context = await browser.newContext();
  const page = await context.newPage();

  const lines = [];
  const errors = [];

  page.on('console', (msg) => {
    const text = msg.text();
    lines.push(text);
  });

  page.on('pageerror', (err) => {
    errors.push(err.message);
  });

  const url = `http://localhost:${PORT}/tests/${filename}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });

  // Wait for tests to complete
  try {
    await page.waitForFunction(() => window.__done === true, { timeout: TIMEOUT });
  } catch (e) {
    errors.push(`Timeout: tests did not complete within ${TIMEOUT / 1000}s`);
  }

  const result = await page.evaluate(() => ({
    pass: window.__pass || 0,
    fail: window.__fail || 0,
    done: window.__done || false,
  }));

  await context.close();

  return { filename, lines, errors, ...result };
}

// --- TAP output parsing ---

function printResults(result) {
  const label = result.fail > 0 ? '\x1b[31m✗\x1b[0m' : '\x1b[32m✓\x1b[0m';
  console.log(`\n${label} ${result.filename} (${result.pass} pass, ${result.fail} fail)`);

  // Print individual test results
  for (const line of result.lines) {
    if (line.startsWith('ok ')) {
      console.log(`  \x1b[32m${line}\x1b[0m`);
    } else if (line.startsWith('not ok ')) {
      console.log(`  \x1b[31m${line}\x1b[0m`);
    } else if (line.startsWith('  ---') || line.startsWith('  message:') || line.startsWith('  stack:')) {
      console.log(`  \x1b[90m${line}\x1b[0m`);
    }
    // Skip TAP boilerplate (version, plan, summary)
  }

  for (const err of result.errors) {
    console.log(`  \x1b[31mERROR: ${err}\x1b[0m`);
  }
}

// --- Main ---

(async () => {
  const filterArg = process.argv[2] || null;
  const testFiles = discoverTests(filterArg);

  if (testFiles.length === 0) {
    console.error('No test files found' + (filterArg ? ` matching "${filterArg}"` : ''));
    process.exit(1);
  }

  console.log(`Running ${testFiles.length} test file(s)...`);

  const server = await startServer();
  const browser = await chromium.launch();

  let totalPass = 0;
  let totalFail = 0;

  for (const file of testFiles) {
    const result = await runTestFile(browser, file);
    printResults(result);
    totalPass += result.pass;
    totalFail += result.fail;
    if (result.errors.length > 0 && !result.done) totalFail++;
  }

  await browser.close();
  server.close();

  // Summary
  console.log(`\n${'='.repeat(50)}`);
  if (totalFail > 0) {
    console.log(`\x1b[31m${totalPass + totalFail} tests: ${totalPass} passed, ${totalFail} failed\x1b[0m`);
    process.exit(1);
  } else {
    console.log(`\x1b[32m${totalPass} tests passed\x1b[0m`);
    process.exit(0);
  }
})();
