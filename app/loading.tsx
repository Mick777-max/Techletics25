"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Glowing orbs in background */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-600/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gray-500/20 rounded-full blur-xl animate-pulse animation-delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gray-400/20 rounded-full blur-xl animate-pulse animation-delay-500" />

      {/* Main loading container */}
      <div className="relative z-10 text-center">
        {/* Outer spinning ring with gradient */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 animate-spin-slow">
            <div className="w-full h-full rounded-full border-4 border-transparent bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 p-1">
              <div className="w-full h-full bg-black rounded-full" />
            </div>
          </div>
          
          {/* Inner pulsing ring */}
          <div className="absolute inset-4 animate-ping">
            <div className="w-full h-full rounded-full border-2 border-gray-600/30" />
          </div>

          {/* Logo container with floating effect */}
          <div className="absolute inset-8 flex items-center justify-center animate-bounce-slow">
            <div className="relative">
              <Image
                src="/logos/techletics-light-logo.svg"
                alt="Techletics Logo"
                width={64}
                height={64}
                className="object-contain filter drop-shadow-2xl"
                priority
              />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gray-500/10 blur-md rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gray-600 to-gray-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            {Math.round(Math.min(progress, 100))}% Loading...
          </p>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="text-gray-300 text-lg font-semibold">
          <span className="inline-block animate-pulse">Welcome to Techletics 2025</span>
          {/* <span className="animate-pulse animation-delay-300">.</span>
          <span className="animate-pulse animation-delay-600">.</span>
          <span className="animate-pulse animation-delay-900">.</span> */}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-20px) translateX(10px) rotate(180deg); 
            opacity: 1;
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { 
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