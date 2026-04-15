'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getCart,
  removeFromCart,
  updateQuantity,
  cartTotal,
  type Cart,
} from '@/lib/cart';

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
  }, []);

  const refresh = (next: Cart) => {
    setCart(next);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleQty = (sku: string, qty: number, deckSize?: string) => {
    refresh(updateQuantity(sku, qty, deckSize));
  };

  const handleRemove = (sku: string, deckSize?: string) => {
    refresh(removeFromCart(sku, deckSize));
  };

  if (!mounted) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-gray-500">
          Loading…
        </div>
      </div>
    );
  }

  const empty = cart.items.length === 0;
  const subtotal = cartTotal(cart);

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1
          className="text-3xl md:text-4xl font-black text-white mb-2"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
        >
          YOUR CART
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Pickup at our Collins, MS location · Local delivery and freight available at checkout
        </p>

        {empty ? (
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-12 text-center">
            <p className="text-white text-xl font-semibold mb-2">Your cart is empty</p>
            <p className="text-gray-500 mb-6">
              Browse our Ferris mowers and genuine OEM parts.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/catalog" className="btn-primary px-6 py-3">
                Shop Mowers
              </Link>
              <Link href="/parts" className="btn-outline px-6 py-3">
                Shop Parts
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {cart.items.map((item) => (
                <div
                  key={`${item.sku}-${item.deckSize ?? ''}`}
                  className="bg-[#111] border border-gray-800 rounded-xl p-4 flex gap-4 items-start"
                >
                  <div className="bg-[#0a0a0a] rounded-lg w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold leading-tight mb-1">
                      {item.name}
                    </p>
                    <p className="text-gray-500 text-xs mb-2">
                      SKU: {item.sku}
                      {item.deckSize && ` · Deck: ${item.deckSize}`}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            handleQty(item.sku, item.quantity - 1, item.deckSize)
                          }
                          className="px-3 py-1 text-white hover:bg-gray-800"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 text-white text-sm min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQty(item.sku, item.quantity + 1, item.deckSize)
                          }
                          className="px-3 py-1 text-white hover:bg-gray-800"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-white font-bold">
                        ${(item.price * item.quantity).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.sku, item.deckSize)}
                    className="text-gray-500 hover:text-red-400 text-xs"
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-[#111] border border-gray-800 rounded-xl p-5 lg:sticky lg:top-24">
                <h2 className="text-white font-bold text-lg mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-xs">
                    <span>Tax (7% MS)</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-xs">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-3 mb-5">
                  <div className="flex justify-between text-white font-bold">
                    <span>Estimated Total</span>
                    <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}+</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="btn-primary w-full text-center py-3 block mb-3"
                >
                  Continue to Checkout
                </Link>
                <Link
                  href="/catalog"
                  className="text-center text-sm text-gray-400 hover:text-white block py-2"
                >
                  ← Continue Shopping
                </Link>

                <div className="mt-5 pt-5 border-t border-gray-800 text-xs text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-300">Questions?</strong>{' '}
                    <a href="tel:6016415475" className="hover:text-white">
                      Call (601) 641-5475
                    </a>
                  </p>
                  <p>
                    <Link href="/shipping-returns" className="hover:text-white">
                      Shipping & Returns Policy
                    </Link>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
