import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-bold text-[#00CFD7] mb-4">404</p>
      <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-8">
        That page doesn&apos;t exist. Try browsing our mower catalog or contact us directly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/catalog" className="btn-primary">Browse Mowers</Link>
        <Link href="/contact" className="btn-outline">Contact Us</Link>
      </div>
    </div>
  );
}
