'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Link from 'next/link';

// Type definitions for animation variables
interface AnimationState {
  theta: number;
  phi: number;
  dx: number;
  dy: number;
  dz: number;
  timeSinceStartContraction: number;
  easingContraction: number;
  positionsContraction: THREE.BufferAttribute | null;
}

interface TextureMap {
  sky?: THREE.Texture;
  star?: THREE.Texture;
  flare1?: THREE.Texture;
  flare2?: THREE.Texture;
  flare3?: THREE.Texture;
  planet1?: THREE.Texture;
  planet2?: THREE.Texture;
  planet3?: THREE.Texture;
}

class SpaceEffect {
  private container: HTMLElement | null = null;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private clock!: THREE.Clock;
  private controls!: OrbitControls;
  private resizeObserver?: ResizeObserver;
  private rafAnimate?: number;
  
  // Animation timing
  private animationStartTime3 = Date.now() + 6000;
  private animationStartTime6 = Date.now() + 15000;
  private expansionStartTime = Date.now() + 9000;
  private contractionStartTime = Date.now() + 20000;
  private centeringStartTime = Date.now() + 25000;
  private pointStarsContractStartTime = Date.now() + 25000;
  
  // Duration constants
  private readonly MAX_EXPANSION_DISTANCE = 95;
  private readonly TARGET_RADIUS = 95;
  private readonly contractionDuration = 8000;
  private readonly centeringDuration = 8000;
  private readonly pointStarsContractDuration = 6000;

  // Three.js objects
  private nucleus!: THREE.Mesh;
  private sphereBg!: THREE.Mesh;
  private pointStars!: THREE.Points;
  private pointStars2!: THREE.Points;
  private pointComet1!: THREE.Points;
  private planet1!: THREE.Points;
  private planet2!: THREE.Points;
  private planet3!: THREE.Points;
  private stars!: THREE.Points;

  // Animation data
  private originalPositions!: Float32Array;
  private noise!: (x: number, y: number) => number;
  private textures: TextureMap = {};
  private delta = 0;
  private time = 0;
  private blobScale = 2;
  private hasInteracted = false;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  async init(): Promise<void> {
    this.threeInit();
    await this.textureLoader();
    this.createElements();
    this.createMovingStars();
    this.createPointElement();
    this.assignTextures();
    this.setupResize();
    this.limitFPS(1 / 60);
  }

