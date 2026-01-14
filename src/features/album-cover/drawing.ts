import { CANVAS_CONFIG } from "./constants";
import type { CanvasDrawingContext, Position } from "./types";
import type { FilterType, ColorPreset } from "./presets/types";

const getBrightness = (r: number, g: number, b: number): number => {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = url;
  });
};

export const drawGrain = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number
): void => {
  if (intensity <= 0) return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const factor = intensity / 100;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 255 * factor;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }

  ctx.putImageData(imageData, 0, 0);
};

export const drawCircularPatterns = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: ColorPreset,
  intensity: number
): void => {
  if (intensity <= 0) return;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
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
const applyWaveLines = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  colors: ColorPreset,
  intensity: number
): void => {
  const offscreen = document.createElement("canvas");
  offscreen.width = 100;
  offscreen.height = 100;
  const octx = offscreen.getContext("2d")!;
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

const applyThermal = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  colors: ColorPreset,
  _intensity: number
): void => {
  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = getBrightness(data[i], data[i+1], data[i+2]);
    
    if (brightness < 0.3) {
      data[i] = parseInt(colors.background.slice(1,3), 16);
      data[i+1] = parseInt(colors.background.slice(3,5), 16);
      data[i+2] = parseInt(colors.background.slice(5,7), 16);
    } else if (brightness < 0.7) {
      data[i] = parseInt(colors.secondary.slice(1,3), 16);
      data[i+1] = parseInt(colors.secondary.slice(3,5), 16);
      data[i+2] = parseInt(colors.secondary.slice(5,7), 16);
    } else {
      data[i] = parseInt(colors.primary.slice(1,3), 16);
      data[i+1] = parseInt(colors.primary.slice(3,5), 16);
      data[i+2] = parseInt(colors.primary.slice(5,7), 16);
    }
  }

  ctx.putImageData(imageData, 0, 0);
};


const applyGlitch = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  _colors: ColorPreset,
  intensity: number
): void => {
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

const applyHalftone = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  colors: ColorPreset,
  intensity: number
): void => {
  const size = Math.floor(5 + (100 - intensity) / 10);
  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const octx = offscreen.getContext("2d")!;
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

const applyVHS = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  _colors: ColorPreset,
  intensity: number
): void => {
  const shift = (intensity / 100) * 10;
  
  ctx.clearRect(0, 0, width, height);
  
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.8;
  ctx.drawImage(img, shift, 0, width, height);
  
  ctx.drawImage(img, 0, 0, width, height);
  
  ctx.drawImage(img, -shift, 0, width, height);
  
  ctx.globalAlpha = 1.0;
  ctx.globalCompositeOperation = "source-over";

  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 1);
  }

  if (intensity > 50) {
    const jitter = Math.random() * (intensity / 20);
    ctx.drawImage(ctx.canvas, 0, 0, width, height, 0, jitter, width, height);
  }
};

const applyNeon = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  colors: ColorPreset,
  intensity: number
): void => {
  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const output = ctx.createImageData(width, height);
  const outData = output.data;

  const threshold = (100 - intensity) / 200;

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

      const diff = Math.abs(b - bL) + Math.abs(b - bR) + Math.abs(b - bT) + Math.abs(b - bB);

      if (diff > threshold) {
        outData[idx] = parseInt(colors.primary.slice(1,3), 16);
        outData[idx + 1] = parseInt(colors.primary.slice(3,5), 16);
        outData[idx + 2] = parseInt(colors.primary.slice(5,7), 16);
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
  
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.3;
  ctx.filter = "blur(4px)";
  ctx.drawImage(ctx.canvas, 0, 0);
  ctx.filter = "none";
  ctx.globalAlpha = 1.0;
  ctx.globalCompositeOperation = "source-over";
};

const applyLiquify = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  _colors: ColorPreset,
  intensity: number
): void => {
  const factor = intensity / 20;
  ctx.clearRect(0, 0, width, height);
  
  for (let y = 0; y < height; y += 1) {
    const xOffset = Math.sin(y / 20 + intensity / 10) * factor;
    ctx.drawImage(img, 0, y, width, 1, xOffset, y, width, 1);
  }
};

export const applyFilter = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  filterType: FilterType,
  colors: ColorPreset,
  intensity: number
): void => {
  switch (filterType) {
    case "wavelines":
      applyWaveLines(ctx, img, width, height, colors, intensity);
      break;
    case "thermal":
      applyThermal(ctx, img, width, height, colors, intensity);
      break;
    case "glitch":
      applyGlitch(ctx, img, width, height, colors, intensity);
      break;
    case "halftone":
      applyHalftone(ctx, img, width, height, colors, intensity);
      break;
    case "vhs":
      applyVHS(ctx, img, width, height, colors, intensity);
      break;
    case "neon":
      applyNeon(ctx, img, width, height, colors, intensity);
      break;
    case "liquify":
      applyLiquify(ctx, img, width, height, colors, intensity);
      break;
    default:
      ctx.drawImage(img, 0, 0, width, height);
  }
};

export const generateImageComposition = (
  { ctx, width, height }: CanvasDrawingContext,
  img: HTMLImageElement,
  filterType: FilterType,
  colors: ColorPreset,
  intensity: number,
  grainIntensity: number,
  circularIntensity: number,
  text: string,
  textPosition: Position
): void => {
  applyFilter(ctx, img, width, height, filterType, colors, intensity);

  drawCircularPatterns(ctx, width, height, colors, circularIntensity);

  drawGrain(ctx, width, height, grainIntensity);

  const word = text.toUpperCase();
  ctx.font = `bold ${CANVAS_CONFIG.FONT_SIZE}px ${CANVAS_CONFIG.FONT_FAMILY}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.shadowBlur = 15;
  ctx.shadowColor = colors.primary;
  ctx.fillStyle = colors.primary;
  ctx.fillText(word, textPosition.x, textPosition.y);

  ctx.shadowBlur = 0;
  ctx.strokeStyle = colors.background;
  ctx.lineWidth = 4;
  ctx.strokeText(word, textPosition.x, textPosition.y);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(word, textPosition.x, textPosition.y);
};
