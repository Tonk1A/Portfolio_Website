/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}","./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#ffffff",
          "secondary": "#f3f4f6",
          "accent": "#1f2937",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "text-base": "#000000",
          "background-image": "url('./src/assets/day.webp')",
        },
        dark: {
          "primary": "#000000",
          "secondary": "#1f2937",
          "accent": "#ffffff",
          "neutral": "#191d24",
          "base-100": "#000000",
          "text-base": "#ffffff",
          "background-image": "url('./src/assets/night.webp')",
        }
      }
    ],
  }
}