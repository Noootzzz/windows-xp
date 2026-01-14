import { useRef, useState, useCallback, useEffect } from "react";
import { CANVAS_CONFIG, DEFAULT_WORDS, GENERATION_CONFIG } from "./constants";
import { generateAcidBackground, drawComposition } from "./drawing";
import type { Position } from "./types";

/**
 * Hook to manage canvas drawing operations
 */
export const useCanvasDrawing = (
  customText: string,
  textPos: Position,
  chaosLevel: number
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgImageDataRef = useRef<ImageData | null>(null);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    return {
      ctx,
      width: canvas.width,
      height: canvas.height,
    };
  }, []);

  const draw = useCallback(() => {
    const context = getCanvasContext();
    if (!context || !bgImageDataRef.current) return;

    drawComposition(context, bgImageDataRef.current, customText, textPos);
  }, [customText, textPos, getCanvasContext]);

  const generateBackground = useCallback(() => {
    const context = getCanvasContext();
    if (!context) return;

    bgImageDataRef.current = generateAcidBackground(context, chaosLevel);
    draw();
  }, [chaosLevel, draw, getCanvasContext]);

  useEffect(() => {
    generateBackground();
  }, [chaosLevel, generateBackground]);

  useEffect(() => {
    draw();
  }, [customText, textPos, draw]);

  return {
    canvasRef,
    generateBackground,
    draw,
    getCanvasContext,
  };
};

/**
 * Hook to manage text dragging functionality
 */
export const useTextDragging = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  customText: string,
  textPos: Position,
  setTextPos: (pos: Position) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const getMousePosition = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): Position | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [canvasRef]
  );

  const getTextBounds = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.font = `${CANVAS_CONFIG.FONT_SIZE}px ${CANVAS_CONFIG.FONT_FAMILY}`;
    const metrics = ctx.measureText(customText.toUpperCase());
    const textWidth = metrics.width;
    const textHeight = CANVAS_CONFIG.FONT_SIZE;
    const padding = GENERATION_CONFIG.TEXT_PADDING;

    return {
      left: textPos.x - textWidth / 2 - padding,
      right: textPos.x + textWidth / 2 + padding,
      top: textPos.y - textHeight / 2 - padding,
      bottom: textPos.y + textHeight / 2 + padding,
    };
  }, [canvasRef, customText, textPos]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const mousePos = getMousePosition(e);
      const bounds = getTextBounds();

      if (!mousePos || !bounds) return;

      if (
        mousePos.x >= bounds.left &&
        mousePos.x <= bounds.right &&
        mousePos.y >= bounds.top &&
        mousePos.y <= bounds.bottom
      ) {
        setIsDragging(true);
        setDragOffset({
          x: mousePos.x - textPos.x,
          y: mousePos.y - textPos.y,
        });
      }
    },
    [getMousePosition, getTextBounds, textPos]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging) return;

      const mousePos = getMousePosition(e);
      if (!mousePos) return;

      setTextPos({
        x: mousePos.x - dragOffset.x,
        y: mousePos.y - dragOffset.y,
      });
    },
    [isDragging, getMousePosition, dragOffset, setTextPos]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

/**
 * Hook to manage album cover state and actions
 */
export const useAlbumCover = () => {
  const [customText, setCustomText] = useState("ACID");
  const [chaosLevel, setChaosLevel] = useState<number>(
    GENERATION_CONFIG.DEFAULT_CHAOS
  );
  const [textPos, setTextPos] = useState<Position>({ x: 300, y: 300 });

  const randomizeText = useCallback(() => {
    const randomWord =
      DEFAULT_WORDS[Math.floor(Math.random() * DEFAULT_WORDS.length)];
    setCustomText(randomWord);
  }, []);

  const downloadArt = useCallback(
    (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const link = document.createElement("a");
      link.download = `gameboy_acid_${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    },
    []
  );

  return {
    customText,
    setCustomText,
    chaosLevel,
    setChaosLevel,
    textPos,
    setTextPos,
    randomizeText,
    downloadArt,
  };
};
