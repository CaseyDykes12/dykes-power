import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Mower Tips, Guides & News | Dykes Motors Power Equipment Blog',
  description:
    'Expert advice on Ferris mowers, maintenance tips, buying guides, and lawn care from your authorized Ferris dealer in Collins, Mississippi.',
  keywords: 'Ferris mower tips, zero turn mower guide, lawn care Mississippi, mower maintenance, Collins MS',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-[#C8C8C8] text-sm font-semibold uppercase tracking-widest mb-2">
          From the Lot
        </p>
        <h1 className="text-4xl font-bold text-white mb-3">Mower Tips &amp; Guides</h1>
        <p className="text-gray-400 max-w-2xl">
          Buying advice, maintenance tips, and Ferris mower guides from our team in Collins, MS.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">Posts coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 hover:border-[#C8C8C8] transition-all flex flex-col"
            >
              <span className="text-xs text-[#C8C8C8] font-semibold uppercase tracking-widest mb-3">
                {post.category}
              </span>
              <h2 className="text-white font-bold text-lg leading-snug mb-3 flex-1">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-3 mb-4">{post.description}</p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-800">
                <span className="text-gray-500 text-xs">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'UTC',
                  })}
                </span>
                <span className="text-[#C8C8C8] text-xs font-semibold">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
