
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-primary mb-2">Hey this is the home page</h1>
      <Link href="/register" className="text-white bg-primary px-4 py-2 rounded-md">Register</Link>
    </div>
  );
}
