import { useRef, useCallback, useEffect } from 'react';
import { canvasService } from '../../../core/services/canvas/CanvasService';
import { CANVAS_CONFIG } from '../constants';
import type { Position } from '../types';
import type { FilterType, ColorPreset, SourceImage } from '../presets/types';

interface UseCanvasDrawingProps {
  activeImage: SourceImage;
  activeFilter: FilterType;
  activeColors: ColorPreset;
  intensity: number;
  grainIntensity: number;
  circularIntensity: number;
  customText: string;
  textPos: Position;
}

export const useCanvasDrawing = ({
  activeImage,
  activeFilter,
  activeColors,
  intensity,
  grainIntensity,
  circularIntensity,
  customText,
  textPos,
}: UseCanvasDrawingProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imageCacheRef.current.get(activeImage.path);
    if (!img) {
      try {
        img = await canvasService.loadImage(activeImage.path);
        imageCacheRef.current.set(activeImage.path, img);
      } catch (err) {
        console.error('Failed to load image:', err);
        return;
      }
    }

    await canvasService.generateComposition({
      context: { ctx, width: canvas.width, height: canvas.height },
      imageUrl: activeImage.path,
      filterType: activeFilter,
      colors: activeColors,
      filterIntensity: intensity,
      grainIntensity,
      circularIntensity,
      text: customText,
      textPosition: textPos,
      fontSize: CANVAS_CONFIG.FONT_SIZE,
      fontFamily: CANVAS_CONFIG.FONT_FAMILY,
    });
  }, [
    activeImage,
    activeFilter,
    activeColors,
    intensity,
    grainIntensity,
    circularIntensity,
    customText,
    textPos,
  ]);

  useEffect(() => {
    draw();
  }, [draw]);

  return { canvasRef, draw };
};
