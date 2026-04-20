#!/usr/bin/env node
import sharp from 'sharp';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('.');
const SRC = path.join(ROOT, 'incoming-assets');
const OUT_IMG = path.join(ROOT, 'public', 'images', 'ferris', 'campaign');
const OUT_BRAND = path.join(ROOT, 'public', 'images', 'ferris', 'brand');
const OUT_VID = path.join(ROOT, 'public', 'videos', 'ferris', 'campaign');

await mkdir(OUT_IMG, { recursive: true });
await mkdir(OUT_BRAND, { recursive: true });
await mkdir(OUT_VID, { recursive: true });

// Images: full + mobile webp, quality 82, wide + mobile widths
const photos = [
  { src: 'Feels-Like-A-Ferris-Landscaper-1.jpg', out: 'lifestyle-landscaper-1' },
  { src: 'Feels-Like-A-Ferris-Homeowner.jpg', out: 'lifestyle-homeowner' },
  { src: 'Feels-Like-A-Ferris-Comfort-Without-Compromise.jpg', out: 'lifestyle-comfort' },
  { src: 'Feels-Like-A-Ferris-Effortless-Precision.jpg', out: 'lifestyle-precision' },
  { src: 'Feels-Like-A-Ferris-Confidence.jpg', out: 'lifestyle-confidence' },
  { src: 'Feels-Like-A-Ferris-Section-Background-1.jpg', out: 'section-background' },
  { src: '20260121_ferris_mowers_2223.jpg', out: 'lifestyle-crew' },
];

for (const { src, out } of photos) {
  const input = path.join(SRC, src);
  const full = path.join(OUT_IMG, `${out}.webp`);
  const mobile = path.join(OUT_IMG, `${out}-mobile.webp`);
  await sharp(input).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(full);
  await sharp(input).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 80 }).toFile(mobile);
  console.log(`ok ${out}`);
}

// Brand marks
await copyFile(path.join(SRC, 'FER_Logo_Horz_RGB.png'), path.join(OUT_BRAND, 'ferris-logo-horizontal.png'));
await copyFile(path.join(SRC, 'Ferris_Logo_Badge.png'), path.join(OUT_BRAND, 'ferris-logo-badge.png'));
console.log('ok brand marks');

// Hero video — copy as-is (already mp4, reasonable size)
await copyFile(path.join(SRC, 'Feels-Like-A-Ferris-Hero-Video.mp4'), path.join(OUT_VID, 'hero-15s.mp4'));
console.log('ok hero video');

console.log('done');
