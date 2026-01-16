import React from 'react';
import { CanvasPreview } from './CanvasPreview';

interface AlbumCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
}

export const AlbumCanvas: React.FC<AlbumCanvasProps> = ({
  canvasRef,
  isDragging,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}) => {
  return (
    <div className="flex-1 bg-[#000] p-6 flex items-center justify-center relative">
      <div className="relative group shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        <CanvasPreview
          canvasRef={canvasRef}
          isDragging={isDragging}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
        <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-white/10 transition-colors" />
      </div>
    </div>
  );
};
