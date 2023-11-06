/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./twine_src/**/*.{html,js,twee}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: "Barlow",
        display: "NB Television Pro",
        mono: "Courier New",
        sans: "Neue Montreal, sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("flowbite/plugin")],
};
