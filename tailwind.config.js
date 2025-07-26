/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f06b0c",
        secondary: "#734f3e",
        tertiary: "#e8ede4",
        quarternary: "#acbec3",
      },
    },
  },
  plugins: [],
} 