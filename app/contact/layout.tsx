import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Quote | Dykes Motors Power Equipment — Collins, MS',
  description:
    'Contact Dykes Motors Power Equipment in Collins, Mississippi for Ferris mower quotes, service appointments, and parts inquiries. Sales: (601) 909-5380. Service & Parts: (601) 336-2541.',
  alternates: { canonical: 'https://www.dykespower.com/contact' },
  openGraph: {
    title: 'Get a Quote | Dykes Motors Power Equipment',
    description: 'Contact us for Ferris mower quotes, service, and parts. Sales: (601) 909-5380.',
    url: 'https://www.dykespower.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
