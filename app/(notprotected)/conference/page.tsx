import type { Metadata } from "next";
import Script from "next/script";
import Conference from "./conference";

export const metadata: Metadata = {
  title: "Technical Conference & Talks | Techletics '25",
  description: "Attend Kerala's biggest technical conference featuring keynote speakers, tech talks, panel discussions, and networking sessions at Techletics '25. Register now for early bird offers!",
  keywords: "technical conference, tech talks, keynote speakers, panel discussions, networking sessions, engineering conference, Kerala tech conference, college fest conference",
  openGraph: {
    title: "Technical Conference & Talks | Techletics '25",
    description: "Join Kerala's biggest technical conference - keynote speakers, tech talks, panel discussions, and networking sessions. Early bird registration open!",
  }
};

export default function ConferencePage() {
  return (
    <>
      <Script id="conference-schema" type="application/ld+json">
        {JSON.stringify({
          "@type": "Event",
          "name": "Techletics '25 Technical Conference",
          "description": "Kerala's premier technical conference featuring keynote speakers, tech talks, panel discussions, and networking sessions",
          "location": {
            "@type": "Place",
            "name": "Christ College of Engineering",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Christ Nagar, Irinjalakuda",
              "addressLocality": "Irinjalakuda",
              "addressRegion": "Kerala",
              "postalCode": "680125",
              "addressCountry": "IN"
            }
          },
          "organizer": {
            "@type": "Organization",
            "name": "Christ College of Engineering",
            "url": "https://www.cce.edu.in"
          },
          "offers": {
            "@type": "Offer",
          },
          "performer": {
            "@type": "Organization",
            "name": "Christ College of Engineering"
          }
        })}
      </Script>
      <Conference/>
    </>
  );
}
