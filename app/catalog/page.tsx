'use client';
import { useState } from 'react';
import { products, getAllCategories, ProductCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ProductCategory | null;
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(initialCategory);
  const [search, setSearch] = useState('');

  const categories = getAllCategories();

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
    <div className="max-w-[1280px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 text-white">Ferris Equipment Catalog</h1>
      <p className="text-gray-400 mb-8">Authorized dealer for the complete Ferris lineup — mowers, blowers, and spreader/sprayers. Collins, Mississippi.</p>

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
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogContent />
    </Suspense>
  );
}
