'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/lib/cart';

interface OrderItem {
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface ShippingInfo {
  method: string;
  fee: number;
}

interface PayPalCheckoutProps {
  total: number;
  subtotal: number;
  tax: number;
  shipping: ShippingInfo;
  items: OrderItem[];
  customer: CustomerInfo;
  mode?: 'order' | 'deposit';
  productName?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paypal?: any;
  }
}

export default function PayPalCheckout({
  total,
  subtotal,
  tax,
  shipping,
  items,
  customer,
  mode = 'order',
  productName,
}: PayPalCheckoutProps) {
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

      const description =
        mode === 'deposit'
          ? `$1,000 deposit to reserve ${productName ?? 'equipment'} — Dykes Motors Power Equipment`
          : `Dykes Motors Power Equipment Order`;

      window.paypal
        .Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
          createOrder: (
            _data: unknown,
            actions: { order: { create: (o: unknown) => Promise<string> } }
          ) => {
            const breakdown =
              mode === 'deposit'
                ? {
                    item_total: { currency_code: 'USD', value: total.toFixed(2) },
                  }
                : {
                    item_total: { currency_code: 'USD', value: subtotal.toFixed(2) },
                    tax_total: { currency_code: 'USD', value: tax.toFixed(2) },
                    shipping: { currency_code: 'USD', value: shipping.fee.toFixed(2) },
                  };

            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  description,
                  amount: {
                    currency_code: 'USD',
                    value: total.toFixed(2),
                    breakdown,
                  },
                  items: items.map((item) => ({
                    name: item.name.slice(0, 127),
                    sku: item.sku.slice(0, 127),
                    unit_amount: { currency_code: 'USD', value: item.price.toFixed(2) },
                    quantity: String(item.quantity),
                  })),
                },
              ],
              payer: {
                name: { given_name: customer.name.split(' ')[0]?.slice(0, 140) || customer.name.slice(0, 140) },
                email_address: customer.email,
              },
            });
          },
          onApprove: async (
            _data: unknown,
            actions: { order?: { capture: () => Promise<{ id?: string; payer?: { email_address?: string } }> } }
          ) => {
            if (!actions.order) return;
            try {
              const order = await actions.order.capture();

              await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  mode,
                  paypalOrderId: order.id,
                  customer,
                  shipping,
                  items,
                  subtotal,
                  tax,
                  total,
                  productName,
                }),
              });

              clearCart();
              window.dispatchEvent(new Event('cart-updated'));
              router.push(`/order-confirmed?orderId=${order.id ?? 'unknown'}&mode=${mode}`);
            } catch (err) {
              console.error('Order capture / save failed:', err);
              setError(
                'Payment was processed but order save failed. Please call (601) 641-5475 with your PayPal confirmation.'
              );
            }
          },
          onError: (err: unknown) => {
            console.error('PayPal error:', err);
            setError('Payment failed. Please try again or call (601) 641-5475.');
          },
        })
        .render(containerRef.current);
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
  }, [clientId, total, subtotal, tax, shipping, items, customer, router, mode, productName]);

  if (!clientId) {
    return (
      <div className="bg-[#111] border border-gray-800 rounded-lg p-4 text-center">
        <p className="text-white font-semibold text-sm mb-1">Complete your purchase by phone</p>
        <p className="text-gray-400 text-xs mb-3">
          Online card processing is being finalized. Call our team — we accept debit, credit, check, and financing. Pickup at our Collins, MS location.
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
