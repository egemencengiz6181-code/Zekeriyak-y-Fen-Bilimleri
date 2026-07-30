"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

/**
 * Statik gradient border.
 *
 * Eski sürüm document.body üzerinde `pointermove` + `scroll` dinleyip her
 * olayda requestAnimationFrame tetikliyordu ve `background-attachment: fixed`
 * kullanıyordu — ikisi de iOS Safari'de her scroll'da tam repaint'e yol açıp
 * GPU'yu kilitliyordu. Artık hiç JS çalışmıyor, sadece bir CSS gradient var.
 *
 * Props geriye dönük uyumluluk için korundu; davranışı etkilemiyorlar.
 */
interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    variant = "default",
    glow = false,
    className,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    if (disabled) return null;

    return (
      <div
        aria-hidden
        style={
          {
            "--glow-border-width": `${borderWidth}px`,
            "--glow-gradient":
              variant === "white"
                ? "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.15))"
                : "linear-gradient(135deg, #ec2027 0%, #12648f 50%, #ec2027 100%)",
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit]",
          "before:content-[''] before:absolute before:rounded-[inherit]",
          "before:inset-[calc(-1*var(--glow-border-width))]",
          "before:[background:var(--glow-gradient)]",
          "before:[padding:var(--glow-border-width)]",
          "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
          "before:[mask-composite:exclude]",
          "before:[-webkit-mask-composite:xor]",
          glow ? "opacity-60" : "opacity-30",
          className
        )}
      />
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
