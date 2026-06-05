'use client';
import { useMemo, useState } from 'react';
import type { Product, ProductVariant } from '@/lib/products';
import PriceBlock from './PriceBlock';

type Props = {
  product: Product;
};

function deckInches(d: string): number {
  const m = String(d || '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 99;
}

/**
 * Interactive engine + deck selector.
 *
 * Engine pills appear whenever ≥2 distinct engines exist across variants.
 * Deck pills appear whenever ≥2 deck sizes exist. Selecting an engine hides
 * any deck sizes that aren't offered with that engine. Selecting a deck that's
 * incompatible with the current engine auto-switches to the cheapest valid
 * engine for that deck.
 */
export default function VariantDeckSelector({ product }: Props) {
  const variants: ProductVariant[] = useMemo(() => {
    if (product.variants && product.variants.length > 0) return product.variants;
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

  // All unique engines, deduped by engine string, in cheapest-first order.
  const uniqueEngines = useMemo(() => {
    const seen = new Map<string, { engine: string; horsepower?: string }>();
    const sorted = [...variants].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    for (const v of sorted) {
      if (v.engine && !seen.has(v.engine)) {
        seen.set(v.engine, { engine: v.engine, horsepower: v.horsepower });
      }
    }
    return [...seen.values()];
  }, [variants]);

  // All unique deck sizes sorted smallest → largest.
  const uniqueDecks = useMemo(() => {
    const set = new Set(variants.map((v) => v.deckSize).filter(Boolean));
    return [...set].sort((a, b) => deckInches(a) - deckInches(b));
  }, [variants]);

  // Defaults: cheapest variant's engine + smallest deck for that engine.
  const initialEngine = useMemo(() => {
    const cheapest = [...variants].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0];
    return cheapest?.engine ?? '';
  }, [variants]);

  const initialDeck = useMemo(() => {
    const forEngine = variants.filter((v) => v.engine === initialEngine);
    return (
      forEngine.sort((a, b) => deckInches(a.deckSize ?? '') - deckInches(b.deckSize ?? ''))[0]
        ?.deckSize ?? ''
    );
  }, [variants, initialEngine]);

  const [selectedEngine, setSelectedEngine] = useState<string>(initialEngine);
  const [selectedDeck, setSelectedDeck] = useState<string>(initialDeck);

  // Deck sizes available for the currently selected engine.
  const availableDecks = useMemo(
    () => uniqueDecks.filter((d) => variants.some((v) => v.engine === selectedEngine && v.deckSize === d)),
    [variants, uniqueDecks, selectedEngine],
  );

  const handleEngineChange = (engine: string) => {
    setSelectedEngine(engine);
    const validDecks = uniqueDecks.filter((d) =>
      variants.some((v) => v.engine === engine && v.deckSize === d),
    );
    // Keep current deck when it's still valid; otherwise pick smallest valid deck.
    if (!validDecks.includes(selectedDeck)) {
      setSelectedDeck(validDecks[0] ?? '');
    }
  };

  const handleDeckChange = (deck: string) => {
    setSelectedDeck(deck);
    // If current engine isn't offered at this deck, switch to cheapest valid engine.
    const validForDeck = variants.filter((v) => v.deckSize === deck);
    if (!validForDeck.some((v) => v.engine === selectedEngine)) {
      const cheapest = [...validForDeck].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0];
      if (cheapest?.engine) setSelectedEngine(cheapest.engine);
    }
  };

  // The active variant drives the displayed price.
  const selected = useMemo(
    () =>
      variants.find((v) => v.engine === selectedEngine && v.deckSize === selectedDeck) ??
      variants.find((v) => v.deckSize === selectedDeck) ??
      variants[0],
    [variants, selectedEngine, selectedDeck],
  );

  if (uniqueDecks.length === 0) return null;

  const showEngineRow = uniqueEngines.length > 1;
  const showDeckRow = uniqueDecks.length > 1;

  return (
    <div className="mb-6">
      {/* Engine pills — only when ≥2 engines exist across all variants */}
      {showEngineRow && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Engine</p>
          <div className="flex flex-wrap gap-2">
            {uniqueEngines.map(({ engine, horsepower }) => {
              const active = engine === selectedEngine;
              return (
                <button
                  key={engine}
                  type="button"
                  onClick={() => handleEngineChange(engine)}
                  className={`px-4 py-2 rounded-md border text-sm font-bold transition-colors ${
                    active
                      ? 'bg-[#C8C8C8] text-black border-[#C8C8C8]'
                      : 'bg-transparent text-gray-300 border-gray-700 hover:border-[#C8C8C8] hover:text-white'
                  }`}
                  aria-pressed={active}
                >
                  {engine}{horsepower ? ` · ${horsepower}` : ''}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Deck size pills — only decks compatible with the selected engine are shown */}
      {showDeckRow && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Deck Size</p>
          <div className="flex flex-wrap gap-2">
            {availableDecks.map((d) => {
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
      )}

      {/* Selected variant price block */}
      <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-semibold text-[#C8C8C8] uppercase tracking-widest">Our Price</span>
          <span className="text-[10px] text-gray-600 font-mono">SKU {selected.sku}</span>
        </div>
        <PriceBlock price={selected.price} msrp={selected.msrp} mode="variant" />
        <p className="text-xs text-gray-500 mt-2">
          {selected.engine}
          {selected.horsepower ? ` · ${selected.horsepower}` : ''}
          {selected.deckSize ? ` · ${selected.deckSize} deck` : ''}
        </p>
      </div>
    </div>
  );
}
