import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allows serving our elegant SVG placeholder images through next/image.
    // Once real JPG/WebP product photos are added, this still works out of the box.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
 
};

export default nextConfig;
