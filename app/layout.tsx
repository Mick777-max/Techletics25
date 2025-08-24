import type { Metadata } from 'next';
import { Fonarto, turretRoad } from '@/public/fonts';
import './globals.css';

// Base URL based on environment
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://techletics.cce.edu.in';

export const metadata: Metadata = {
  title: {
    template: "%s | Techletics '25",
    default: "Techletics '25 - Premier Technical Festival",
  },
  description:
    "Techletics '25 - The largest technical festival of Kerala at Christ College of Engineering, Irinjalakuda. Join us for hackathons, coding competitions, robotics events, and technical workshops.",
  keywords: [
    'Techletics',
    'Tech Fest',
    'Christ College of Engineering',
    'Irinjalakuda',
    'Technical Festival',
    'College Tech Events',
    'Kerala Tech Fest',
    'Engineering College Events',
    'Hackathon',
    'Coding Competition',
    'Robotics Events',
    'Technical Workshops',
    'Student Tech Events',
    'Innovation Festival',
    'Engineering Competitions',
  ].join(', '),
  authors: [{ name: 'Christ College of Engineering' }],
  creator: 'Website Team CCE',
  publisher: 'Christ College of Engineering',
  category: 'Technology',
  robots:
    process.env.NODE_ENV === 'development'
      ? { index: false, follow: false } // Prevent indexing in development
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  openGraph: {
    title: "Techletics '25 - Kerala's Premier Technical Festival",
    description:
      "Join Kerala's largest technical festival at Christ College of Engineering. Experience hackathons, coding competitions, robotics events, and technical workshops.",
    type: 'website',
    locale: 'en_US',
    siteName: "Techletics '25",
    images: [
      {
        url: `${baseUrl}/media/techletics24/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Techletics '25 Banner",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Techletics '25 - Kerala's Premier Technical Festival",
    description:
      "Join Kerala's largest technical festival at Christ College of Engineering. Experience hackathons, coding competitions, robotics events, and technical workshops.",
    images: [`${baseUrl}/media/techletics24/twitter-image.png`],
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: 'add-your-google-site-verification-here',
  },
  other: {
    'theme-color': '#ffffff',
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
        <link
          rel="icon"
          href="/logos/techletics-dark-logo.svg"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/logos/techletics-light-logo.svg"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={baseUrl} />
      </head>
      <body
        className={`${turretRoad.variable} ${Fonarto.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
