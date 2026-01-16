import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";
import { useExperienceStore } from "../core/store";

export default function CanvasRoot() {
  const { mode, setMode } = useExperienceStore();

  const handlePointerMissed = () => {
    if (mode === "focus") {
      setMode("idle");
    }
  };

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
      style={{ background: "transparent", cursor: mode === "focus" ? "pointer" : "auto" }}
      onPointerMissed={handlePointerMissed}
    >

      <Experience />
    </Canvas>
  );
}
