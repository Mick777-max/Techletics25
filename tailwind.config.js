/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        cmd: '1346px',
        xsm: '400px',
        mdxl: '1100px',
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        quarternary: 'var(--color-quarternary)',
        DEFAULT: 'var(--color-quarternary)', // This ensures quarternary works as default
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        shine: 'shine 5s linear infinite',
        slowBounce: 'slowBounce 3s ease-in-out infinite',
      },
      keyframes: {
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
        slowBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }, // bounce height
        },
      },
      borderColor: {
        quarternary: 'var(--color-quarternary)',
        DEFAULT: 'var(--color-quarternary)',
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      fontFamily: {
        secondary: [
          'var(--font-secondary)',
          'Garamond',
          'Times New Roman',
          'serif',
        ],
        turret: ['var(--font-turret-road)', 'Helvetica', 'Arial', 'sans-serif'],
        rasputin: [
          'var(--font-rasputin)',
          'Garamond',
          'Times New Roman',
          'serif',
        ],
        orbitron: [
          'var(--font-orbitron)',
          'Garamond',
          'Times New Roman',
          'serif',
        ],
        opensans: [
          'var(--font-opensans)',
          'Garamond',
          'Times New Roman',
          'serif',
        ],
      },
      backgroundImage: {
        grid: "url('/image/Grid.svg')",
        'grid-pattern': "url('./public/image/Grid.svg')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
