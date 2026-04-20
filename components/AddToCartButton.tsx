'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/lib/cart';
import type { Product } from '@/lib/products';

interface Props {
  product: Product;
  deckSize?: string;
}

export default function AddToCartButton({ product, deckSize }: Props) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product.price) {
    return (
      <a
        href="tel:6019095380"
        className="btn-primary flex-1 text-center py-3"
      >
        Call for Pricing: (601) 909-5380
      </a>
    );
  }

  const handleAdd = () => {
    setAdding(true);
    addToCart(product, deckSize);
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdding(false), 600);
  };

  if (added) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <button
          onClick={() => router.push('/cart')}
          className="btn-primary flex-1 text-center py-3"
        >
          View Cart →
        </button>
        <button
          onClick={() => {
            handleAdd();
            setAdded(true);
          }}
          className="btn-outline flex-1 text-center py-3"
        >
          Add Another
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      disabled={adding}
      className="btn-primary flex-1 text-center py-3 disabled:opacity-60"
    >
      {adding ? 'Adding…' : `Add to Cart — $${product.price.toLocaleString()}`}
    </button>
  );
}
