import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
      },
    ],
  },
  webpack: (config) => {
    // Fix for pdfjs-dist
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
