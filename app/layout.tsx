import { secondaryFont, turretRoad, rasputinFont } from '@/public/fonts';
import './globals.css';
import Navbar from '@/components/navbar';

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
      </body>
    </html>
  );
}
