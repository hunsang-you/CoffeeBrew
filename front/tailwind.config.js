/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        navColor: '#F9F5E0',
        fotColor: '#222222',
        background: 'rgba(249, 245, 224, 0.4)',
        brownBorder: '#A68F62',
        recBean: '#E9BCBC',
        recMachine: '#88B877',
        review: '#9E8484',
        recBeanbox1: '#F29F70',
        recBeanbox2: 'rgba(150, 145, 137, 0)',
        recMachine1: 'rgba(255, 131, 131, 1)',
        recMachine2: 'rgba(255, 229, 229, 1)',
        grinding1: '#FFEF9D',
        grinding2: 'rgba(211, 243, 170, 1)',
        nameColor: '#9A6533',
        pinkColor: '#FF8383',
        mainOrige: '#FF9900',
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
        460: '460px',
        480: '480px',
        592: '592px',
        720: '720px',
        1000: '1000px',
        1040: '1040px',
        1200: '1200px',
        120: '120px',
        240: '240px',
        dropdown: '78.3%',
        dropdownbrew: '196px',
        dropdownstory: '181px',
        dropdownlist: '166px',
        600: '600px',
      },
      height: {
        920: '920px',
        '10vh': '7vh',
        '90vh': '93vh',
        400: '400px',
      },
      minHeight: {
        '90vh': '93vh',
      },
      margin: {
        '10vh': '7vh',
        dropdown: '140px',
        dropdown1: '196px',
        infoCustom: '13%',
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
      backgroundImage: {
        mainBg1: "url('./assets/mainImg/bg1.png')",
        mainBg2: "url('./assets/mainImg/bg02.png')",
        mainBg3: "url('./assets/mainImg/bg3.jpg')",
        wordimg: "url('./assets/wordbg.png')",
      },
      spacing: {
        47: '47%',
        '1/10': '10%',
      },
      backgroundColor: {
        lightgray: '#f4f4f2',
      },
      lineHeight: {
        12: '3rem',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
