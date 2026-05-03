// Pull Sale price + compare-at price + rebate flag from SLE via Shopify
// /products/<handle>.json. Tries SKU as handle first, then falls back to
// search-result link extraction.

const SKUS = [
  '5902204', '5902205', '5902212',
  '5902056', '5902102',
  '5902110', '5901908', '5901911',
  '5901895',
  '5902172', '5902073',
  '5902160',
  '5901941',
  '5902165',
  '5902169', '5902233', '5902217',
  '5901886', '5901887', '5901888',
  '5901891', '5902014', '5902015', '5902016',
];

async function fetchJson(url) {
  const r = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
      Accept: 'application/json',
    },
  });
  if (!r.ok) return null;
  return r.json();
}

async function fetchText(url) {
  const r = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
    },
  });
  return r.text();
}

async function findHandle(sku) {
  // Try SKU as handle first.
  const direct = await fetchJson(`https://sleequipment.com/products/${sku}.json`);
  if (direct?.product) return sku;

  // Fall back: scrape search results, take first /products/ href containing the SKU.
  const html = await fetchText(`https://sleequipment.com/search?q=${sku}&type=product`);
  const matches = [...html.matchAll(/href="\/products\/([^"?]+)/g)].map((m) => m[1]);
  // Prefer a handle that contains the SKU string itself.
  const containing = matches.find((h) => h.includes(sku));
  return containing || matches[0] || null;
}

const results = [];
for (const sku of SKUS) {
  try {
    const handle = await findHandle(sku);
    if (!handle) {
      results.push({ sku, ok: false, reason: 'no handle' });
      continue;
    }
    const data = await fetchJson(`https://sleequipment.com/products/${handle}.json`);
    if (!data?.product) {
      results.push({ sku, ok: false, reason: `no product json for ${handle}` });
      continue;
    }
    const p = data.product;
    const title = p.title;
    // Confirm SKU is mentioned in title or in a variant SKU.
    const titleHasSku = title.includes(sku);
    const variantHasSku = (p.variants || []).some((v) => v.sku === sku);
    if (!titleHasSku && !variantHasSku) {
      results.push({
        sku,
        ok: false,
        reason: `handle ${handle} returned a different product (${title})`,
      });
      continue;
    }
    const v0 = p.variants[0];
    const sale = parseFloat(v0.price);
    const compareAt = v0.compare_at_price ? parseFloat(v0.compare_at_price) : null;
    const pct = compareAt && compareAt > sale ? Math.round(((compareAt - sale) / compareAt) * 100) : null;
    const rebate = /\(Instant Rebate Included\)/i.test(title);
    results.push({
      sku,
      handle,
      title,
      sale,
      compareAt,
      pct,
      rebate,
      ok: true,
    });
  } catch (e) {
    results.push({ sku, ok: false, reason: String(e) });
  }
}

console.log(JSON.stringify(results, null, 2));
console.log('\n--- TABLE ---');
console.table(
  results.map((r) => ({
    sku: r.sku,
    sale: r.sale,
    compareAt: r.compareAt,
    pct: r.pct,
    rebate: r.rebate ? 'Y' : '-',
    ok: r.ok ? '✓' : '✗',
    title: r.title || r.reason,
  })),
);
