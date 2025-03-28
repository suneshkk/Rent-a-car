/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  darkMode: "dark",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Graphik", "ui-sans-serif", "system-ui"],
        serif: ["Merriweather", "ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Oswald"],
        body: ['"Open Sans"'],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        "regal-blue": "#243c5a",
      },
      textOpacity: {
        dark: "0.8", 
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
      lg: "976px",
      xl: "1440px",
    },
  },

  plugins: [daisyui], // Import DaisyUI properly
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1E40AF",
          secondary: "#9333EA",
          accent: "#FACC15",
          neutral: "#1F2937",
          "base-100": "#FFFFFF",
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      {
        dark: {
          primary: "#8B5CF6",
          secondary: "#EC4899",
          accent: "#FBBF24",
          neutral: "#111827",
          "base-100": "#1E293B",
          info: "#60A5FA",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },
      "cupcake", // You can also use predefined themes
    ],
  },
};
