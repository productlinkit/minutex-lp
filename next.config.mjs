/** @type {import('next').NextConfig} */
const nextConfig = {
  // Verification builds can target a separate output dir via NEXT_BUILD_DIR
  // (e.g. `.next-verify`) so they never overwrite the `.next` that
  // `npm run dev` is actively serving — which otherwise causes stale-chunk
  // 404s in the dev terminal. `npm run dev` and Vercel use the default `.next`.
  distDir: process.env.NEXT_BUILD_DIR || ".next",

  images: {
    // Serve AVIF (much smaller than WebP/PNG) when the browser supports it,
    // falling back to WebP — the source case-study/iPhone assets are large, so
    // this meaningfully cuts the bytes next/image actually ships to visitors.
    formats: ["image/avif", "image/webp"],
    // Cache optimized variants for 31 days instead of the 60s default.
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
};

export default nextConfig;
