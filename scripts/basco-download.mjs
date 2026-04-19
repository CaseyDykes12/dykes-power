import fs from 'node:fs';
import path from 'node:path';

const URLS = JSON.parse(fs.readFileSync('scripts/basco-urls.json', 'utf8'));
const OUT_ROOT = 'public/images/ferris/basco';
const CONCURRENCY = 6;

function destFor(entry) {
  const m = entry.filename.match(/^(\d{7})[_-]/);
  const folder = m ? m[1] : 'lifestyle';
  const base = entry.filename.replace(/\.(psd|psb|tif|tiff|jpg|jpeg|png)$/i, '');
  const safe = base.replace(/[^A-Za-z0-9._-]+/g, '_');
  return path.join(OUT_ROOT, folder, safe + '.jpg');
}

async function downloadOne(entry) {
  const dest = destFor(entry);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    return { entry, dest, status: 'skip', bytes: fs.statSync(dest).size };
  }
  const r = await fetch(entry.xlarge);
  if (!r.ok) return { entry, dest, status: 'fail', code: r.status };
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return { entry, dest, status: 'ok', bytes: buf.length };
}

async function run() {
  const queue = URLS.slice();
  const results = [];
  let inFlight = 0;
  let done = 0;
  const total = queue.length;

  await new Promise((resolve) => {
    const pump = () => {
      while (inFlight < CONCURRENCY && queue.length) {
        const entry = queue.shift();
        inFlight++;
        downloadOne(entry)
          .then((r) => {
            results.push(r);
            done++;
            const tag = r.status === 'ok' ? 'OK' : r.status === 'skip' ? 'SK' : 'FAIL';
            console.log(`[${done}/${total}] ${tag} ${path.basename(r.dest)} ${r.bytes ? r.bytes + 'b' : ''} ${r.code || ''}`);
          })
          .catch((e) => {
            results.push({ entry, status: 'error', error: e.message });
            done++;
            console.log(`[${done}/${total}] ERR ${entry.filename} ${e.message}`);
          })
          .finally(() => {
            inFlight--;
            if (!queue.length && !inFlight) resolve();
            else pump();
          });
      }
    };
    pump();
  });

  const ok = results.filter((r) => r.status === 'ok').length;
  const sk = results.filter((r) => r.status === 'skip').length;
  const fail = results.filter((r) => r.status !== 'ok' && r.status !== 'skip').length;
  console.log(`\nDone: ${ok} downloaded, ${sk} skipped, ${fail} failed (of ${total})`);
  fs.writeFileSync('scripts/basco-download-results.json', JSON.stringify(results, null, 2));
}

run();
