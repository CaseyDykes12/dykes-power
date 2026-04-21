import { Metadata } from 'next';
import { getCatalogProducts, getAllCategories } from '@/lib/products';
import CatalogClient from '@/components/CatalogClient';
import ProductLeadForm from '@/components/ProductLeadForm';

export const metadata: Metadata = {
  title: 'Ferris Equipment Catalog | Dykes Motors Power Equipment',
  description:
    'Browse the complete Ferris lineup — zero turn mowers, stand-on mowers, walk-behind mowers, blowers, and spreader/sprayers. Authorized Ferris dealer in Collins, Mississippi.',
  alternates: { canonical: 'https://www.dykespower.com/catalog' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dykespower.com' },
    { '@type': 'ListItem', position: 2, name: 'Catalog', item: 'https://www.dykespower.com/catalog' },
  ],
};

export default function CatalogPage() {
  const categories = getAllCategories();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CatalogClient products={getCatalogProducts()} categories={categories} />
      <div className="max-w-2xl mx-auto px-4 pb-16 pt-4">
        <ProductLeadForm heading="Don't see the right fit? Get a real quote." />
      </div>
    </>
  );
}
