import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fafb",
          100: "#d9f2f6",
          200: "#b8e6ee",
          300: "#8ed6f0",
          400: "#5abde0",
          500: "#3ea2c8",
          600: "#3684a9",
          700: "#316b8a",
          800: "#305972",
          900: "#2c4b60",
          950: "#1a3041",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        headline: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        title: ["1.5rem", { lineHeight: "1.4" }],
      },
      spacing: {
        section: "6rem",
        "section-mobile": "4rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
