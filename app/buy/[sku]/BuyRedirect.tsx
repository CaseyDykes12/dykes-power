'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/lib/cart';
import type { Product } from '@/lib/products';

/**
 * Client-side cart-add + checkout redirect for the /buy/{sku} deep-link
 * route used by Google Shopping's checkout_link_template. Cart lives in
 * localStorage, so this has to run client-side after hydration.
 */
export default function BuyRedirect({ product }: { product: Product }) {
  const router = useRouter();
  useEffect(() => {
    addToCart(product);
    window.dispatchEvent(new Event('cart-updated'));
    router.replace('/checkout');
  }, [product, router]);
  return null;
}
