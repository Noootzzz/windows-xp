import React from 'react';
import { SourceSelector } from './SourceSelector';
import { FilterSelector } from './FilterSelector';
import { IntensitySliders } from './IntensitySliders';
import type { SourceImage, FilterType, ColorPreset } from '../presets/types';

interface ControlPanelProps {
  activeImage: SourceImage;
  activeFilter: FilterType;
  activeColors: ColorPreset;
  intensity: number;
  grainIntensity: number;
  circularIntensity: number;
  onImageChange: (image: SourceImage) => void;
  onFilterChange: (filter: FilterType) => void;
  onColorsChange: (colors: ColorPreset) => void;
  onIntensityChange: (value: number) => void;
  onGrainChange: (value: number) => void;
  onCircularChange: (value: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  activeImage,
  activeFilter,
  activeColors,
  intensity,
  grainIntensity,
  circularIntensity,
  onImageChange,
  onFilterChange,
  onColorsChange,
  onIntensityChange,
  onGrainChange,
  onCircularChange,
}) => {
  return (
    <div className="w-80 bg-[rgba(26,26,26,0.7)] backdrop-blur-md p-7 flex flex-col gap-10 overflow-y-auto h-[550px] border-l border-white/5 scrollbar-hide">
      <div className="flex flex-col gap-4">
        <SourceSelector
          activeImage={activeImage}
          onImageChange={onImageChange}
        />
      </div>

      <div className="flex flex-col gap-4">
        <FilterSelector
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          activeColors={activeColors}
          onColorsChange={onColorsChange}
        />
      </div>

      <IntensitySliders
        intensity={intensity}
        grainIntensity={grainIntensity}
        circularIntensity={circularIntensity}
        onIntensityChange={onIntensityChange}
        onGrainChange={onGrainChange}
        onCircularChange={onCircularChange}
      />
    </div>
  );
};
