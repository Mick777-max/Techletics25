'use client'
import HeroSection from "./herosection";
import ThreeJSBackground from "./threeBg";

export default function Home() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        {/* <ThreeJSBackground />
        <h1 className="text-white mb-2">Hey this is the home page</h1> */}
        <HeroSection />
      </div>
    );
  }