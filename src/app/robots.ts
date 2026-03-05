import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const origin = 'https://www.reneedesignlab.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
