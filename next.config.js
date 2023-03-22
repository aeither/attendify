/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'placehold.co', 'gateway.ipfscdn.io'],
  },
}

module.exports = nextConfig
