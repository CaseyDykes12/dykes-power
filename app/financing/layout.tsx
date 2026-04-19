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

export default function FinancingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
