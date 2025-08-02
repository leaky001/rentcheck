/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lavender: "#B093EF",
        indigoLavender: "#A340E0",
        magnolia: "#FBF0FF",
        violet: "#631499",
        deepViolet: "rgb(60, 9, 100)",
        eerieBlack: "rgb(31, 31, 31)",
      },
    },
  },
  plugins: [],
};
