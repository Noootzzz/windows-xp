import { useState, useCallback } from 'react';
import {
  DEFAULT_SOURCE_IMAGE,
  DEFAULT_FILTER,
  DEFAULT_COLOR_PRESET,
  DEFAULT_INTENSITY,
  DEFAULT_GRAIN,
  DEFAULT_CIRCULAR,
  SOURCE_IMAGES,
  FILTERS,
  COLOR_PRESETS,
} from '../presets';
import type { Position } from '../types';
import type { FilterType, SourceImage, ColorPreset } from '../presets/types';

export const useAlbumCoverState = () => {
  const [customText, setCustomText] = useState('ASTROWORLD');
  const [textPos, setTextPos] = useState<Position>({ x: 300, y: 500 });
  const [activeImage, setActiveImage] = useState<SourceImage>(DEFAULT_SOURCE_IMAGE);
  const [activeFilter, setActiveFilter] = useState<FilterType>(DEFAULT_FILTER);
  const [activeColors, setActiveColors] = useState<ColorPreset>(DEFAULT_COLOR_PRESET);
  const [intensity, setIntensity] = useState<number>(DEFAULT_INTENSITY);
  const [grainIntensity, setGrainIntensity] = useState<number>(DEFAULT_GRAIN);
  const [circularIntensity, setCircularIntensity] = useState<number>(DEFAULT_CIRCULAR);

  const randomizeAll = useCallback(() => {
    const randomImage = SOURCE_IMAGES[Math.floor(Math.random() * SOURCE_IMAGES.length)];
    const filterIds = Object.keys(FILTERS) as FilterType[];
    const randomFilter = filterIds[Math.floor(Math.random() * filterIds.length)];
    const randomColors = COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)];

    setActiveImage(randomImage);
    setActiveFilter(randomFilter);
    setActiveColors(randomColors);
    setIntensity(Math.random() * 100);
    setGrainIntensity(Math.random() * 50);
    setCircularIntensity(Math.random() * 80);
  }, []);

  return {
    customText,
    setCustomText,
    textPos,
    setTextPos,
    activeImage,
    setActiveImage,
    activeFilter,
    setActiveFilter,
    activeColors,
    setActiveColors,
    intensity,
    setIntensity,
    grainIntensity,
    setGrainIntensity,
    circularIntensity,
    setCircularIntensity,
    randomizeAll,
  };
};
