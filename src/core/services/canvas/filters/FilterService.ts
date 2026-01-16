import { type FilterParams, type FilterType } from '../../../types/canvas.types';
import { applyWaveLines } from './WaveLinesFilter';
import { applyThermal } from './ThermalFilter';
import { applyGlitch } from './GlitchFilter';
import { applyHalftone } from './HalftoneFilter';
import { applyVHS } from './VHSFilter';
import { applyNeon } from './NeonFilter';
import { applyLiquify } from './LiquifyFilter';

export class FilterService {
  applyFilter(params: FilterParams, filterType: FilterType): void {
    switch (filterType) {
      case 'wavelines':
        applyWaveLines(params);
        break;
      case 'thermal':
        applyThermal(params);
        break;
      case 'glitch':
        applyGlitch(params);
        break;
      case 'halftone':
        applyHalftone(params);
        break;
      case 'vhs':
        applyVHS(params);
        break;
      case 'neon':
        applyNeon(params);
        break;
      case 'liquify':
        applyLiquify(params);
        break;
      default:
        params.ctx.drawImage(params.img, 0, 0, params.width, params.height);
    }
  }
}

export const filterService = new FilterService();
