'use client';

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react';

/**
 * framer-motion `whileInView` yerine ~700 byte'lık IntersectionObserver.
 * framer-motion bu projede ilk yüklemeye ~40 kB gzip ekliyordu; scroll ile
 * beliren fade/slide için CSS geçişi yeterli.
 *
 * Tanınmayan prop'lar (onClick, aria-*, style vb.) alt etikete aktarılır.
 */
type RevealProps = {
  children?: ReactNode;
  className?: string;
  /** Kademeli gecikme (saniye) */
  delay?: number;
  /** Sarmalayıcı etiket — varsayılan div */
  as?: ElementType;
  /** Görünürlük eşiği (0-1) */
  amount?: number;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'ref'>;

export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  amount = 0.15,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver yoksa (çok eski tarayıcı) içeriği direkt göster
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
