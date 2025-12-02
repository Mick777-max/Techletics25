'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import * as random from 'maath/random/dist/maathRandom.esm';
import { PointMaterial, Points, Preload } from '@react-three/drei';
import * as THREE from 'three';

type StarsProps = {
  color: string;
};

function Stars({ color }: StarsProps) {
  const ref = useRef<THREE.Points>(null);

  // Generate random points in a sphere
  const sphere = useMemo(() => {
    const arr = new Float32Array(5000 * 3);
    return random.inSphere(arr, { radius: 1.2 });
  }, []);

  // Rotate stars slowly
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 20;
    }
  });

  // Load the star texture
  const starTexture = useMemo(() => new THREE.TextureLoader().load('/icons/diamondw.svg'), []);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          map={starTexture}
          transparent
          color={color}      // Use the passed color prop
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarsCanvas({ color }: { color: string }) {
  return (
    <div className="w-full h-auto absolute inset-0 z-20">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars color={color} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
