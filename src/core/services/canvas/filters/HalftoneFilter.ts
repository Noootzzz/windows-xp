import type { FilterParams } from '../../../types/canvas.types';
import { getBrightness } from '../utils/colorUtils';

export const applyHalftone = ({
  ctx,
  img,
  width,
  height,
  colors,
  intensity,
}: FilterParams): void => {
  const size = Math.floor(5 + (100 - intensity) / 10);
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const octx = offscreen.getContext('2d')!;
  octx.drawImage(img, 0, 0, width, height);
  const data = octx.getImageData(0, 0, width, height).data;

  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = colors.primary;

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      const idx = (y * width + x) * 4;
      const brightness = getBrightness(data[idx], data[idx + 1], data[idx + 2]);
      const radius = (size / 2) * brightness * (intensity / 50);

      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};
