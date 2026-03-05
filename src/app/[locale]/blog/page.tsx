import type { Metadata } from "next";
import { getPublishedPosts, getCategories } from "@/lib/actions/blog";
import { Link } from "@/navigation";
import Image from "next/image";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const origin = "https://www.reneedesignlab.com";
  const path = `${origin}/${locale}/blog`;

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/blog`,
        en: `${origin}/en/blog`,
      },
    },
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
      url: path,
      locale: locale === "en" ? "en_US" : "tr_TR",
    },
    twitter: {
      title: t("meta_title"),
      description: t("meta_description"),
    },
  };
}

export default async function BlogPage() {
  const [posts, categories, t, locale] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
    getTranslations("Blog"),
    getLocale(),
  ]);

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-3">
            ✦ Blog
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
            {t("title_prefix")}{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {t("title_highlight")}
            </span>
          </h1>
          <p className="text-white/40 mt-4 text-lg font-light max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-white/20">
            <p className="text-2xl font-black tracking-tighter">
              {t("empty_title")}
            </p>
            <p className="text-sm mt-2 font-light">{t("empty_subtitle")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Posts grid */}
            <div className="lg:col-span-2 space-y-px">
              {posts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}` as Parameters<typeof Link>[0]["href"]}
                  className="group flex gap-6 py-8 border-b border-white/8 hover:border-white/20 transition-all"
                >
                  {/* Cover image */}
                  {post.coverImage && (
                    <div className="shrink-0 w-24 h-24 rounded-xl overflow-hidden border border-white/10 relative">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="96px"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    {/* Category + date */}
                    <div className="flex items-center gap-3 mb-2">
                      {post.category && (
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
                          style={{
                            color: "#8b5cf6",
                            backgroundColor: "#8b5cf610",
                            border: "1px solid #8b5cf630",
                          }}
                        >
                          {post.category.name}
                        </span>
                      )}
                      <span className="text-[10px] text-white/25 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString(locale, {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-white font-bold text-lg leading-snug group-hover:text-violet-300 transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-white/40 text-sm leading-relaxed font-light line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 self-center">
                    <ArrowUpRight className="w-5 h-5 text-white/15 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Recent posts */}
              <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {t("recent")}
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}` as Parameters<typeof Link>[0]["href"]}
                      className="group flex gap-3"
                    >
                      {post.coverImage && (
                        <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-white/10 relative">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white/70 text-sm font-medium leading-snug group-hover:text-white transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-white/25 text-[10px] mt-1">
                          {new Date(post.createdAt).toLocaleDateString(locale, {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5 flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    {t("categories")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-violet-500/50 transition-all cursor-default"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
