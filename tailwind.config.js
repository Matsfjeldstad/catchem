/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx}",
    "./pages/**/*.{js,ts,jsx}",
    "./components/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/img/lucas-calloch-P-yzuyWFEIk-unsplash.jpg')",
      },
    },
  },
  plugins: [],
};
