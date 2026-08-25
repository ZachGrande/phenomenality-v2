import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'build',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  // TODO: remove once the ~77 pre-existing type errors are burned down.
  // Run `npm run typecheck` to see them; they are no longer invisible.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
