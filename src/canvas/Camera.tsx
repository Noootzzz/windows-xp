import { useThree, useFrame } from "@react-three/fiber";
import { useExperienceStore } from "../store/useExperienceStore";
import * as THREE from "three";

const idle = new THREE.Vector3(0, 2.5, 18);
const focus = new THREE.Vector3(0, 1, 6);
const inside = new THREE.Vector3(0, 1.5, 5);

const focusLookAt = new THREE.Vector3(0, 0, 2);

export default function Camera() {
  const { camera } = useThree();
  const mode = useExperienceStore((s) => s.mode);

  useFrame(() => {
    let target = idle;
    let lookAtTarget = new THREE.Vector3(0, 0, 0);

    if (mode === "focus") {
      target = focus;
      lookAtTarget = focusLookAt;
      camera.position.lerp(target, 0.08);
      camera.lookAt(lookAtTarget);
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
