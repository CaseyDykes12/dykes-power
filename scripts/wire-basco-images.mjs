import fs from 'node:fs';

const mapping = JSON.parse(fs.readFileSync('scripts/basco-product-mapping.json', 'utf8'));
const PATH = 'lib/products.ts';
let src = fs.readFileSync(PATH, 'utf8');

let wrote = 0;
for (const [sku, data] of Object.entries(mapping)) {
  // Match a full product object block starting at sku: 'SKU' up to the closing brace+comma at indent level 2
  const blockRe = new RegExp(`(\\{\\s*[^{}]*?sku:\\s*['"]${sku}['"][\\s\\S]*?\\n  \\},)`, 'm');
  const m = src.match(blockRe);
  if (!m) { console.log('NO MATCH', sku); continue; }
  let block = m[0];

  // Replace existing imageUrl line
  const imageUrlRe = /(\n    imageUrl:\s*)(['"])([^'"]*)\2(,)/;
  if (!imageUrlRe.test(block)) { console.log('NO imageUrl in block', sku); continue; }
  block = block.replace(imageUrlRe, `$1'${data.hero}'$4`);

  // Replace or insert images line
  const imagesRe = /\n    images:\s*\[[^\]]*\],/;
  const galleryLine = `\n    images: ${JSON.stringify(data.gallery)},`;
  if (imagesRe.test(block)) {
    block = block.replace(imagesRe, galleryLine);
  } else {
    // Insert right after imageUrl line
    block = block.replace(/(\n    imageUrl:\s*['"][^'"]*['"],)/, `$1${galleryLine}`);
  }

  src = src.replace(m[0], block);
  wrote++;
  console.log('updated', sku, '→', data.count, 'photos');
}

fs.writeFileSync(PATH, src);
console.log('\n' + wrote + ' products wired with Basco gallery');
