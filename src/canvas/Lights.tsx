import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lights() {
  const flickerSpot = useRef<THREE.SpotLight>(null);
  const flickerPoint = useRef<THREE.PointLight>(null);
  const timeRef = useRef(0);
  const nextFlickerRef = useRef(0);
  const isOnRef = useRef(true);

  useFrame((_, delta) => {
    if (!flickerSpot.current || !flickerPoint.current) return;

    timeRef.current += delta;

    if (timeRef.current > nextFlickerRef.current) {
      isOnRef.current = !isOnRef.current;

      if (isOnRef.current) {
        nextFlickerRef.current = timeRef.current + Math.random() * 3 + 1.5;
        const intensity = 200 + Math.random() * 50;
        flickerSpot.current.intensity = intensity;
        flickerPoint.current.intensity = intensity * 0.05;
      } else {
        nextFlickerRef.current = timeRef.current + Math.random() * 0.15 + 0.05;
        const intensity = Math.random() * 10;
        flickerSpot.current.intensity = intensity;
        flickerPoint.current.intensity = intensity * 0.05;
      }
    }

    if (isOnRef.current && flickerSpot.current.intensity > 10) {
      const variation = (Math.random() - 0.5) * 5;
      flickerSpot.current.intensity += variation;
      flickerPoint.current.intensity += variation * 0.05;
    }
  });

  return (
    <>
      <pointLight
        ref={flickerPoint}
        position={[0, 0, 4]}
        intensity={10}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <ambientLight intensity={0.08} color="#0a0a15" />

      <spotLight
        ref={flickerSpot}
        position={[0, 8, 0]}
        angle={0.35}
        penumbra={0.5}
        intensity={200}
        color="#fff5e0"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[0, 2, 5]} intensity={0.2} color="#ffffff" />
    </>
  );
}
