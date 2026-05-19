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


const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dykes Motors Power Equipment',
  url: 'https://www.dykespower.com',
  telephone: ['+16019095380', '+16013362541'],
  email: 'support@dykespower.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3069 Hwy 49',
    addressLocality: 'Collins',
    addressRegion: 'MS',
    postalCode: '39428',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (<>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} /></>);
}
