/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? `${process.env.ASSET_BUCKET}/nextjs` : '',
  images: {
    domains: ['media-amazon.com'],
  },
  output: 'standalone',
  compress: false,
}

module.exports = nextConfig
