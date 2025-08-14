'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import SpaceAnimation from './planet';


const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const objectsRef = useRef<THREE.Mesh[]>([]);
  const animationIdRef = useRef<number | undefined>(undefined);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const conf = {
    color: 0xffffff,
    objectWidth: 12,
    objectThickness: 3,
    ambientColor: 0x808080,
    perspective: 75,
    cameraZ: 75,
  };

  // Animation helper functions
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const easeOutPower1 = (t: number) => {
    return 1 - Math.pow(1 - t, 2);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(
      conf.perspective, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = conf.cameraZ;
    cameraRef.current = camera;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize lights
    scene.add(new THREE.AmbientLight(conf.ambientColor));
    const light = new THREE.PointLight(0xffffff);
    light.position.z = 100;
    scene.add(light);

    // Initialize objects
    initObjects();

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  const initObjects = () => {
    if (!sceneRef.current) return;

    // Clear existing objects
    objectsRef.current.forEach(mesh => {
      sceneRef.current?.remove(mesh);
    });
    objectsRef.current = [];

    // Calculate grid size
    const wWidth = getRendererWidth();
    const wHeight = getRendererHeight();
    const nx = Math.round(wWidth / conf.objectWidth) + 1;
    const ny = Math.round(wHeight / conf.objectWidth) + 1;

    const geometry = new THREE.BoxGeometry(
      conf.objectWidth, 
      conf.objectWidth, 
      conf.objectThickness
    );

    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        const material = new THREE.MeshLambertMaterial({ 
          color: conf.color, 
          transparent: true, 
          opacity: 1 
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        const x = -wWidth / 2 + i * conf.objectWidth;
        const y = -wHeight / 2 + j * conf.objectWidth;
        mesh.position.set(x, y, 0);
        
        objectsRef.current.push(mesh);
        sceneRef.current.add(mesh);
      }
    }
  };

  const getRendererWidth = () => {
    if (!cameraRef.current) return 0;
    const vFOV = (conf.perspective * Math.PI) / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    return height * cameraRef.current.aspect;
  };

  const getRendererHeight = () => {
    const vFOV = (conf.perspective * Math.PI) / 180;
    return 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
  };

  const startAnimation = () => {
    if (isAnimating || isRevealed) return;
    
    setIsAnimating(true);
    
    const objects = objectsRef.current;
    const animationData: Array<{
      mesh: THREE.Mesh;
      startTime: number;
      delay: number;
      initialRotation: THREE.Euler;
      targetRotation: THREE.Euler;
      initialPosition: THREE.Vector3;
      targetPosition: THREE.Vector3;
      initialOpacity: number;
    }> = [];

    // Prepare animation data for each object
    objects.forEach(mesh => {
      const delay = Math.random() * 1000 + 1000; // 1-2 seconds delay
      const rx = (Math.random() - 0.5) * 2 * Math.PI;
      const ry = (Math.random() - 0.5) * 2 * Math.PI;
      const rz = (Math.random() - 0.5) * 2 * Math.PI;

      animationData.push({
        mesh,
        startTime: Date.now(),
        delay,
        initialRotation: mesh.rotation.clone(),
        targetRotation: new THREE.Euler(rx, ry, rz),
        initialPosition: mesh.position.clone(),
        targetPosition: new THREE.Vector3(mesh.position.x, mesh.position.y, 80),
        initialOpacity: 1
      });
    });

    const animateObjects = () => {
      const currentTime = Date.now();
      let allComplete = true;

      animationData.forEach(data => {
        const elapsed = currentTime - data.startTime - data.delay;
        
        if (elapsed < 0) {
          allComplete = false;
          return;
        }

        const duration = 2000; // 2 seconds
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 1) {
          allComplete = false;
        }

        // Animate rotation
        const rotationFactor = progress;
        data.mesh.rotation.x = lerp(data.initialRotation.x, data.targetRotation.x, rotationFactor);
        data.mesh.rotation.y = lerp(data.initialRotation.y, data.targetRotation.y, rotationFactor);
        data.mesh.rotation.z = lerp(data.initialRotation.z, data.targetRotation.z, rotationFactor);

        // Animate position (starts after 0.5s delay)
        const positionProgress = Math.max(0, (elapsed - 500) / duration);
        if (positionProgress > 0) {
          const easedProgress = easeOutPower1(Math.min(positionProgress, 1));
          data.mesh.position.z = lerp(data.initialPosition.z, data.targetPosition.z, easedProgress);
          
          // Animate opacity
          if (data.mesh.material instanceof THREE.MeshLambertMaterial) {
            data.mesh.material.opacity = lerp(data.initialOpacity, 0, easedProgress);
          }
        }
      });

      if (!allComplete) {
        requestAnimationFrame(animateObjects);
      } else {
        // Animation complete
        setTimeout(() => {
          setIsRevealed(true);
          setIsAnimating(false);
        }, 500);
      }
    };

    animateObjects();
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(200,200,200,0.1) 20%, rgba(128,128,128,0.05) 40%, rgba(64,64,64,0.03) 70%, rgba(0,0,0,1) 100%)'
      }}
    >
      {/* Canvas for Three.js effect */}
      <canvas
        ref={canvasRef}
        className={`fixed top-0 left-0 w-full h-full transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${isRevealed ? 'hidden' : 'block'}`}
      />
      
      {/* Hero Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6 transition-all duration-1000 ${
          isLoaded ? 'visible' : 'invisible'
        }`}
        
      >
        <main className="max-w-4xl mx-auto">
          {/* Trigger Button - round circle with glow and bounce */}
          {!isRevealed && (
            <div className="relative">
              {/* Glow effect */}
              <div 
                className={`absolute inset-0 w-24 h-24 rounded-full animate-pulse transition-opacity duration-[2000ms] ${
                  isAnimating ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.1) 70%, transparent 100%)',
                  transform: 'scale(1.5)',
                  filter: 'blur(8px)'
                }}
              />
              <button
                onClick={startAnimation}
                className={`
                  relative z-10 w-40 h-40 text-sm font-bold text-gray-900 bg-white 
                  rounded-full shadow-2xl transition-all duration-[2000ms]
                  hover:bg-gray-100 hover:shadow-white/30
                  transform hover:scale-110 active:scale-95
                  animate-bounce
                  ${isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
                style={{
                  boxShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3), 0 0 90px rgba(255,255,255,0.1)'
                }}
              >
                Tap to Reveal
              </button>
            </div>
          )}
          
          {/* Content that appears after animation */}
          {isRevealed && (
            <div className="mt-12">
              <SpaceAnimation />
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;