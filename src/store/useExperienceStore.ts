import { create } from "zustand"

type Mode = "idle" | "focus" | "inside"

export const useExperienceStore = create<{
  mode: Mode
  setMode: (mode: Mode) => void
}>((set) => ({
  mode: "idle",
  setMode: (mode) => set({ mode }),
}))


export const useScreenStore = create<{
  screen: "off" | "on" | "booting"
  setScreen: (screen: "off" | "on" | "booting") => void
}>((set) => ({
  screen: "on",
  setScreen: (screen) => set({ screen }),
}))