import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // à définir (identité Jeune Fort Agrobusiness)
    },
  },
  plugins: [],
};

export default config;