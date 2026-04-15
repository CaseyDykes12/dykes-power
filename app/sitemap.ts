import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { getAllPosts } from '@/lib/blog';

const BASE = 'https://www.dykespower.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${BASE}/catalog`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${BASE}/service`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/parts`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE}/financing`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: 'daily' as const },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/trailers`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE}/shipping-returns`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE}/privacy`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE}/terms`, priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  const productPages = products.map((p) => ({
    url: `${BASE}/product/${p.sku}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));

  const blogPages = getAllPosts()
    .filter((post) => post.date && !isNaN(new Date(post.date).getTime()))
    .map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }));

  return [...staticPages, ...productPages, ...blogPages];
}
