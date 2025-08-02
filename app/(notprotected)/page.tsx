import Payment from "@/components/payment";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-primary">
      Hey this is the home page
      <Payment/>
    </div>
  );
}
