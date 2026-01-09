/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        transparent : 'transparent',
        current : 'currentColor',
        'burgundy' : '#880000',
        'lightBurgundy' : '#a02727ff',
        'darkBurgundy' : '#570707ff',
      },
    },
  },
  plugins: [],
}