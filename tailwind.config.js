/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/Components/**/*.{js,jsx,ts,tsx}",
    "./src/navigators/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightgray: "#343a40",
        neutralwhite: "#d4d4d4",
        darkorange: "#6E381B",
        neworange: "#f4a261",
        yellow: "#e9c46a",
      },
    },
  },
  plugins: [],
};
