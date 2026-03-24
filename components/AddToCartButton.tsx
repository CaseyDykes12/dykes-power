'use client';
import { Product } from '@/lib/products';
import { addToCart } from '@/lib/cart';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button onClick={handleAdd} className="btn-primary flex-1 text-center">
      {added ? '✓ Added to Cart' : 'Add to Cart'}
    </button>
  );
}
