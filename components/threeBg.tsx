'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// TWEEN library - you'll need to install it: npm install @tweenjs/tween.js
import { Tween, update as tweenUpdate } from '@tweenjs/tween.js';

interface FXSceneOptions {
  renderer: THREE.WebGLRenderer;
  material: THREE.Material;
  clearColor: number;
  needsAnimatedColor?: boolean;
}

interface FXScene {
  fbo: THREE.WebGLRenderTarget;
  render: (delta: number, rtt?: boolean) => void;
  update: (delta: number) => void;
}

interface TransitionOptions {
  renderer: THREE.WebGLRenderer;
  sceneA: FXScene;
  sceneB: FXScene;
}

interface Transition {
  render: (delta: number) => void;
}

const ThreeJSBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const transitionRef = useRef<Transition | null>(null);

  // FXScene implementation
  const getFXScene = ({ renderer, material, clearColor, needsAnimatedColor = false }: FXSceneOptions): FXScene => {
    const objCount = 5000;
    const getMeshProps = () => {
      const arr = [];
      for (let i = 0; i < objCount; i += 1) {
        arr.push({
          position: {
            x: Math.random() * 10000 - 5000,
            y: Math.random() * 6000 - 3000,
            z: Math.random() * 8000 - 4000
          },
          rotation: {
            x: Math.random() * 2 * Math.PI,
            y: Math.random() * 2 * Math.PI,
            z: Math.random() * 2 * Math.PI,
          },
          scale: Math.random() * 200 + 100
        });
      }
      return arr;
    };

    const dummyProps = getMeshProps();

    const getMesh = (material: THREE.Material, needsAnimatedColor = false) => {
      const size = 0.25;
      const geometry = new THREE.IcosahedronGeometry(size, 1);
      const mesh = new THREE.InstancedMesh(geometry, material, objCount);

      const dummy = new THREE.Object3D();
      const color = new THREE.Color();
      let props;

      for (let i = 0; i < objCount; i++) {
        props = dummyProps[i];
        dummy.position.x = props.position.x;
        dummy.position.y = props.position.y;
        dummy.position.z = props.position.z;

        dummy.rotation.x = props.rotation.x;
        dummy.rotation.y = props.rotation.y;
        dummy.rotation.z = props.rotation.z;

        dummy.scale.set(props.scale, props.scale, props.scale);
        dummy.updateMatrix();

        mesh.setMatrixAt(i, dummy.matrix);
        if (needsAnimatedColor) {
          mesh.setColorAt(i, color.setScalar(0.1 + 0.9 * Math.random()));
        }
      }
      return mesh;
    };

    const w = window.innerWidth;
    const h = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(50, w / h, 1, 10000);
    camera.position.z = 2000;

    // Setup scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(clearColor, 0.0002);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x555555, 1.0));
    const mesh = getMesh(material, needsAnimatedColor);
    scene.add(mesh);

    const fbo = new THREE.WebGLRenderTarget(w, h);

    const rotationSpeed = new THREE.Vector3(0.1, -0.2, 0.15);

    const update = (delta: number) => {
      mesh.rotation.x += delta * rotationSpeed.x;
      mesh.rotation.y += delta * rotationSpeed.y;
      mesh.rotation.z += delta * rotationSpeed.z;
      if (needsAnimatedColor && material instanceof THREE.MeshStandardMaterial) {
        material.color.setHSL(0.1 + 0.5 * Math.sin(0.0002 * Date.now()), 1, 0.5);
      }
    };

    const render = (delta: number, rtt?: boolean) => {
      update(delta);
      renderer.setClearColor(clearColor);

      if (rtt) {
        renderer.setRenderTarget(fbo);
        renderer.clear();
        renderer.render(scene, camera);
      } else {
        renderer.setRenderTarget(null);
        renderer.render(scene, camera);
      }
    };

    return { fbo, render, update };
  };

  // Transition implementation
  const getTransition = ({ renderer, sceneA, sceneB }: TransitionOptions): Transition => {
    const transitionParams = {
      transition: 0,
      texture: 0,
      cycle: true,
      animate: true,
    };

    const scene = new THREE.Scene();
    const w = window.innerWidth;
    const h = window.innerHeight;
    const camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, -10, 10);

    // Create procedural transition textures instead of loading from files
    const textures: THREE.Texture[] = [];
    for (let i = 0; i < 3; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      const imageData = ctx.createImageData(512, 512);
      const data = imageData.data;

      for (let j = 0; j < data.length; j += 4) {
        const noise = Math.random();
        const value = Math.floor(noise * 255);
        data[j] = value;
        data[j + 1] = value;
        data[j + 2] = value;
        data[j + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      textures.push(texture);
    }

    const material = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse1: { value: null },
        tDiffuse2: { value: null },
        mixRatio: { value: 0.0 },
        threshold: { value: 0.1 },
        useTexture: { value: 1 },
        tMixTexture: { value: textures[0] },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = vec2( uv.x, uv.y );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform float mixRatio;
        uniform sampler2D tDiffuse1;
        uniform sampler2D tDiffuse2;
        uniform sampler2D tMixTexture;
        uniform int useTexture;
        uniform float threshold;
        varying vec2 vUv;

        void main() {
          vec4 texel1 = texture2D( tDiffuse1, vUv );
          vec4 texel2 = texture2D( tDiffuse2, vUv );

          if (useTexture == 1) {
            vec4 transitionTexel = texture2D( tMixTexture, vUv );
            float r = mixRatio * (1.0 + threshold * 2.0) - threshold;
            float mixf=clamp((transitionTexel.r - r)*(1.0/threshold), 0.0, 1.0);

            gl_FragColor = mix( texel1, texel2, mixf );
          } else {
            gl_FragColor = mix( texel2, texel1, mixRatio );
          }
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(w, h);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    material.uniforms.tDiffuse1.value = sceneA.fbo.texture;
    material.uniforms.tDiffuse2.value = sceneB.fbo.texture;

    new Tween(transitionParams)
      .to({ transition: 1 }, 4500)
      .repeat(Infinity)
      .delay(2000)
      .yoyo(true)
      .start();

    let needsTextureChange = false;

    const render = (delta: number) => {
      if (transitionParams.animate) {
        tweenUpdate();
        if (transitionParams.cycle) {
          if (transitionParams.transition === 0 || transitionParams.transition === 1) {
            if (needsTextureChange) {
              transitionParams.texture = (transitionParams.texture + 1) % textures.length;
              material.uniforms.tMixTexture.value = textures[transitionParams.texture];
              needsTextureChange = false;
            }
          } else {
            needsTextureChange = true;
          }
        } else {
          needsTextureChange = true;
        }
      }

      material.uniforms.mixRatio.value = transitionParams.transition;

      if (transitionParams.transition === 0) {
        sceneA.update(delta);
        sceneB.render(delta, false);
      } else if (transitionParams.transition === 1) {
        sceneA.render(delta, false);
        sceneB.update(delta);
      } else {
        sceneA.render(delta, true);
        sceneB.render(delta, true);

        renderer.setRenderTarget(null);
        renderer.render(scene, camera);
      }
    };

    return { render };
  };

  const init = () => {
    if (!containerRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const materialA = new THREE.MeshBasicMaterial({
      color: 0x00FF00,
      wireframe: true
    });
    const materialB = new THREE.MeshStandardMaterial({
      color: 0xFF9900,
      flatShading: true,
    });

    const sceneA = getFXScene({
      renderer,
      material: materialA,
      clearColor: 0x000000
    });

    const sceneB = getFXScene({
      renderer,
      material: materialB,
      clearColor: 0x000000,
      needsAnimatedColor: true,
    });

    transitionRef.current = getTransition({ renderer, sceneA, sceneB });
    rendererRef.current = renderer;
  };

  const animate = () => {
    if (!transitionRef.current) return;

    animationIdRef.current = requestAnimationFrame(animate);
    transitionRef.current.render(clockRef.current.getDelta());
  };

  const handleResize = () => {
    if (!rendererRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    rendererRef.current.setSize(width, height);
  };

  // --- FIX: Robust cleanup before (re)mount ---
  useEffect(() => {
    // CLEANUP: in case the component remounts quickly, or when leaving page
    function cleanup() {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      if (rendererRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          // domElement probably already removed, safe to ignore
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      // Reset other refs to force fresh state
      transitionRef.current = null;
      clockRef.current = new THREE.Clock();
    }

    cleanup(); // <-- clean up before init
    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
      }}
    />
  );
};

export default ThreeJSBackground;


