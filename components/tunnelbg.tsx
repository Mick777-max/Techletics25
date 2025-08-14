// 'use client';

// import React, { useEffect, useRef, useCallback } from 'react';
// import * as THREE from 'three';

// // Define the spline curve data
// const curvePath = [
//   10.136184463414924, -1.374508746897471, 10.384881573913269,
//   9.1152593889854714, -1.374508746897471, 8.5846792797570011,
//   9.0669355709754882, -1.0665123466336568, 5.8937771631608156,
//   10.151040177840205, -0.65913653144937956, 3.4340491740541346,
//   10.806779203170416, 1.8859391007298545, 0.46855774212986023,
//   10.761433540147586, 2.8724172201359197, -1.2811838605587311,
//   9.6195923104445065, 2.8724172201359197, -3.2833099941904766,
//   6.9763020889151646, 2.7659257976905427, -4.7591958908830172,
//   6.0461277891353697, 1.0727045302089879, -6.6638740164090482,
//   7.3472235778544794, -1.8228856326635698, -9.0685043046185623,
//   7.226367212900791, -1.8228856326635698, -10.499536640855691,
//   5.8354566696263914, -1.8228856326635698, -12.039219379199908,
//   3.6532357452141353, -0.20463983570573391, -13.87695442281038,
//   -0.30169589630131455, 1.5965000671484342, -14.879986418947327,
//   -2.8925694230502157, 2.2971364614427481, -13.892095587598131,
//   -4.537672295357936, 4.5863515759659208, -12.140831652074551,
//   -6.1287913464117594, 5.9653814634119815, -8.9776527318875896,
//   -6.0120301606452813, 4.4081161943855998, -6.712084358394045,
//   -5.2138252159038974, 2.820894808418279, -4.4532820412085607,
//   -2.3424712835109611, 2.2032065005086259, -3.0788773693500198,
//   -0.0076956453915433265, 1.8931797788880202, -1.6577070662471063,
//   -0.24767503988481437, 2.8845808465856684, 0.073915859214221724,
//   -2.2174044353598896, 4.2415524507318576, 2.215992718290742,
//   -3.4526531678364756, 3.0615192023340851, 4.7922404932096558,
//   -3.7356278971556445, 1.4054080369354316, 7.8432021841434629,
//   -3.4003734463804118, 1.1924069108769393, 9.2464090886227073,
//   -1.8851803760476225, 1.5269331003449989, 10.306083896408374,
//   0.01071077144031829, 2.1101821577522295, 10.490880699847727,
//   0.42562058195647001, 2.2759939598834387, 11.613129436580291,
//   0.096405262182225115, 0.032317784084054391, 16.223455375061565,
//   2.3458797884520433, 0.38907275257695584, 19.91188266079584,
//   5.7018400098488771, 1.73337964747396, 20.615481586999959,
//   7.9720939736751824, 1.73337964747396, 19.303399329816457,
//   9.8672362721095652, 0.090083018057025177, 16.893338541618121,
//   11.225959519544134, -1.374508746897471, 14.279002555560753,
//   11.288646925965876, -1.374508746897471, 11.926359497447137,
//   10.136184463414924, -1.374508746897471, 10.384881573913269
// ];

// interface TunnelBackgroundProps {
//   className?: string;
//   intensity?: number;
//   speed?: number;
// }

// // Global singleton to persist Three.js state across route changes
// class TunnelRenderer {
//   private static instance: TunnelRenderer | null = null;
//   private scene: THREE.Scene | null = null;
//   private camera: THREE.PerspectiveCamera | null = null;
//   private renderer: THREE.WebGLRenderer | null = null;
//   private composer: any = null;
//   private animationId: number | null = null;
//   private tubeGeo: THREE.TubeGeometry | null = null;
//   private isInitialized = false;
//   private isAnimating = false;
//   private currentMount: HTMLDivElement | null = null;
//   private speed = 0.1;

//   static getInstance(): TunnelRenderer {
//     if (!TunnelRenderer.instance) {
//       TunnelRenderer.instance = new TunnelRenderer();
//     }
//     return TunnelRenderer.instance;
//   }

//   async initialize(mountElement: HTMLDivElement, intensity: number = 3.5, speed: number = 0.1) {
//     if (this.isInitialized && this.renderer && this.scene && this.camera) {
//       this.attachToMount(mountElement);
//       this.speed = speed;
//       if (!this.isAnimating) {
//         this.startAnimation();
//       }
//       return;
//     }

