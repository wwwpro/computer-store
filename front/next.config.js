/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media-amazon.com'],
  },
  output: 'standalone',
  compress: false,
}

module.exports = nextConfig
