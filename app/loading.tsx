"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1200); // Simulated delay
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-500">
      <div className="relative w-32 h-32 animate-pulse">
        {/* Spinner ring */}
        {/* <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent" /> */}
        {/* Logo in center */}
        <div className="absolute inset-2 flex items-center justify-center">
          <Image
            src="/logos/techletics-dark-logo.svg"
            alt="Techletics Logo"
            width={80}
            height={80}
            className="object-contain animate-ping-reverse-slow"
            priority
          />
        </div>
      </div>
    </div>
  );
}
