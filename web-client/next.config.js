/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This allows us to connect to the separate backend easily
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
      },
    ]
  },
}

module.exports = nextConfig