  private threeInit(): void {
    if (!this.container) return;

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      alpha: true,
      antialias: true,
      stencil: false,
    });
    
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      55,
      this.container.clientWidth / this.container.clientHeight,
      0.01,
      1000
    );
    this.camera.position.set(0, 0, 150);

    this.clock = new THREE.Clock();

    const directionalLight = new THREE.DirectionalLight("#fff", 3);
    directionalLight.position.set(0, 50, -20);
    this.scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1);
    ambientLight.position.set(0, -20, -40);
    this.scene.add(ambientLight);
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 5;
    this.controls.maxDistance = 350;
    this.controls.minDistance = 150;
    this.controls.enablePan = false;
  }

  private async textureLoader(): Promise<void> {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';
    
    const textureMap = {
      sky: "https://i.ibb.co/HC0vxMw/sky2.jpg",
      star: "https://i.ibb.co/NpJzwns/star.jpg",
      flare1: "https://i.ibb.co/TRsJ1tm/p1.png",
      flare2: "https://i.ibb.co/YQcTCRG/p2.png",
      flare3: "https://i.ibb.co/v1S8YW7/p7.png",
      planet1: "https://i.ibb.co/s1cZDnM/planet1.webp",
      planet2: "https://i.ibb.co/Lt5Kn7y/planet2.webp",
      planet3: "https://i.ibb.co/T8V57p4/planet3.webp",
    };

    await Promise.all(
      Object.entries(textureMap).map(([key, path]) => {
        return new Promise<void>((resolve, reject) => {
          textureLoader.load(
            path,
            (texture) => {
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.anisotropy = 16;
              this.textures[key as keyof TextureMap] = texture;
              resolve();
            },
            undefined,
            (error) => reject(`Error loading texture ${path}: ${error}`)
          );
        });
      })
    );
  }

  private createElements(): void {
    // Nucleus
    const icosahedronGeometry = new THREE.IcosahedronGeometry(20, 28);
    this.originalPositions = new Float32Array(icosahedronGeometry.attributes.position.array);
    
    const lambertMaterial = new THREE.MeshPhongMaterial({});
    this.nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    this.nucleus.position.set(0, 0, 0);
    this.scene.add(this.nucleus);

    this.noise = createNoise2D();

    // Sphere Background
    const geometrySphereBg = new THREE.SphereGeometry(90, 50, 50);
    const materialSphereBg = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
    });
    this.sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
    this.sphereBg.position.set(0, 0, 0);
    this.scene.add(this.sphereBg);
  }

  private createPointElement(): void {
    // Distant small white stars
    this.pointStars = this.createPointParticles({
      size: 0.5,
      total: 200,
      transparent: true,
      max: 130,
      min: 130,
    });
    this.scene.add(this.pointStars);

    // Smaller orange stars in the middle
    this.pointStars2 = this.createPointParticles({
      size: 3,
      total: 600,
      transparent: true,
      max: 33,
      min: 25,
      pointY: 0,
    });
    this.scene.add(this.pointStars2);

    // Orange comet
    this.pointComet1 = this.createPointParticles({
      size: 12,
      total: 1,
      transparent: true,
      max: 25,
      min: 25,
    });
    this.scene.add(this.pointComet1);

    // Planets
    this.planet1 = this.createPointParticles({
      size: 9,
      total: 1,
      transparent: false,
      max: 60,
      min: 40,
    });
    this.planet2 = this.createPointParticles({
      size: 12,
      total: 1,
      transparent: false,
      max: 60,
      min: 40,
    });
    this.planet3 = this.createPointParticles({
      size: 12,
      total: 1,
      transparent: false,
      max: 60,
      min: 40,
    });
    
    this.scene.add(this.planet1);
    this.scene.add(this.planet2);
    this.scene.add(this.planet3);
  }

  private createPointParticles({
    size,
    total,
    transparent = true,
    max = 150,
    min = 70,
    pointY,
  }: {
    size: number;
    total: number;
    transparent?: boolean;
    max?: number;
    min?: number;
    pointY?: number;
  }): THREE.Points {
    const positions = new Float32Array(total * 3);
    const originalY = new Float32Array(total);

    for (let i = 0; i < total; i++) {
      const point = this.randomPointSphere(THREE.MathUtils.randInt(min, max));
      const idx = i * 3;
      positions[idx] = point.x;
      positions[idx + 2] = point.z;
      
      if (pointY !== undefined) {
        positions[idx + 1] = pointY;
        originalY[i] = point.y;
      } else {
        positions[idx + 1] = point.y;
      }
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointGeometry.setAttribute('originalY', new THREE.BufferAttribute(originalY, 1));

    const blending = transparent ? THREE.AdditiveBlending : THREE.NormalBlending;
    const pointMaterial = new THREE.PointsMaterial({
      size,
      blending,
      transparent: true,
      depthWrite: false,
    });

    return new THREE.Points(pointGeometry, pointMaterial);
  }

  private createMovingStars(): void {
    const totalStars = 5;
    const positions = new Float32Array(totalStars * 3);
    const velocities = new Float32Array(totalStars);
    const startPositions = new Float32Array(totalStars * 3);

    for (let i = 0; i < totalStars; i++) {
      const radius = THREE.MathUtils.randFloat(200, 300);
      const point = this.randomPointSphere(radius);
      const idx = i * 3;

      positions[idx] = point.x;
      positions[idx + 1] = point.y;
      positions[idx + 2] = point.z;

      startPositions[idx] = point.x;
      startPositions[idx + 1] = point.y;
      startPositions[idx + 2] = point.z;

      velocities[i] = THREE.MathUtils.randInt(50, 400);
    }

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
    starsGeometry.setAttribute('startPosition', new THREE.BufferAttribute(startPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 14,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    this.stars = new THREE.Points(starsGeometry, starsMaterial);
    this.stars.name = "moving_stars";
    this.stars.visible = false;
    this.scene.add(this.stars);
  }

  private assignTextures(): void {
    if (this.textures.flare1) (this.pointStars.material as THREE.PointsMaterial).map = this.textures.flare1;
    if (this.textures.flare2) (this.pointStars2.material as THREE.PointsMaterial).map = this.textures.flare2;
    if (this.textures.flare3) (this.pointComet1.material as THREE.PointsMaterial).map = this.textures.flare3;
    if (this.textures.planet1) (this.planet1.material as THREE.PointsMaterial).map = this.textures.planet1;
    if (this.textures.planet2) (this.planet2.material as THREE.PointsMaterial).map = this.textures.planet2;
    if (this.textures.planet3) (this.planet3.material as THREE.PointsMaterial).map = this.textures.planet3;
    if (this.textures.star) (this.nucleus.material as THREE.MeshPhongMaterial).map = this.textures.star;
    if (this.textures.sky) (this.sphereBg.material as THREE.MeshBasicMaterial).map = this.textures.sky;
    if (this.textures.flare2) (this.stars.material as THREE.PointsMaterial).map = this.textures.flare2;
  }

  private randomPointSphere(radius: number): THREE.Vector3 {
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const dx = 0 + radius * Math.sin(phi) * Math.cos(theta);
    const dy = 0 + radius * Math.sin(phi) * Math.sin(theta);
    const dz = 0 + radius * Math.cos(phi);

    return new THREE.Vector3(dx, dy, dz);
  }

  private setupResize(): void {
    if (!this.container) return;
    
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);
  }

  private onResize(): void {
    if (!this.container) return;
    
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  private limitFPS(interval: number): void {
    this.rafAnimate = requestAnimationFrame(() => this.limitFPS(interval));
    this.delta += this.clock.getDelta();

    if (this.delta > interval) {
      this.loop();
      this.delta = this.delta % interval;
    }
  }

  private updateNucleus(): void {
    if (Date.now() < this.animationStartTime3) return;

    const animationEasing = Math.min(1, (Date.now() - this.animationStartTime3) / 2000);
    const nucleusPosition = this.nucleus.geometry.attributes.position;

    for (let i = 0; i < nucleusPosition.count; i++) {
      const x = this.originalPositions[i * 3];
      const y = this.originalPositions[i * 3 + 1];
      const z = this.originalPositions[i * 3 + 2];

      const length = Math.sqrt(x * x + y * y + z * z);
      const nx = x / length;
      const ny = y / length;
      const nz = z / length;

      const distance = 20 + this.noise(nx + this.time * 0.0004, ny + this.time * 0.0004) * this.blobScale * animationEasing;

      nucleusPosition.array[i * 3] = nx * distance;
      nucleusPosition.array[i * 3 + 1] = ny * distance;
      nucleusPosition.array[i * 3 + 2] = nz * distance;
    }
    
    nucleusPosition.needsUpdate = true;
    this.nucleus.geometry.computeVertexNormals();
  }

  private updateRotations(): void {
    this.pointStars.rotation.y -= 0.0007;
    this.pointComet1.rotation.z -= 0.01;
    this.pointComet1.rotation.y += 0.001;
    this.pointStars2.rotation.x -= 0.001;
    this.planet1.rotation.y += 0.001;
    this.planet2.rotation.z += 0.003;
    this.planet3.rotation.x += 0.0005;
  }

  private loop(): void {
    this.time = Date.now();
    this.updateNucleus();
    this.updateRotations();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public setupInteractionHiding(hideBanner: () => void): void {
    if (this.hasInteracted) return;

    const hideOnce = () => {
      if (!this.hasInteracted) {
        hideBanner();
        this.hasInteracted = true;
      }
    };

    window.addEventListener('wheel', hideOnce, { once: true });
    this.renderer.domElement.addEventListener('pointerdown', hideOnce, { once: true });
  }

  public dispose(): void {
    if (this.rafAnimate) {
      cancelAnimationFrame(this.rafAnimate);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.controls) {
      this.controls.dispose();
    }
  }
}

const SpaceAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<SpaceEffect | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const initEffect = async () => {
      if (containerRef.current && !effectRef.current) {
        effectRef.current = new SpaceEffect(containerRef.current);
        await effectRef.current.init();
        
        effectRef.current.setupInteractionHiding(() => {
          setShowBanner(false);
        });
      }
    };

    initEffect();

    return () => {
      if (effectRef.current) {
        effectRef.current.dispose();
        effectRef.current = null;
      }
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log(`Error attempting to toggle fullscreen: ${err}`);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white z-50 text-center" 
    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
        Welcome to Techletics25
      </h1> */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ibb.co/rm2ZShj/sky1.jpg')",
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Banner */}
      {showBanner && (
        <div className={`fixed top-0 left-0 w-full p-4 bg-black bg-opacity-40 backdrop-blur-sm text-white text-center font-sans text-base z-10 border-b border-white border-opacity-20 transition-opacity duration-500 ${showBanner ? 'opacity-100' : 'opacity-0'}`}>
          You can zoom in and click and drag to explore the scene.
        </div>
      )}

      {/* Three.js Container */}
      <div 
        ref={containerRef}
        className="w-full h-screen fixed top-0 left-0 z-[3] outline-none"
      />

      {/* Control Buttons */}
      <Link href="/techletics"
        className="fixed bottom-5 left-8 px-6 py-3 bg-black bg-opacity-10 border border-white border-opacity-20 rounded-full text-white font-sans text-base no-underline backdrop-blur-sm transition-all duration-300 cursor-pointer z-10 hover:bg-white hover:bg-opacity-20 hover:border-opacity-30 hover:scale-105"
      >
        Techletics
      </Link>

      <h1
        className="fixed bottom-5 right-8 px-6 py-3 bg-black bg-opacity-10 border border-white border-opacity-20 rounded-full text-white font-sans text-base backdrop-blur-sm transition-all duration-300 cursor-pointer z-10 hover:bg-white hover:bg-opacity-20 hover:border-opacity-30 hover:scale-105"
      >
        2025-26
      </h1>
    </div>
  );
};

export default SpaceAnimation;