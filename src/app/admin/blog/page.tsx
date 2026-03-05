import Link from "next/link";
import { getPosts, getCategories } from "@/lib/actions/blog";
import { logoutAction } from "../login/actions";
import PostList from "./PostList";
import CategoryForm from "./CategoryForm";
import { PlusCircle, LogOut, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.length - publishedCount;

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="border-b border-white/8 bg-white/[0.02] sticky top-0 z-10 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
              Renee Admin
            </span>
            <span className="text-white/15">·</span>
            <span className="text-sm text-white/40">Blog Yönetimi</span>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Çıkış
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header + actions */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">
              Blog Yazıları
            </h1>
            <div className="flex gap-4 mt-2">
              <span className="text-sm text-white/30">
                <span className="text-green-400 font-bold">{publishedCount}</span> yayında
              </span>
              <span className="text-sm text-white/30">
                <span className="text-white/50 font-bold">{draftCount}</span> taslak
              </span>
            </div>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-white font-semibold text-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Yeni Yazı
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts list */}
          <div className="lg:col-span-2">
            <PostList posts={posts} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category manager */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-bold text-white">Kategoriler</h3>
              </div>

              {/* Existing categories */}
              <div className="space-y-1.5 mb-4">
                {categories.length === 0 && (
                  <p className="text-xs text-white/25">Henüz kategori yok.</p>
                )}
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/60 flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-white/25">/{cat.slug}</span>
                  </div>
                ))}
              </div>

              {/* Add category form */}
              <CategoryForm />
            </div>

            {/* Quick stats */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8">
              <h3 className="text-sm font-bold text-white mb-4">Özet</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Toplam Yazı</span>
                  <span className="text-white font-bold">{posts.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Yayında</span>
                  <span className="text-green-400 font-bold">{publishedCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Taslak</span>
                  <span className="text-white/50 font-bold">{draftCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Kategoriler</span>
                  <span className="text-violet-400 font-bold">{categories.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
