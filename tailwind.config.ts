/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#57419B',
        'dark-primary': '#344e86',
        'secondary': '#FF9440',
        'dark-secondary': '#216AD9',
        'success': '#059669',
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
