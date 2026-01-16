import type { FilterParams } from '../../../types/canvas.types';

export const applyGlitch = ({
  ctx,
  img,
  width,
  height,
  intensity,
}: FilterParams): void => {
  ctx.drawImage(img, 0, 0, width, height);
  const glitchCount = Math.floor(intensity / 10) + 5;

  for (let i = 0; i < glitchCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const w = Math.random() * (width / 2);
    const h = Math.random() * 20;
    const sliceX = Math.random() * (width - w);
    const sliceY = y;

    ctx.drawImage(ctx.canvas, sliceX, sliceY, w, h, x, y, w, h);

    if (Math.random() > 0.5) {
      ctx.fillStyle = `rgba(255, 0, 255, 0.2)`;
      ctx.fillRect(x, y, w, h);
    }
  }
};
