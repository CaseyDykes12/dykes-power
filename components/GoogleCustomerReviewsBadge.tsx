'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

const MERCHANT_ID = '5759354402';

declare global {
  interface Window {
    renderBadge?: () => void;
  }
}

export default function GoogleCustomerReviewsBadge() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      <div ref={containerRef} className="flex justify-center my-4" />
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
