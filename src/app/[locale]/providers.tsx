"use client";

import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  // Site varsayılan olarak AÇIK temada açılır. Kullanıcı navbar'daki düğmeyle
  // koyu temayı seçerse tercihi localStorage'da saklanır ve sonraki
  // ziyaretlerde korunur. enableSystem={false}: işletim sisteminin koyu tema
  // tercihi bu varsayılanı ezmesin.
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
