/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#5A4EE1',
        'green-primary': '#1FAF9D',
        'white-primary': '#F5F5F5',
      },
      backgroundImage: {},
      screens: {
        xs: '320px',
      },
    },
  },
  plugins: [],
}
