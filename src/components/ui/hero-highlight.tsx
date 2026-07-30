// Server component — fare takip eden spotlight kaldırıldı (her fare hareketinde
// React state + framer-motion animate ediyordu). Yerine statik CSS gradient.

import { cn } from '@/lib/utils';
import Reveal from '@/components/ui/reveal';

interface HeroHighlightProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function HeroHighlight({ children, className, containerClassName }: HeroHighlightProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-3xl',
        containerClassName,
      )}
    >
      {/* Ambiyans gradient — blur filtresi yok */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_50%,rgba(227,82,5,0.08),transparent)] pointer-events-none" />

      <Reveal className={cn('relative z-10 text-center px-6 py-16', className)}>
        {children}
      </Reveal>
    </div>
  );
}

export default HeroHighlight;
