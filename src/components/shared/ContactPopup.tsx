"use client";

import { useEffect, useState } from "react";
import { X, Phone, MessageCircle } from "lucide-react";

interface ContactPopupProps {
  children: React.ReactNode;
}

export default function ContactPopup({ children }: ContactPopupProps) {
  const [open, setOpen] = useState(false);

  // Modal açıkken arka plan scroll'unu kilitle (mobilde kayma sorunu)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC ile kapat
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Tetikleyici */}
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {open && (
        <>
          {/* Arka plan — backdrop blur YOK, düz siyah opaklık */}
          <div
            className="fixed inset-0 z-[200] bg-black/70 animate-fade-in"
            onClick={() => setOpen(false)}
          />

          <div
            className="fixed z-[201] inset-0 flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
          >
            <div className="animate-pop-in pointer-events-auto w-full max-w-[380px] max-h-[90dvh] overflow-y-auto overscroll-contain rounded-3xl bg-white dark:bg-[#0e0e14] border border-black/10 dark:border-white/10 shadow-2xl">
              {/* Başlık */}
              <div className="relative px-6 pt-6 pb-4 text-center">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-4 h-4 text-black/60 dark:text-white/60" />
                </button>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E35205]/10 border border-[#E35205]/20 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E35205]" />
                  <span className="text-xs font-semibold text-[#E35205] uppercase tracking-wider">
                    Kayıt &amp; Bilgi Al
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  Nasıl ulaşmak istersiniz?
                </h2>
                <p className="text-sm text-slate-500 dark:text-white/40 mt-1">
                  Hemen arayın veya WhatsApp&apos;tan yazın.
                </p>
              </div>

              {/* Aksiyonlar */}
              <div className="px-6 pb-6 flex flex-col gap-3">
                <a
                  href="tel:02125054001"
                  className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-[#E35205] hover:bg-[#A03500] active:scale-[0.97] transition-all duration-200 shadow-[0_4px_20px_rgba(227,82,5,0.35)]"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm leading-none">Arama Yap</p>
                    <p className="text-white/75 text-xs mt-1">0212 505 40 01</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/905435094151"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1fbb58] active:scale-[0.97] transition-all duration-200 shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm leading-none">
                      WhatsApp Bilgi Hattı
                    </p>
                    <p className="text-white/75 text-xs mt-1">0543 509 41 51</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
