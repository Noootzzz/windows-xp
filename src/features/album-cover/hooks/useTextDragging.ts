import { useState, useCallback } from 'react';
import type { Position } from '../types';

export const useTextDragging = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  textPos: Position,
  setTextPos: (pos: Position) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);

      if (Math.abs(x - textPos.x) < 100 && Math.abs(y - textPos.y) < 50) {
        setIsDragging(true);
        setDragOffset({ x: x - textPos.x, y: y - textPos.y });
      }
    },
    [textPos, canvasRef]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
      const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);

      setTextPos({ x: x - dragOffset.x, y: y - dragOffset.y });
    },
    [isDragging, dragOffset, setTextPos, canvasRef]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  return { isDragging, handleMouseDown, handleMouseMove, handleMouseUp };
};
