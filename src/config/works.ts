export interface WorkI18n {
  tagline: string;
  category: string;
  services: string[];
  story: {
    challenge: string;
    approach: string;
    result: string;
  };
  stats: { label: string; value: string }[];
}

export interface Work {
  slug: string;
  brand: string;
  year: string;
  accentColor: string;
  coverImage: string;
  galleryImages: string[];
  i18n: {
    tr: WorkI18n;
    en: WorkI18n;
  };
}

/** Returns the Work merged with the correct locale's translatable fields. */
export function getLocalizedWork(work: Work, locale: string): Work & WorkI18n {
  const lang = locale === "en" ? "en" : "tr";
  return { ...work, ...work.i18n[lang] };
}

export const works: Work[] = [
  {
    slug: "arni",
    brand: "ARNİ",
    year: "2024",
    accentColor: "#3ECFB2",
    coverImage: "/works/arni/Instagram%20post%20-%201.jpg",
    galleryImages: [
      "/works/arni/Instagram%20post%20-%202.jpg",
      "/works/arni/Instagram%20post%20-%203.jpg",
      "/works/arni/Instagram%20post%20-%204.jpg",
      "/works/arni/Instagram%20post%20-%205.jpg",
      "/works/arni/Instagram%20post%20-%206.jpg",
    ],
    i18n: {
      tr: {
        tagline: "Sıfırdan Bir Marka Kimliği İnşa Ettik",
        category: "Kurumsal Kimlik",
        services: ["Logo Tasarımı", "Kurumsal Kimlik", "Marka Rehberi", "Baskı Tasarımı"],
        story: {
          challenge:
            "ARNİ, büyüyen bir teknoloji girişimi olarak pazarda kendine özgü ve kalıcı bir kimlik kurmak istiyordu. Logo, renk paleti ve kurumsal dil tamamen yoktan yaratılacaktı.",
          approach:
            "Özgün geometrik logo sembolünü, kurumsal teal-lacivert renk paletini ve geniş uygulama yelpazesini (kartvizit, binanın cephesi, marka kitabı, dijital arayüzler) kapsayan eksiksiz bir kimlik sistemi tasarladık.",
          result:
            "Tutarlı ve ölçeklenebilir bir kimlik sistemi teslim edildi. ARNİ markası, sektörde profesyonel ve güvenilir bir algıyla konumlandı.",
        },
        stats: [
          { label: "Uygulama", value: "12+" },
          { label: "Renk Sistemi", value: "6 Renk" },
          { label: "Süre", value: "3 Hafta" },
        ],
      },
      en: {
        tagline: "We Built a Brand Identity from Scratch",
        category: "Corporate Identity",
        services: ["Logo Design", "Corporate Identity", "Brand Guidelines", "Print Design"],
        story: {
          challenge:
            "ARNİ, a growing tech startup, wanted to establish a unique and lasting identity in the market. The logo, color palette and corporate language would all be created from scratch.",
          approach:
            "We designed a complete identity system embracing a unique geometric logo symbol, a corporate teal-navy color palette and a wide application range (business cards, building facade, brand book, digital interfaces).",
          result:
            "A consistent and scalable identity system was delivered. The ARNİ brand was positioned with a professional and trustworthy perception in the industry.",
        },
        stats: [
          { label: "Applications", value: "12+" },
          { label: "Color System", value: "6 Colors" },
          { label: "Duration", value: "3 Weeks" },
        ],
      },
    },
  },
  {
    slug: "deru",
    brand: "DERU",
    year: "2024",
    accentColor: "#F97316",
    coverImage: "/works/deru/2.png",
    galleryImages: [
      "/works/deru/3.png",
      "/works/deru/4.png",
      "/works/deru/6.png",
      "/works/deru/7.png",
      "/works/deru/8.png",
    ],
    i18n: {
      tr: {
        tagline: "Güçlü Bir Kimlikle Sahneye Çıktık",
        category: "Kurumsal Kimlik",
        services: ["Logo Tasarımı", "Kurumsal Kimlik", "Sosyal Medya Görselleri"],
        story: {
          challenge:
            "DERU, sektörde yeni bir oyuncu olarak fark yaratması gereken bir marka kimliğine ihtiyaç duyuyordu. Var olan geçici kimlik, profesyonel bir izlenim bırakamıyordu.",
          approach:
            "Cesur tipografi, özgün logo ve tutarlı renk sistemiyle kurumsal kimlik oluşturduk. Sosyal medya şablonları ve baskı materyalleriyle kimliği her temas noktasına taşıdık.",
          result:
            "Lansman sonrası marka algısı hedef kitlede güçlü ve profesyonel olarak konumlandı.",
        },
        stats: [
          { label: "Uygulama", value: "8+" },
          { label: "Şablon", value: "15 Adet" },
          { label: "Süre", value: "4 Hafta" },
        ],
      },
      en: {
        tagline: "We Launched with a Powerful Identity",
        category: "Corporate Identity",
        services: ["Logo Design", "Corporate Identity", "Social Media Visuals"],
        story: {
          challenge:
            "DERU, as a new player in the market, needed a brand identity that would stand out. The existing temporary identity failed to leave a professional impression.",
          approach:
            "We built a corporate identity with bold typography, a unique logo and a consistent color system. Social media templates and print materials carried the identity to every touchpoint.",
          result:
            "Post-launch, brand perception was positioned as strong and professional among the target audience.",
        },
        stats: [
          { label: "Applications", value: "8+" },
          { label: "Templates", value: "15 pcs" },
          { label: "Duration", value: "4 Weeks" },
        ],
      },
    },
  },
  {
    slug: "erts",
    brand: "ERTS",
    year: "2024",
    accentColor: "#6366F1",
    coverImage: "/works/erts/Frame%202.jpg",
    galleryImages: [
      "/works/erts/1.jpg",
      "/works/erts/Frame%204.jpg",
      "/works/erts/Frame%205.jpg",
      "/works/erts/Frame%207.jpg",
      "/works/erts/Frame%209.jpg",
    ],
    i18n: {
      tr: {
        tagline: "Mimari Kadraja Dönüştürdük",
        category: "Kurumsal Kimlik",
        services: ["Logo Tasarımı", "Kurumsal Kimlik", "Baskı Tasarımı"],
        story: {
          challenge:
            "ERTS, mimarlık ve inşaat sektöründe güçlü bir kurumsal imaj kurmak istiyordu. Markayı sektörün standartlarının üzerine taşıyacak özgün bir vizüel dil gerekiyordu.",
          approach:
            "Geometrik formlar ve güçlü kontrast renk paletini temel alan logo tasarımı oluşturduk. Kurumsal kimlik rehberiyle birlikte tüm baskı materyallerini teslim ettik.",
          result:
            "Kurumsal müşteri toplantılarında ve ihalelerde ilk günden güven veren bir imaj sağlandı.",
        },
        stats: [
          { label: "Uygulama", value: "10+" },
          { label: "Renk", value: "4 Renk" },
          { label: "Süre", value: "3 Hafta" },
        ],
      },
      en: {
        tagline: "We Framed Architecture into a Brand",
        category: "Corporate Identity",
        services: ["Logo Design", "Corporate Identity", "Print Design"],
        story: {
          challenge:
            "ERTS wanted to establish a strong corporate image in the architecture and construction sector. A unique visual language was needed to elevate the brand above industry standards.",
          approach:
            "We created a logo design based on geometric forms and a strong contrast color palette. All print materials were delivered alongside the corporate identity guideline.",
          result:
            "A trust-inspiring image was achieved from day one in corporate client meetings and tenders.",
        },
        stats: [
          { label: "Applications", value: "10+" },
          { label: "Colors", value: "4 Colors" },
          { label: "Duration", value: "3 Weeks" },
        ],
      },
    },
  },
  {
    slug: "every",
    brand: "EVERY",
    year: "2025",
    accentColor: "#FBBF24",
    coverImage: "/works/every/env.png",
    galleryImages: [
      "/works/every/k1.png",
      "/works/every/sosyal%20medya.png",
    ],
    i18n: {
      tr: {
        tagline: "Her Detayda Marka Var",
        category: "Kurumsal Kimlik",
        services: ["Logo Tasarımı", "Kurumsal Kimlik", "Ambalaj Tasarımı"],
        story: {
          challenge:
            "EVERY, geniş bir ürün yelpazesini kapsayan marka kimliğinin tüm temas noktalarında tutarlı görünmesini istiyordu.",
          approach:
            "Esnek ama tutarlı bir logo sistemi tasarladık. Ambalaj, zarf ve sosyal medya şablonlarında kimliği hayata geçirdik.",
          result:
            "Kapsamlı ve ölçeklenebilir bir marka sistemi teslim edildi.",
        },
        stats: [
          { label: "Uygulama", value: "6+" },
          { label: "Varyasyon", value: "4 Renk" },
          { label: "Süre", value: "2 Hafta" },
        ],
      },
      en: {
        tagline: "Brand in Every Detail",
        category: "Corporate Identity",
        services: ["Logo Design", "Corporate Identity", "Packaging Design"],
        story: {
          challenge:
            "EVERY wanted its brand identity, covering a wide product range, to appear consistent across all touchpoints.",
          approach:
            "We designed a flexible yet consistent logo system. The identity was brought to life across packaging, envelopes and social media templates.",
          result:
            "A comprehensive and scalable brand system was delivered.",
        },
        stats: [
          { label: "Applications", value: "6+" },
          { label: "Variations", value: "4 Colors" },
          { label: "Duration", value: "2 Weeks" },
        ],
      },
    },
  },
  {
    slug: "peralta",
    brand: "PERALTA",
    year: "2025",
    accentColor: "#E879A0",
    coverImage: "/works/peralta/Slide%2016_9%20-%201.png",
    galleryImages: [
      "/works/peralta/Slide%2016_9%20-%205.png",
      "/works/peralta/Slide%2016_9%20-%207.png",
    ],
    i18n: {
      tr: {
        tagline: "Prestiji Görselleştirdik",
        category: "Kurumsal Kimlik",
        services: ["Logo Tasarımı", "Kurumsal Kimlik", "Sunum Tasarımı"],
        story: {
          challenge:
            "PERALTA, premium konumlanma hedeflediği için marka kimliğinin lüks ve güven algısı oluşturması gerekiyordu.",
          approach:
            "Minimal ama etkili bir tasarım diliyle logo ve kurumsal kimlik oluşturduk. Sunum şablonları ve kurumsal materyallerle kimliği her ortama taşıdık.",
          result:
            "Hedef kitlede premium marka algısı başarıyla kuruldu.",
        },
        stats: [
          { label: "Slide Şablonu", value: "20+" },
          { label: "Uygulama", value: "8+" },
          { label: "Süre", value: "3 Hafta" },
        ],
      },
      en: {
        tagline: "We Visualized Prestige",
        category: "Corporate Identity",
        services: ["Logo Design", "Corporate Identity", "Presentation Design"],
        story: {
          challenge:
            "As PERALTA targeted premium positioning, the brand identity needed to convey luxury and trust.",
          approach:
            "We created a logo and corporate identity with a minimal yet impactful design language. Presentation templates and corporate materials carried the identity into every environment.",
          result:
            "A premium brand perception was successfully established within the target audience.",
        },
        stats: [
          { label: "Slide Templates", value: "20+" },
          { label: "Applications", value: "8+" },
          { label: "Duration", value: "3 Weeks" },
        ],
      },
    },
  },
  {
    slug: "tepsta",
    brand: "TEPSTA",
    year: "2025",
    accentColor: "#34D399",
    coverImage: "/works/tepsta/1.png",
    galleryImages: [
      "/works/tepsta/2.png",
      "/works/tepsta/3.png",
      "/works/tepsta/5.png",
      "/works/tepsta/7.png",
      "/works/tepsta/9.png",
    ],
    i18n: {
      tr: {
        tagline: "Enerjik Kimliği Hayata Geçirdik",
        category: "Kurumsal Kimlik",
        services: ["Logo Tasarımı", "Kurumsal Kimlik", "Sosyal Medya Görselleri"],
        story: {
          challenge:
            "TEPSTA, dinamik ve genç bir kitleye hitap eden enerjik bir marka dili oluşturmak istiyordu. Rakiplerinden sıyrılacak cesur bir kimliğe ihtiyaç duyuluyordu.",
          approach:
            "Canlı renk paleti, modern tipografi ve özgün logo ile enerjik bir kimlik yarattık. Sosyal medya şablonlarının tamamını marka rehberiyle uyumlu tasarladık.",
          result:
            "Lansman kampanyasında marka hızla tanındı, sosyal medyada güçlü bir başlangıç yapıldı.",
        },
        stats: [
          { label: "Instagram Şablon", value: "8+" },
          { label: "Uygulama", value: "12+" },
          { label: "Süre", value: "4 Hafta" },
        ],
      },
      en: {
        tagline: "We Brought the Energetic Identity to Life",
        category: "Corporate Identity",
        services: ["Logo Design", "Corporate Identity", "Social Media Visuals"],
        story: {
          challenge:
            "TEPSTA wanted to create an energetic brand language that appeals to a dynamic and young audience. A bold identity was needed to stand out from competitors.",
          approach:
            "We created an energetic identity with a vibrant color palette, modern typography and a unique logo. All social media templates were designed in alignment with the brand guidelines.",
          result:
            "The brand gained rapid recognition during the launch campaign, making a strong start on social media.",
        },
        stats: [
          { label: "Instagram Templates", value: "8+" },
          { label: "Applications", value: "12+" },
          { label: "Duration", value: "4 Weeks" },
        ],
      },
    },
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

