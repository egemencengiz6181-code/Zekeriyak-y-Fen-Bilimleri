import type { Metadata } from 'next';

const ORIGIN = 'https://www.zekeriyakoyfenbilimleri.com';
const LOGO = '/logos/fen-bilimleri-logo.png';

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: {
    default: 'Zekeriyaköy Fen Bilimleri',
    template: '%s | Zekeriyaköy Fen Bilimleri',
  },
  description:
    "Sarıyer — Zekeriyaköy Nazmi Arıkan Fen Bilimleri Dershanesi. LGS ve YKS'de hedef okula giden yol.",
  keywords: [
    'Zekeriyaköy Fen Bilimleri',
    'Zekeriyaköy dershane',
    'Sarıyer dershane',
    'Nazmi Arıkan Fen Bilimleri',
    'LGS kursu Sarıyer',
    'YKS kursu Sarıyer',
    'TYT AYT hazırlık',
    'Zekeriyaköy etüt merkezi',
    '8. sınıf LGS kursu',
    '12. sınıf YKS kursu',
    'mezun YKS programı',
    'Uskumruköy dershane',
    'deneme sınavı kulübü',
    'öğrenci rehberlik programı',
    'İstanbul özel ders kursu',
  ],
  authors: [{ name: 'Zekeriyaköy Fen Bilimleri', url: ORIGIN }],
  creator: 'Zekeriyaköy Fen Bilimleri',
  publisher: 'Zekeriyaköy Fen Bilimleri',
  category: 'education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: LOGO,
    shortcut: LOGO,
    apple: LOGO,
  },
  openGraph: {
    type: 'website',
    siteName: 'Zekeriyaköy Fen Bilimleri',
    locale: 'tr_TR',
    url: ORIGIN,
    images: [{ url: LOGO, alt: 'Zekeriyaköy Nazmi Arıkan Fen Bilimleri' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zekeriyakoyfenbilimleri',
    creator: '@zekeriyakoyfenbilimleri',
    images: [LOGO],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
