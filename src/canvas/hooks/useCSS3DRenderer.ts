import { useEffect, useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js"
import * as THREE from "three"

export function useCSS3DRenderer() {
  const { gl, camera, size } = useThree()
  const rendererRef = useRef<CSS3DRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene())

  useEffect(() => {
    // Create CSS3DRenderer
    const cssRenderer = new CSS3DRenderer()
    cssRenderer.setSize(size.width, size.height)
    cssRenderer.domElement.style.position = "absolute"
    cssRenderer.domElement.style.top = "0"
    cssRenderer.domElement.style.left = "0"
    cssRenderer.domElement.style.pointerEvents = "none"

    // Insert CSS renderer before the WebGL canvas
    const container = gl.domElement.parentElement
    if (container) {
      container.insertBefore(cssRenderer.domElement, gl.domElement)
    }

    rendererRef.current = cssRenderer

    return () => {
      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement)
      }
    }
  }, [gl])

  // Handle resize
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setSize(size.width, size.height)
    }
  }, [size])

  // Render CSS scene every frame
  useFrame(() => {
    if (rendererRef.current && sceneRef.current) {
      rendererRef.current.render(sceneRef.current, camera)
    }
  })

  return { cssScene: sceneRef.current, cssRenderer: rendererRef.current }
}

export { CSS3DObject }
