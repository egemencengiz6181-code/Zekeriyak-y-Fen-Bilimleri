import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kayıt Formu | Bahçelievler Sevinç Dershanesi',
  description: 'Bahçelievler Sevinç Dershanesi kayıt ve bilgi formu. Öğrenciniz için en uygun programı birlikte belirleyelim.',
  robots: { index: false, follow: false },
};

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
