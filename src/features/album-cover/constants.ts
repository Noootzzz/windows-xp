// Color constants
export const COLORS = {
  BLACK: "#050505",
  ACID: "#ccff00",
  WHITE: "#f0f0f0",
} as const;

// Default word list for text randomization
export const DEFAULT_WORDS = [
  "TRAVIS",
  "JACK",
  "CACTUS",
  "MODUS",
  "VIVENDI",
  "GAMER",
  "LEVEL",
  "SCORE",
] as const;

// Canvas configuration
export const CANVAS_CONFIG = {
  WIDTH: 600,
  HEIGHT: 600,
  FONT_SIZE: 40,
  FONT_FAMILY: '"Press Start 2P"',
} as const;

// Generation parameters
export const GENERATION_CONFIG = {
  MIN_CHAOS: 5,
  MAX_CHAOS: 50,
  DEFAULT_CHAOS: 15,
  SLASH_SEGMENTS: 20,
  SPLATTER_DOTS: 20,
  BLOCK_COUNT: 5,
  TEXT_PADDING: 30,
} as const;
