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
      // z-40: sayfa içeriğinin (z-10) üstünde ama mobil menünün (z-60)
      // altında kalmalı — yoksa menü açıkken menünün üzerine biniyor.
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pt-6 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none"
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      {/* Buton OPAK: `bg-black/10` iken sayfa içeriği butonun içinden
          görünüyordu (eskiden backdrop-blur maskeliyordu, Safari için
          kaldırıldı). Marka rengiyle dolu — aynı zamanda daha iyi bir CTA. */}
      <button
        onClick={handleClick}
        className="pointer-events-auto w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-semibold text-base tracking-wide shadow-[0_8px_32px_rgba(236,32,39,0.35)] active:scale-95 transition-transform touch-manipulation"
      >
        <span className="inline-flex rounded-full h-2 w-2 bg-white/90" />
        {at("button")}
      </button>
    </div>
  );
}
