import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Yüzey renkleri `<alpha-value>` destekler — bu olmadan `bg-background/95`
        // gibi opaklık değiştiricileri Tailwind tarafından sessizce atılıyor ve
        // eleman hiç arka plan almıyordu (açılır menü şeffaf kalıyordu).
        background: "rgb(var(--background) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        // foreground bilerek hex `var(...)` olarak bırakıldı (kanal değeri DEĞİL).
        // Bu biçimi Tailwind ayrıştıramadığı için `text-foreground/40` gibi
        // sınıflar bugüne kadar olduğu gibi üretilmemeye devam eder. Alpha'yı
        // açmak sitedeki tüm soluk gövde metnini bir anda açardı (kontrast ~3:1).
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#ec2027",
          light: "#f04e53",
          dark: "#b01a1e",
        },
        secondary: {
          DEFAULT: "#12648f",
          light: "#1a7dae",
          dark: "#0e4f72",
        },
        accent: {
          DEFAULT: "#12648f",
          muted: "#0e1e2e",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom right, #05010d, #0e1e2e)',
      },
    },
  },
  plugins: [],
};
export default config;
