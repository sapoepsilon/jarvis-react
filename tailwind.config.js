/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "jarvis-background": "#43454A",
        "app-background": "#2B2D30",
        "gpt-message": "#262529",
        "user-message": "#4991F7",
        "chatgenie-primary": "#010454",
        "linear-gradient-start": "#00045A",
        "linear-gradient-end": "#00022A",
        "accent-purple": "#3E44C2",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        custom: ["Inter", "sans-serif"],
      },
      fontWeight: {
        interBlack: 900,
        interBold: 700,
        interRegular: 400,
      },
    },
  },
  plugins: [],
};
