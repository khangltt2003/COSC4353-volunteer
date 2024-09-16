/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'form-shadow': '0 4px 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(15, 23, 42, 0.5)',
      },
      colors: {
        main: '#0D98BA', // Define your main color here
      },
      fontSize: {
        'base': '18px', // or any size you prefer
      },
    },
  },
  plugins: [],
}
