import { useRef, useState, useCallback, useEffect } from "react";
import { 
  DEFAULT_SOURCE_IMAGE, 
  DEFAULT_FILTER, 
  DEFAULT_COLOR_PRESET, 
  DEFAULT_INTENSITY,
  DEFAULT_GRAIN,
  DEFAULT_CIRCULAR,
  SOURCE_IMAGES,
  FILTERS,
  COLOR_PRESETS
} from "./presets";
import { loadImage, generateImageComposition } from "./drawing";
import type { Position } from "./types";
import type { FilterType, SourceImage, ColorPreset } from "./presets/types";

export const useAlbumCover = () => {
  const [customText, setCustomText] = useState("ASTROWORLD");
  const [textPos, setTextPos] = useState<Position>({ x: 300, y: 500 });
  const [activeImage, setActiveImage] = useState<SourceImage>(DEFAULT_SOURCE_IMAGE);
  const [activeFilter, setActiveFilter] = useState<FilterType>(DEFAULT_FILTER);
  const [activeColors, setActiveColors] = useState<ColorPreset>(DEFAULT_COLOR_PRESET);
  const [intensity, setIntensity] = useState<number>(DEFAULT_INTENSITY);
  const [grainIntensity, setGrainIntensity] = useState<number>(DEFAULT_GRAIN);
  const [circularIntensity, setCircularIntensity] = useState<number>(DEFAULT_CIRCULAR);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imageCacheRef.current.get(activeImage.path);
    if (!img) {
      try {
        img = await loadImage(activeImage.path);
        imageCacheRef.current.set(activeImage.path, img);
      } catch (err) {
        console.error("Failed to load image:", err);
        return;
      }
    }

    generateImageComposition(
      { ctx, width: canvas.width, height: canvas.height },
      img,
      activeFilter,
      activeColors,
      intensity,
      grainIntensity,
      circularIntensity,
      customText,
      textPos
    );
  }, [activeImage, activeFilter, activeColors, intensity, grainIntensity, circularIntensity, customText, textPos]);

  useEffect(() => {
    draw();
  }, [draw]);

  const downloadArt = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `travis_cover_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, []);

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
    canvasRef,
    downloadArt,
    randomizeAll,
    draw
  };
};

export const useTextDragging = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  textPos: Position,
  setTextPos: (pos: Position) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    if (Math.abs(x - textPos.x) < 100 && Math.abs(y - textPos.y) < 50) {
      setIsDragging(true);
      setDragOffset({ x: x - textPos.x, y: y - textPos.y });
    }
  }, [textPos, canvasRef]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
    const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);

    setTextPos({ x: x - dragOffset.x, y: y - dragOffset.y });
  }, [isDragging, dragOffset, setTextPos, canvasRef]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  return { isDragging, handleMouseDown, handleMouseMove, handleMouseUp };
};
