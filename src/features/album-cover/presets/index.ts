import type {
  SourceImage,
  FilterType,
  FilterConfig,
  ColorPreset,
} from "./types";

export const SOURCE_IMAGES: SourceImage[] = [
  {
    id: "travis-1",
    name: "Travis Scott",
    path: "/covers/travis-1.jpg",
  },
  {
    id: "travis-2",
    name: "Travis Scott",
    path: "/covers/travis-2.jpg",
  },
  {
    id: "travis-3",
    name: "Travis Scott",
    path: "/covers/travis-3.webp",
  },
];


export const FILTERS: Record<FilterType, FilterConfig> = {
  wavelines: {
    id: "wavelines",
    name: "Wave Lines",
    description: "Effet de lignes ondulées style oscilloscope",
  },
  thermal: {
    id: "thermal",
    name: "Thermal",
    description: "Vision thermique avec gradient de couleurs",
  },
  glitch: {
    id: "glitch",
    name: "Glitch",
    description: "Effet de corruption numérique RGB",
  },
  halftone: {
    id: "halftone",
    name: "Halftone",
    description: "Points de trame style impression",
  },
  vhs: {
    id: "vhs",
    name: "VHS",
    description: "Effet cassette VHS années 80",
  },
  neon: {
    id: "neon",
    name: "Neon",
    description: "Contours lumineux néon",
  },
  liquify: {
    id: "liquify",
    name: "Liquify",
    description: "Distorsion spatiale liquide",
  },
};


export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: "acid",
    name: "Acid",
    primary: "#ccff00",
    secondary: "#88cc00",
    background: "#000000",
  },
  {
    id: "purple-haze",
    name: "Purple Haze",
    primary: "#9b59b6",
    secondary: "#8e44ad",
    background: "#1a0a1f",
  },
  {
    id: "harlem",
    name: "Harlem Gold",
    primary: "#f39c12",
    secondary: "#e74c3c",
    background: "#1a0505",
  },
  {
    id: "cyber",
    name: "Cyber",
    primary: "#00ffff",
    secondary: "#ff00ff",
    background: "#0a0a1a",
  },
  {
    id: "blood",
    name: "Blood",
    primary: "#e74c3c",
    secondary: "#c0392b",
    background: "#1a0505",
  },
];

export const DEFAULT_SOURCE_IMAGE = SOURCE_IMAGES[0];
export const DEFAULT_FILTER: FilterType = "wavelines";
export const DEFAULT_COLOR_PRESET = COLOR_PRESETS[0];
export const DEFAULT_INTENSITY = 50;
export const DEFAULT_GRAIN = 20;
export const DEFAULT_CIRCULAR = 0;


export const PRESETS: Record<string, ColorPreset> = COLOR_PRESETS.reduce(
  (acc, preset) => ({ ...acc, [preset.id]: preset }),
  {}
);

export const getFilter = (id: FilterType): FilterConfig => FILTERS[id];
export const getFilterIds = (): FilterType[] =>
  Object.keys(FILTERS) as FilterType[];
export const getColorPreset = (id: string): ColorPreset | undefined =>
  COLOR_PRESETS.find((p) => p.id === id);
export const getPresetIds = (): string[] => COLOR_PRESETS.map((p) => p.id);

export type {
  SourceImage,
  FilterType,
  FilterConfig,
  ColorPreset,
  PresetId,
} from "./types";
