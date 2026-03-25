'use client';
import { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateQuantity, cartTotal, Cart } from '@/lib/cart';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (sku: string, deckSize?: string) => {
    const updated = removeFromCart(sku, deckSize);
    setCart({ ...updated });
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleQty = (sku: string, qty: number, deckSize?: string) => {
    const updated = updateQuantity(sku, qty, deckSize);
    setCart({ ...updated });
    window.dispatchEvent(new Event('cart-updated'));
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Browse our Ferris mower catalog to find the right machine.</p>
        <Link href="/catalog" className="btn-primary">Shop Mowers</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={`${item.sku}-${item.deckSize}`} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4">
              <div className="bg-gray-50 rounded-lg w-24 h-24 flex items-center justify-center shrink-0">
                <img src={item.imageUrl} alt={item.name} className="max-h-20 max-w-full object-contain" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{item.name}</p>
                {item.deckSize && <p className="text-sm text-gray-500">Deck: {item.deckSize}</p>}
                <p className="text-[#C8C8C8] font-bold mt-1">${item.price.toLocaleString()}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQty(item.sku, item.quantity - 1, item.deckSize)}
                      className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
                    >−</button>
                    <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQty(item.sku, item.quantity + 1, item.deckSize)}
                      className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
                    >+</button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.sku, item.deckSize)}
                    className="text-sm text-red-500 hover:underline"
                  >Remove</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">${(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {cart.items.map((item) => (
              <div key={`${item.sku}-${item.deckSize}`} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${cartTotal(cart).toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Taxes and fees calculated at checkout</p>
          </div>
          <Link href="/contact" className="btn-primary w-full text-center block mb-3">
            Request a Quote
          </Link>
          <Link href="/catalog" className="btn-outline w-full text-center block text-sm">
            Continue Shopping
          </Link>
          <p className="text-xs text-gray-400 text-center mt-4">
            Online checkout coming soon. Call us at{' '}
            <a href="tel:6016415475" className="text-[#C8C8C8]">(601) 641-5475</a>
          </p>
        </div>
      </div>
    </div>
  );
}
