import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#0A111F",
        slateDeep: "#0F1B2E",
        electric: "#4DA6FF",
        emeraldSoft: "#3DD4A1",
        cloud: "#EAF3FF"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        panel: "0 24px 80px rgba(7, 17, 32, 0.35)",
        glow: "0 0 60px rgba(77, 166, 255, 0.25)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;

