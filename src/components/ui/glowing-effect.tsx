import { cn } from "@/lib/utils";

/**
 * Kenar parlaması — server component, sıfır JS.
 *
 * Eski sürüm `document.body` üzerine `pointermove` + `window` üzerine `scroll`
 * dinleyicisi kuruyor, her fare hareketinde getBoundingClientRect() çağırıp
 * framer-motion `animate()` ile bir CSS değişkenini sürüyordu. Dekoratif bir
 * kenar çizgisi için kare başına iş yapmaya değmez — aynı görünüm CSS
 * conic-gradient + `group-hover` ile elde ediliyor.
 *
 * Props geriye dönük uyumluluk için korundu (çağıran taraf değişmedi).
 */
interface GlowingEffectProps {
  className?: string;
  /** Kenar kalınlığı (px) */
  borderWidth?: number;
  /** Sadece API uyumluluğu için — CSS sürümünde kullanılmıyor */
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  disabled?: boolean;
  movementDuration?: number;
}

export function GlowingEffect({ className, borderWidth = 1, disabled = false }: GlowingEffectProps) {
  if (disabled) return null;

  return (
    <div
      aria-hidden
      style={{
        background:
          "conic-gradient(from 180deg at 50% 50%, #E35205, #A03500, #FF9E7F, #E35205)",
        padding: `${borderWidth}px`,
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        className,
      )}
    />
  );
}

export default GlowingEffect;
