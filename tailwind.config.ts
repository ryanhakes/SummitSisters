import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pine: "#1F3D2B",
        moss: "#3E5F3B",
        sunrise: "#E07A35",
        sand: "#F3E9DD",
        mist: "#F9F7F3"
      }
    }
  },
  plugins: []
};

export default config;
