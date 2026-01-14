export interface Position {
  x: number;
  y: number;
}

export interface AlbumCoverGeneratorProps {
  onClose: () => void;
  onMinimize: () => void;
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
