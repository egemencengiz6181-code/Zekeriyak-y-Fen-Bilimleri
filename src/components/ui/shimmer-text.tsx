// Server component — shimmer artık saf CSS (globals.css → .shimmer-text).
// Önceden framer-motion + next-themes useTheme kullanıyordu; ikisi de
// gereksizdi çünkü renkler `.dark` seçicisiyle CSS'te çözülebiliyor.

import { cn } from '@/lib/utils';

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <div className="overflow-hidden">
      <div className={cn('shimmer-text inline-block whitespace-nowrap select-none', className)}>
        {children}
      </div>
    </div>
  );
}

export default ShimmerText;
