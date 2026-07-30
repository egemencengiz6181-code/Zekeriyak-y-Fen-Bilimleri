import type { MetadataRoute } from 'next';
import { locales } from '@/config/locales';
import { serviceSlugs } from '@/config/services';

const origin = 'https://www.bahcelievlersevinc.com';

// NOT: /form reklam landing page'i bilinçli olarak sitemap'te yok — layout'unda
// robots: { index: false } tanımlı.
const staticPaths = ['', '/about', '/services', '/rehberlik', '/references', '/contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const alternates = (path: string) => ({
    languages: Object.fromEntries(locales.map((l) => [l, `${origin}/${l}${path}`])),
  });

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? ('daily' as const) : ('weekly' as const),
      priority: path === '' ? 1.0 : 0.8,
      alternates: alternates(path),
    })),
  );

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: alternates(`/services/${slug}`),
    })),
  );

  return [...staticEntries, ...serviceEntries];
}
