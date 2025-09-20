import { secondaryFont, turretRoad, rasputinFont } from '@/public/fonts';
import './globals.css';
import Navbar from '@/components/navbar';
import { Connect, Copyright, SocialConnect } from '@/components/footer';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Techletics 25',
  description: 'Techletics 25 - Technical Festival',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logos/logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logos/logo.png',
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
          href="/logos/logo.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/logos/logo.png"
          type="image/png"
          sizes="16x16"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logos/logo.png" />
        <meta name="msapplication-TileImage" content="/logos/logo.png" />
      </head>
      <body
        className={`${rasputinFont.variable} ${turretRoad.variable} ${secondaryFont.variable} ${rasputinFont.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
        <footer id="contact" className="w-full">
          <div className="relative w-full">
            <Image
              src="/image/Grid.svg"
              alt="bg"
              width={1000}
              height={500}
              className="absolute inset-0 z-10 h-full w-full bg-cover bg-center bg-no-repeat opacity-50"
            />
            <Connect />
            <SocialConnect />
          </div>
          <Copyright />
        </footer>
      </body>
    </html>
  );
}
