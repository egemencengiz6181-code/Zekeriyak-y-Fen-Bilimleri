"use client";

import { useActionState } from "react";
import { createCategory } from "@/lib/actions/blog";

const initial = { error: "" };

export default function CategoryForm() {
  const [state, formAction, isPending] = useActionState(
    async (_: typeof initial, formData: FormData) => {
      const result = await createCategory(formData);
      return result ?? initial;
    },
    initial
  );

  return (
    <form action={formAction} className="flex gap-2">
      <input
        name="name"
        type="text"
        placeholder="Yeni kategori..."
        required
        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all"
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-3 py-2 bg-violet-600/30 hover:bg-violet-600/50 border border-violet-600/30 rounded-lg text-violet-400 text-sm font-bold transition-all disabled:opacity-50"
      >
        +
      </button>
    </form>
  );
}
