"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration mismatch önleme
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("w-9 h-9 rounded-full", className)} />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Açık moda geç" : "Koyu moda geç"}
      className={cn(
        "relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
        "bg-black/10 hover:bg-black/20 border border-black/20 text-black/70",
        "dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:text-white",
        className
      )}
    >
      <span className="relative w-4 h-4">
        {/* Sun — light mode'da görünür */}
        <Sun
          className={cn(
            "absolute inset-0 w-4 h-4 transition-all duration-300",
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          )}
        />
        {/* Moon — dark mode'da görünür */}
        <Moon
          className={cn(
            "absolute inset-0 w-4 h-4 transition-all duration-300",
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          )}
        />
      </span>
    </button>
  );
}
