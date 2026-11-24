import type { NextConfig } from "next";

// STATIC_EXPORT=true builds plain HTML/CSS/JS into `out/` for static hosting (GitHub Pages, see
// .github/workflows/deploy-pages.yml): no Node server and no image optimizer. Every other build
// stays a standalone server (Docker, `next start`).
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: staticExport ? "export" : "standalone",
  // Sub-path the site is served under, e.g. "/site-magister" on GitHub Pages.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  // Static hosts serve `blog/index.html` for `/blog/`; `blog.html` would clash with the `blog/` folder.
  trailingSlash: staticExport,
  // Lets other devices on the local network open `next dev` by IP (e.g. http://192.168.0.30:3000)
  // with hot reload working. Development only: production is not affected.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  images: {
    ...(staticExport && { loader: "custom", loaderFile: "./src/lib/image-loader.ts" }),
    // Thumbnails of the YouTube video testimonials on the home.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
