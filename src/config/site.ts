// Site sabitleri — tek kaynak. Önceden origin ve marka adı 8 ayrı dosyada
// elle tekrarlanıyordu (bir kısmında yanlış kurum adı yazılıydı).

export const ORIGIN = 'https://www.bahcelievlersevinc.com';

export const BRAND = 'Bahçelievler Sevinç Dershanesi';

export const PHONE = '+902125054001';
export const PHONE_DISPLAY = '0(212) 505 40 01';
export const EMAIL = 'bahcelievlersevinckurs@gmail.com';
export const WHATSAPP = 'https://wa.me/905435094151';

export const ADDRESS = 'Haznedar, Bahçelievler Mahallesi, Bağcılar Caddesi No:11, Bahçelievler/İstanbul';

/** Open Graph / Twitter kart görseli. Next iç içe metadata'da `openGraph`
 *  nesnesini derin birleştirmediği için her `generateMetadata`da açıkça
 *  verilmesi gerekiyor. */
export const ogImages = [
  {
    url: '/logos/Sevinc-Kurs-Logo.png',
    width: 512,
    height: 512,
    alt: BRAND,
  },
];
