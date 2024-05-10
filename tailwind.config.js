/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryLighter: '#191e24',
        primaryDarker: '#0a0a0a',
        secondary: '#7c3aed',
        text: '#f5f3ff',
      },
    },
  },
  plugins: [require('daisyui')],
};
