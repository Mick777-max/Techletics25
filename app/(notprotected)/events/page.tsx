import type { Metadata } from "next";
import Script from "next/script";
import Event from "./event";

export const metadata: Metadata = {
  title: "Technical Events & Competitions | Techletics '25",
  description: "Participate in Kerala's biggest technical events including hackathons, coding competitions, robotics challenges, and workshops at Techletics '25. Register now for early bird offers!",
  keywords: "technical events, hackathon, coding competition, robotics challenge, tech workshops, engineering competitions, Kerala tech events, college fest competitions",
  openGraph: {
    title: "Technical Events & Competitions | Techletics '25",
    description: "Join Kerala's biggest technical events - hackathons, coding competitions, robotics challenges, and workshops. Early bird registration open!",
  }
};

export default function EventsPage() {
  return (
    <>
      <Script id="event-schema" type="application/ld+json">
        {JSON.stringify({
          // "@context": "https://schema.org",
          "@type": "Event",
          "name": "Techletics '25 Technical Events",
          "description": "Kerala's premier technical festival featuring hackathons, coding competitions, robotics challenges, and workshops",
          // "startDate": "2025-02-01", // Update with actual date
          // "endDate": "2025-02-03", // Update with actual date
          // "eventStatus": "https://schema.org/EventScheduled",
          // "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
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
            // "url": "https://techletics.cce.edu.in/events",
            // "price": "0",
            // "priceCurrency": "INR",
            // "availability": "https://schema.org/InStock",
            // "validFrom": "2024-01-01" // Update with actual date
          },
          "performer": {
            "@type": "Organization",
            "name": "Christ College of Engineering"
          }
        })}
      </Script>
      <Event/>
    </>
  );
}
