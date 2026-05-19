import { Metadata } from 'next';
import { getCatalogProducts, getAllCategories } from '@/lib/products';
import CatalogClient from '@/components/CatalogClient';
import ProductLeadForm from '@/components/ProductLeadForm';

export const metadata: Metadata = {
  title: 'Ferris Equipment Catalog | Dykes Motors Power Equipment',
  description:
    'Browse the complete Ferris lineup - zero turn mowers, stand-on mowers, walk-behind mowers, blowers, and spreader/sprayers. Authorized Ferris dealer in Collins, Mississippi.',
  alternates: { canonical: 'https://www.dykespower.com/catalog' },
};

const SITE = 'https://www.dykespower.com';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Catalog', item: `${SITE}/catalog` },
  ],
};

export default function CatalogPage() {
  const categories = getAllCategories();
  const catalogProducts = getCatalogProducts();

  // ItemList schema gives Google Merchant Center's "Use AI to add products"
  // scanner a machine-readable list of every canonical product and its URL.
  // Without this, MC sees only the BreadcrumbList and reports "No Products Found."
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ferris Equipment Catalog - Dykes Motors Power Equipment',
    url: `${SITE}/catalog`,
    numberOfItems: catalogProducts.length,
    itemListElement: catalogProducts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${SITE}/product/${p.sku}`,
      item: {
        '@type': 'Product',
        name: p.name,
        url: `${SITE}/product/${p.sku}`,
        image: p.imageUrl.startsWith('http') ? p.imageUrl : `${SITE}${p.imageUrl}`,
        brand: { '@type': 'Brand', name: 'Ferris' },
        sku: p.sku,
        ...(p.price && {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: p.price,
            itemCondition: 'https://schema.org/NewCondition',
            availability:
              p.status === 'IN_STOCK'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/BackOrder',
            url: `${SITE}/product/${p.sku}`,
          },
        }),
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <CatalogClient products={catalogProducts} categories={categories} />
      <div className="max-w-2xl mx-auto px-4 pb-16 pt-4">
        <ProductLeadForm />
      </div>
    </>
  );
}
