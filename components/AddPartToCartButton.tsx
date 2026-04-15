'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/lib/cart';
import type { Part } from '@/lib/parts';

interface Props {
  part: Part;
}

export default function AddPartToCartButton({ part }: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  if (!part.price) {
    return (
      <a
        href="tel:6013362541"
        className="btn-primary px-8 py-3 inline-block"
      >
        Call to Order: (601) 336-2541
      </a>
    );
  }

  const handleAdd = () => {
    setAdding(true);
    const productLike = {
      sku: part.partNumber,
      name: part.name,
      price: part.price,
      imageUrl: part.imageUrl,
    };
    for (let i = 0; i < qty; i++) {
      addToCart(productLike as never);
    }
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-400">Qty</label>
        <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2 text-white hover:bg-gray-800"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 text-white font-semibold min-w-[40px] text-center">
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-2 text-white hover:bg-gray-800"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {added ? (
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/cart')}
            className="btn-primary px-6 py-3 flex-1"
          >
            View Cart →
          </button>
          <button
            onClick={() => setAdded(false)}
            className="btn-outline px-6 py-3"
          >
            Add More
          </button>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          disabled={adding}
          className="btn-primary px-8 py-3 disabled:opacity-60"
        >
          {adding ? 'Adding…' : `Add to Cart — $${(part.price * qty).toFixed(2)}`}
        </button>
      )}
    </div>
  );
}
