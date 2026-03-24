import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ferrismowers.com',
      },
    ],
  },
};

export default nextConfig;
