import { NextResponse } from 'next/server';
import { products, type Product } from '@/lib/products';
import { parts } from '@/lib/parts';
import { getProductImages } from '@/lib/productImages';
import { getDistributorStock } from '@/lib/distributorInventory';
import { getRichContent } from '@/lib/productRichContent';
import { getFamilyTagline } from '@/lib/familyTaglines';

const SITE = 'https://www.dykespower.com';

/**
 * Build a feed-grade product description that combines the catalog blurb,
 * top key-feature talking points, hard specs, and local-SEO keywords. Aim
 * for ~800-1500 chars per item — well under Google's 5000 limit but rich
 * enough to rank for the queries we care about (model name, "Ferris dealer
 * Mississippi", "commercial zero turn near Hattiesburg / Laurel / Petal").
 */
function buildDescription(p: Product): string {
  const parts: string[] = [];

  const tagline = getFamilyTagline(p.name);
  if (tagline) parts.push(tagline);

  parts.push(p.description);

  // Top 3 key features as a single prose sentence.
  const rich = getRichContent(p.name);
  if (rich?.keyFeatures?.length) {
    const top = rich.keyFeatures
      .slice(0, 3)
      .map((kf) => `${kf.title} — ${kf.body}`)
      .join(' ');
    parts.push(top);
  }

  // Hard specs paragraph. Built defensively so partial specs still help.
  if (rich?.specs) {
    const s = rich.specs;
    const specBits: string[] = [];
    if (p.engine) specBits.push(`${p.engine} engine`);
    if (p.horsepower) specBits.push(`${p.horsepower}`);
    if (s.engineDisplacement) specBits.push(`${s.engineDisplacement} displacement`);
    if (p.deckSizes.length > 0)
      specBits.push(`${p.deckSizes.join('/')} ${s.deckConstruction ?? 'fabricated steel'} deck`);
    if (s.transmission) specBits.push(s.transmission);
    if (s.groundSpeedFwd) specBits.push(`top speed ${s.groundSpeedFwd}`);
    if (s.suspension) specBits.push(`${s.suspension} suspension`);
    if (s.fuelCapacity) specBits.push(`${s.fuelCapacity} fuel`);
    if (s.dryWeight) specBits.push(`${s.dryWeight} dry weight`);
    const warrantyBits: string[] = [];
    if (s.warrantyMachine) warrantyBits.push(`${s.warrantyMachine} machine warranty`);
    if (s.warrantySuspension) warrantyBits.push(`${s.warrantySuspension} suspension warranty`);
    if (s.warrantyEngine) warrantyBits.push(`${s.warrantyEngine} engine warranty`);
    if (specBits.length) parts.push('Specifications: ' + specBits.join(', ') + '.');
    if (warrantyBits.length) parts.push('Warranty: ' + warrantyBits.join(', ') + '.');
  } else {
    // Lightweight spec line for products without rich content yet.
    const lite: string[] = [];
    if (p.engine) lite.push(p.engine);
    if (p.horsepower) lite.push(p.horsepower);
    if (p.deckSizes.length > 0) lite.push(`${p.deckSizes.join('/')} deck`);
    if (lite.length) parts.push('Specs: ' + lite.join(' / ') + '.');
  }

  // Built-in feature bullets from the catalog (always present, short).
  if (p.features?.length) {
    parts.push('At a glance: ' + p.features.slice(0, 6).join('; ') + '.');
  }

  // Local SEO + dealer trust signals + buyer next-step.
  parts.push(
    'Sold by Dykes Motors Power Equipment, your authorized Ferris dealer ' +
      'in Collins, Mississippi — serving Hattiesburg, Laurel, Petal, ' +
      'Seminary, Mendenhall, Magee, Columbia, Brookhaven, and the Pine Belt ' +
      'region. Free nationwide shipping on every Ferris mower with no ' +
      'minimum. Financing available as low as 4.9% APR for qualified ' +
      'credit. Order online at dykespower.com or call (601) 909-5380.',
  );

  return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}

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
    <g:description>${escapeXml(buildDescription(p))}</g:description>
    <g:link>${SITE}/product/${escapeXml(p.sku)}</g:link>
    <g:checkout_link_template>${SITE}/buy/${escapeXml(p.sku)}</g:checkout_link_template>
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
