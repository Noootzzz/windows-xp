import type { StateCreator } from 'zustand';

export type ScreenState = 'intro' | 'off' | 'on' | 'booting';

export interface ScreenSlice {
  screen: ScreenState;
  setScreen: (screen: ScreenState) => void;
  startBoot: () => void;
  startExperience: () => void;
}

export const createScreenSlice: StateCreator<ScreenSlice> = (set) => ({
  screen: 'intro',
  setScreen: (screen) => set({ screen }),
  startBoot: () => set({ screen: 'booting' }),
  startExperience: () => set({ screen: 'booting' }),
});
