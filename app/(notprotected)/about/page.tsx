import type { Metadata } from "next";
import About from "./about";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Techletics '25 - The premier tech fest at Christ College of Engineering",
};

export default function AboutPage() {
  return (
    <div>
      <About/>
    </div>
  );
}
