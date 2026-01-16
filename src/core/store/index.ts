import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { createExperienceSlice, type ExperienceSlice } from './slices/experienceSlice';
import { createScreenSlice, type ScreenSlice } from './slices/screenSlice';
import { createWindowSlice, type WindowSlice } from './slices/windowSlice';

type StoreState = ExperienceSlice & ScreenSlice & WindowSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createExperienceSlice(...a),
  ...createScreenSlice(...a),
  ...createWindowSlice(...a),
}));

export const useExperienceStore = () =>
  useStore(
    useShallow((state) => ({
      mode: state.mode,
      setMode: state.setMode,
    }))
  );

export const useScreenStore = () =>
  useStore(
    useShallow((state) => ({
      screen: state.screen,
      setScreen: state.setScreen,
      startBoot: state.startBoot,
    }))
  );

export const useWindowStore = () =>
  useStore(
    useShallow((state) => ({
      windows: state.windows,
      activeWindowId: state.activeWindowId,
      openWindow: state.openWindow,
      closeWindow: state.closeWindow,
      minimizeWindow: state.minimizeWindow,
      maximizeWindow: state.maximizeWindow,
      restoreWindow: state.restoreWindow,
      focusWindow: state.focusWindow,
      toggleMinimize: state.toggleMinimize,
    }))
  );
