// Generate a multi-size favicon.ico from the existing Dykes logo.
// .ico supports multiple embedded sizes — we pack 16, 32, 48 so it looks
// crisp in browser tabs, bookmarks, and Google SERP favicon slots.

import fs from 'node:fs';
import sharp from 'sharp';

const SRC = 'app/icon.png';
const OUT = 'app/favicon.ico';

// Build PNG buffers at each target size.
const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  sizes.map((s) =>
    sharp(SRC)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
  ),
);

// Build an .ico file structure.
// Reference: https://en.wikipedia.org/wiki/ICO_(file_format)
// ICONDIR (6 bytes): 0,0,1,0, imageCount, 0
// ICONDIRENTRY (16 bytes per image)
// Image data concatenated after.

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type = 1 (icon)
header.writeUInt16LE(sizes.length, 4);

const entries = [];
const dataBuffers = [];
let offset = 6 + sizes.length * 16;

for (let i = 0; i < sizes.length; i++) {
  const size = sizes[i];
  const png = pngBuffers[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 means 256)
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image size
  entry.writeUInt32LE(offset, 12); // image offset
  entries.push(entry);
  dataBuffers.push(png);
  offset += png.length;
}

const ico = Buffer.concat([header, ...entries, ...dataBuffers]);
fs.writeFileSync(OUT, ico);
console.log(`Wrote ${OUT} (${(ico.length / 1024).toFixed(1)} KB) with sizes: ${sizes.join(', ')}`);
