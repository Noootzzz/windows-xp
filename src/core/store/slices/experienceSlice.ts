import type { StateCreator } from 'zustand';

export type Mode = 'idle' | 'focus' | 'inside';

export interface ExperienceSlice {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const createExperienceSlice: StateCreator<ExperienceSlice> = (set) => ({
  mode: 'idle',
  setMode: (mode) => set({ mode }),
});
