'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const MERCHANT_ID = '5759354402';

declare global {
  interface Window {
    renderBadge?: () => void;
  }
}

export default function GoogleCustomerReviewsBadge() {
  const containerRef = useRef<HTMLDivElement>(null);
  // The white band only shows once Google actually injects a badge iframe.
  // When the badge doesn't render (ineligible merchant, blocked script), the
  // wrapper stays hidden instead of leaving a tall empty white box.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (el.querySelector('iframe')) setVisible(true);
    const obs = new MutationObserver(() => {
      if (el.querySelector('iframe')) setVisible(true);
    });
    obs.observe(el, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    window.renderBadge = function () {
      if (!containerRef.current || !window.gapi) return;
      window.gapi.load('ratingbadge', function () {
        if (!containerRef.current) return;
        window.gapi!.ratingbadge.render(containerRef.current, {
          merchant_id: MERCHANT_ID,
          position: 'INLINE',
        });
      });
    };

    if (window.gapi) {
      window.renderBadge();
    }
  }, []);

  return (
    <>
      <Script id="gcr-lang" strategy="afterInteractive">
        {`window.___gcfg = { lang: 'en_US' };`}
      </Script>
      <div
        className={
          visible
            ? 'relative border-t border-gray-900 max-w-[1280px] mx-auto px-4 py-3 bg-white'
            : 'hidden'
        }
      >
        <div ref={containerRef} className="flex justify-center my-4" />
      </div>
      <Script
        id="gcr-badge-loader"
        src="https://apis.google.com/js/platform.js?onload=renderBadge"
        strategy="afterInteractive"
        async
        defer
      />
    </>
  );
}
