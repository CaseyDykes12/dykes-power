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
