import { useGLTF } from "@react-three/drei"
import computerModel from "../../assets/models/Computer.glb"
import { useExperienceStore } from "../../store/useExperienceStore"
import { useMemo } from "react"
import * as THREE from "three"

export default function Computer() {
  const { scene } = useGLTF(computerModel)
  const setMode = useExperienceStore((s) => s.setMode)

  const parts = useMemo(() => {
    const names = [
      "Monitor001",
      "Monitor002",
    ] as const
    return Object.fromEntries(
      names.map((name) => {
        const original = scene.getObjectByName(name)
        return [name, original ? original.clone(true) : null]
      })
    ) as Record<typeof names[number], THREE.Object3D | null>
  }, [scene])

  return (
    <group scale={0.5} position={[0, 0, 0]}>
      {parts.Monitor001 && (
        <primitive
          object={parts.Monitor001}
          receiveShadow
          castShadow
          
        />
      )}
      {parts.Monitor002 && (
        <primitive
          object={parts.Monitor002}
          receiveShadow
          castShadow
          
        />
      )}
    </group>
  )
}
