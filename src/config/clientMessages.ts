import type { AbstractIntlMessages } from 'next-intl';

/**
 * Client component'lerin gerçekten `useTranslations` ile okuduğu namespace'ler.
 *
 * `NextIntlClientProvider`a verilen her şey RSC payload'ına serialize edilip
 * HTML ile birlikte indirilir. Tüm mesaj dosyası 43 kB ve bunun 34 kB'ı tek
 * başına `Services` — o namespace ise yalnızca sunucu tarafında
 * (`getTranslations`) kullanılıyor, sonuçlar client'a prop olarak geçiyor.
 * Bu yüzden listede yok.
 */
export const clientNamespaces = [
  'Navbar',
  'Footer',
  'HeroMain',
  'LetsWork',
  'Contact',
  'AnalysisModal',
  'About',
] as const;

export function pickClientMessages(
  messages: AbstractIntlMessages | undefined,
): AbstractIntlMessages {
  if (!messages) return {};
  const source = messages as Record<string, unknown>;
  const picked: Record<string, unknown> = {};
  for (const ns of clientNamespaces) {
    if (ns in source) picked[ns] = source[ns];
  }
  return picked as AbstractIntlMessages;
}
