/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "640px" },
      },
      textColor: {
        primary: "#694ED6",
        secondary: "#00CFF1",
        purple: "#684DD5",
        darkPrimary: "#BACBCC",
      },
      borderColor: {
        primary: "#694ED6",
        secondary: "#00CFF1",
      },
      backgroundColor: {
        primary: "#694ED6",
        secondary: "#00CFF1",
        darkPrimary: "#333045",
        darkSecondary: "#2D2A3E",
      },
      fill: {
        primary: "#694ED6",
        secondary: "#00CFF1",
      },
      fontFamily: {
        inter: "Inter",
        poppins: "Poppins",
        roboto: "Roboto",
      },
    },
  },
  plugins: [],
};
