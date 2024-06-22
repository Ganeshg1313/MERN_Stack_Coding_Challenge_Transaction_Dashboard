/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'bgLight': '#fde68a',
      'bgDark': '#fcd34d',
      'bgExtraDark': '#fbbf24',
      'mainBg': '#cbd5e1',
    },
    extend: {},
  },
  plugins: [],
}