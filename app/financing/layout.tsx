import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Financing | Dykes Motors Power Equipment — Collins, MS',
  description:
    'Apply for mower financing at Dykes Motors Power Equipment in Collins, MS. We work with Sheffield Financial, Synchrony, and Octane. Instant pre-qualification with no credit impact.',
  alternates: { canonical: 'https://www.dykespower.com/financing' },
  openGraph: {
    title: 'Apply for Financing | Dykes Motors Power Equipment',
    description: 'Mower financing through Sheffield Financial, Synchrony, and Octane. Instant pre-qualification with no credit impact.',
    url: 'https://www.dykespower.com/financing',
  },
};

export default function FinancingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
