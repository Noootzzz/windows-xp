import React from 'react';
import { Slider } from '../../../shared/components/ui/Slider';

interface IntensitySlidersProps {
  intensity: number;
  grainIntensity: number;
  circularIntensity: number;
  onIntensityChange: (value: number) => void;
  onGrainChange: (value: number) => void;
  onCircularChange: (value: number) => void;
}

export const IntensitySliders: React.FC<IntensitySlidersProps> = ({
  intensity,
  grainIntensity,
  circularIntensity,
  onIntensityChange,
  onGrainChange,
  onCircularChange,
}) => {
  return (
    <div className="space-y-8 pt-4 border-t border-white/5">
      <Slider
        label="Intensité Effet"
        value={intensity}
        onChange={onIntensityChange}
      />
      <Slider
        label="Texture Grain"
        value={grainIntensity}
        onChange={onGrainChange}
      />
      <Slider
        label="Motifs Cercles"
        value={circularIntensity}
        onChange={onCircularChange}
      />
    </div>
  );
};
