import type { FilterParams } from '../../../types/canvas.types';

export const applyLiquify = ({
  ctx,
  img,
  width,
  height,
  intensity,
}: FilterParams): void => {
  const factor = intensity / 20;
  ctx.clearRect(0, 0, width, height);

  for (let y = 0; y < height; y += 1) {
    const xOffset = Math.sin(y / 20 + intensity / 10) * factor;
    ctx.drawImage(img, 0, y, width, 1, xOffset, y, width, 1);
  }
};