//     this.currentMount = mountElement;
//     this.speed = speed;

//     const w = window.innerWidth;
//     const h = window.innerHeight;

//     // Create spline from curve path
//     const points: THREE.Vector3[] = [];
//     for (let p = 0; p < curvePath.length; p += 3) {
//       points.push(new THREE.Vector3(
//         curvePath[p], 
//         curvePath[p + 1], 
//         curvePath[p + 2]
//       ));
//     }
//     const spline = new THREE.CatmullRomCurve3(points);

//     // Initialize Three.js scene
//     this.scene = new THREE.Scene();
//     this.scene.fog = new THREE.FogExp2(0x000000, 0.3);

//     this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
//     this.camera.position.z = 5;

//     this.renderer = new THREE.WebGLRenderer({ 
//       antialias: true,
//       alpha: true,
//       preserveDrawingBuffer: true
//     });
//     this.renderer.setSize(w, h);
//     this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     this.renderer.outputColorSpace = THREE.SRGBColorSpace;

//     // Create tube geometry from the spline
//     this.tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
    
//     // Create edges geometry for the tunnel
//     const edges = new THREE.EdgesGeometry(this.tubeGeo, 0.2);
//     const lineMat = new THREE.LineBasicMaterial({ 
//       color: 0x00ffff,
//       transparent: true,
//       opacity: 0.8
//     });
//     const tubeLines = new THREE.LineSegments(edges, lineMat);
//     this.scene.add(tubeLines);

//     // Add floating boxes
//     const numBoxes = 55;
//     const size = 0.075;
//     const boxGeo = new THREE.BoxGeometry(size, size, size);

//     for (let i = 0; i < numBoxes; i++) {
//       // Wireframe box
//       const boxMat = new THREE.MeshBasicMaterial({
//         color: 0x00ff88,
//         wireframe: true,
//         transparent: true,
//         opacity: 0.6
//       });
//       const box = new THREE.Mesh(boxGeo, boxMat);
      
//       const p = (i / numBoxes + Math.random() * 0.1) % 1;
//       const pos = this.tubeGeo.parameters.path.getPointAt(p);
//       pos.x += Math.random() - 0.4;
//       pos.z += Math.random() - 0.4;
//       box.position.copy(pos);
      
//       const rotation = new THREE.Vector3(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
//       box.rotation.set(rotation.x, rotation.y, rotation.z);
      
//       // Box edges
//       const boxEdges = new THREE.EdgesGeometry(boxGeo, 0.2);
//       const boxLineMat = new THREE.LineBasicMaterial({ 
//         color: 0x0088ff,
//         transparent: true,
//         opacity: 0.8
//       });
//       const boxLines = new THREE.LineSegments(boxEdges, boxLineMat);
//       boxLines.position.copy(pos);
//       boxLines.rotation.set(rotation.x, rotation.y, rotation.z);
      
//       this.scene.add(box);
//       this.scene.add(boxLines);
//     }

//     // Post-processing setup
//     try {
//       const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js');
//       const { RenderPass } = await import('three/examples/jsm/postprocessing/RenderPass.js');
//       const { UnrealBloomPass } = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');
      
//       this.composer = new EffectComposer(this.renderer);
//       const renderScene = new RenderPass(this.scene, this.camera);
//       const bloomPass = new UnrealBloomPass(
//         new THREE.Vector2(w, h),
//         intensity,
//         0.4,
//         100
//       );
//       bloomPass.threshold = 0.002;
//       bloomPass.strength = intensity;
//       bloomPass.radius = 0;
      
//       this.composer.addPass(renderScene);
//       this.composer.addPass(bloomPass);
//     } catch (error) {
//       console.warn('Post-processing not available, using standard renderer');
//     }

//     this.attachToMount(mountElement);
//     this.isInitialized = true;
//     this.startAnimation();
//   }

//   attachToMount(mountElement: HTMLDivElement) {
//     if (this.renderer && mountElement && this.renderer.domElement.parentNode !== mountElement) {
//       // Remove from previous mount if exists
//       if (this.renderer.domElement.parentNode) {
//         this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
//       }
//       // Attach to new mount
//       mountElement.appendChild(this.renderer.domElement);
//       this.currentMount = mountElement;
//     }
//   }

//   startAnimation() {
//     if (this.isAnimating) return;
//     this.isAnimating = true;
//     this.animate();
//   }

//   stopAnimation() {
//     this.isAnimating = false;
//     if (this.animationId) {
//       cancelAnimationFrame(this.animationId);
//       this.animationId = null;
//     }
//   }

