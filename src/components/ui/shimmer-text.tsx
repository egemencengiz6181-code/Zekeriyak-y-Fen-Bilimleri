"use client";

import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

/**
 * Watermark başlık için shimmer efekti.
 *
 * Eskiden framer-motion `backgroundPositionX`'i sonsuz döngüde anime ediyordu:
 * bu compositor'a alınamayan bir özellik olduğu için her frame'de metnin
 * yeniden boyanmasına yol açıyordu. Artık aynı efekt CSS keyframe ile
 * yapılıyor ve renk `currentColor` üzerinden geldiği için `next-themes`
 * beklemeye (mounted state + hydration mismatch riski) de gerek kalmadı.
 */
export function ShimmerText({
  children,
  className,
  duration = 2.8,
  delay = 1.0,
}: ShimmerTextProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          "inline-block whitespace-nowrap select-none shimmer-text motion-reduce:animate-none",
          className
        )}
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ShimmerText;
