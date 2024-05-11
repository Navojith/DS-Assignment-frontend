/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryLighter: '#191e24', // navbar color + secondary bg
        primaryDarker: '#0a0a0a', // main background color
        primaryDark: '#111418', // secondary bg hover color
        secondary: '#7c3aed', // purple
        text: '#f5f3ff', // text
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        myTheme: {
          primaryLighter: '#191e24', // navbar color + secondary bg
          primaryDarker: '#0a0a0a', // main background color
          primaryDark: '#111418', // secondary bg hover color
          secondary: '#7c3aed', // purple
          text: '#f5f3ff', // text
        },
      },
    ],
  },
};
