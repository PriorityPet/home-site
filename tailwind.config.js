/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#0ea5e9',
        'dark-primary': '#0c4a6e',
        'secondary': '#1C2C51',
        'dark-secondary': '#3D85EC',
        'success': '#17c671',
        'dark-success': '#17c671',
        'info': '#00b8d8',
        'dark-info': '#00b8d8',
        'warning': '#ffb400',
        'dark-warning': '#ffb400',
        'danger': '#c4183c',
        'dark-danger': '#c4183c',
        'light': '#FBFBFB',
        'dark': '#212529',
      },
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
}
