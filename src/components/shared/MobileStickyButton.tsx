"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function MobileStickyButton() {
  const at = useTranslations("AnalysisModal");
  const pathname = usePathname();

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-analysis-modal"));
  };

  // Form sayfasında gizle — zaten form var, sticky buton gereksiz
  if (pathname?.includes('/form')) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pt-6 bg-gradient-to-t from-background/80 to-transparent pointer-events-none"
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <button
        onClick={handleClick}
        className="pointer-events-auto w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl surface border text-black dark:text-white font-semibold text-base tracking-wide shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] active:scale-95 transition-transform touch-manipulation"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E35205] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E35205]" />
        </span>
        {at("button")}
      </button>
    </div>
  );
}
