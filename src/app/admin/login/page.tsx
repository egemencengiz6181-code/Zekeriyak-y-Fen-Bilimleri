"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

const initialState = { error: "" };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_: typeof initialState, formData: FormData) => {
      const result = await loginAction(formData);
      return result ?? initialState;
    },
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-2">
            Renee DesignLab
          </p>
          <h1 className="text-3xl font-black tracking-tighter text-white">
            Admin Girişi
          </h1>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              E-posta
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500 focus:bg-white/8 transition-all text-sm"
              placeholder="egemen.cengiz@reneedesignlab.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Şifre
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500 focus:bg-white/8 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide transition-all"
          >
            {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
