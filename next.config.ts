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
