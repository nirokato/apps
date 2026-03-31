#!/usr/bin/env node
// Headless Chromium test — loads weft, captures console via --enable-logging
// Usage: node test-headless.mjs [url] [timeout_seconds]

import { spawn } from 'child_process';

const url = process.argv[2] || 'http://localhost:8000';
const timeoutSec = parseInt(process.argv[3]) || 60;
const errors = [];
let resolved = false;

console.log(`\n🔍 Loading ${url} (timeout: ${timeoutSec}s)\n`);

const chrome = spawn('chromium', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-software-rasterizer',
  '--enable-logging=stderr',
  '--v=0',
  url,
], { stdio: ['ignore', 'ignore', 'pipe'] });

chrome.stderr.on('data', (data) => {
  const lines = data.toString().split('\n');
  for (const line of lines) {
    // Extract CONSOLE messages
    const match = line.match(/CONSOLE\(\d+\)\] "(.*)".*source: (.*) \((\d+)\)/);
    if (match) {
      const text = match[1];
      const isError = text.includes('[weft:error]') || text.includes('error');
      const prefix = isError ? '❌' : '  ';
      console.log(`${prefix} ${text}`);
      if (isError) errors.push(text);

      if (text.includes('AttachedGood') || text.includes('AttachedStrong') || text.includes('FullyAttached')) {
        finish(true, text);
      }
      if (text.includes('Veilid init failed')) {
        finish(false, text);
      }
    }
    // Also catch Worker errors from stderr
    if (line.includes('Worker') && line.includes('error')) {
      console.log(`❌ [worker] ${line.trim()}`);
    }
  }
});

function finish(ok, msg) {
  if (resolved) return;
  resolved = true;
  console.log(`\n${'='.repeat(60)}`);
  console.log(ok ? `✅ SUCCESS: ${msg}` : `❌ FAILED: ${msg}`);
  if (errors.length) {
    console.log(`\n${errors.length} error(s):`);
    errors.forEach(e => console.log(`  - ${e}`));
  }
  console.log('='.repeat(60));
  chrome.kill();
  process.exit(ok ? 0 : 1);
}

setTimeout(() => finish(false, `Timeout (${timeoutSec}s)`), timeoutSec * 1000);
process.on('SIGINT', () => { chrome.kill(); process.exit(1); });
