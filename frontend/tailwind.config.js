/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#f5e3a8',
          DEFAULT: '#d4af37',
          dark: '#b28d26',
        }
      }
    },
  },
  plugins: [],
}
