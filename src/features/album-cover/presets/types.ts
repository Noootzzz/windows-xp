
export interface SourceImage {
  id: string;
  name: string;
  path: string;
}

export type FilterType =
  | "wavelines"
  | "thermal"
  | "glitch"
  | "halftone"
  | "vhs"
  | "neon"
  | "liquify";

export interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
}

export type PresetId = string;


export interface FilterConfig {
  id: FilterType;
  name: string;
  description: string;
}

export interface GeneratorState {
  sourceImage: SourceImage;
  filter: FilterType;
  colorPreset: ColorPreset;
  intensity: number;
  grainIntensity: number;
  circularIntensity: number;
  text: string;
  textPosition: { x: number; y: number };
}
