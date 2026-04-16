import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { getPostBySlug, getAllPosts } from '@/lib/blog';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const title = `${post.title} | Dykes Motors Power Equipment`;
  const url = `https://www.dykespower.com/blog/${slug}`;
  return {
    title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description: post.description,
      url,
      siteName: 'Dykes Motors Power Equipment',
      publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
      authors: ['Dykes Motors Power Equipment'],
      images: [{ url: '/df-logo.png', width: 800, height: 600, alt: 'Dykes Motors Power Equipment' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.description,
      images: ['/df-logo.png'],
    },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked(post.content);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date ? new Date(post.date).toISOString() : undefined,
    dateModified: post.date ? new Date(post.date).toISOString() : undefined,
    author: {
      '@type': 'Organization',
      name: 'Dykes Motors Power Equipment',
      url: 'https://www.dykespower.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dykes Motors Power Equipment',
      logo: { '@type': 'ImageObject', url: 'https://www.dykespower.com/df-logo.png' },
    },
    mainEntityOfPage: `https://www.dykespower.com/blog/${slug}`,
    image: 'https://www.dykespower.com/df-logo.png',
    keywords: post.keywords,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dykespower.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.dykespower.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.dykespower.com/blog/${slug}` },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#C8C8C8]">Home</Link>
        {' '}›{' '}
        <Link href="/blog" className="hover:text-[#C8C8C8]">Blog</Link>
        {' '}›{' '}
        <span className="text-gray-300">{post.title}</span>
      </p>

      {/* Header */}
      <p className="text-[#C8C8C8] text-xs font-semibold uppercase tracking-widest mb-3">
        {post.category}
      </p>
      <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
      <p className="text-gray-400 mb-2">{post.description}</p>
      <p className="text-gray-600 text-sm mb-10">
        {new Date(post.date).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
        })}
        {' '}· Dykes Motors Power Equipment — Collins, MS
      </p>

      {/* Body */}
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-li:text-gray-300
          prose-strong:text-white
          prose-a:text-[#C8C8C8] prose-a:no-underline hover:prose-a:underline
          prose-hr:border-gray-700"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* CTA */}
      <div className="mt-12 bg-[#1a1a1a] border border-gray-700 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Ready to find your mower?</h3>
        <p className="text-gray-400 text-sm mb-6">
          We&apos;re an authorized Ferris dealer in Collins, MS — in stock, ready to demo, and financing available.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/catalog" className="btn-primary">Browse Inventory</Link>
          <Link href="/financing" className="btn-outline">Apply for Financing</Link>
        </div>
      </div>
    </div>
  );
}
