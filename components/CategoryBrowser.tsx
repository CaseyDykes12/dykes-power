import Link from 'next/link';
import Image from 'next/image';
import { categoryBrowse, getCategoryCoverImage } from '@/lib/categories';

export default function CategoryBrowser() {
  return (
    <section className="bg-dykes-black py-12 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-2">
          Find Your Ferris<sup className="text-[9px]">®</sup>
        </p>
        <h2
          className="text-3xl md:text-5xl font-bold mb-10 text-white"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
        >
          Built for the work you do.
        </h2>

        <div className="space-y-10">
          {categoryBrowse.map((cat) => (
            <article key={cat.slug} className="flex flex-col">
              <Link
                href={cat.href}
                aria-label={`View ${cat.label}`}
                className="block bg-white rounded-xl overflow-hidden border border-gray-300 hover:border-dykes-silver transition-colors"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={getCategoryCoverImage(cat)}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain p-4 sm:p-6"
                  />
                </div>
              </Link>

              <div className="pt-4 px-1">
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
                >
                  {cat.label}
                </h3>
                <p className="text-dykes-gray-300 text-base mb-3 leading-relaxed">
                  {cat.description}
                </p>
                <Link
                  href={cat.href}
                  className="inline-flex items-center text-white font-bold uppercase tracking-widest text-sm hover:text-dykes-silver transition-colors"
                >
                  View {cat.shortLabel} <span aria-hidden="true" className="ml-2">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
