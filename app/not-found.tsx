"use client";

import React, { useRef, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";

interface NotFoundProps {
  particleCount?: number;
  particleSize?: number;
  animate?: boolean;
  imageDark?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
  onButtonClick?: () => void;
}

function NotFoundComponent({
  particleCount = 8000,
  particleSize = 2,
  animate = false, // Set to false to keep white particles static
  imageDark = "/image/404-darkc.png",
  buttonText = "Back to Home",
  buttonHref = "/",
  className = "",
  onButtonClick,
}: NotFoundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / height) * -10;
    const rotateY = ((x - width / 2) / width) * 10;

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-screen w-full flex items-center justify-center overflow-hidden bg-black ${className}`}
      style={{ perspective: "1000px" }}
    >
      <Particles
        color="#ffffff"
        particleCount={particleCount}
        particleSize={particleSize}
        animate={animate}
        className="absolute inset-0 z-0"
      />

      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out will-change-transform pointer-events-none z-10"
      >
        <Image
          src={imageDark}
          alt="404 - Page Not Found"
          fill
          className="object-contain"
          priority
        />
      </div>

      <Particles
        color="#ffffff"
        particleCount={particleCount}
        particleSize={particleSize}
        animate={animate}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      <div className="relative z-30 mt-16 flex flex-col items-center gap-4">
        <Link href={buttonHref} onClick={onButtonClick}>
          <Button variant="default" className="bg-white text-black hover:bg-gray-200 border border-black">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}

// This is the default export that Next.js will use for the 404 page
export default function NotFound() {
  return (
    <NotFoundComponent
      particleCount={6000}
      particleSize={2}
      animate={false}
      buttonText="Go Back Home"
      buttonHref="/techletics"
    />
  );
}
