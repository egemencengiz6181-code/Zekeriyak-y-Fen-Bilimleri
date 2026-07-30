"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/navigation";

export default function MobileStickyButton() {
  const at = useTranslations("AnalysisModal");
  const pathname = usePathname();

  // Reklam landing sayfasında kendi formu var — sticky CTA orada gereksiz ve
  // form alanlarının üstünü kapatıyor.
  if (pathname.startsWith("/form")) return null;

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-analysis-modal"));
  };

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pt-6 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none"
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <button
        onClick={handleClick}
        className="pointer-events-auto w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 text-black dark:text-white font-semibold text-base tracking-wide shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] active:scale-95 transition-transform touch-manipulation"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ec2027]" />
        </span>
        {at("button")}
      </button>
    </div>
  );
}
