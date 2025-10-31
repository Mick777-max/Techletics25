// fonts/index.ts (or wherever your font file is)
import localFont from 'next/font/local';
import { Turret_Road } from 'next/font/google';

export const turretRoad = Turret_Road({
  weight: ['200', '300', '400', '500', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  variable: '--font-turret-road',
});

// Rasputin as default font
export const rasputinFont = localFont({
  src: './Rasputin.otf',
  display: 'swap',
  fallback: ['Garamond', 'Times New Roman', 'serif'],
  variable: '--font-rasputin',
  weight: '100 900',
});

// Cakra as secondary font (for font-secondary class)
export const secondaryFont = localFont({
  src: [
    {
      path: './OffBit-Bold.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  fallback: ['Garamond', 'Times New Roman', 'serif'],
  variable: '--font-secondary',
});


export const orbitronFont = localFont({
  src: [
    {
      path: './orbitron-light.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './orbitron-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './orbitron-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './orbitron-black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-orbitron',
});

export const openSans = localFont({
  src: [
    {
      path: './OpenSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-opensans',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});