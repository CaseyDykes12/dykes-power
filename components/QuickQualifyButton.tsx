'use client';

import { useEffect, useState } from 'react';

interface Props {
  /** Page-context string sent with the lead. */
  context?: string;
  /** Tailwind class for the trigger button. */
  className?: string;
  /** Button label. */
  label?: string;
}

const DEFAULT_BUTTON_CLASS =
  'text-sm font-semibold px-4 py-2 rounded-lg bg-[#D4AF37] text-black hover:bg-[#C8A830]';

/**
 * Our own Quick Qualify flow. Replaces the Tecobi quick-qualify widget so every
 * submission flows through /api/lead — emails the team immediately, emails the
 * customer a confirmation, and hands to Tecobi on the standard delay.
 *
 * Phone is required (it's a callback); email is optional.
 */
export default function QuickQualifyButton({
  context = 'Quick Qualify — Financing',
  className = DEFAULT_BUTTON_CLASS,
  label = 'Quick Qualify (30 seconds)',
}: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: form.interest ? `${context}: ${form.interest}` : context,
          propertySize: '',
          message: 'Quick Qualify request from the financing flow.',
        }),
      });
      if (res.ok) {
        setDone(true);
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('set', 'user_data', { email: form.email, phone_number: form.phone });
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-17992871675/pNOLCL2li48cEPvd1YND',
          });
        }
      } else {
        alert(
          "We got your info but our system hit a snag — please call or text (601) 641-5475 and we'll take care of you.",
        );
      }
    } catch {
      alert('Something went wrong. Please call or text us at (601) 641-5475.');
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setForm({ name: '', phone: '', email: '', interest: '' });
    }, 250);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-haspopup="dialog" aria-expanded={open}>
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-qualify-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8 overflow-y-auto"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] border border-gray-800 rounded-2xl p-6 md:p-8 max-w-md w-full text-white shadow-2xl"
          >
            <div className="flex items-start justify-between mb-1">
              <h2 id="quick-qualify-title" className="text-xl md:text-2xl font-bold">
                {done ? 'Thanks — we got it.' : 'Quick Qualify for Financing'}
              </h2>
              <button type="button" onClick={close} aria-label="Close" className="text-gray-400 hover:text-white text-2xl leading-none ml-3">
                ×
              </button>
            </div>

            {done ? (
              <>
                <p className="text-gray-300 mt-3 mb-4">
                  Our team will reach out shortly to walk you through your financing options.
                  During business hours we usually respond within 15 minutes.
                </p>
                {form.email && (
                  <p className="text-sm text-gray-400 mb-4">
                    We&apos;ve sent a confirmation to <span className="text-white">{form.email}</span>.
                  </p>
                )}
                <p className="text-xs text-gray-500 mb-5">
                  Need it faster? Call or text us at{' '}
                  <a href="tel:6016415475" className="text-[#C8C8C8] font-semibold">(601) 641-5475</a>.
                </p>
                <button type="button" onClick={close} className="w-full bg-[#C8C8C8] hover:bg-white text-black font-bold py-3 rounded-lg transition-colors">
                  Close
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-4">
                  Tell us how to reach you and what you&apos;re looking at. No credit impact — a real person follows up.
                </p>
                <form onSubmit={submit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-gray-700 focus:border-[#C8C8C8] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-gray-700 focus:border-[#C8C8C8] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email (optional)"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-gray-700 focus:border-[#C8C8C8] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none"
                  />
                  <input
                    type="text"
                    name="interest"
                    placeholder="Which mower are you interested in? (optional)"
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-gray-700 focus:border-[#C8C8C8] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#C8C8C8] hover:bg-white text-black font-bold py-3 rounded-lg disabled:opacity-60 transition-colors"
                  >
                    {submitting ? 'Sending…' : 'Submit'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
