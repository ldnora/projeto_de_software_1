import type { NextConfig } from "next";
import withMDX from "@next/mdx";

// Habilita o suporte a arquivos .mdx
const withMdx = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  // Disable eslinting during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
    ],
  },
  // Adiciona suporte a arquivos .mdx na pasta /app, /pages e /components
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default withMdx(nextConfig);