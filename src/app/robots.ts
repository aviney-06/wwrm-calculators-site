import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/*?_rsc=*',
    },
    sitemap: 'https://www.all1calculators.com/sitemap.xml',
  }
}