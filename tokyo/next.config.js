/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a local verification build write somewhere other than .next, so it
  // cannot clobber the manifests of a dev server that is already running.
  // Vercel builds with no override and so still uses the default .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

module.exports = nextConfig;
