/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        navColor: '#F9F5E0',
        fotColor: '#222222',
      },
      textColor: {
        navFontColor: '#4A2919',
      },
      width: {
        1200: '1200px',
        120: '120px',
      },
      height: {
        920: '920px',
        '10vh': '7vh',
        '90vh': '93vh',
      },
      minHeight: {
        '90vh': '93vh',
      },
      margin: {
        '10vh': '7vh',
      },
      zIndex: {
        100: 100,
      },
    },
  },
  plugins: [],
};
