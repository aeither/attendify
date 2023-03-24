import NextPWA from 'next-pwa'

const inDevelopment = process.env.NODE_ENV === 'development'
const withPWA = NextPWA({ dest: 'public', disable: inDevelopment })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'placehold.co', 'gateway.ipfscdn.io'],
  },
}
export default withPWA(nextConfig)
