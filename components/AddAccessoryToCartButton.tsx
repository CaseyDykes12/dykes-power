'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/lib/cart';
import type { Accessory } from '@/lib/accessories';

interface Props {
  item: Accessory;
}

export default function AddAccessoryToCartButton({ item }: Props) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  if (!item.price) {
    return (
      <a
        href="tel:6019095380"
        className="btn-outline w-full text-center text-xs py-2"
      >
        Call: (601) 909-5380
      </a>
    );
  }

  const handleAdd = () => {
    setAdding(true);
    const productLike = {
      sku: `acc-${item.id}`,
      name: item.name,
      price: item.price,
      imageUrl: item.photo,
    };
    addToCart(productLike as never);
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdding(false), 600);
  };

  if (added) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => router.push('/cart')}
          className="btn-primary text-xs py-2 flex-1"
        >
          View Cart →
        </button>
        <button
          onClick={() => setAdded(false)}
          className="btn-outline text-xs py-2 px-3"
          aria-label="Add another"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      disabled={adding}
      className="btn-primary w-full text-xs py-2 disabled:opacity-60"
    >
      {adding ? 'Adding…' : `Add to Cart — $${item.price.toFixed(2)}`}
    </button>
  );
}
