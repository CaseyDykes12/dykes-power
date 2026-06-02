import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4 text-center">
      <p className="text-8xl font-black mb-4" style={{ fontFamily: 'var(--font-bebas, sans-serif)' }}>
        404
      </p>
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-400 mb-8 max-w-sm">
        That page doesn&apos;t exist. Check the link or browse our catalog.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/" className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors">
          Home
        </Link>
        <Link href="/catalog" className="border border-white text-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-black transition-colors">
          View Catalog
        </Link>
      </div>
      <p className="mt-10 text-sm text-gray-600">
        Dykes Motors Power Equipment &mdash; Collins, MS &mdash;{' '}
        <a href="tel:6016415475" className="hover:text-gray-400">(601) 641-5475</a>
      </p>
    </div>
  );
}
