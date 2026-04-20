'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const DISMISS_KEY = 'dp_home_sticky_dismissed';

export default function HomepageStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const checkedStorage = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!checkedStorage.current) {
        checkedStorage.current = true;
        try {
          if (sessionStorage.getItem(DISMISS_KEY) === '1') {
            setDismissed(true);
            return;
          }
        } catch {
          // ignore private-mode storage errors
        }
      }
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore
    }
  };

  if (dismissed || !visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-dykes-black/95 backdrop-blur border-t border-dykes-gray-700 px-3 py-2.5 flex gap-2 items-center pb-[max(0.625rem,env(safe-area-inset-bottom))]">
      <a
        href="tel:6019095380"
        className="flex-1 bg-dykes-gray-900 border border-dykes-gray-700 text-white font-semibold text-sm py-3 rounded-lg text-center flex items-center justify-center gap-1.5"
        aria-label="Call Dykes Motors Power Equipment Sales"
      >
        📞 Call
      </a>
      <Link
        href="/catalog"
        className="flex-[2] bg-white text-dykes-black font-bold text-sm py-3 rounded-lg text-center"
      >
        Shop Mowers
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="text-dykes-gray-300 hover:text-white text-xl leading-none px-2 py-1"
      >
        ×
      </button>
    </div>
  );
}
