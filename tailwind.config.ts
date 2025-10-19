import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        primary: {
          black: "#0a0a0a",
          dark: "#1a1a1a",
          gold: "#d4af37",
        },
        solana: {
          purple: "#9945FF",
          green: "#14F195",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        "golden-glow": "0 8px 24px -12px rgba(212, 175, 55, 0.45)",
        "solana-sheen": "0 0 0 1px rgba(20, 241, 149, 0.2), 0 12px 30px -18px rgba(153, 69, 255, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
