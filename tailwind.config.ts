import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        lt: "350px",
        sm: "480px",
        md: "768px",
        emd: "900px",
        lg: "976px",
        xl: "1440px",
        "max-w-xl": "1080px",
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        dim: "#5B657A",
        primary: "#fb8500",
        secondary: "#219ebc",
      },
    },
  },
  plugins: [],
} satisfies Config;
