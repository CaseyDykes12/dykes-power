'use client';

import Script from 'next/script';

const MERCHANT_ID = '5759354402';

interface GoogleCustomerReviewsProps {
  orderId: string;
  email: string;
  deliveryCountry: string;
  estimatedDeliveryDate: string;
}

declare global {
  interface Window {
    ___gcfg?: { lang?: string };
    renderOptIn?: () => void;
    gapi?: {
      load: (lib: string, cb: () => void) => void;
      surveyoptin: {
        render: (opts: Record<string, unknown>) => void;
      };
      ratingbadge: {
        render: (el: HTMLElement, opts: Record<string, unknown>) => void;
      };
    };
  }
}

export default function GoogleCustomerReviews({
  orderId,
  email,
  deliveryCountry,
  estimatedDeliveryDate,
}: GoogleCustomerReviewsProps) {
  if (!orderId || orderId === 'unknown' || !email || !estimatedDeliveryDate) {
    return null;
  }

  return (
    <>
      <Script id="gcr-render" strategy="afterInteractive">
        {`
          window.renderOptIn = function() {
            window.gapi.load('surveyoptin', function() {
              window.gapi.surveyoptin.render({
                "merchant_id": "${MERCHANT_ID}",
                "order_id": ${JSON.stringify(orderId)},
                "email": ${JSON.stringify(email)},
                "delivery_country": ${JSON.stringify(deliveryCountry)},
                "estimated_delivery_date": ${JSON.stringify(estimatedDeliveryDate)},
                "opt_in_style": "CENTER_DIALOG"
              });
            });
          };
        `}
      </Script>
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        strategy="afterInteractive"
        async
        defer
      />
    </>
  );
}
