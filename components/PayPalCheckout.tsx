'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PayPalCheckoutProps {
  total: number;
  items: Array<{ name: string; sku: string; price: number; quantity: number }>;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paypal?: any;
  }
}

export default function PayPalCheckout({ total, items }: PayPalCheckoutProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim();
  const rendered = useRef(false);

  useEffect(() => {
    if (!clientId || rendered.current) return;

    const scriptId = 'paypal-sdk';

    const renderButtons = () => {
      if (!containerRef.current || !window.paypal) return;
      containerRef.current.innerHTML = '';
      rendered.current = true;

      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
        createOrder: (_data: unknown, actions: { order: { create: (o: unknown) => Promise<string> } }) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [{
              description: `Dykes Motors Power Equipment`,
              amount: {
                currency_code: 'USD',
                value: total.toFixed(2),
                breakdown: {
                  item_total: { currency_code: 'USD', value: total.toFixed(2) },
                },
              },
              items: items.map((item) => ({
                name: item.name,
                sku: item.sku,
                unit_amount: { currency_code: 'USD', value: item.price.toFixed(2) },
                quantity: String(item.quantity),
              })),
            }],
          });
        },
        onApprove: async (_data: unknown, actions: { order?: { capture: () => Promise<{ id?: string }> } }) => {
          if (!actions.order) return;
          const order = await actions.order.capture();
          router.push(`/order-confirmed?orderId=${order.id ?? 'unknown'}`);
        },
        onError: (err: unknown) => {
          console.error('PayPal error:', err);
          setError('Payment failed. Please try again or call (601) 641-5475.');
        },
      }).render(containerRef.current);
    };

    if (window.paypal) {
      renderButtons();
      return;
    }

    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.addEventListener('load', renderButtons);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&disable-funding=card`;
    script.async = true;
    script.onload = renderButtons;
    script.onerror = () => setError('Failed to load PayPal. Please refresh or call us.');
    document.head.appendChild(script);
  }, [clientId, total, items, router]);

  if (!clientId) {
    return (
      <div className="bg-[#111] border border-gray-800 rounded-lg p-4 text-center">
        <p className="text-white font-semibold text-sm mb-1">Complete your purchase by phone</p>
        <p className="text-gray-400 text-xs mb-3">
          Call our sales team — we accept debit, credit, check, and financing. Pickup at our Collins, MS location.
        </p>
        <a
          href="tel:6016415475"
          className="inline-block bg-[#D4AF37] text-black font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-[#C8A830] transition-colors"
        >
          Call (601) 641-5475
        </a>
      </div>
    );
  }

  return (
    <div>
      <div ref={containerRef} className="min-h-[44px]" />
      {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
    </div>
  );
}
