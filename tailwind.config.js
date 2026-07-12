/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0f766e',
        accent: '#16a34a',
        brand: '#f59e0b'
      }
    }
  },
  plugins: []
};
