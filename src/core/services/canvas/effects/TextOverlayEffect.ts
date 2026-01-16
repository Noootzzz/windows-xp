import { type ColorPreset, type Position } from '../../../types/canvas.types';

export interface TextOverlayParams {
  ctx: CanvasRenderingContext2D;
  text: string;
  position: Position;
  colors: ColorPreset;
  fontSize: number;
  fontFamily: string;
}

export const applyTextOverlay = ({
  ctx,
  text,
  position,
  colors,
  fontSize,
  fontFamily,
}: TextOverlayParams): void => {
  const word = text.toUpperCase();
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.shadowBlur = 15;
  ctx.shadowColor = colors.primary;
  ctx.fillStyle = colors.primary;
  ctx.fillText(word, position.x, position.y);

  ctx.shadowBlur = 0;
  ctx.strokeStyle = colors.background;
  ctx.lineWidth = 4;
  ctx.strokeText(word, position.x, position.y);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(word, position.x, position.y);
};
