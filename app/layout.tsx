import { secondaryFont, turretRoad, rasputinFont } from '@/public/fonts';
import './globals.css';
import Navbar from '@/components/navbar';
import { Connect, Copyright, SocialConnect } from '@/components/footer';
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/logos/techletics-dark-logo.svg"
          media="(prefers-color-scheme: light)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
              className="absolute inset-0 z-20 h-full w-full bg-cover bg-center bg-no-repeat opacity-50"
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
