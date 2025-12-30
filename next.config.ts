import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'build',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
