'use client';
import { useState } from 'react';
import { Part } from '@/lib/parts';
import { getCart, saveCart } from '@/lib/cart';

export default function AddPartToCartButton({ part }: { part: Part }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const cart = getCart();
    const existing = cart.items.find((i) => i.sku === part.partNumber);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.items.push({
        sku: part.partNumber,
        name: part.name,
        price: part.price ?? 0,
        quantity: qty,
        imageUrl: part.imageUrl,
      });
    }
    saveCart(cart);
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Quantity selector */}
      <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-10 h-11 text-white text-lg font-bold bg-[#1a1a1a] hover:bg-[#222] transition-colors flex items-center justify-center"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-10 h-11 flex items-center justify-center text-white font-semibold bg-[#111] text-sm select-none">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="w-10 h-11 text-white text-lg font-bold bg-[#1a1a1a] hover:bg-[#222] transition-colors flex items-center justify-center"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Add to cart */}
      <button onClick={handleAdd} className="btn-primary px-8 py-3 flex-1 text-center">
        {added ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
