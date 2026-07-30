'use client';

import { usePathname } from 'next/navigation';
import HoverFooter from '@/components/ui/hover-footer';

export default function Footer() {
  const pathname = usePathname();

  // /form reklam landing page'i — dönüşümü dağıtmamak için footer gösterilmez
  if (pathname?.includes('/form')) return null;

  return <HoverFooter />;
}
