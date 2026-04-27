'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { parts, getAllPartCategories, getPartsByCategory, PartCategory } from '@/lib/parts';

// Mower family labels for the fit finder — derived from the fits[] strings in
// parts.ts. Adding a new family here automatically filters any part whose
// `fits` array contains a matching substring.
const MOWER_FAMILIES = [
  '300S', '300R', '500S',
  'IS 600', 'IS 700', 'IS 2600', 'IS 6200',
  'ISX 800', 'ISX 2200', 'ISX 3300',
  'SRS Z1', 'SRS Z2', 'SRS Z3X',
  'FW15', 'FW25', 'FW45',
  'F60',
  'ProCut S', 'Venture', 'Pathfinder', 'Rover',
  'FB1000', 'FB2000', 'FB3000',
] as const;

export default function PartsPage() {
  const [activeCategory, setActiveCategory] = useState<PartCategory | null>(null);
  const [search, setSearch] = useState('');
  const [mowerFilter, setMowerFilter] = useState<string>('');

  const categories = getAllPartCategories();

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat] = getPartsByCategory(cat).length;
    }
    return counts;
  }, [categories]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const fam = mowerFilter.toLowerCase();
    return parts.filter((p) => {
      const matchCat = activeCategory ? p.category === activeCategory : true;
      const matchSearch = q
        ? p.name.toLowerCase().includes(q) ||
          p.partNumber.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fits.some((f) => f.toLowerCase().includes(q))
        : true;
      const matchMower = fam
        ? p.fits.some((f) => f.toLowerCase().includes(fam))
        : true;
      return matchCat && matchSearch && matchMower;
    });
  }, [activeCategory, search, mowerFilter]);

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      {/* Page header */}
      <div className="bg-[#0a0a0a] border-b border-gray-800 px-4 py-6">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-gray-500 text-sm mb-1">
            <Link href="/" className="hover:text-[#C8C8C8] transition-colors">Home</Link>
            {' '}›{' '}
            <span className="text-gray-300">Parts</span>
          </p>
          <h1 className="text-3xl font-bold text-white">Ferris OEM Parts</h1>
          <p className="text-gray-400 mt-1">Genuine Ferris replacement parts from Collins, Mississippi — shipped nationwide.</p>
          <p className="text-xs text-[#C8C8C8] mt-3 font-semibold">
            Flat rate shipping $12.99 · Free shipping on orders $75+
          </p>

          {/* Fit finder */}
          <div className="mt-5 flex flex-wrap items-center gap-3 bg-[#111] border border-gray-800 rounded-xl p-3">
            <label htmlFor="mower-filter" className="text-xs uppercase tracking-widest text-gray-400 font-semibold shrink-0">
              Which mower do you have?
            </label>
            <select
              id="mower-filter"
              value={mowerFilter}
              onChange={(e) => setMowerFilter(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8C8C8] flex-1 min-w-[180px]"
            >
              <option value="">Show all parts</option>
              {MOWER_FAMILIES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {mowerFilter && (
              <button
                onClick={() => setMowerFilter('')}
                className="text-xs text-gray-500 hover:text-[#C8C8C8] transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8 flex gap-8">
        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside className="hidden lg:block w-60 shrink-0">
          {/* Search */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
              Search Parts
            </label>
            <input
              type="text"
              placeholder="Part # or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8C8C8] placeholder-gray-600"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
              Categories
            </label>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveCategory(null)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
                  !activeCategory
                    ? 'bg-[#C8C8C8] text-black font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                <span>All Categories</span>
                <span className="text-xs opacity-60">{parts.length}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#C8C8C8] text-black font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-xs opacity-60">{categoryCounts[cat]}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Mobile search + filters */}
          <div className="lg:hidden mb-6 space-y-3">
            <input
              type="text"
              placeholder="Search part # or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8C8C8] placeholder-gray-600"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  !activeCategory ? 'bg-[#C8C8C8] text-black border-[#C8C8C8]' : 'bg-[#1a1a1a] text-gray-300 border-gray-700 hover:border-[#C8C8C8]'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    activeCategory === cat ? 'bg-[#C8C8C8] text-black border-[#C8C8C8]' : 'bg-[#1a1a1a] text-gray-300 border-gray-700 hover:border-[#C8C8C8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count + active filter */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">
              {filtered.length} {filtered.length === 1 ? 'part' : 'parts'}
              {activeCategory && <span className="text-[#C8C8C8]"> — {activeCategory}</span>}
            </p>
            {(activeCategory || search || mowerFilter) && (
              <button
                onClick={() => { setActiveCategory(null); setSearch(''); setMowerFilter(''); }}
                className="text-xs text-gray-500 hover:text-[#C8C8C8] transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              <p className="text-lg mb-2">No parts found</p>
              <p className="text-sm">Try a different search term or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((part) => (
                <Link
                  key={part.partNumber}
                  href={`/parts/${part.partNumber}`}
                  className="group bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden hover:border-[#C8C8C8] transition-all flex flex-col"
                >
                  {/* Image */}
                  <div className="bg-[#111] h-40 flex items-center justify-center p-4 relative">
                    {part.oem && (
                      <span className="absolute top-2 left-2 bg-[#C8C8C8] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                        OEM
                      </span>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={part.imageUrl}
                      alt={part.name}
                      loading="lazy"
                      decoding="async"
                      width={200}
                      height={160}
                      className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-90 transition-opacity"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-gray-500 text-xs font-mono mb-1">#{part.partNumber}</p>
                    <h3 className="font-semibold text-white text-sm leading-tight mb-2 group-hover:text-[#C8C8C8] transition-colors">
                      {part.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2 flex-1">{part.description}</p>

                    {/* Fits */}
                    <div className="mb-3">
                      <p className="text-gray-600 text-xs mb-1">Fits:</p>
                      <p className="text-gray-400 text-xs line-clamp-1">
                        {part.fits.slice(0, 3).join(', ')}
                        {part.fits.length > 3 && (
                          <span className="text-gray-600"> +{part.fits.length - 3} more</span>
                        )}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="border-t border-gray-800 pt-3 mt-auto flex items-center justify-between">
                      {part.price !== null ? (
                        <p className="font-bold text-white">${part.price.toFixed(2)}</p>
                      ) : (
                        <p className="text-[#C8C8C8] text-sm font-semibold">Pricing in-store</p>
                      )}
                      <span className="text-xs text-gray-500 group-hover:text-[#C8C8C8] transition-colors">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 bg-[#111] border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-[#C8C8C8] text-xs font-semibold uppercase tracking-widest mb-2">Need a Part Not Listed?</p>
            <h3 className="text-xl font-bold text-white mb-3">We Can Source Any Ferris Part</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              As an authorized Ferris dealer we have access to the complete parts catalog.
              Call or message us with your part number or model.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="tel:6013362541" className="btn-primary text-sm px-6 py-2">
                Call (601) 336-2541
              </a>
              <Link href="/contact" className="btn-outline text-sm px-6 py-2">
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
