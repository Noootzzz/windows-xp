import {
  type ColorPreset,
  type FilterType,
  type Position,
  type CanvasDrawingContext,
} from '../../types/canvas.types';
import { FilterService } from './filters/FilterService';
import { applyGrain } from './effects/GrainEffect';
import { applyCircularPattern } from './effects/CircularPatternEffect';
import {
  applyTextOverlay,
} from './effects/TextOverlayEffect';
import { loadImage } from './utils/imageLoader';

export interface CompositionParams {
  context: CanvasDrawingContext;
  imageUrl: string;
  filterType: FilterType;
  colors: ColorPreset;
  filterIntensity: number;
  grainIntensity: number;
  circularIntensity: number;
  text: string;
  textPosition: Position;
  fontSize: number;
  fontFamily: string;
}

export class CanvasService {
  private filterService: FilterService;

  constructor() {
    this.filterService = new FilterService();
  }

  async generateComposition(params: CompositionParams): Promise<void> {
    const {
      context,
      imageUrl,
      filterType,
      colors,
      filterIntensity,
      grainIntensity,
      circularIntensity,
      text,
      textPosition,
      fontSize,
      fontFamily,
    } = params;

    const { ctx, width, height } = context;

    const img = await loadImage(imageUrl);

    this.filterService.applyFilter(
      { ctx, img, width, height, colors, intensity: filterIntensity },
      filterType
    );

    applyCircularPattern({
      ctx,
      width,
      height,
      colors,
      intensity: circularIntensity,
    });

    applyGrain({ ctx, width, height, intensity: grainIntensity });

    applyTextOverlay({
      ctx,
      text,
      position: textPosition,
      colors,
      fontSize,
      fontFamily,
    });
  }

  async loadImage(url: string): Promise<HTMLImageElement> {
    return loadImage(url);
  }
}

export const canvasService = new CanvasService();
