'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import * as random from 'maath/random/dist/maath-random.esm';
import { PointMaterial, Points, Preload } from '@react-three/drei';
import * as THREE from 'three';

function Stars(props) {
  const ref = useRef();

  // Generate random points in a sphere
  const sphere = useMemo(() => {
    const arr = new Float32Array(5000 * 3);
    return random.inSphere(arr, { radius: 1.2 });
  }, []);

  // Rotate stars slowly
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 20;
  });

  // Load the star texture
  const starTexture = useMemo(() => new THREE.TextureLoader().load('/icons/diamondw.svg'), []);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points 
        ref={ref} 
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          map={starTexture}      // Use your star image
          transparent
          color="white"
          size={0.005}           // Slightly bigger than before
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarsCanvas() {
  return (
    <div className='w-full h-auto absolute inset-0 z-20'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
