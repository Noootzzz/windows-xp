import type { FilterParams } from '../../../types/canvas.types';
import { getBrightness, hexToRgb } from '../utils/colorUtils';

export const applyNeon = ({
  ctx,
  img,
  width,
  height,
  colors,
  intensity,
}: FilterParams): void => {
  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const output = ctx.createImageData(width, height);
  const outData = output.data;

  const threshold = (100 - intensity) / 200;
  const primRgb = hexToRgb(colors.primary);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;

      const left = (y * width + (x - 1)) * 4;
      const right = (y * width + (x + 1)) * 4;
      const top = ((y - 1) * width + x) * 4;
      const bottom = ((y + 1) * width + x) * 4;

      const b = getBrightness(data[idx], data[idx + 1], data[idx + 2]);
      const bL = getBrightness(data[left], data[left + 1], data[left + 2]);
      const bR = getBrightness(data[right], data[right + 1], data[right + 2]);
      const bT = getBrightness(data[top], data[top + 1], data[top + 2]);
      const bB = getBrightness(data[bottom], data[bottom + 1], data[bottom + 2]);

      const diff =
        Math.abs(b - bL) +
        Math.abs(b - bR) +
        Math.abs(b - bT) +
        Math.abs(b - bB);

      if (diff > threshold) {
        outData[idx] = primRgb.r;
        outData[idx + 1] = primRgb.g;
        outData[idx + 2] = primRgb.b;
        outData[idx + 3] = 255;
      } else {
        outData[idx] = 0;
        outData[idx + 1] = 0;
        outData[idx + 2] = 0;
        outData[idx + 3] = 255;
      }
    }
  }

  ctx.putImageData(output, 0, 0);

  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = 0.3;
  ctx.filter = 'blur(4px)';
  ctx.drawImage(ctx.canvas, 0, 0);
  ctx.filter = 'none';
  ctx.globalAlpha = 1.0;
  ctx.globalCompositeOperation = 'source-over';
};
