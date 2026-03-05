import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/actions/blog";
import { Link } from "@/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  const origin = "https://www.reneedesignlab.com";
  const path = `${origin}/${locale}/blog/${slug}`;

  if (!post || !post.published) return { alternates: { canonical: path } };

  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/blog/${slug}`,
        en: `${origin}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.title,
      url: path,
      type: "article",
      locale: locale === "en" ? "en_US" : "tr_TR",
      ...(post.coverImage && {
        images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      title: post.title,
      description: post.excerpt ?? post.title,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getPublishedPosts(),
  ]);

  if (!post || !post.published) notFound();

  const related = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero cover */}
      {post.coverImage && (
        <div className="relative h-[50vh] mb-16 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05010d] via-[#05010d]/50 to-[#05010d]/20" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link
          href={"/blog" as Parameters<typeof Link>[0]["href"]}
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          {post.category && (
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-violet-600/20 text-violet-400 border border-violet-600/30">
              {post.category.name}
            </span>
          )}
          <span className="text-[10px] text-white/30 flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {new Date(post.createdAt).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-none mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-white/50 text-lg leading-relaxed font-light mb-12 pb-12 border-b border-white/8">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Divider */}
        <div className="mt-20 pt-16 border-t border-white/8">
          {related.length > 0 && (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-8">
                Diğer Yazılar
              </p>
              <div className="space-y-px">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}` as Parameters<typeof Link>[0]["href"]}
                    className="group flex items-center justify-between py-5 border-b border-white/8 hover:border-white/20 transition-all"
                  >
                    <div>
                      <p className="text-white font-semibold group-hover:text-violet-300 transition-colors">
                        {p.title}
                      </p>
                      {p.category && (
                        <p className="text-xs text-white/30 mt-1">
                          {p.category.name}
                        </p>
                      )}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/15 group-hover:text-violet-400 transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
