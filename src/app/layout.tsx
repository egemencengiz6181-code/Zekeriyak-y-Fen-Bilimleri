import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.reneedesignlab.com'),
  title: {
    default: 'Renee DesignLab',
    template: '%s | Renee DesignLab',
  },
  description: 'Ankara merkezli dijital tasarım ve reklam ajansı.',
  authors: [{ name: 'Renee DesignLab', url: 'https://www.reneedesignlab.com' }],
  creator: 'Renee DesignLab',
  publisher: 'Renee DesignLab',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/logos/Main_Simge_Beyaz.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Renee DesignLab',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@reneedesignlab',
    creator: '@reneedesignlab',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
