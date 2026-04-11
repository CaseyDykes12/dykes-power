import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ferris OEM Parts — Dykes Motors Power Equipment | Collins, MS',
  description:
    'Genuine Ferris OEM replacement parts in Collins, Mississippi. Blades, belts, filters, spindles, and more — in stock and available to order. Call (601) 336-2541.',
  keywords:
    'Ferris OEM parts Mississippi, mower parts Collins MS, Ferris replacement parts, lawn mower parts Covington County MS',
};

export default function PartsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
