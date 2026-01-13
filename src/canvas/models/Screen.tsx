import { Html, useGLTF, useVideoTexture } from "@react-three/drei"
import computerModel from "../../assets/models/Computer.glb"
import { useExperienceStore, useScreenStore } from "../store/useExperienceStore"
import { useEffect, useRef, useMemo } from "react"
import * as THREE from "three"

export default function Screen() {
  const { scene } = useGLTF(computerModel)
  const setMode = useExperienceStore((s) => s.setMode)
  const mode = useExperienceStore((s) => s.mode)
  const screen = useScreenStore((s) => s.screen)
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null)
  const videoTexture = useVideoTexture("/videos/demo.mp4", {
    muted: true,
    loop: true,
    start: true,
  })
  const monitor003Ref = useRef<THREE.Object3D | null>(null)
  const monitor003 = useMemo(() => {
    const original = scene.getObjectByName("Monitor003")
    return original ? original.clone(true) : null
  }, [scene])

  useEffect(() => {
    if (monitor003 && !materialRef.current) {
      videoTexture.flipY = false
      videoTexture.rotation = Math.PI / 2
      videoTexture.center.set(0.5, 0.5)
      videoTexture.repeat.set(1, 1)

      monitor003.traverse((child: any) => {
        if (child.isMesh && !materialRef.current) {
          materialRef.current = new THREE.MeshBasicMaterial({
            map: videoTexture,
            color: 0xffffff,
          })
          child.material = materialRef.current
        }
      })
    }
  }, [monitor003, videoTexture])

  useEffect(() => {
    if (materialRef.current) {
      if (screen === "off") {
        materialRef.current.color.setHex(0x000000)
        materialRef.current.opacity = 1
      } else {
        materialRef.current.color.setHex(0xffffff)
        materialRef.current.opacity = 1
      }
      materialRef.current.needsUpdate = true
    }
  }, [screen])

  return (
    <group scale={0.5} position={[0, 0, 0]}>
      {monitor003 && (
        <primitive
        ref={monitor003Ref}
          object={monitor003}
          receiveShadow
          castShadow
          onClick={(e: any) => {
            e.stopPropagation()
            if (mode === "focus") {
              return;
            }
            setMode("focus")
          }}
        >
          <Html
            transform
            position={[0, 0, 0.4]}
            occlude="blending"
            castShadow
            receiveShadow
            style={{ width: "260px", height: "250px" }}
            center
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <iframe
                src="https://threejs.org/docs/#api/en/cameras/Camera"
                style={{
                  width: "100%",
                  height: "100%",
                  pointerEvents: mode === "focus" ? "auto" : "none",
                }}
              />
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
            </div>
          </Html>
        </primitive>
      )}
    </group>
  )
}
