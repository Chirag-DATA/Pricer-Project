/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#050507",
          accent: "#00f2ff",
          purple: "#7000ff",
        },
      },
    },
  },
  plugins: [],
}