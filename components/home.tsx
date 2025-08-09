'use client'
import MagnetButton from "./nurui/magnet-button";

export default function Home() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-primary mb-2">Hey this is the home page</h1>
        {/* <Link href="/register" className="text-white bg-primary px-4 py-2 rounded-md">Register</Link> */}
        <MagnetButton href="/register"/>
      </div>
    );
  }