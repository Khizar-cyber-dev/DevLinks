import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/u/:username",
        destination: "/:username",
      },
    ];
  },
  images: {
    domains: ['localhost', 'img.clerk.com'],
  },
};

export default nextConfig;