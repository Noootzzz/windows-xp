import React from "react";
import { CANVAS_CONFIG } from "../constants";

interface CanvasPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
}

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  canvasRef,
  isDragging,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}) => {
  return (
    <div className="relative flex items-center justify-center bg-[#0a0a0a] p-4">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />

      {/* Canvas container */}
      <div className="relative z-10 p-1 bg-[#222] border-t border-l border-[#444] border-b border-r border-[#000] shadow-2xl w-full">
        <canvas
          ref={canvasRef}
          width={CANVAS_CONFIG.WIDTH}
          height={CANVAS_CONFIG.HEIGHT}
          className="w-full h-auto block bg-[#0f380f]"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            imageRendering: "pixelated",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        />
      </div>
    </div>
  );
};
