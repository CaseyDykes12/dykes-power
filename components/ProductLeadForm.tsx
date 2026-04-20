'use client';
import { useState } from 'react';
import type { Product } from '@/lib/products';

type Props = {
  product?: Product;
  heading?: string;
  anchorId?: string;
};

export default function ProductLeadForm({ product, heading, anchorId }: Props) {
  const interestLabel = product ? `${product.name} (SKU ${product.sku})` : '';
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    timing: '',
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        interest: product ? interestLabel : form.interest || 'Quick Quote',
        propertySize: '',
        message: [
          form.timing ? `When needed: ${form.timing}` : '',
          form.message,
        ]
          .filter(Boolean)
          .join('\n'),
      };
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('set', 'user_data', {
            email: form.email,
            phone_number: form.phone,
          });
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-17992871675/pNOLCL2li48cEPvd1YND',
          });
        }
      } else {
        alert(
          "We got your info, but our email system hit a snag. Please call us at (601) 909-5380 so we don't miss you — sorry about that."
        );
      }
    } catch {
      alert('Something went wrong. Please call us directly at (601) 909-5380.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div id={anchorId ?? 'quick-quote'} className="bg-[#111] border border-[#C8C8C8] rounded-xl p-6 text-center scroll-mt-24">
        <p className="text-3xl mb-2">✅</p>
        <h3 className="text-lg font-bold text-white mb-2">Got it — we'll reach out fast.</h3>
        <p className="text-sm text-gray-400">
          Someone from our Collins shop will contact you shortly. Need to talk now? Call{' '}
          <a href="tel:6019095380" className="text-[#C8C8C8] font-semibold">(601) 909-5380</a>.
        </p>
      </div>
    );
  }

  const defaultHeading = product
    ? `Get pricing on this ${product.name}`
    : 'Get a real quote in one hour';
  const ctaLabel = product ? `Get My Quote on the ${product.name}` : 'Send My Quick Quote';

  return (
    <div id={anchorId ?? 'quick-quote'} className="bg-[#111] border border-gray-800 rounded-xl p-5 mb-4 scroll-mt-24">
      <p className="text-xs font-semibold text-[#C8C8C8] uppercase tracking-widest mb-1">
        Quick Quote
      </p>
      <h3 className="text-lg font-bold text-white mb-3">{heading ?? defaultHeading}</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            required
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name *"
            className="w-full bg-black border border-gray-700 text-white rounded-lg px-3 py-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
          />
          <input
            type="tel"
            inputMode="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone (optional)"
            className="w-full bg-black border border-gray-700 text-white rounded-lg px-3 py-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
          />
        </div>

        <input
          required
          type="email"
          inputMode="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email *"
          className="w-full bg-black border border-gray-700 text-white rounded-lg px-3 py-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
        />

        {!product && (
          <input
            name="interest"
            value={form.interest}
            onChange={handleChange}
            placeholder="What model or category are you looking at?"
            className="w-full bg-black border border-gray-700 text-white rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
          />
        )}

        <select
          name="timing"
          value={form.timing}
          onChange={handleChange}
          className="w-full bg-black border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
        >
          <option value="">When do you need it?</option>
          <option value="ASAP">ASAP</option>
          <option value="Within 2 weeks">Within 2 weeks</option>
          <option value="Within a month">Within a month</option>
          <option value="Just researching">Just researching</option>
        </select>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder="Questions, trade-in info, or anything else we should know..."
          className="w-full bg-black border border-gray-700 text-white rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-base disabled:opacity-60"
        >
          {loading ? 'Sending...' : ctaLabel}
        </button>

        <p className="text-xs text-gray-500 text-center">
          No pressure, no spam. We'll reach out fast with real pricing.
        </p>
      </form>
    </div>
  );
}
