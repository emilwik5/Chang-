/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["argon2"],
  },
};

module.exports = {
  nextConfig,
  images: {
    domains: ["image.tmdb.org"],
  },
};
