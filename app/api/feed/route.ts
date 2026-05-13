import { NextResponse } from 'next/server';
import { products } from '@/lib/products';
import { parts } from '@/lib/parts';
import { getProductImages } from '@/lib/productImages';
import { getDistributorStock } from '@/lib/distributorInventory';

const SITE = 'https://www.dykespower.com';

// Accessories + Collection Systems are excluded from the feed until we have
// high-resolution (500x500+) product photography. The accessory images
// extracted from the Ferris 2026 Accessories One Pager PDF are 200-500 px
// on the long side — they pass Google's 100x100 hard minimum but fall short
// of the advisor's 500x500 recommendation. Restore the block once Casey
// gets the high-res accessory media pack from the Ferris rep.

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function mapAvailability(sku: string): 'in_stock' | 'backorder' {
  // Drive availability off the weekly Power Distributors snapshot so the
  // feed agrees with the visible badge on dykespower.com. SKUs with at
  // least one unit on hand at the distributor today => in_stock. Zero on
  // hand (or SKU not in this week's sheet) => backorder — Google's spec
  // value for "available to order but not yet shippable today".
  const stock = getDistributorStock(sku);
  return stock && stock.today >= 1 ? 'in_stock' : 'backorder';
}

function mapCategory(category: string): string {
  switch (category) {
    case 'Zero Turn Mowers':
    case 'Stand-On Mowers':
    case 'Walk-Behind Mowers':
    case 'Front Mount Mowers':
      return 'Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Parts > Motor Vehicle Power & Electrical Systems > Vehicle Engine Parts > Lawn Mower Parts & Accessories';
    case 'Stand-On Blowers':
      return 'Home & Garden > Lawn & Garden > Outdoor Power Equipment > Leaf Blowers';
    case 'Ride-On Spreader/Sprayers':
      return 'Home & Garden > Lawn & Garden > Outdoor Power Equipment > Power Spreaders';
    default:
      return 'Home & Garden > Lawn & Garden > Outdoor Power Equipment';
  }
}

const PARTS_CATEGORY = 'Vehicles &amp; Parts &gt; Vehicle Parts &amp; Accessories &gt; Motor Vehicle Parts &gt; Lawn Mower Parts &amp; Accessories';

export async function GET() {
  const items = products
    .filter((p) => p.price && p.price > 0)
    .map((p) => {
      const images = getProductImages(p);
      const imageUrl = images[0].startsWith('http')
        ? images[0]
        : `${SITE}${images[0]}`;
      // Up to 3 additional product angles. Mix of local BASCO studio photos
      // (prepended by getProductImages) and Ferris CDN feature shots.
      const additionalImages = images
        .slice(1, 4)
        .map((img) => (img.startsWith('http') ? img : `${SITE}${img}`))
        .map((img) => `    <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`)
        .join('\n');

      const deckLabel = p.deckSizes.length > 0 ? ` ${p.deckSizes[0]} deck` : '';
      const title = `${p.name} ${p.engine}${deckLabel}`;

      // Each variant gets its own landing page; item_group_id ties variants
      // in the same model family together for Google Shopping.
      const itemGroupId = p.canonicalSku ?? p.sku;
      const sizeTag = p.deckSizes[0]
        ? `\n    <g:size>${escapeXml(p.deckSizes[0])}</g:size>`
        : '';
      return `  <item>
    <g:id>${escapeXml(p.sku)}</g:id>
    <g:item_group_id>${escapeXml(itemGroupId)}</g:item_group_id>
    <g:title>${escapeXml(title)}</g:title>
    <g:description>${escapeXml(p.description)}</g:description>
    <g:link>${SITE}/product/${escapeXml(p.sku)}</g:link>
    <g:image_link>${escapeXml(imageUrl)}</g:image_link>
${additionalImages}
    <g:availability>${mapAvailability(p.sku)}</g:availability>
    <g:price>${p.price!.toFixed(2)} USD</g:price>
    <g:brand>Ferris</g:brand>
    <g:mpn>${escapeXml(p.sku)}</g:mpn>${sizeTag}
    <g:condition>new</g:condition>
    <g:identifier_exists>true</g:identifier_exists>
    <g:google_product_category>${escapeXml(mapCategory(p.category))}</g:google_product_category>
    <g:product_type>${escapeXml(p.category)}</g:product_type>
  </item>`;
    })
    .join('\n');

  const partItems = parts
    .filter((p) => p.price > 0)
    .map((p) => {
      const imageUrl = p.imageUrl.startsWith('http') ? p.imageUrl : `${SITE}${p.imageUrl}`;
      return `  <item>
    <g:id>PART-${escapeXml(p.partNumber)}</g:id>
    <g:title>${escapeXml(`Ferris ${p.name}`)}</g:title>
    <g:description>${escapeXml(p.description)}</g:description>
    <g:link>${SITE}/parts/${escapeXml(p.partNumber)}</g:link>
    <g:image_link>${escapeXml(imageUrl)}</g:image_link>
    <g:availability>in_stock</g:availability>
    <g:price>${p.price.toFixed(2)} USD</g:price>
    <g:brand>Ferris</g:brand>
    <g:mpn>${escapeXml(p.partNumber)}</g:mpn>
    <g:condition>new</g:condition>
    <g:identifier_exists>true</g:identifier_exists>
    <g:google_product_category>${PARTS_CATEGORY}</g:google_product_category>
    <g:product_type>${escapeXml(p.category)}</g:product_type>
  </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Dykes Motors Power Equipment</title>
  <link>${SITE}</link>
  <description>Authorized Ferris dealer in Collins, Mississippi. Zero-turn, stand-on, and walk-behind mowers.</description>
${items}
${partItems}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
