import type { MetadataRoute } from 'next';
import { works } from '@/config/works';

const origin = 'https://www.bahcelievlersevinc.com';
const locales = ['tr'] as const;

const serviceSlugs = [
  '6-sinif',
  '7-sinif',
  '8-sinif',
  '9-sinif',
  '10-sinif',
  '11-sinif',
  '12-sinif',
  'mezun',
  '8-sinif-vip',
  '12-sinif-vip',
  'deneme-kulubu',
  'ozel-ders',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static routes ────────────────────────────────────────────────────────────
  const staticPaths = ['', '/about', '/services', '/rehberlik', '/references', '/contact'];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? ('daily' as const) : ('weekly' as const),
      priority: path === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${origin}/${l}${path}`])
        ),
      },
    }))
  );

  // ── Services detail routes ───────────────────────────────────────────────────
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${origin}/${l}/services/${slug}`])
        ),
      },
    }))
  );

  // ── Works (case study) routes ────────────────────────────────────────────────
  const worksEntries: MetadataRoute.Sitemap = works.flatMap(({ slug }) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}/works/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${origin}/${l}/works/${slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...serviceEntries, ...worksEntries];
}
