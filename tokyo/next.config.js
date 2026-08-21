/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a local verification build write somewhere other than .next, so it
  // cannot clobber the manifests of a dev server that is already running.
  // Vercel builds with no override and so still uses the default .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // The archived taiyo2049 site is plain static files whose asset paths are
  // relative, so the browser has to be sitting on a URL inside that folder.
  // Redirecting (not rewriting) to index.html moves the address bar there;
  // a rewrite would leave it on /taiyo2049 and every asset would resolve
  // against the site root instead.
  async redirects() {
    return [
      {
        source: "/taiyo2049",
        destination: "/taiyo2049/index.html",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
