import type { StateCreator } from 'zustand';

export type ScreenState = 'off' | 'on' | 'booting';

export interface ScreenSlice {
  screen: ScreenState;
  setScreen: (screen: ScreenState) => void;
  startBoot: () => void;
}

export const createScreenSlice: StateCreator<ScreenSlice> = (set) => ({
  screen: 'off',
  setScreen: (screen) => set({ screen }),
  startBoot: () => set({ screen: 'booting' }),
});
