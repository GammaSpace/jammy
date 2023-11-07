/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./twine_src/**/*.{html,js,twee}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: "Helvetica",
        display: "Handjet",
        sans: "Helvetica",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require('@tailwindcss/forms')],
};
