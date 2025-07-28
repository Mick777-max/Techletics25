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
      animation: {
        'ping-reverse-slow': 'ping-reverse 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'ping-reverse': {
          '0%': {
            transform: 'scale(2)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
} 