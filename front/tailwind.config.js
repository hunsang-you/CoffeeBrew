/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        navColor: '#F9F5E0',
        fotColor: '#222222',
        background: '#F9F5E0',
        brownBorder: '#A68F62',
        recBean: '#E9BCBC',
        recMachine: '#88B877',
        review: '#9E8484',
        recBeanbox1: '#F29F70',
        recBeanbox2: 'rgba(150,145,137,0)',
      },
      textColor: {
        mainColorBrown: '#4A2919',
        mainColorOrange: '#FF9900',
      },
      width: {
        '88vw': '88vw',
        344: '344px',
        360: '360px',
        400: '400px',
        592: '592px',
        1000: '1000px',
        1040: '1040px',
        1200: '1200px',
        120: '120px',
        dropdown: '78.3%',
        dropdownbrew: '196px',
        dropdownstory: '181px',
        dropdownlist: '166px',
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
        dropdown: '140px',
        dropdown1: '196px',
      },
      zIndex: {
        100: 100,
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: { 'fade-in-up': 'fade-in-up 1s ease-out' },
    },
  },
  plugins: [],
};
