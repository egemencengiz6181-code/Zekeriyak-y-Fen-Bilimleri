import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zekeriyakoyfenbilimleri.com'),
  title: {
    default: 'Zekeriyaköy Fen Bilimleri',
    template: '%s | Zekeriyaköy Fen Bilimleri',
  },
  description: "Sarıyer — Zekeriyaköy Nazmi Arıkan Fen Bilimleri Dershanesi. LGS ve YKS'de hedef okula giden yol.",
  authors: [{ name: 'Zekeriyaköy Fen Bilimleri', url: 'https://www.zekeriyakoyfenbilimleri.com' }],
  creator: 'Zekeriyaköy Fen Bilimleri',
  publisher: 'Zekeriyaköy Fen Bilimleri',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/logos/Fen%20bilimleri%20logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Zekeriyaköy Fen Bilimleri',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zekeriyakoyfenbilimleri',
    creator: '@zekeriyakoyfenbilimleri',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
