import { createContext, useContext, ReactNode } from "react"
import * as THREE from "three"
import { useCSS3DRenderer } from "../hooks/useCSS3DRenderer"

interface CSS3DContextValue {
  cssScene: THREE.Scene
}

const CSS3DContext = createContext<CSS3DContextValue | null>(null)

export function CSS3DProvider({ children }: { children: ReactNode }) {
  const { cssScene } = useCSS3DRenderer()

  return (
    <CSS3DContext.Provider value={{ cssScene }}>
      {children}
    </CSS3DContext.Provider>
  )
}

export function useCSS3DScene() {
  const context = useContext(CSS3DContext)
  if (!context) {
    throw new Error("useCSS3DScene must be used within a CSS3DProvider")
  }
  return context.cssScene
}
