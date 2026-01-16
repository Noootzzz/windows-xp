import { useThree, useFrame } from "@react-three/fiber";
import { useExperienceStore } from "../core/store";
import * as THREE from "three";
import { useEffect, useState } from "react";

const focusLookAt = new THREE.Vector3(0, 0, 2);

export default function Camera() {
  const { camera } = useThree();
  const { mode } = useExperienceStore();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const idle = new THREE.Vector3(0, 2.5, 18);
  const focus = isMobile
    ? new THREE.Vector3(0, 1, 8)
    : new THREE.Vector3(0, -0.2, 4.5);
  const inside = isMobile
    ? new THREE.Vector3(0, 1.5, 4)
    : new THREE.Vector3(0, 1.5, 5);

  useFrame(() => {
    let target = idle;

    if (mode === "focus") {
      camera.position.lerp(focus, 0.08);
      camera.lookAt(focusLookAt);
      return;
    }

    if (mode === "inside") target = inside;

    camera.position.lerp(target, 0.05);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -2, 2);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, 1, 3);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, 6, 18);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
