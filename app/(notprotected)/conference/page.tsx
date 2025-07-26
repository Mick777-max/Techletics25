import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conference",
  description: "Join our technical conference at Techletics '25",
};

export default function ConferencePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-primary">
      Hey this is the conference page
    </div>
  );
}
