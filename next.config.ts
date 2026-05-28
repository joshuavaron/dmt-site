import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` emits a fully static site to `out/`, which is
  // what the Cloudflare Pages project serves. The site has no server runtime.
  output: "export",
  // All imagery is local (under /public). Static export has no image-optimization
  // server, so serve images as-is rather than through the default loader.
  images: { unoptimized: true },
};

export default nextConfig;
