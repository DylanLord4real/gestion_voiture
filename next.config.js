/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dl.airtable.com'],
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
  },
}

module.exports = nextConfig
