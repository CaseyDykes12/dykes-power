import { Metadata } from 'next';
import { products, getAllCategories } from '@/lib/products';
import CatalogClient from '@/components/CatalogClient';

export const metadata: Metadata = {
  title: 'Ferris Equipment Catalog | Dykes Motors Power Equipment',
  description:
    'Browse the complete Ferris lineup — zero turn mowers, stand-on mowers, walk-behind mowers, blowers, and spreader/sprayers. Authorized Ferris dealer in Collins, Mississippi.',
};

export default function CatalogPage() {
  const categories = getAllCategories();
  return <CatalogClient products={products} categories={categories} />;
}
