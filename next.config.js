/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vhs',
  assetPrefix: '/vhs/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
