import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // Lets other devices on the local network open `next dev` by IP (e.g. http://192.168.0.30:3000)
  // with hot reload working. Development only: production is not affected.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  images: {
    // Thumbnails of the YouTube video testimonials on the home.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
