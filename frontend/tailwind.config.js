/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0D98BA", // Define your main color here
      },
      height: {
        128: "32rem",
        144: "36rem",
      },
      margin: {
        26.75: "6.778rem",
      },
      fontSize: {
        base: "18px", // or any size you prefer
      },
    },
  },
  plugins: [],
};
