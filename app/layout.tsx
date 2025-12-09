import {
  secondaryFont,
  turretRoad,
  rasputinFont,
  orbitronFont,
  openSans,
} from '@/public/fonts';
import './globals.css';
import Navbar from '@/components/navbar';
import { Copyright, SocialAndConnect } from '@/components/footer';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Techletics 25',
  description: 'Techletics 25 - Technical Festival',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logos/techletics-logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logos/techletics-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/logos/techletics-logo.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/logos/techletics-logo.png"
          type="image/png"
          sizes="16x16"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logos/techletics-logo.png" />
        <meta
          name="msapplication-TileImage"
          content="/logos/techletics-logo.png"
        />
      </head>
      <body
        className={`${rasputinFont.variable} ${turretRoad.variable} ${secondaryFont.variable} ${orbitronFont.variable} ${rasputinFont.className} ${openSans.variable} ${openSans.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}

        <footer
          id="contact"
          className="relative z-40 w-full bg-[url('/image/footer.png')] bg-cover bg-center bg-repeat"
        >
          <SocialAndConnect />
          <Copyright />
          <div className="absolute bottom-0 w-full">
            <Image
              src="/icons/section-separator-bottom-white.png"
              alt="section separator"
              width={1000}
              height={150}
              className="w-full"
            />
          </div>
        </footer>
      </body>
    </html>
  );
}
