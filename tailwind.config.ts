import type { Config } from "tailwindcss";

const config: Config = {
  // `src/pages` bu projede yok — tarama yolundan çıkarıldı.
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        primary: {
          DEFAULT: "#E35205",
          light: "#FF9E7F",
          dark: "#A03500",
        },
        secondary: {
          DEFAULT: "#A03500",
          light: "#E35205",
          dark: "#7A2800",
        },
        accent: {
          DEFAULT: "#E35205",
          muted: "#1a0e08",
        },
      },
    },
  },
  plugins: [],
};
export default config;
