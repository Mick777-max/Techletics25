import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px', // extra small
        'md-lg': '860px', // medium-large
        'lg-xl': '1100px', // large-extra large
        'xl-wide': '1346px', // ultra-wide
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        quarternary: 'var(--color-quarternary)',
        DEFAULT: 'var(--color-quarternary)',
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        shine: 'shine 5s linear infinite',
        slowBounce: 'slowBounce 3s ease-in-out infinite',
        reverseBounce: 'reverseBounce 3s ease-in-out infinite',
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
          '50%': { transform: 'translateY(-12px)' },
        },
        reverseBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(12px)' }, // move downward instead of upward
        },
      },
      borderColor: {
        quarternary: 'var(--color-quarternary)',
        DEFAULT: 'var(--color-quarternary)',
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
  plugins: [animate],
};

export default config;
