import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-primary">
      Hey this is the about page
    </div>
  );
}
