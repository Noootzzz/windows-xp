import { COLORS, CANVAS_CONFIG, GENERATION_CONFIG } from "./constants";
import type { CanvasDrawingContext, Position } from "./types";

/**
 * Draws splatter dots around a point
 */
export const drawSplatterDots = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
): void => {
  ctx.fillStyle = color;

  for (let i = 0; i < GENERATION_CONFIG.SPLATTER_DOTS; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * radius;
    const dotSize = Math.random() * 4 + 1;

    ctx.fillRect(
      x + Math.cos(angle) * dist,
      y + Math.sin(angle) * dist,
      dotSize,
      dotSize
    );
  }
};

/**
 * Draws LCD grid overlay
 */
export const drawLCDGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  ctx.fillStyle = "rgba(10, 20, 0, 0.4)";

  // Horizontal lines
  for (let y = 0; y < height; y += 3) {
    ctx.fillRect(0, y, width, 1);
  }

  // Vertical lines
  for (let x = 0; x < width; x += 3) {
    ctx.fillRect(x, 0, 1, height);
  }
};

/**
 * Draws parental advisory badge
 */
export const drawPixelAdvisory = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  const x = width - 60;
  const y = height - 40;

  // White border
  ctx.fillStyle = COLORS.WHITE;
  ctx.fillRect(x, y, 50, 30);

  // Black background
  ctx.fillStyle = COLORS.BLACK;
  ctx.fillRect(x + 2, y + 2, 46, 26);

  // "E" label
  ctx.fillStyle = COLORS.WHITE;
  ctx.font = `8px ${CANVAS_CONFIG.FONT_FAMILY}`;
  ctx.fillText("E", x + 25, y + 18);
};

/**
 * Draws a single slash with random variations
 */
const drawSlash = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  ctx.beginPath();
  const startX = Math.random() * width;
  const startY = Math.random() * height;
  const length = Math.random() * 300 + 100;
  const angle = -Math.PI / 4 + (Math.random() - 0.5);

  ctx.moveTo(startX, startY);

  for (let j = 0; j < GENERATION_CONFIG.SLASH_SEGMENTS; j++) {
    const progress = j / GENERATION_CONFIG.SLASH_SEGMENTS;
    ctx.lineWidth = (Math.random() * 30 + 5) * (1 - progress);
    const x = startX + Math.cos(angle) * (length * progress);
    const y = startY + Math.sin(angle) * (length * progress);

    if (Math.random() > 0.3) {
      ctx.lineTo(x + (Math.random() * 10 - 5), y + (Math.random() * 10 - 5));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }

  ctx.strokeStyle = Math.random() > 0.8 ? COLORS.WHITE : COLORS.ACID;
  ctx.stroke();

  if (ctx.strokeStyle) {
    drawSplatterDots(ctx, startX, startY, 50, ctx.strokeStyle as string);
  }
};

/**
 * Draws decorative pixel blocks
 */
const drawPixelBlocks = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  for (let k = 0; k < GENERATION_CONFIG.BLOCK_COUNT; k++) {
    ctx.fillStyle = Math.random() > 0.5 ? COLORS.ACID : COLORS.BLACK;
    const blockSize = Math.floor(Math.random() * 40 + 10);
    const bx = Math.floor((Math.random() * width) / 10) * 10;
    const by = Math.floor((Math.random() * height) / 10) * 10;

    ctx.fillRect(bx, by, blockSize, blockSize);
    ctx.fillRect(bx + 10, by + 10, blockSize, blockSize);

    ctx.strokeStyle = COLORS.ACID;
    ctx.strokeRect(bx - 5, by - 5, blockSize + 10, blockSize + 10);
  }
};

/**
 * Generates the acid background with slashes and blocks
 */
export const generateAcidBackground = (
  { ctx, width, height }: CanvasDrawingContext,
  chaosLevel: number
): ImageData => {
  // Clear with black background
  ctx.fillStyle = COLORS.BLACK;
  ctx.fillRect(0, 0, width, height);

  // Draw slashes
  ctx.lineWidth = 1;
  for (let i = 0; i < chaosLevel; i++) {
    drawSlash(ctx, width, height);
  }

  // Draw pixel blocks
  drawPixelBlocks(ctx, width, height);

  // Return the background as ImageData
  return ctx.getImageData(0, 0, width, height);
};

/**
 * Draws the main text with shadows and outlines
 */
export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  position: Position
): void => {
  const word = text.toUpperCase();
  ctx.font = `${CANVAS_CONFIG.FONT_SIZE}px ${CANVAS_CONFIG.FONT_FAMILY}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Shadow
  ctx.fillStyle = COLORS.BLACK;
  ctx.fillText(word, position.x + 4, position.y + 4);

  // Outline
  ctx.strokeStyle = COLORS.ACID;
  ctx.lineWidth = 2;
  ctx.strokeText(word, position.x, position.y);

  // Main text
  ctx.fillStyle = COLORS.WHITE;
  ctx.fillText(word, position.x, position.y);
};

/**
 * Draws the complete composition (background + text + overlays)
 */
export const drawComposition = (
  { ctx, width, height }: CanvasDrawingContext,
  bgImageData: ImageData,
  text: string,
  textPosition: Position
): void => {
  // Restore background
  ctx.putImageData(bgImageData, 0, 0);

  // Draw text
  drawText(ctx, text, textPosition);

  // Draw overlays
  drawLCDGrid(ctx, width, height);
  drawPixelAdvisory(ctx, width, height);
};
