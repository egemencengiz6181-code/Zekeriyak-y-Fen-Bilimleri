'use client';

import HoverFooter from '@/components/ui/hover-footer';
import { usePathname } from '@/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Reklam landing sayfası (/form) tek hedefli bir akış — footer'daki
  // gezinme linkleri dönüşümü düşürüyor, bu yüzden gösterilmiyor.
  if (pathname.startsWith('/form')) return null;

  return <HoverFooter />;
}
