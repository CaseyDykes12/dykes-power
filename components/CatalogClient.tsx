'use client';
import { useState, Suspense } from 'react';
import Image from 'next/image';
import { Product, ProductCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';

function CatalogFilters({ products, categories }: { products: Product[]; categories: ProductCategory[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ProductCategory | null;
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(initialCategory);
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) => {
    const matchCat = activeCategory ? p.category === activeCategory : true;
    const matchSearch = search
      ? p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.engine.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search mowers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1a1a1a] border border-gray-600 text-white rounded-lg px-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] placeholder-gray-500"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              !activeCategory
                ? 'bg-[#C8C8C8] text-black border-[#C8C8C8]'
                : 'bg-[#1a1a1a] text-gray-300 border-gray-600 hover:border-[#C8C8C8]'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeCategory === cat
                  ? 'bg-[#C8C8C8] text-black border-[#C8C8C8]'
                  : 'bg-[#1a1a1a] text-gray-300 border-gray-600 hover:border-[#C8C8C8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No mowers found. Try a different search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>
      )}
    </>
  );
}

export default function CatalogClient({ products, categories }: { products: Product[]; categories: ProductCategory[] }) {
  return (
    <>
      {/* Campaign hero banner */}
      <section className="relative overflow-hidden border-b border-dykes-gray-700">
        <div className="absolute inset-0">
          <Image
            src="/images/ferris/campaign/lifestyle-homeowner.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-35"
            priority
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-dykes-black" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 py-16 md:py-20">
          <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-3">
            Dykes Motors · Authorized Ferris<sup className="text-[9px]">®</sup> Dealer
          </p>
          <h1
            className="text-4xl md:text-6xl font-black leading-[0.95] text-white mb-4"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            The Full Lineup.
          </h1>
          <p className="text-dykes-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
            Every Ferris we carry — zero-turn, stand-on, walk-behind. Built for Mississippi acres.
          </p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        }>
          <CatalogFilters products={products} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
