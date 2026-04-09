import type { Metadata } from 'next';
import { Inter, Montserrat, Bebas_Neue } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas' });

export const metadata: Metadata = {
  title: 'Dykes Motors Power Equipment | Authorized Ferris Dealer — Collins, MS',
  description:
    'Authorized Ferris mower dealer in Collins, Mississippi. Sales, service, repairs, and OEM parts. Zero-turn, stand-on, and walk-behind mowers. Financing available.',
  keywords: 'Ferris mowers, zero turn mower, Collins MS, Dykes Motors, lawn mower dealer Mississippi, mower repair Collins MS, Ferris parts Mississippi',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Store'],
  name: 'Dykes Motors Power Equipment',
  description:
    'Authorized Ferris mower dealer in Collins, Mississippi offering sales, service, repairs, and OEM parts. A division of Dykes Motors.',
  url: 'https://www.dykespower.com',
  logo: 'https://dykespower.com/df-logo.png',
  image: 'https://dykespower.com/df-logo.png',
  telephone: ['+16016415475', '+16013362541'],
  email: 'info@dykesmotors.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3069 Hwy 49',
    addressLocality: 'Collins',
    addressRegion: 'MS',
    postalCode: '39428',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.6454,
    longitude: -89.5548,
  },
  parentOrganization: {
    '@type': 'AutoDealer',
    name: 'Dykes Motors',
    url: 'https://www.dykesmotors.com',
    telephone: '+16016415475',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3069 Hwy 49',
      addressLocality: 'Collins',
      addressRegion: 'MS',
      postalCode: '39428',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.dykesmotors.com',
      'https://www.facebook.com/DykesMotors',
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
      name: 'Sales',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
      name: 'Sales',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
      name: 'Service & Parts',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
      name: 'Service & Parts',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      'Mower Service & Repair',
      'Ferris OEM Parts',
      'Blade Sharpening & Replacement',
      'Engine Diagnostics & Repair',
      'Hydrostatic Drive Service',
      'Seasonal Tune-Ups',
      'Zero Turn Mower Sales',
      'Financing Available',
    ],
  },
  areaServed: {
    '@type': 'State',
    name: 'Mississippi',
  },
  sameAs: [
    'https://www.dykesmotors.com',
    'https://www.facebook.com/DykesMotors',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${bebasNeue.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <meta name="google-site-verification" content="qW0oAxSqngP7GBmf8rXxdZs1GK14mbymF1StHZnrcQ4" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17992871675"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17992871675');
          `}
        </Script>
        {/* Meta (Facebook) Pixel */}
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1533582374610733');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1533582374610733&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
