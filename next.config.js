/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppression de output: 'export' pour permettre SSR/ISR sur Vercel
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['dl.airtable.com'],
    // Suppression de unoptimized pour utiliser l'optimisation d'images Vercel
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  },
}

module.exports = nextConfig
