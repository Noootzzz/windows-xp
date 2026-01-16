import type { FilterParams } from '../../../types/canvas.types';

export const applyVHS = ({
  ctx,
  img,
  width,
  height,
  intensity,
}: FilterParams): void => {
  const shift = (intensity / 100) * 10;

  ctx.clearRect(0, 0, width, height);

  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = 0.8;
  ctx.drawImage(img, shift, 0, width, height);

  ctx.drawImage(img, 0, 0, width, height);

  ctx.drawImage(img, -shift, 0, width, height);

  ctx.globalAlpha = 1.0;
  ctx.globalCompositeOperation = 'source-over';

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 1);
  }

  if (intensity > 50) {
    const jitter = Math.random() * (intensity / 20);
    ctx.drawImage(ctx.canvas, 0, 0, width, height, 0, jitter, width, height);
  }
};
