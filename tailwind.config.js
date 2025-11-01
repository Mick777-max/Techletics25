/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        cmd: "1346px",
        xsm: "400px"
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        quarternary: 'var(--color-quarternary)',
        DEFAULT: 'var(--color-quarternary)', // This ensures quarternary works as default
      },
      animation: {
        'ping-reverse-slow':
          'ping-reverse 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
        shine: 'shine 5s linear infinite',
        'spin-slow': 'spin 10s linear infinite',
        'fade-slide-in': 'fade-slide-in 1s ease-out forwards',
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
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 15px #38bdf8, 0 0 30px #0ea5e9, 0 0 45px #3b82f6',
          },
          '50%': {
            boxShadow: '0 0 25px #38bdf8, 0 0 50px #0ea5e9, 0 0 75px #3b82f6',
          },
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
        'fade-slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-50%)' },
          
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      borderColor: {
        'quarternary': 'var(--color-quarternary)',
        DEFAULT: 'var(--color-quarternary)',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      fontFamily: {
        'secondary': ['var(--font-secondary)', 'Garamond', 'Times New Roman', 'serif'],
        'turret': ['var(--font-turret-road)', 'Helvetica', 'Arial', 'sans-serif'],
        'rasputin': ['var(--font-rasputin)', 'Garamond', 'Times New Roman', 'serif'],
        'orbitron': ['var(--font-orbitron)', 'Garamond', 'Times New Roman', 'serif'],
        'opensans':['var(--font-opensans)', 'Garamond', 'Times New Roman', 'serif']
      },
      backgroundImage: {
        'grid': "url('/image/Grid.svg')",
        'grid-pattern': "url('./public/image/Grid.svg')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
