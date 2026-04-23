import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { parts } from '@/lib/parts';
import { getAllPosts } from '@/lib/blog';

const BASE = 'https://www.dykespower.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: BASE, lastModified: now, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${BASE}/catalog`, lastModified: now, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${BASE}/service`, lastModified: now, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE}/about`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/parts`, lastModified: now, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE}/financing`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/why-ferris`, lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/blog`, lastModified: now, priority: 0.8, changeFrequency: 'daily' as const },
    { url: `${BASE}/contact`, lastModified: now, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/trailers`, lastModified: now, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE}/shipping-returns`, lastModified: now, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE}/privacy`, lastModified: now, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE}/terms`, lastModified: now, priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  // Geo landing pages
  const geoPages = [
    { url: `${BASE}/ferris-mowers-hattiesburg-ms`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/ferris-mowers-laurel-ms`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const productPages = products
    .filter((p) => !p.canonicalSku)
    .map((p) => ({
      url: `${BASE}/product/${p.sku}`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    }));

  // Individual OEM parts pages
  const partPages = parts.map((p) => ({
    url: `${BASE}/parts/${p.partNumber}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  const blogPages = getAllPosts()
    .filter((post) => post.date && !isNaN(new Date(post.date).getTime()))
    .map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }));

  return [...staticPages, ...geoPages, ...productPages, ...partPages, ...blogPages];
}
