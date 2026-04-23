'use client';
import { useMemo, useState } from 'react';
import type { Product, ProductVariant } from '@/lib/products';

type Props = {
  product: Product;
};

function deckInches(d: string): number {
  const m = String(d || '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 99;
}

/**
 * Interactive deck-size selector. Shows clickable pills for every real deck
 * size this model ships in, updates the displayed price to match the selected
 * variant, and (when multiple engines are available for the same deck) shows
 * the engine picker underneath.
 *
 * Defaults to the smallest deck + cheapest engine for that deck.
 */
export default function VariantDeckSelector({ product }: Props) {
  const variants: ProductVariant[] = useMemo(() => {
    if (product.variants && product.variants.length > 0) return product.variants;
    // Fallback: synthesize a single variant from the canonical product fields.
    return [
      {
        sku: product.sku,
        engine: product.engine,
        horsepower: product.horsepower,
        deckSize: (product.deckSizes && product.deckSizes[0]) || '',
        price: product.price,
        msrp: product.msrp,
        status: product.status,
      },
    ];
  }, [product]);

  const uniqueDecks = useMemo(() => {
    const set = new Set(variants.map((v) => v.deckSize).filter(Boolean));
    return [...set].sort((a, b) => deckInches(a) - deckInches(b));
  }, [variants]);

  const [selectedDeck, setSelectedDeck] = useState<string>(() => uniqueDecks[0] || '');

  // Variants available at the currently selected deck.
  const deckVariants = useMemo(
    () => variants.filter((v) => v.deckSize === selectedDeck),
    [variants, selectedDeck],
  );

  // Default to cheapest engine option at that deck.
  const [selectedSku, setSelectedSku] = useState<string>(() => {
    const first = [...deckVariants].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0];
    return first ? first.sku : product.sku;
  });

  // Reset engine when deck changes.
  const handleDeckChange = (deck: string) => {
    setSelectedDeck(deck);
    const atDeck = variants.filter((v) => v.deckSize === deck);
    const cheapest = [...atDeck].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0];
    setSelectedSku(cheapest ? cheapest.sku : product.sku);
  };

  const selected = variants.find((v) => v.sku === selectedSku) || deckVariants[0] || variants[0];

  if (uniqueDecks.length === 0) {
    // Non-deck product (blower, sprayer) — render nothing.
    return null;
  }

  return (
    <div className="mb-6">
      {/* Deck size pills */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Deck Size</p>
        <div className="flex flex-wrap gap-2">
          {uniqueDecks.map((d) => {
            const active = d === selectedDeck;
            return (
              <button
                key={d}
                type="button"
                onClick={() => handleDeckChange(d)}
                className={`px-4 py-2 rounded-md border text-sm font-bold transition-colors ${
                  active
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-gray-300 border-gray-700 hover:border-[#C8C8C8] hover:text-white'
                }`}
                aria-pressed={active}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Engine picker — only when multiple engines at this deck */}
      {deckVariants.length > 1 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Engine</p>
          <div className="flex flex-wrap gap-2">
            {deckVariants.map((v) => {
              const active = v.sku === selectedSku;
              return (
                <button
                  key={v.sku}
                  type="button"
                  onClick={() => setSelectedSku(v.sku)}
                  className={`px-3 py-1.5 rounded-md border text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#C8C8C8] text-black border-[#C8C8C8]'
                      : 'bg-transparent text-gray-400 border-gray-700 hover:border-[#C8C8C8] hover:text-white'
                  }`}
                  aria-pressed={active}
                >
                  {v.engine} · {v.horsepower}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected variant price block */}
      <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs font-semibold text-[#C8C8C8] uppercase tracking-widest">Your Price</span>
          <span className="text-[10px] text-gray-600 font-mono">SKU {selected.sku}</span>
        </div>
        {selected.price ? (
          <p className="text-3xl font-black text-white">
            ${selected.price.toLocaleString()}
          </p>
        ) : (
          <p className="text-lg text-[#C8C8C8] font-bold">Contact us for pricing</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {selected.engine}{selected.horsepower ? ` · ${selected.horsepower}` : ''}{selected.deckSize ? ` · ${selected.deckSize} deck` : ''}
        </p>
      </div>
    </div>
  );
}
