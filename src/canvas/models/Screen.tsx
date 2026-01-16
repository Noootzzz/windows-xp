import { Html, useGLTF } from "@react-three/drei";
import computerModel from "../../assets/models/Computer.glb";
import {
  useExperienceStore,
  useScreenStore,
} from "../../store/useExperienceStore";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { WindowsXPDesktop } from "../../components/WindowsXPDesktop";
import BootScreen from "../../components/BootScreen";
import OffScreen from "../../components/OffScreen";

export default function Screen() {
  const { scene } = useGLTF(computerModel);
  const setMode = useExperienceStore((s) => s.setMode);
  const mode = useExperienceStore((s) => s.mode);
  const screen = useScreenStore((s) => s.screen);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const monitor003Ref = useRef<THREE.Object3D | null>(null);
  const monitor003 = useMemo(() => {
    const original = scene.getObjectByName("Monitor003");
    return original ? original.clone(true) : null;
  }, [scene]);

  useEffect(() => {
    if (materialRef.current) {
      if (screen === "off") {
        materialRef.current.color.setHex(0x000000);
        materialRef.current.opacity = 1;
      } else {
        materialRef.current.color.setHex(0xffffff);
        materialRef.current.opacity = 1;
      }
      materialRef.current.needsUpdate = true;
    }
  }, [screen]);

  return (
    <group scale={0.5} position={[0, 0, 0]}>
      {monitor003 && (
        <primitive
          ref={monitor003Ref}
          object={monitor003}
          receiveShadow
          castShadow
          onClick={(e: any) => {
            e.stopPropagation();
            if (mode === "focus") {
              return;
            }
            setMode("focus");
          }}
        >
        {screen === "on" && (
          <pointLight
            intensity={1}
            color={"#ccff00"}
            position={[0, 0.2, 0.3]}
            distance={3}
            decay={1.5}
            castShadow
          />
        )}

          <Html
            transform
            position={[0, 0.2, 0]}
            className="htmlScreen"
            occlude="blending"
            style={{ width: "1200px", height: "1050px", overflow: "hidden" }}
            scale={0.2}
          >
            {screen === "off" && (
              <OffScreen />
            )}
            {screen === "booting" && (
              <BootScreen />
            )}
            {screen === "on" && (
              <WindowsXPDesktop />
            )}
            {mode !== "focus" && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={() => setMode("focus")}
              />
            )}
          </Html>
        </primitive>
      )}
    </group>
  );
}
