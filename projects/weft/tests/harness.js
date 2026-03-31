// Minimal TAP test harness for browser-based tests
// Outputs TAP (Test Anything Protocol) via console.log
// Usage: import { t } from './harness.js'; await t.test('name', async (assert) => { ... }); t.end();

let count = 0;
let pass = 0;
let fail = 0;
const queue = [];

console.log('TAP version 14');

export const t = {
  test(name, fn) {
    queue.push({ name, fn });
  },

  async run() {
    for (const { name, fn } of queue) {
      count++;
      try {
        await fn(assertions(count, name));
        pass++;
        console.log(`ok ${count} - ${name}`);
      } catch (e) {
        fail++;
        console.log(`not ok ${count} - ${name}`);
        console.log(`  ---`);
        console.log(`  message: ${JSON.stringify(e.message || String(e))}`);
        if (e.stack) console.log(`  stack: ${e.stack.split('\n')[1]?.trim()}`);
        console.log(`  ---`);
      }
    }
    console.log(`1..${count}`);
    console.log(`# pass ${pass}`);
    console.log(`# fail ${fail}`);
    window.__done = true;
    window.__pass = pass;
    window.__fail = fail;
  },

  end() { return this.run(); },
};

function assertions(num, testName) {
  return {
    ok(val, msg = 'expected truthy') {
      if (!val) throw new Error(msg);
    },
    notOk(val, msg = 'expected falsy') {
      if (val) throw new Error(msg);
    },
    equal(a, b, msg) {
      if (a !== b) throw new Error(msg || `expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
    },
    notEqual(a, b, msg) {
      if (a === b) throw new Error(msg || `expected not ${JSON.stringify(b)}`);
    },
    deepEqual(a, b, msg) {
      if (JSON.stringify(a) !== JSON.stringify(b))
        throw new Error(msg || `expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
    },
    throws(fn, msg = 'expected to throw') {
      let threw = false;
      try { fn(); } catch (e) { threw = true; }
      if (!threw) throw new Error(msg);
    },
    async rejects(promise, msg = 'expected rejection') {
      try { await promise; throw new Error(msg); } catch (e) {
        if (e.message === msg) throw e; // rethrow our own error
      }
    },
  };
}
