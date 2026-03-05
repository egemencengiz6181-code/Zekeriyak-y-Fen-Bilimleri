"use client";

import { useActionState, useState, useEffect } from "react";
import { createPost, getCategories } from "@/lib/actions/blog";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { slugify } from "@/lib/slugify";

const TipTapEditor = dynamic(() => import("@/components/admin/TipTapEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-48 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
  ),
});

type Category = { id: number; name: string; slug: string };

const initialState = { error: "" };

export default function NewPostClient({ categories }: { categories: Category[] }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [published, setPublished] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (_: typeof initialState, formData: FormData) => {
      formData.set("published", published ? "true" : "false");
      const result = await createPost(formData);
      return result ?? initialState;
    },
    initialState
  );

  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="border-b border-white/8 bg-white/[0.02] sticky top-0 z-10 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-sm text-white/60">Yeni Yazı</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                published
                  ? "bg-green-500/20 border-green-500/30 text-green-400"
                  : "bg-white/5 border-white/10 text-white/40"
              }`}
            >
              {published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {published ? "Yayınlanacak" : "Taslak"}
            </button>
            <button
              form="post-form"
              type="submit"
              disabled={isPending}
              className="px-5 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-xl text-white font-bold text-sm transition-all"
            >
              {isPending ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <form id="post-form" action={formAction} className="space-y-6">
          {/* Title */}
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Yazı başlığı..."
            required
            className="w-full bg-transparent text-4xl font-black tracking-tighter text-white placeholder-white/15 focus:outline-none border-b border-white/10 pb-4"
          />

          {/* Slug preview */}
          {slug && (
            <p className="text-xs text-white/25 font-mono">
              /blog/<span className="text-violet-400">{slug}</span>
            </p>
          )}

          {/* Meta row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                Kategori
              </label>
              <select
                name="categoryId"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500 transition-all"
              >
                <option value="">Kategori seç...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                Kapak Görseli URL
              </label>
              <input
                name="coverImage"
                type="text"
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              Özet
            </label>
            <textarea
              name="excerpt"
              rows={2}
              placeholder="Kısa bir özet yazın..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all resize-none"
            />
          </div>

          {/* Editor */}
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              İçerik
            </label>
            <TipTapEditor name="content" />
          </div>

          {state?.error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {state.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
