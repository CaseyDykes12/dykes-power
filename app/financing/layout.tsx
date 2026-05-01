import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Financing | Dykes Motors Power Equipment — Collins, MS',
  description:
    'Apply for mower financing at Dykes Motors Power Equipment in Collins, MS. Rates as low as 4.9% APR up to 84 months for qualified credit. Instant pre-qualification with no credit impact.',
  alternates: { canonical: 'https://www.dykespower.com/financing' },
  openGraph: {
    title: 'Apply for Financing | Dykes Motors Power Equipment',
    description: 'Mower financing as low as 4.9% APR for qualified credit. Instant pre-qualification with no credit impact.',
    url: 'https://www.dykespower.com/financing',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What APR can I qualify for on a Ferris mower?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rates start as low as 4.9% APR for qualified credit through our top national lenders. Final rate depends on credit profile, down payment, and term length.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long can I finance a Ferris mower for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Terms run up to 84 months on commercial-grade Ferris zero-turns and stand-on mowers, depending on machine cost and credit approval.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will applying for financing hurt my credit score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Pre-qualification is a soft credit pull and has no impact on your credit score. A hard pull happens only when you accept a final offer and proceed to purchase.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a down payment to finance a mower?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A down payment is not required for qualified credit, but putting money down lowers your monthly payment and total interest. Most buyers put 10–20% down.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast does mower financing get approved?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pre-qualification decisions typically come back in under 60 seconds. Final approvals on most applications take 1–3 business hours during weekday business hours.',
      },
    },
  ],
};

export default function FinancingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
