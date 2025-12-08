'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GalleryImages } from '@/app/data';

export default function Memories() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === GalleryImages.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const words = ['GLIMPSE INTO', 'THE MEMORIES', 'WE HAVE', 'CREATED'];

  return (
    <div className="group relative mx-auto flex h-[80%] w-full max-w-screen-xl flex-col items-center justify-center overflow-hidden rounded-2xl">
      <div className="absolute inset-0">
        {GalleryImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="slide bg"
            fill
            sizes="100vw"
            className={`absolute inset-0 object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 ${
              index === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center font-orbitron text-5xl font-bold leading-none text-white max-md:text-4xl">
        {words.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </div>
    </div>
  );
}
