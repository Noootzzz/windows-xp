import React from 'react';
import { sliderStyles } from '../../styles/tailwind/slider.styles';

export interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = '%',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div className={`${sliderStyles.container} ${className}`}>
      <div className={sliderStyles.labelContainer}>
        <label className={sliderStyles.label}>{label}</label>
        <span className={sliderStyles.value}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={sliderStyles.input}
      />
    </div>
  );
};