//   private animate = (t = 0) => {
//     if (!this.isAnimating || !this.camera || !this.tubeGeo) {
//       return;
//     }

//     // Camera animation function
//     const time = t * this.speed;
//     const looptime = 10 * 1000;
//     const p = (time % looptime) / looptime;
//     const pos = this.tubeGeo.parameters.path.getPointAt(p);
//     const lookAt = this.tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
//     this.camera.position.copy(pos);
//     this.camera.lookAt(lookAt);
    
//     if (this.composer) {
//       this.composer.render();
//     } else if (this.renderer && this.scene) {
//       this.renderer.render(this.scene, this.camera);
//     }
    
//     if (this.isAnimating) {
//       this.animationId = requestAnimationFrame(this.animate);
//     }
//   };

//   handleResize() {
//     if (!this.camera || !this.renderer) return;

//     const newW = window.innerWidth;
//     const newH = window.innerHeight;
    
//     this.camera.aspect = newW / newH;
//     this.camera.updateProjectionMatrix();
//     this.renderer.setSize(newW, newH);
    
//     if (this.composer) {
//       this.composer.setSize(newW, newH);
//     }
//   }

//   updateSpeed(speed: number) {
//     this.speed = speed;
//   }

//   updateIntensity(intensity: number) {
//     if (this.composer && this.composer.passes[1]) {
//       this.composer.passes[1].strength = intensity;
//     }
//   }

//   dispose() {
//     this.stopAnimation();
    
//     if (this.scene) {
//       this.scene.traverse((object) => {
//         if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
//           if (object.geometry) object.geometry.dispose();
//           if (object.material) {
//             if (Array.isArray(object.material)) {
//               object.material.forEach(material => material.dispose());
//             } else {
//               object.material.dispose();
//             }
//           }
//         }
//       });
//       this.scene.clear();
//     }

//     if (this.renderer) {
//       if (this.renderer.domElement.parentNode) {
//         this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
//       }
//       this.renderer.dispose();
//     }

//     this.scene = null;
//     this.camera = null;
//     this.renderer = null;
//     this.composer = null;
//     this.tubeGeo = null;
//     this.isInitialized = false;
//     this.isAnimating = false;
//     this.currentMount = null;
//     TunnelRenderer.instance = null;
//   }
// }

// const TunnelBackground: React.FC<TunnelBackgroundProps> = ({ 
//   className = "", 
//   intensity = 3.5,
//   speed = 0.1 
// }) => {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const rendererRef = useRef<TunnelRenderer | null>(null);

//   const handleResize = useCallback(() => {
//     if (rendererRef.current) {
//       rendererRef.current.handleResize();
//     }
//   }, []);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Get or create singleton renderer
//     rendererRef.current = TunnelRenderer.getInstance();
    
//     // Initialize or attach to existing renderer
//     rendererRef.current.initialize(mountRef.current, intensity, speed);

//     // Add resize listener
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       // Don't dispose the renderer, just detach from this mount
//       // This allows the renderer to persist across route changes
//     };
//   }, [intensity, speed, handleResize]);

//   // Update properties when they change
//   useEffect(() => {
//     if (rendererRef.current) {
//       rendererRef.current.updateSpeed(speed);
//     }
//   }, [speed]);

//   useEffect(() => {
//     if (rendererRef.current) {
//       rendererRef.current.updateIntensity(intensity);
//     }
//   }, [intensity]);

//   return (
//     <div 
//       ref={mountRef} 
//       className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
//       style={{ 
//         background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)' 
//       }}
//     />
//   );
// };

// export default TunnelBackground;

'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

