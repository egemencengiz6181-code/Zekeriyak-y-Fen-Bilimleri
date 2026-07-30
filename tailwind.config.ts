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
        background: "var(--background)",
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
