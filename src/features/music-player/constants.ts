// Player configuration
export const PLAYER_CONFIG = {
  DEFAULT_VOLUME: 0.3,
  VOLUME_MIN: 0,
  VOLUME_MAX: 1,
  VOLUME_STEP: 0.01,
  DEFAULT_HEIGHT: "500px",
  DEFAULT_WIDTH: "500px",
} as const;

// Player colors (matching album cover theme)
export const PLAYER_COLORS = {
  BACKGROUND: "#1a1a1a",
  ACCENT: "#ccff00",
  BUTTON_GRADIENT_FROM: "#444",
  BUTTON_GRADIENT_TO: "#222",
  BUTTON_BORDER: "#555",
  SLIDER_BG: "#444",
} as const;

// Window configuration
export const WINDOW_CONFIG = {
  TITLE: "Music Player",
  ICON: "/music.png",
  INITIAL_POSITION: { x: 150, y: 100 },
} as const;

// Audio file patterns
export const AUDIO_PATTERNS = {
  ASSETS_GLOB: "/src/assets/musics/*.mp3",
  ACCEPT_TYPES: "audio/*",
} as const;

// Messages
export const MESSAGES = {
  NO_MUSIC_LOADED: "No music loaded",
  ADD_MUSIC_TITLE: "Add Music",
} as const;
