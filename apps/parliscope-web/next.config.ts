import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ojpp/ui"],
  serverExternalPackages: ["@prisma/client", "@ojpp/db"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  experimental: {
    outputFileTracingIncludes: {
      "/**": ["../../packages/db/prisma/generated/**"],
    },
  },
};

export default nextConfig;
