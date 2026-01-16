import { type EffectParams } from '../../../types/canvas.types';

export const applyCircularPattern = ({
  ctx,
  width,
  height,
  colors,
  intensity,
}: EffectParams): void => {
  if (intensity <= 0 || !colors) return;

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = colors.primary;

  const circleCount = 5 + Math.floor(intensity / 10);
  const centerX = width / 2;
  const centerY = height / 2;

  for (let i = 0; i < circleCount; i++) {
    const radius = Math.random() * width * 0.8;
    const opacity = (Math.random() * intensity) / 200;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = Math.random() * 5 + 1;
    ctx.globalAlpha = opacity;
    ctx.stroke();

    if (intensity > 50) {
      for (let j = 0; j < 20; j++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = Math.random() * (intensity / 10);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.restore();
};
