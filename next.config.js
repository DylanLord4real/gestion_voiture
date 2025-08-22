/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['dl.airtable.com'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
  },
}

module.exports = nextConfig