// Define the spline curve data
const curvePath = [
  10.136184463414924, -1.374508746897471, 10.384881573913269,
  9.1152593889854714, -1.374508746897471, 8.5846792797570011,
  9.0669355709754882, -1.0665123466336568, 5.8937771631608156,
  10.151040177840205, -0.65913653144937956, 3.4340491740541346,
  10.806779203170416, 1.8859391007298545, 0.46855774212986023,
  10.761433540147586, 2.8724172201359197, -1.2811838605587311,
  9.6195923104445065, 2.8724172201359197, -3.2833099941904766,
  6.9763020889151646, 2.7659257976905427, -4.7591958908830172,
  6.0461277891353697, 1.0727045302089879, -6.6638740164090482,
  7.3472235778544794, -1.8228856326635698, -9.0685043046185623,
  7.226367212900791, -1.8228856326635698, -10.499536640855691,
  5.8354566696263914, -1.8228856326635698, -12.039219379199908,
  3.6532357452141353, -0.20463983570573391, -13.87695442281038,
  -0.30169589630131455, 1.5965000671484342, -14.879986418947327,
  -2.8925694230502157, 2.2971364614427481, -13.892095587598131,
  -4.537672295357936, 4.5863515759659208, -12.140831652074551,
  -6.1287913464117594, 5.9653814634119815, -8.9776527318875896,
  -6.0120301606452813, 4.4081161943855998, -6.712084358394045,
  -5.2138252159038974, 2.820894808418279, -4.4532820412085607,
  -2.3424712835109611, 2.2032065005086259, -3.0788773693500198,
  -0.0076956453915433265, 1.8931797788880202, -1.6577070662471063,
  -0.24767503988481437, 2.8845808465856684, 0.073915859214221724,
  -2.2174044353598896, 4.2415524507318576, 2.215992718290742,
  -3.4526531678364756, 3.0615192023340851, 4.7922404932096558,
  -3.7356278971556445, 1.4054080369354316, 7.8432021841434629,
  -3.4003734463804118, 1.1924069108769393, 9.2464090886227073,
  -1.8851803760476225, 1.5269331003449989, 10.306083896408374,
  0.01071077144031829, 2.1101821577522295, 10.490880699847727,
  0.42562058195647001, 2.2759939598834387, 11.613129436580291,
  0.096405262182225115, 0.032317784084054391, 16.223455375061565,
  2.3458797884520433, 0.38907275257695584, 19.91188266079584,
  5.7018400098488771, 1.73337964747396, 20.615481586999959,
  7.9720939736751824, 1.73337964747396, 19.303399329816457,
  9.8672362721095652, 0.090083018057025177, 16.893338541618121,
  11.225959519544134, -1.374508746897471, 14.279002555560753,
  11.288646925965876, -1.374508746897471, 11.926359497447137,
  10.136184463414924, -1.374508746897471, 10.384881573913269
];

interface TunnelBackgroundProps {
  className?: string;
  intensity?: number;
  speed?: number;
}

// Type for the EffectComposer from three.js postprocessing
interface EffectComposer {
  addPass: (pass: unknown) => void;
  render: () => void;
  setSize: (width: number, height: number) => void;
  passes: Array<{ strength?: number }>;
}

// Global singleton to persist Three.js state across route changes
class TunnelRenderer {
  private static instance: TunnelRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private composer: EffectComposer | null = null;
  private animationId: number | null = null;
  private tubeGeo: THREE.TubeGeometry | null = null;
  private isInitialized = false;
  private isAnimating = false;
  private currentMount: HTMLDivElement | null = null;
  private speed = 0.1;

  static getInstance(): TunnelRenderer {
    if (!TunnelRenderer.instance) {
      TunnelRenderer.instance = new TunnelRenderer();
    }
    return TunnelRenderer.instance;
  }

