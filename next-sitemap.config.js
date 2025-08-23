/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://rahico-parc-auto.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/']
      }
    ],
    additionalSitemaps: [
      'https://rahico-parc-auto.vercel.app/api/sitemap.xml'
    ]
  },
  exclude: ['/api/*', '/_next/*', '/admin/*'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    // Personnaliser les priorités selon les pages
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString()
      }
    }
    
    if (path.startsWith('/voiture/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      }
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString()
    }
  }
}
