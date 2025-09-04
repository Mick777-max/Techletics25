'use client';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-primary">
      <h1 className="mb-2 font-secondary text-2xl font-extrabold text-quarternary md:text-4xl">
        IGNITE.INSPIRE.
      </h1>
      <div className="flex items-center justify-center gap-4">
        <h2 className="font-secondary text-4xl font-extrabold text-quarternary md:text-6xl">
          ILLUMINATE.
        </h2>
        <Image
          src="/icons/Vector.svg"
          alt="Description of the image"
          width={100}
          height={100}
          className="h-10 w-auto md:h-16"
        />
      </div>
    </div>
  );
}
