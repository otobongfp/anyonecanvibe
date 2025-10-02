/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "wire-bg": {
          DEFAULT: "#0b0b0c",
          light: "#ffffff",
        },
        "wire-stroke": {
          DEFAULT: "#ffffff",
          light: "#0b0b0c",
        },
        "wire-accent": {
          DEFAULT: "#98FB98",
          light: "#22c55e",
        },
      },
      fontFamily: {
        condensed: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-in": "slideIn 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(255, 255, 255, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
