/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neutral-white": "#fff",
        "neutral-800": "#112232",
        "text-color-main-text": "#141414",
        "neutral-900": "#071827",
        "primary-400": "#005ae2",
        "stroke-glass": "rgba(255, 255, 255, 0.5)",
        dodgerblue: "#4991ff",
        "primary-100": "#3284ff",
        "primary-300-base": "#0065fe",
        black: "#000",
        gray: {
          "100": "#f9fbfd",
          "200": "rgba(254, 254, 254, 0.1)",
        },
      },
      fontFamily: {
        "gilroy-medium": "Gilroy-Medium",
        "h2-bold": "Gilroy-Bold",
        "gilroy-semibold": "Gilroy-SemiBold",
      },
      borderRadius: {
        "81xl": "100px",
      },
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
    },
    fontSize: {
      sm: "0.88rem",
      "5xl": "1.5rem",
      base: "1rem",
      "21xl": "2.5rem",
      xl: "1.25rem",
      xs: "0.75rem",
      "13xl": "2rem",
      lg: "1.13rem",
    },
  },
  plugins: [],
}

