import type { FilterParams } from '../../../types/canvas.types';
import { getBrightness, hexToRgb } from '../utils/colorUtils';

export const applyThermal = ({
  ctx,
  img,
  width,
  height,
  colors,
}: FilterParams): void => {
  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const bgRgb = hexToRgb(colors.background);
  const secRgb = hexToRgb(colors.secondary);
  const primRgb = hexToRgb(colors.primary);

  for (let i = 0; i < data.length; i += 4) {
    const brightness = getBrightness(data[i], data[i + 1], data[i + 2]);

    if (brightness < 0.3) {
      data[i] = bgRgb.r;
      data[i + 1] = bgRgb.g;
      data[i + 2] = bgRgb.b;
    } else if (brightness < 0.7) {
      data[i] = secRgb.r;
      data[i + 1] = secRgb.g;
      data[i + 2] = secRgb.b;
    } else {
      data[i] = primRgb.r;
      data[i + 1] = primRgb.g;
      data[i + 2] = primRgb.b;
    }
  }

  ctx.putImageData(imageData, 0, 0);
};
