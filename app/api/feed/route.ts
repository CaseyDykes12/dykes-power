import { NextResponse } from 'next/server';
import { products } from '@/lib/products';
import { getProductImages } from '@/lib/productImages';

const SITE = 'https://www.dykespower.com';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function mapAvailability(status: string): string {
  switch (status) {
    case 'IN_STOCK':
      return 'in_stock';
    case 'INBOUND':
      return 'preorder';
    case 'AVAILABLE_TO_ORDER':
      return 'preorder';
    default:
      return 'out_of_stock';
  }
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

export async function GET() {
  const items = products
    .filter((p) => p.price && p.price > 0)
    .map((p) => {
      const images = getProductImages(p);
      const imageUrl = images[0].startsWith('http')
        ? images[0]
        : `${SITE}${images[0]}`;
      const additionalImages = images
        .slice(1, 10)
        .filter((img) => img.startsWith('http'))
        .map((img) => `    <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`)
        .join('\n');

      const deckLabel = p.deckSizes.length > 0 ? ` ${p.deckSizes[0]} deck` : '';
      const title = `${p.name} ${p.engine}${deckLabel}`;

      const landingSku = p.canonicalSku ?? p.sku;
      return `  <item>
    <g:id>${escapeXml(p.sku)}</g:id>
    <g:title>${escapeXml(title)}</g:title>
    <g:description>${escapeXml(p.description)}</g:description>
    <g:link>${SITE}/product/${landingSku}</g:link>
    <g:image_link>${escapeXml(imageUrl)}</g:image_link>
${additionalImages}
    <g:availability>${mapAvailability(p.status)}</g:availability>
    <g:price>${p.price!.toFixed(2)} USD</g:price>
    <g:brand>Ferris</g:brand>
    <g:condition>new</g:condition>
    <g:identifier_exists>false</g:identifier_exists>
    <g:google_product_category>${escapeXml(mapCategory(p.category))}</g:google_product_category>
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
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
