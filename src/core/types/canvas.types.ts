export interface Position {
  x: number;
  y: number;
}

export interface CanvasDrawingContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

export interface TextMetrics {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface ColorPreset {
  primary: string;
  secondary: string;
  background: string;
}

export interface FilterParams {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  width: number;
  height: number;
  colors: ColorPreset;
  intensity: number;
}

export interface EffectParams {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  intensity: number;
  colors?: ColorPreset;
}

export type FilterType =
  | 'wavelines'
  | 'thermal'
  | 'glitch'
  | 'halftone'
  | 'vhs'
  | 'neon'
  | 'liquify';
