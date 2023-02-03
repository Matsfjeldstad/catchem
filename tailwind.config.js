/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx}",
    "./pages/**/*.{js,ts,jsx}",
    "./components/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 700ms ease-in-out',
        'fade-out': 'fadeOut 700ms ease-in-out',
        'bg-in': 'bgIn 500ms ease-in-out',
        'bg-out': 'bgOut 500ms ease-in-out',
      },
      colors: {
        transparent: 'transparent',
        darkGray: '#131313',
        offWhite: '#EBEBEB',
        white: '#fff',
      },
      backgroundImage: {
        login: "url('/img/lucas-calloch-P-yzuyWFEIk-unsplash.jpg')",
      },
    },
  },
  plugins: [],
};
