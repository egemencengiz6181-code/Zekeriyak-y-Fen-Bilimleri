import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kayıt Formu | Zekeriyaköy Nazmi Arıkan Fen Bilimleri',
  description:
    'Zekeriyaköy Nazmi Arıkan Fen Bilimleri kayıt ve bilgi formu. Öğrenciniz için en uygun programı birlikte belirleyelim.',
  // Reklam kampanyası landing sayfası — organik aramada çıkmamalı.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: {},
};

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return children;
}
