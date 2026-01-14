import { useGLTF } from "@react-three/drei";
import computerModel from "../../assets/models/Computer.glb";
import {
  useExperienceStore,
  useScreenStore,
} from "../../store/useExperienceStore";
import { useMemo } from "react";
import * as THREE from "three";

export default function ComputerCase() {
  const { scene } = useGLTF(computerModel);
  const setMode = useExperienceStore((s) => s.setMode);
  const setScreen = useScreenStore((s) => s.setScreen);
  const screenState = useScreenStore((s) => s.screen);
  const startBoot = useScreenStore((s) => s.startBoot);

  const toggleScreen = (e: any) => {
    e.stopPropagation();
    if (screenState === "off") {
      startBoot();
    } else {
      setMode("idle");
      setScreen("off");
    }
  };

  const parts = useMemo(() => {
    const names = [
      "Computer_case",
      "front_grill",
      "Drive001",
      "Drive002",
      "Indicator001",
      "Indicator002",
      "Latch001",
      "Latch002",
    ] as const;

    return Object.fromEntries(
      names.map((name) => {
        const original = scene.getObjectByName(name);
        return [name, original ? original.clone(true) : null];
      })
    ) as Record<(typeof names)[number], THREE.Object3D | null>;
  }, [scene]);

  return (
    <group scale={0.5} position={[0, 0, 0]}>
      {parts.Computer_case && <primitive object={parts.Computer_case} />}
      {parts.front_grill && <primitive object={parts.front_grill} />}
      {parts.Drive001 && <primitive object={parts.Drive001} />}
      {parts.Drive002 && <primitive object={parts.Drive002} />}
      {parts.Indicator001 && (
        <>
          {(screenState === "on" || screenState === "booting") && (
            <pointLight
              intensity={0.1}
              color="#ccff00"
              position={[-3.6, -4.1, 3]}
              distance={0.2}
              decay={1.5}
              castShadow
            />
          )}
          <primitive
            object={parts.Indicator001}
            onClick={(e: any) => toggleScreen(e)}
            onPointerOver={(e: any) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e: any) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
            }}
          />
        </>
      )}
      {parts.Indicator002 && (
        <>
          {screenState === "off" && (
            <pointLight
              intensity={0.5}  
              color="#ff0000"
              position={[0.55, -3.8, 3]}
              distance={0.2}
              decay={1.5}
              castShadow
            />
          )}
          <primitive
            object={parts.Indicator002}
            onClick={(e: any) => toggleScreen(e)}
            onPointerOver={(e: any) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e: any) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
            }}
          />
        </>
      )}
      {parts.Latch001 && <primitive object={parts.Latch001} />}
      {parts.Latch002 && <primitive object={parts.Latch002} />}
    </group>
  );
}
