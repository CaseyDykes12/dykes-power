import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ferris OEM Parts — Dykes Motors Power Equipment | Collins, MS',
  description:
    'Genuine Ferris OEM replacement parts in Collins, Mississippi. Blades, belts, filters, spindles, and more — in stock and available to order. Call (601) 336-2541.',
  keywords:
    'Ferris OEM parts Mississippi, mower parts Collins MS, Ferris replacement parts, lawn mower parts Covington County MS',
  alternates: { canonical: 'https://www.dykespower.com/parts' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are these genuine Ferris OEM parts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every part we sell is genuine Ferris OEM. We are an authorized Ferris dealer and source parts directly from Ferris (a Briggs & Stratton company).',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can I get a Ferris part?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stocked parts (blades, belts, filters, spark plugs) ship same-day if ordered before 2 PM Central. Special-order parts typically ship from Ferris in 2–5 business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you ship Ferris parts nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We ship Ferris parts to all 50 states. Free shipping is included on most parts orders, and most arrive within 3–5 business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I return a Ferris part?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Unused parts in original packaging can be returned within 30 days for a full refund. Special-order parts are non-returnable. Installed or used parts are non-returnable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will you help me identify the right part for my Ferris mower?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Call us at (601) 336-2541 with your mower model and serial number and we will look up the exact OEM part you need from the Ferris parts catalog.',
      },
    },
  ],
};

export default function PartsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
