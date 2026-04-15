'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCart, cartCount } from '@/lib/cart';

export default function CartIcon() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const refresh = () => setCount(cartCount(getCart()));
    refresh();
    window.addEventListener('cart-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('cart-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return (
    <Link
      href="/cart"
      aria-label={`Cart with ${count} item${count === 1 ? '' : 's'}`}
      className="relative text-white hover:text-[#C8C8C8] transition-colors p-2"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {mounted && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {count}
        </span>
      )}
    </Link>
  );
}
