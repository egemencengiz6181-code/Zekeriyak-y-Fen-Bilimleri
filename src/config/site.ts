// Site sabitleri — tek kaynak.

export const ORIGIN = 'https://www.zekeriyakoyfenbilimleri.com';

export const BRAND = 'Zekeriyaköy Nazmi Arıkan Fen Bilimleri';

export const PHONE = '+902122015848';
export const PHONE_DISPLAY = '0212 201 58 48';
export const EMAIL = 'zekeriyakoyfenbilimleri@gmail.com';

export const ADDRESS =
  'Uskumruköy, Zekeriyaköy Mahallesi, Kilyos Caddesi No: 238/2, Sarıyer/İstanbul';

/**
 * Open Graph / Twitter kart görseli.
 *
 * ÖNEMLİ: Next.js iç içe metadata'da `openGraph` nesnesini DERİN BİRLEŞTİRMEZ —
 * alt bir `generateMetadata` kendi `openGraph`'ını verdiği anda üst layout'un
 * `images` alanı tamamen düşer. Bu yüzden `openGraph` tanımlayan HER dosya
 * `images: OG_IMAGE` satırını açıkça yazmak zorunda.
 */
export const OG_IMAGE = [
  {
    url: `${ORIGIN}/logos/fen-bilimleri-logo.png`,
    alt: BRAND,
  },
];

export const TWITTER_IMAGE = [`${ORIGIN}/logos/fen-bilimleri-logo.png`];
