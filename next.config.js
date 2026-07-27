/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['technicalindicators'],
  },
}

module.exports = nextConfig
