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

export const CANVAS_CONFIG = {
  WIDTH: 450,
  HEIGHT: 450,
  FONT_SIZE: 30,
  FONT_FAMILY: '"Press Start 2P"',
} as const;

export const GENERATION_CONFIG = {
  MIN_CHAOS: 5,
  MAX_CHAOS: 50,
  DEFAULT_CHAOS: 15,
  SLASH_SEGMENTS: 20,
  SPLATTER_DOTS: 20,
  BLOCK_COUNT: 5,
  TEXT_PADDING: 30,
} as const;
