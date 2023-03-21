/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    // colors: {
    //   brownBorder: '#A68F62',
    // },

    extend: {
      colors: {
        background: '#F9F5E0',
        brownBorder: '#A68F62',
        rec_bean: '#E9BCBC',
        rec_machine: '#88B877',
        review: '#9E8484',
        rec_beanbox1: '#F29F70',
        rec_beanbox2: '#969189',
      },
      opacity: {
        0: '0',
        20: '0.2',
        40: '0.4',
        60: '0.6',
        80: '0.8',
        100: '1',
      },
      spacing: {
        344: '344px',
        400: '400px',
        592: '592px',
        1000: '1000px',
        1040: '1040px',
      },
    },
  },
  plugins: [],
};
