import type { MetadataRoute } from 'next';
import { works } from '@/config/works';
import { getPublishedPosts } from '@/lib/actions/blog';

export const dynamic = 'force-dynamic';

const origin = 'https://www.reneedesignlab.com';
const locales = ['tr', 'en'] as const;

const serviceSlugs = [
  'seo',
  'google-ads',
  'meta-ads',
  'web-design',
  'social-media',
  'production',
  'design',
  'pr',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static routes ────────────────────────────────────────────────────────────
  const staticPaths = ['', '/about', '/services', '/references', '/contact', '/blog'];

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

  // ── Blog post routes ─────────────────────────────────────────────────────────
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    blogEntries = posts.flatMap(({ slug, updatedAt }) =>
      locales.map((locale) => ({
        url: `${origin}/${locale}/blog/${slug}`,
        lastModified: new Date(updatedAt ?? now),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${origin}/${l}/blog/${slug}`])
          ),
        },
      }))
    );
  } catch {
    // Database may be unavailable during build — skip blog posts
  }

  return [...staticEntries, ...serviceEntries, ...worksEntries, ...blogEntries];
}
