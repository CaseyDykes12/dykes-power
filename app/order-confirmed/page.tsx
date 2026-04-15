'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, Suspense } from 'react';
import { clearCart } from '@/lib/cart';

function OrderConfirmedContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId');

  useEffect(() => {
    clearCart();
    window.dispatchEvent(new Event('cart-updated'));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
      <p className="text-gray-400 mb-2">
        Thank you for your purchase. We'll be in touch shortly to confirm details and arrange pickup or delivery.
      </p>
      {orderId && (
        <p className="text-sm text-gray-500 mb-8">Order ID: {orderId}</p>
      )}
      <p className="text-gray-300 mb-8">
        Questions? Call us at{' '}
        <a href="tel:6016415475" className="text-white underline">(601) 641-5475</a> or email{' '}
        <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a>
      </p>
      <Link href="/catalog" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense>
      <OrderConfirmedContent />
    </Suspense>
  );
}
