"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AttractButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  particleCount?: number;
  attractRadius?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function MagnetButton({
  className,
  particleCount = 12,
  href,
  ...props
}: AttractButtonProps) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }));
  }, [particlesControl, particles]);

  const buttonContent = (
    <>
      {particles.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          animate={particlesControl}
          className={cn(
            "absolute w-1.5 h-1.5 rounded-full",
            "bg-[#ff5c00]", // particles match primary
            "transition-opacity duration-300",
            isAttracting ? "opacity-100" : "opacity-40",
          )}
        />
      ))}
      <span
        className={cn(
          "relative w-full flex items-center justify-center gap-2",
          "text-[#ff5c00]" // text and icon primary
        )}
      >
        {/* <Magnet
          className={cn(
            "w-4 h-4 transition-transform duration-300 text-[#ff5c00]",
            isAttracting && "scale-110",
          )}
        /> */}
        {isAttracting ? "Click me" : "Register"}
      </span>
    </>
  );

  const buttonClasses = cn(
    "min-w-40 relative touch-none",
    "bg-[#ffdab8] hover:bg-[#ffd1a3]", // lighter orange background
    "border border-[#ff5c00]", // orange border
    "transition-all duration-300",
    className,
  );

  return href ? (
    <Link href={href} passHref>
      <Button
        className={buttonClasses}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        {...props}
      >
        {buttonContent}
      </Button>
    </Link>
  ) : (
    <Button
      className={buttonClasses}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...props}
    >
      {buttonContent}
    </Button>
  );
}
