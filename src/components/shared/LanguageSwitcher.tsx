'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter, locales} from '@/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    router.replace(pathname, {locale: nextLocale});
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1 rounded-full border border-primary/30 hover:border-primary text-sm font-medium transition-colors uppercase"
    >
      {locale === 'tr' ? 'EN' : 'TR'}
    </button>
  );
}
