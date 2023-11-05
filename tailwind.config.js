/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./twine_src/**/*.{html,js,twee}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
