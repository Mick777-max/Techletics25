'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(0);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const timeout = setTimeout(() => {
      setLoading(false);
      setProgress(100);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="animate-float absolute h-2 w-2 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs in background */}
      <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-gray-600/20 blur-xl" />
      <div className="animation-delay-1000 absolute bottom-1/3 right-1/4 h-24 w-24 animate-pulse rounded-full bg-gray-500/20 blur-xl" />
      <div className="animation-delay-500 absolute right-1/3 top-1/2 h-16 w-16 animate-pulse rounded-full bg-gray-400/20 blur-xl" />

      {/* Main loading container */}
      <div className="relative z-10 text-center">
        {/* Outer spinning ring with gradient */}
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="animate-spin-slow absolute inset-0">
            <div className="h-full w-full rounded-full border-4 border-transparent bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 p-1">
              <div className="h-full w-full rounded-full bg-black" />
            </div>
          </div>

          {/* Inner pulsing ring */}
          <div className="absolute inset-4 animate-ping">
            <div className="h-full w-full rounded-full border-2 border-gray-600/30" />
          </div>

          {/* Logo container with floating effect */}
          <div className="animate-bounce-slow absolute inset-8 flex items-center justify-center">
            <div className="relative">
              <Image
                src="/logos/techletics-light-logo.svg"
                alt="Techletics Logo"
                width={64}
                height={64}
                className="object-contain drop-shadow-2xl filter"
                priority
              />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-gray-500/10 blur-md" />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mb-6 w-64">
          <div className="h-1 overflow-hidden rounded-full bg-gray-800/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gray-600 to-gray-400 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-400">
            {Math.round(Math.min(progress, 100))}% Loading...
          </p>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="text-lg font-semibold text-gray-300">
          <span className="inline-block animate-pulse">
            Welcome to Techletics 2025
          </span>
          {/* <span className="animate-pulse animation-delay-300">.</span>
          <span className="animate-pulse animation-delay-600">.</span>
          <span className="animate-pulse animation-delay-900">.</span> */}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) translateX(10px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
