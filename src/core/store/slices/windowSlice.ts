import type { StateCreator } from 'zustand';
import type { WindowState, WindowType } from '../../types/window.types';

export interface WindowSlice {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  nextZIndex: number;

  openWindow: (id: string, type: WindowType) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
}

export const createWindowSlice: StateCreator<WindowSlice> = (set, get) => ({
  windows: {},
  activeWindowId: null,
  nextZIndex: 100,

  openWindow: (id: string, type: WindowType) => {
    const { windows, nextZIndex } = get();

    if (windows[id]) {
      if (windows[id].isMinimized) {
        set({
          windows: {
            ...windows,
            [id]: { ...windows[id], isMinimized: false, zIndex: nextZIndex },
          },
          activeWindowId: id,
          nextZIndex: nextZIndex + 1,
        });
      } else {
        get().focusWindow(id);
      }
      return;
    }

    set({
      windows: {
        ...windows,
        [id]: {
          id,
          type,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
        },
      },
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    });
  },

  closeWindow: (id: string) => {
    const { windows, activeWindowId } = get();
    const newWindows = { ...windows };
    delete newWindows[id];

    set({
      windows: newWindows,
      activeWindowId: activeWindowId === id ? null : activeWindowId,
    });
  },

  minimizeWindow: (id: string) => {
    const { windows } = get();
    if (!windows[id]) return;

    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isMinimized: true },
      },
      activeWindowId: null,
    });
  },

  maximizeWindow: (id: string) => {
    const { windows } = get();
    if (!windows[id]) return;

    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isMaximized: !windows[id].isMaximized },
      },
    });
  },

  restoreWindow: (id: string) => {
    const { windows, nextZIndex } = get();
    if (!windows[id]) return;

    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMinimized: false,
          zIndex: nextZIndex,
        },
      },
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    });
  },

  focusWindow: (id: string) => {
    const { windows, nextZIndex } = get();
    if (!windows[id]) return;

    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], zIndex: nextZIndex },
      },
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    });
  },

  toggleMinimize: (id: string) => {
    const { windows } = get();
    if (!windows[id]) return;

    if (windows[id].isMinimized) {
      get().restoreWindow(id);
    } else {
      get().minimizeWindow(id);
    }
  },
});
