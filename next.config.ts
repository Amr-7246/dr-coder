import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin"

const nextIntlPlugin = createNextIntlPlugin()
const nextConfig: NextConfig = {
  transpilePackages: ['three'],
};

export default nextIntlPlugin(nextConfig);
