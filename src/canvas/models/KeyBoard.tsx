import { useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import computerModel from "../../assets/models/Computer.glb"
import * as THREE from "three"

const KEYBOARD_SOUND_URL = "/sounds/Mechanical Keyboard Typing Sound.mp3"


const keyMapping: Record<string, number> = {
    'Escape': 5, 'F1': 69, 'F2': 70, 'F3': 71, 'F4': 72, 'F5': 73, 'F6': 69, 'F7': 70, 'F8': 71, 'F9': 72, 'F10': 73, 'F11': 72, 'F12': 72,
    'Backquote': 14, '1': 15, '2': 16, '3': 17, '4': 18, '5': 19, '6': 20, '7': 21, '8': 22, '9': 23, '0': 24, '-': 45, '=': 26, 'Backspace': 27,
    'Tab': 74, 'q': 57, 'w': 48, 'e': 31, 'r': 51, 't': 63, 'y': 47, 'u': 36, 'i': 56, 'o': 52, 'p': 50, '[': 41, ']': 42, '\\': 41,
    'CapsLock': 42, 'a': 49, 's': 44, 'd': 54, 'f': 46, 'g': 40, 'h': 44, 'j': 34, 'k': 37, 'l': 53, ';': 52, "'": 53, 'Enter': 4,
    'Shift': 77, 'z': 43, 'x':64, 'c': 35, 'v': 55, 'b': 65, 'n': 39, 'm': 61, ',': 63, '.': 64, '/': 65, 'ShiftRight': 66,
    'Control': 75, 'Alt': 68, 'Meta': 69, ' ': 80, 'AltRight': 11, 'ControlRight': 79,
    'ArrowUp': 73, 'ArrowLeft': 67, 'ArrowDown': 75, 'ArrowRight': 58,
}

export default function KeyBoard() {
    const { scene } = useGLTF(computerModel)
    const { camera } = useThree()
    const keyRefs = useRef<Record<string, THREE.Object3D>>({})
    const originalPositions = useRef<Record<string, number>>({})
    const listenerRef = useRef<THREE.AudioListener | null>(null)
    const audioBufferRef = useRef<AudioBuffer | null>(null)

    const numberButtons = 80;
    const parts = useMemo(() => {
        const names = [
            "Keyboard",
            "Keyboard_grille",
            "Cable",
            ...Array.from({ length: numberButtons }, (_, i) => `${i + 1}`),
        ] as const

        return Object.fromEntries(
            names.map((name) => {
                const original = scene.getObjectByName(name)
                return [name, original ? original.clone(true) : null]
            })
        ) as Record<typeof names[number], THREE.Object3D | null>
    }, [scene])

    useEffect(() => {
        Object.entries(parts).forEach(([name, part]) => {
            if (part && !isNaN(Number(name))) {
                originalPositions.current[name] = part.position.y
                keyRefs.current[name] = part
            }
        })
    }, [parts])

    useEffect(() => {
        const listener = new THREE.AudioListener()
        camera.add(listener)
        listenerRef.current = listener

        const audioLoader = new THREE.AudioLoader()
        audioLoader.load(KEYBOARD_SOUND_URL, (buffer) => {
            audioBufferRef.current = buffer
        })

        return () => {
            camera.remove(listener)
        }
    }, [camera])

    const playKeySound = () => {
        if (listenerRef.current && audioBufferRef.current) {
            const sound = new THREE.Audio(listenerRef.current)
            sound.setBuffer(audioBufferRef.current)
            sound.setVolume(0.5)
            sound.play()
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
            const keyIndex = keyMapping[key] || keyMapping[e.code]

            if (keyIndex) {
                const keyName = String(keyIndex)
                const keyObj = keyRefs.current[keyName]

                if (keyObj && originalPositions.current[keyName] !== undefined) {
                    keyObj.position.y = originalPositions.current[keyName] - 0.05
                    playKeySound()
                }
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
            const keyIndex = keyMapping[key] || keyMapping[e.code]

            if (keyIndex) {
                const keyName = String(keyIndex)
                const keyObj = keyRefs.current[keyName]

                if (keyObj && originalPositions.current[keyName] !== undefined) {
                    keyObj.position.y = originalPositions.current[keyName]
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    const keyButtons = useMemo(() => {
        return Array.from({ length: numberButtons }, (_, i) => `${i + 1}`)
            .filter(name => parts[name as keyof typeof parts])
    }, [parts])

    return (
        <group scale={0.5} position={[0, 0, 0]}>
            {parts.Keyboard && (
                <primitive object={parts.Keyboard} />
            )}
            {parts.Keyboard_grille && (
                <primitive object={parts.Keyboard_grille} />
            )}
            {parts.Cable && (
                <primitive object={parts.Cable} />
            )}
            {keyButtons.map((name) => {
                const part = parts[name as keyof typeof parts]
                return part && <primitive key={name} object={part} />
            })}
        </group>
    )
}