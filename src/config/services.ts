// Program slug'ları — tek kaynak. Navbar, /services, /services/[slug] ve
// sitemap.xml hepsi buradan okur (önceden 4 yerde kopyalanmıştı).

export const serviceSlugs = [
  '6-sinif',
  '7-sinif',
  '8-sinif',
  '9-sinif',
  '10-sinif',
  '11-sinif',
  '12-sinif',
  'mezun',
  '8-sinif-vip',
  '12-sinif-vip',
  'deneme-kulubu',
  'ozel-ders',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceIcons: Record<ServiceSlug, string> = {
  '6-sinif': 'BookOpen',
  '7-sinif': 'BookOpen',
  '8-sinif': 'Trophy',
  '9-sinif': 'BookOpen',
  '10-sinif': 'BookOpen',
  '11-sinif': 'GraduationCap',
  '12-sinif': 'Trophy',
  mezun: 'GraduationCap',
  '8-sinif-vip': 'Star',
  '12-sinif-vip': 'Star',
  'deneme-kulubu': 'FileText',
  'ozel-ders': 'Users',
};

/** Mega menüde gösterilen programlar (12'si de listede fazla yer kaplıyor) */
export const megaMenuSlugs: readonly ServiceSlug[] = [
  '6-sinif',
  '7-sinif',
  '8-sinif',
  '9-sinif',
  '10-sinif',
  '11-sinif',
  '12-sinif',
  'mezun',
  '8-sinif-vip',
  '12-sinif-vip',
];

/** Servis sayfası görselleri — yerel dosyalar (önceden Unsplash'tan
 *  uzaktan çekiliyordu: her sayfada 2 harici istek + görsel optimizasyonu). */
export const serviceImages: Record<ServiceSlug, { hero: string; tech: string; alt: string }> = {
  '6-sinif': { hero: '/okul2/unnamed-6.jpg', tech: '/okul2/unnamed-7.jpg', alt: '6. sınıf ders programı' },
  '7-sinif': { hero: '/okul2/unnamed-7.jpg', tech: '/okul2/unnamed-6.jpg', alt: '7. sınıf ders programı' },
  '8-sinif': { hero: '/okul2/unnamed-6.jpg', tech: '/okul2/unnamed-7.jpg', alt: '8. sınıf LGS hazırlık' },
  '9-sinif': { hero: '/okul2/unnamed-7.jpg', tech: '/okul2/unnamed-6.jpg', alt: '9. sınıf ders programı' },
  '10-sinif': { hero: '/okul2/unnamed-6.jpg', tech: '/okul2/unnamed-7.jpg', alt: '10. sınıf ders programı' },
  '11-sinif': { hero: '/okul2/unnamed-7.jpg', tech: '/okul2/unnamed-6.jpg', alt: '11. sınıf YKS hazırlık' },
  '12-sinif': { hero: '/okul2/unnamed-6.jpg', tech: '/okul2/unnamed-7.jpg', alt: '12. sınıf YKS hazırlık' },
  mezun: { hero: '/okul2/unnamed-7.jpg', tech: '/okul2/unnamed-6.jpg', alt: 'Mezun YKS hazırlık' },
  '8-sinif-vip': { hero: '/okul2/unnamed-6.jpg', tech: '/okul2/unnamed-7.jpg', alt: '8. sınıf VIP LGS hazırlık' },
  '12-sinif-vip': { hero: '/okul2/unnamed-7.jpg', tech: '/okul2/unnamed-6.jpg', alt: '12. sınıf VIP YKS hazırlık' },
  'deneme-kulubu': { hero: '/okul2/unnamed-6.jpg', tech: '/okul2/unnamed-7.jpg', alt: 'Deneme kulübü ve sınav analizi' },
  'ozel-ders': { hero: '/okul2/unnamed-7.jpg', tech: '/okul2/unnamed-6.jpg', alt: 'Birebir özel ders' },
};
