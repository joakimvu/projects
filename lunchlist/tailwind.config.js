/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: '#ffffff',
      shade: '#D8D7D0',
      dark: '#24282C',
      green: '#D1EDBF',
      light: '#F7F6F0',
      red: '#FF2400',
    },
    extend: {},
  },
  plugins: [],
}
