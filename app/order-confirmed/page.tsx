'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderConfirmedContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId');
  const mode = params.get('mode') ?? 'order';

  const headline =
    mode === 'deposit'
      ? 'Deposit Confirmed'
      : mode === 'quote'
        ? 'Request Received'
        : 'Order Confirmed';

  const message =
    mode === 'deposit'
      ? "Your $1,000 deposit is in. We're holding your machine. We'll call within 1 business day to coordinate pickup or delivery and finalize the balance."
      : mode === 'quote'
        ? "We received your freight quote request. We'll call you within 1 business day with the freight cost and total before charging anything."
        : "Thank you for your order. A confirmation email is on its way. We'll be in touch to confirm pickup or shipping details.";

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-6">{mode === 'quote' ? '📨' : '✅'}</div>
        <h1 className="text-3xl font-bold mb-3 text-white">{headline}</h1>
        <p className="text-gray-300 mb-2">{message}</p>
        {orderId && orderId !== 'unknown' && (
          <p className="text-sm text-gray-500 mb-8">PayPal Order ID: {orderId}</p>
        )}
        <p className="text-gray-300 my-8">
          Questions? Call{' '}
          <a href="tel:6016415475" className="text-[#D4AF37] underline">
            (601) 641-5475
          </a>{' '}
          or email{' '}
          <a href="mailto:Casey@dykesmotors.com" className="text-[#D4AF37] underline">
            Casey@dykesmotors.com
          </a>
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/catalog" className="btn-primary px-6 py-3">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-outline px-6 py-3">
            Back to Home
          </Link>
        </div>
      </div>
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
