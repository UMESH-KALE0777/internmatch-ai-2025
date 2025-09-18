/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // blue
        secondary: '#10b981', // green
        background: '#f9fafb', // light gray/white
      },
    },
  },
  plugins: [],
}
