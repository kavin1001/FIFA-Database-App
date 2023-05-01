/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#550066',
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: 'class'
}