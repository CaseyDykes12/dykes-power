import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getCategoryBySlug, getProductCategorySlugs } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import type { ProductCategory } from '@/lib/products';

export async function generateStaticParams() {
  return getProductCategorySlugs().map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta || meta.category === 'Accessories') return {};
  const url = `https://www.dykespower.com/products/${meta.slug}`;
  return {
    title: `${meta.label} | Dykes Motors Power Equipment`,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: meta.label,
      description: meta.description,
      url,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta || meta.category === 'Accessories') notFound();

  const items = getProductsByCategory(meta.category as ProductCategory);
  if (items.length === 0) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dykespower.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.label,
        item: `https://www.dykespower.com/products/${meta.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-dykes-black border-b border-dykes-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-3">
            Ferris<sup className="text-[9px]">®</sup>
          </p>
          <h1
            className="text-4xl md:text-6xl font-black leading-tight text-white mb-4"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            {meta.label}
          </h1>
          <p className="text-dykes-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {meta.description}
          </p>
        </div>
      </section>

      <section className="bg-dykes-black py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {items.map((p) => (
            <article key={p.sku} className="flex flex-col">
              <Link
                href={`/product/${p.sku}`}
                aria-label={`View ${p.name}`}
                className="block bg-white rounded-xl overflow-hidden border border-gray-300 hover:border-dykes-silver transition-colors"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain p-4 sm:p-6"
                  />
                </div>
              </Link>

              <div className="pt-4 px-1">
                <h2
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
                >
                  {p.name}
                </h2>
                <p className="text-dykes-gray-300 text-base mb-3 leading-relaxed">
                  {p.description}
                </p>
                <Link
                  href={`/product/${p.sku}`}
                  className="inline-flex items-center text-white font-bold uppercase tracking-widest text-sm hover:text-dykes-silver transition-colors"
                >
                  View {p.name.replace(/^Ferris\s*/, '')}
                  <span aria-hidden="true" className="ml-2">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
