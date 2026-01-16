export const WindowType = {
  ALBUM_COVER: 'album-cover',
  MUSIC_PLAYER: 'music-player',
} as const;

export type WindowType = typeof WindowType[keyof typeof WindowType];

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  type: WindowType;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface WindowConfig {
  id: string;
  type: WindowType;
  title: string;
  icon: string;
  defaultPosition?: Position;
  defaultSize?: Size;
}
