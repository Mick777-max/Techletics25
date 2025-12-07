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

  return (
    <div className="relative mx-auto flex h-[80%] w-full max-w-screen-xl flex-col items-center justify-center overflow-hidden">
      {/* 🔥 BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 z-0">
        {GalleryImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="slide bg"
            fill
            sizes="100vw"
            className={`duration-[1500ms] transition-al absolute inset-0 object-cover grayscale transition-opacity group-hover:grayscale-0 ${
              index === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* 🔥 existing content stays same */}
      <div className="relative z-10 flex flex-col items-center justify-center break-words text-center font-orbitron text-[3rem] font-bold leading-none text-white max-md:text-[2.6rem]">
        <div
          className="absolute z-20 flex flex-col items-center justify-center break-words bg-blue-800 text-center font-orbitron text-[3rem] font-bold leading-none text-secondary max-md:text-[2.6rem]"
          style={{
            clipPath: 'polygon(50% 15%, 66% 50%, 50% 85%, 34% 50%)',
          }}
        >
          <div className="z-20 w-full break-words text-secondary">
            GLIMPSE INTO
          </div>
          <div className="z-20 w-full break-words text-secondary">
            THE MEMORIES
          </div>
          <div className="z-20 w-full break-words text-secondary">WE HAVE</div>
          <div className="z-20 w-full break-words text-secondary">CREATED</div>
        </div>

        <div className="relative w-full break-words">GLIMPSE INTO</div>
        <div className="relative w-full break-words">THE MEMORIES</div>
        <div className="relative w-full break-words">WE HAVE</div>
        <div className="relative w-full break-words">CREATED</div>
      </div>
    </div>
  );
}
