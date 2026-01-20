/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Gmarket: ['GmarketSansMedium', 'sans-serif'],
      },
      colors: {
        transparent : 'transparent',
        current : 'currentColor',
        'burgundy' : '#880000',
        'lightBurgundy' : '#a02727ff',
        'darkBurgundy' : '#570707ff',
      },
      keyframes: {
        belt: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(var(--move-x))'},
        },
      },
      animation: {
        belt: 'belt 20s linear infinite',
      },
    },
  },
  plugins: [],
}