import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";

export default function CanvasRoot() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2, 6], fov: 45 }}
      gl={{
        toneMapping: THREE.NoToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true,
      }}
      style={{ background: "transparent" }}
    >
      
      <Experience />
    </Canvas>
  );
}
