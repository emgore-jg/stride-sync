/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        spotify: '#1db954',
        'spotify-accent': '#127836',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#DDA0F5',
          neutral: '#161a1d',
          'base-100': '#482b4a',
          info: '#5ba8ec',
          success: '#189084',
          warning: '#ee8d17',
          error: '#fb3c69',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