  async initialize(mountElement: HTMLDivElement, intensity: number = 3.5, speed: number = 0.1) {
    if (this.isInitialized && this.renderer && this.scene && this.camera) {
      this.attachToMount(mountElement);
      this.speed = speed;
      if (!this.isAnimating) {
        this.startAnimation();
      }
      return;
    }

    this.currentMount = mountElement;
    this.speed = speed;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Create spline from curve path
    const points: THREE.Vector3[] = [];
    for (let p = 0; p < curvePath.length; p += 3) {
      points.push(new THREE.Vector3(
        curvePath[p], 
        curvePath[p + 1], 
        curvePath[p + 2]
      ));
    }
    const spline = new THREE.CatmullRomCurve3(points);

    // Initialize Three.js scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.3);

    this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Create tube geometry from the spline
    this.tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
    
    // Create edges geometry for the tunnel
    const edges = new THREE.EdgesGeometry(this.tubeGeo, 0.2);
    const lineMat = new THREE.LineBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });
    const tubeLines = new THREE.LineSegments(edges, lineMat);
    this.scene.add(tubeLines);

    // Add floating boxes
    const numBoxes = 55;
    const size = 0.075;
    const boxGeo = new THREE.BoxGeometry(size, size, size);

    for (let i = 0; i < numBoxes; i++) {
      // Wireframe box
      const boxMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      
      const p = (i / numBoxes + Math.random() * 0.1) % 1;
      const pos = this.tubeGeo.parameters.path.getPointAt(p);
      pos.x += Math.random() - 0.4;
      pos.z += Math.random() - 0.4;
      box.position.copy(pos);
      
      const rotation = new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      box.rotation.set(rotation.x, rotation.y, rotation.z);
      
      // Box edges
      const boxEdges = new THREE.EdgesGeometry(boxGeo, 0.2);
      const boxLineMat = new THREE.LineBasicMaterial({ 
        color: 0x0088ff,
        transparent: true,
        opacity: 0.8
      });
      const boxLines = new THREE.LineSegments(boxEdges, boxLineMat);
      boxLines.position.copy(pos);
      boxLines.rotation.set(rotation.x, rotation.y, rotation.z);
      
      this.scene.add(box);
      this.scene.add(boxLines);
    }

    // Post-processing setup
    try {
      const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js');
      const { RenderPass } = await import('three/examples/jsm/postprocessing/RenderPass.js');
      const { UnrealBloomPass } = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');
      
      this.composer = new EffectComposer(this.renderer) as EffectComposer;
      const renderScene = new RenderPass(this.scene, this.camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(w, h),
        intensity,
        0.4,
        100
      );
      bloomPass.threshold = 0.002;
      bloomPass.strength = intensity;
      bloomPass.radius = 0;
      
      this.composer.addPass(renderScene);
      this.composer.addPass(bloomPass);
    } catch {
      console.warn('Post-processing not available, using standard renderer');
    }

    this.attachToMount(mountElement);
    this.isInitialized = true;
    this.startAnimation();
  }

  attachToMount(mountElement: HTMLDivElement) {
    if (this.renderer && mountElement && this.renderer.domElement.parentNode !== mountElement) {
      // Remove from previous mount if exists
      if (this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      // Attach to new mount
      mountElement.appendChild(this.renderer.domElement);
      this.currentMount = mountElement;
    }
  }

  startAnimation() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animate();
  }

  stopAnimation() {
    this.isAnimating = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate = (t = 0) => {
    if (!this.isAnimating || !this.camera || !this.tubeGeo) {
      return;
    }

    // Camera animation function
    const time = t * this.speed;
    const looptime = 10 * 1000;
    const p = (time % looptime) / looptime;
    const pos = this.tubeGeo.parameters.path.getPointAt(p);
    const lookAt = this.tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
    this.camera.position.copy(pos);
    this.camera.lookAt(lookAt);
    
    if (this.composer) {
      this.composer.render();
    } else if (this.renderer && this.scene) {
      this.renderer.render(this.scene, this.camera);
    }
    
    if (this.isAnimating) {
      this.animationId = requestAnimationFrame(this.animate);
    }
  };

  handleResize() {
    if (!this.camera || !this.renderer) return;

    const newW = window.innerWidth;
    const newH = window.innerHeight;
    
    this.camera.aspect = newW / newH;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(newW, newH);
    
    if (this.composer) {
      this.composer.setSize(newW, newH);
    }
  }

  updateSpeed(speed: number) {
    this.speed = speed;
  }

  updateIntensity(intensity: number) {
    if (this.composer && this.composer.passes[1]) {
      this.composer.passes[1].strength = intensity;
    }
  }

  dispose() {
    this.stopAnimation();
    
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      this.scene.clear();
    }

    if (this.renderer) {
      if (this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer.dispose();
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.composer = null;
    this.tubeGeo = null;
    this.isInitialized = false;
    this.isAnimating = false;
    this.currentMount = null;
    TunnelRenderer.instance = null;
  }
}

const TunnelBackground: React.FC<TunnelBackgroundProps> = ({ 
  className = "", 
  intensity = 3.5,
  speed = 0.1 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<TunnelRenderer | null>(null);

  const handleResize = useCallback(() => {
    if (rendererRef.current) {
      rendererRef.current.handleResize();
    }
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Get or create singleton renderer
    rendererRef.current = TunnelRenderer.getInstance();
    
    // Initialize or attach to existing renderer
    rendererRef.current.initialize(mountRef.current, intensity, speed);

    // Add resize listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Don't dispose the renderer, just detach from this mount
      // This allows the renderer to persist across route changes
    };
  }, [intensity, speed, handleResize]);

  // Update properties when they change
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.updateSpeed(speed);
    }
  }, [speed]);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.updateIntensity(intensity);
    }
  }, [intensity]);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
      style={{ 
        background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)' 
      }}
    />
  );
};

export default TunnelBackground;