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
        'card-incoming': 'cardIncoming 500ms ease-in-out',
        'card-dislike': 'cardDislike 500ms ease-in-out',
        'card-like': 'cardLike 500ms ease-in-out',
      },
      colors: {
        transparent: 'transparent',
        darkGray: '#131313',
        offWhite: '#EBEBEB',
        redish: '#FF6A6A',
        white: '#fff',
      },
      backgroundImage: {
        login: "url('/img/lucas-calloch-P-yzuyWFEIk-unsplash.jpg')",
        jungleHero: "url('/img/qa2s0afwydh91.webp')",
      },
    },
  },
  plugins: [],
};
