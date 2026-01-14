import { useGLTF } from "@react-three/drei"
import ComputerModel from "../../assets/models/Computer.glb"
import { useMemo } from "react"
import * as THREE from "three"

export default function Desk() {
    const { scene } = useGLTF(ComputerModel)
    const parts = useMemo(() => {
        const names = [
            "TOP",
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
            {parts.TOP && (
                <primitive object={parts.TOP} />
            )}
        </group>
    )
}