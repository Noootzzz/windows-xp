import type { FilterParams } from '../../../types/canvas.types';
import { getBrightness } from '../utils/colorUtils';

export const applyWaveLines = ({
  ctx,
  img,
  width,
  height,
  colors,
  intensity,
}: FilterParams): void => {
  const offscreen = document.createElement('canvas');
  offscreen.width = 100;
  offscreen.height = 100;
  const octx = offscreen.getContext('2d')!;
  octx.drawImage(img, 0, 0, 100, 100);
  const data = octx.getImageData(0, 0, 100, 100).data;

  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = colors.primary;
  ctx.lineWidth = 2;

  const lineCount = 40 + Math.floor(intensity / 2);
  const stepY = height / lineCount;

  for (let y = 0; y < lineCount; y++) {
    ctx.beginPath();
    for (let x = 0; x < width; x += 2) {
      const imgX = Math.floor((x / width) * 100);
      const imgY = Math.floor((y / lineCount) * 100);
      const pixelIdx = (imgY * 100 + imgX) * 4;

      const brightness = getBrightness(
        data[pixelIdx],
        data[pixelIdx + 1],
        data[pixelIdx + 2]
      );

      const displacement = brightness * (20 + intensity * 0.5);
      const wave = Math.sin(x * 0.05 + y * 0.2) * 5;
      const posY = y * stepY + wave - displacement;

      if (x === 0) ctx.moveTo(x, posY);
      else ctx.lineTo(x, posY);
    }

    if (Math.random() > 0.9) ctx.strokeStyle = colors.secondary;
    else ctx.strokeStyle = colors.primary;

    ctx.stroke();
  }
};
