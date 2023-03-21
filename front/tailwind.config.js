/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        navColor: '#F9F5E0',
        fotColor: '#222222',
      },
      width: {
        '88vw': '88vw',
        1200: '1200px',
      },
      height: {
        920: '920px',
        '10vh': '10vh',
        '90vh': '90vh',
      },
      margin: {
        '10vh': '10vh',
      },
    },
  },
  plugins: [],
};
