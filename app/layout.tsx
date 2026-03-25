import type { Metadata } from 'next';
import { Inter, Montserrat, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas' });

export const metadata: Metadata = {
  title: 'Dykes Motors Power Equipment | Authorized Ferris Dealer — Collins, MS',
  description:
    'Dykes Motors Power Equipment is an authorized Ferris mower dealer in Collins, Mississippi. Shop zero-turn, stand-on, and walk-behind mowers. Contact us for pricing and financing.',
  keywords: 'Ferris mowers, zero turn mower, Collins MS, Dykes Motors, lawn mower dealer Mississippi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
