import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/shop',
        destination: '/catalog',
        permanent: true,
      },
      {
        source: '/shipping',
        destination: '/shipping-returns',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/catalog',
        permanent: true,
      },
      {
        source: '/products/utility-trailers',
        destination: '/trailers',
        permanent: true,
      },
      {
        source: '/products/accessories',
        destination: '/accessories',
        permanent: true,
      },
      {
        source: '/all-products',
        destination: '/catalog',
        permanent: true,
      },
      // Cleanup redirects for legacy / external broken links that were
      // surfaced in the 2026-05-12 advisor audit.
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/zero-turn-mowers',
        destination: '/products/zero-turn-mowers',
        permanent: true,
      },
      {
        source: '/stand-on-mowers',
        destination: '/products/stand-on-mowers',
        permanent: true,
      },
      {
        source: '/walk-behind-mowers',
        destination: '/products/walk-behind-mowers',
        permanent: true,
      },
      {
        source: '/front-mount-mowers',
        destination: '/products/front-mount-mowers',
        permanent: true,
      },
      {
        source: '/stand-on-blowers',
        destination: '/products/stand-on-blowers',
        permanent: true,
      },
      {
        source: '/ride-on-spreader-sprayers',
        destination: '/products/ride-on-spreader-sprayers',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ferrismowers.com',
      },
      {
        protocol: 'https',
        hostname: 'imagescdn.dealercarsearch.com',
      },
    ],
  },
};

export default nextConfig;
