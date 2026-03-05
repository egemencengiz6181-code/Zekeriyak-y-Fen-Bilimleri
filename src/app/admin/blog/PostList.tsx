"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { togglePublish, deletePost } from "@/lib/actions/blog";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";

type Post = {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  category: { name: string } | null;
};

export default function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: number, published: boolean) => {
    startTransition(async () => {
      await togglePublish(id, published);
      router.refresh();
    });
  };

  const handleDelete = (id: number, title: string) => {
    if (!confirm(`"${title}" yazısını silmek istediğinize emin misiniz?`)) return;
    startTransition(async () => {
      await deletePost(id);
      router.refresh();
    });
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 text-white/25">
        <p className="text-lg">Henüz yazı yok.</p>
        <p className="text-sm mt-2">İlk yazınızı oluşturun!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2" style={{ opacity: isPending ? 0.7 : 1 }}>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-all group"
        >
          {/* Status indicator */}
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: post.published ? "#4ade80" : "#6b7280" }}
          />

          {/* Post info */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">
              {post.title}
            </p>
            <div className="flex items-center gap-3 mt-1">
              {post.category && (
                <span className="text-[10px] text-violet-400 font-bold uppercase tracking-wider">
                  {post.category.name}
                </span>
              )}
              <span className="text-[10px] text-white/30">
                {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  post.published ? "text-green-400" : "text-white/25"
                }`}
              >
                {post.published ? "Yayında" : "Taslak"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleToggle(post.id, post.published)}
              title={post.published ? "Yayından Kaldır" : "Yayınla"}
              className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all"
            >
              {post.published ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
              title="Düzenle"
              className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-violet-400 transition-all"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(post.id, post.title)}
              title="Sil"
              className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
