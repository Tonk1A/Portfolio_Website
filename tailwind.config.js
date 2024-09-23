/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}","./index.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
