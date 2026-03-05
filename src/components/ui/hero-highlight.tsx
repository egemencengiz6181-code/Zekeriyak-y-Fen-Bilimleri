"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Highlight (inline word / phrase marker) ─────────────────────────────────
interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

export function Highlight({ children, className }: HighlightProps) {
  return (
    <span className={cn("relative inline", className)}>
      <motion.span
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className="absolute inset-0 -z-10 rounded-sm bg-gradient-to-r from-violet-600/30 to-purple-500/20"
        style={{ bottom: "-2px", top: "2px" }}
      />
      <motion.span
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-400 to-violet-500 rounded-full"
      />
      <span className="relative text-violet-300">{children}</span>
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
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-3xl",
        containerClassName
      )}
    >
      {/* Radial spotlight that follows mouse */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.12), transparent 70%)`,
        }}
        transition={{ duration: 0 }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Static ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(109,40,217,0.07),transparent)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn("relative z-10 text-center px-6 py-16", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
