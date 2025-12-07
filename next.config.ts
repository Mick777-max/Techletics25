import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: 'firebasestorage.googleapis.com',
        protocol: 'https',
        pathname: '**',
      },
      {
        hostname: 'dnbca6q7do6n.cloudfront.net',
        protocol: 'https',
        pathname: '**',
      },
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
        pathname: '**',
      },
      {
        hostname: 'sgp.cloud.appwrite.io',
        protocol: 'https',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
