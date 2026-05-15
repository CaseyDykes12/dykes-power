import { NextResponse } from 'next/server';
import { products } from '@/lib/products';
import { getDistributorStock } from '@/lib/distributorInventory';

// Local product inventory feed for Google Merchant Center.
//
// This is SEPARATE from /api/feed (the regular product feed). MC consumes
// this URL as a "Local product inventory" data source. The result is local
// pickup ads + "Available at Dykes Motors, Collins MS" shopping cards in
// Google Maps and Local searches.
//
// Spec: https://support.google.com/merchants/answer/3061342
//
// Store linkage:
// - store_code below MUST match the store_code Casey sets when linking
//   the Dykes Motors Power Equipment Google Business Profile to MC.
// - If using GBP auto-linkage, store_code becomes the place_id; update
//   the STORE_CODE constant when Casey confirms which path he chose.
// - Today we use the human-readable code `dmp-collins` as a placeholder
//   that Casey will mirror in MC's store settings.
//
// What we emit:
// - One <item> per Ferris product variant that's in stock at the
//   distributor today. Backorder items are excluded (you can't pickup
//   what's not on the lot).
// - quantity = today's distributor count (best proxy for what we can
//   pull onto our lot same-day if a customer drives in).
// - pickup_method = buy (customer pays online, picks up at store)
// - pickup_sla = same day (we're 25 min from Power Distributors regional
//   warehouse; same-day or next-day for any in-distributor unit).

const SITE = 'https://www.dykespower.com';

const STORE_CODE = 'dmp-collins';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const items = products
    .filter((p) => p.price && p.price > 0)
    .map((p) => {
      const stock = getDistributorStock(p.sku);
      const today = stock?.today ?? 0;
      // Local inventory feed only carries items physically pickupable.
      // SKUs with zero distributor stock today are excluded — they'd be
      // misleading as "available for pickup".
      if (today < 1) return null;

      return `  <item>
    <g:id>${escapeXml(p.sku)}</g:id>
    <g:store_code>${STORE_CODE}</g:store_code>
    <g:price>${p.price!.toFixed(2)} USD</g:price>
    <g:availability>in stock</g:availability>
    <g:quantity>${today}</g:quantity>
    <g:pickup_method>buy</g:pickup_method>
    <g:pickup_sla>same day</g:pickup_sla>
  </item>`;
    })
    .filter(Boolean)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Dykes Motors Power Equipment — Local Inventory</title>
  <link>${SITE}</link>
  <description>Local pickup inventory at 3069 Hwy 49, Collins MS 39428.</description>
${items}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
