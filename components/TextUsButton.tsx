'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const PHONE_DISPLAY = '(601) 909-5380';
const PHONE_HREF = '+16019095380';
const PRESET_BODY = "Hi Dykes Motors Power Equipment, I'm looking at ";
const SUPPRESS_PREFIXES = ['/cart', '/checkout', '/order-confirmed'];

export default function TextUsButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [smsHref, setSmsHref] = useState(`sms:${PHONE_HREF}`);

  useEffect(() => {
    setSmsHref(`sms:${PHONE_HREF}?body=${encodeURIComponent(PRESET_BODY)}`);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const suppressed = SUPPRESS_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + '/'),
  );
  if (suppressed) return null;

  return (
    <>
      {/* Mobile: direct sms: deep link. Bottom-left so it doesn't collide with
          the existing Tecobi chat widget (bottom-right) or the StickyMobileCTA. */}
      <a
        href={smsHref}
        className="md:hidden fixed left-4 bottom-[88px] z-30 bg-[#C8C8C8] text-black font-bold text-sm px-4 py-2.5 rounded-full shadow-xl flex items-center gap-1.5"
        aria-label="Text Dykes Motors Power Equipment"
      >
        <span aria-hidden>💬</span> Text Us
      </a>

      {/* Desktop: floating pill opens a small modal with the number.
          Bottom-left so it doesn't collide with the Tecobi chat bubble. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex fixed left-6 bottom-6 z-30 bg-[#C8C8C8] hover:bg-white text-black font-bold text-sm px-5 py-3 rounded-full shadow-xl items-center gap-2 transition-colors"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span aria-hidden>💬</span> Text Us
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="text-us-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] border border-gray-800 rounded-2xl p-6 max-w-sm w-full text-center"
          >
            <h2 id="text-us-title" className="text-xl font-bold text-white mb-2">
              Text or call us
            </h2>
            <p className="text-sm text-gray-400 mb-5">
              Pull out your phone and reach us at:
            </p>
            <a
              href={`tel:${PHONE_HREF}`}
              className="block text-3xl font-bold text-[#C8C8C8] hover:text-white mb-1 transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="text-xs text-gray-500 mb-5">
              Mon–Fri 8AM–5PM Central. Text us any time — we'll reply when we open.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full bg-transparent border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 font-medium py-2.5 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
