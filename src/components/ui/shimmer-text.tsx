"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function ShimmerText({
  children,
  className,
  duration = 2.8,
  delay = 1.0,
}: ShimmerTextProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Use stable fallback until mounted to prevent SSR/client mismatch
  const isDark = mounted ? resolvedTheme === "dark" : false;
  const c = isDark ? "255,255,255" : "0,0,0";
  const lo = isDark ? 0.08 : 0.06;
  const hi = isDark ? 0.22 : 0.15;

  return (
    <div className="overflow-hidden">
      <motion.div
        className={cn("inline-block whitespace-nowrap select-none", className)}
        style={{
          WebkitTextFillColor: "transparent",
          backgroundImage:
            `linear-gradient(to right, rgba(${c},${lo}) 0%, rgba(${c},${hi}) 40%, rgba(${c},${hi}) 60%, rgba(${c},${lo}) 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          backgroundRepeat: "no-repeat",
          backgroundSize: "50% 200%",
        } as React.CSSProperties}
        initial={{ backgroundPositionX: "250%" }}
        animate={{ backgroundPositionX: ["-100%", "250%"] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ShimmerText;
