'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/lib/cart';
import type { Product } from '@/lib/products';

export default function StickyMobileCTA({ product }: { product: Product }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product.price) return;
    setAdding(true);
    addToCart(product);
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0a0a0a]/95 backdrop-blur border-t border-gray-800 px-3 py-2.5 flex gap-2 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
      <a
        href="tel:6019095380"
        className="flex-1 bg-[#1a1a1a] border border-gray-700 text-white font-semibold text-sm py-3 rounded-lg text-center flex items-center justify-center gap-1.5"
        aria-label="Call Dykes Motors Sales"
      >
        📞 Call
      </a>
      {product.price ? (
        added ? (
          <button
            onClick={() => router.push('/cart')}
            className="flex-[2] btn-primary text-sm py-3 rounded-lg"
          >
            View Cart →
          </button>
        ) : (
          <button
            onClick={handleAdd}
            disabled={adding}
            className="flex-[2] btn-primary text-sm py-3 rounded-lg disabled:opacity-60"
          >
            {adding ? 'Adding…' : `Add to Cart · $${product.price.toLocaleString()}`}
          </button>
        )
      ) : (
        <a
          href="tel:6019095380"
          className="flex-[2] btn-primary text-sm py-3 rounded-lg text-center"
        >
          Call for Pricing
        </a>
      )}
    </div>
  );
}
