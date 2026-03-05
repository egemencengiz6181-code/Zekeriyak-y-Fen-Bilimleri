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
        background: "#05010d",
        foreground: "#f2f2f2",
        primary: {
          DEFAULT: "#6d28d9",
          light: "#8b5cf6",
          dark: "#4c1d95",
        },
        accent: {
          DEFAULT: "#a855f7",
          muted: "#1e1033",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom right, #05010d, #1e1033)',
      },
    },
  },
  plugins: [],
};
export default config;
