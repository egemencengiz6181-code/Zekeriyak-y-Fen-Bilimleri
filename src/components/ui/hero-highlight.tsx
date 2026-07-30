"use client";

import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/reveal";

// ─── Highlight (inline word / phrase marker) ─────────────────────────────────
interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

export function Highlight({ children, className }: HighlightProps) {
  return (
    <span className={cn("relative inline", className)}>
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-sm bg-gradient-to-r from-[#ec2027]/30 to-[#12648f]/20"
        style={{ bottom: "-2px", top: "2px" }}
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ec2027] via-[#f06060] to-[#ec2027] rounded-full"
      />
      <span className="relative text-[#f06060]">{children}</span>
    </span>
  );
}

// ─── HeroHighlight (full quote / hero text block) ────────────────────────────
interface HeroHighlightProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function HeroHighlight({
  children,
  className,
  containerClassName,
}: HeroHighlightProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-3xl",
        containerClassName
      )}
    >
      {/* Statik ambient glow — imleci takip eden spotlight kaldırıldı: her
          mousemove'da setState + `background` string animasyonu tetikliyordu,
          bu da her harekette tam re-render ve tam repaint demekti. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(236,32,39,0.07),transparent)]"
      />

      <Reveal className={cn("relative z-10 text-center px-6 py-16", className)}>
        {children}
      </Reveal>
    </div>
  );
}
