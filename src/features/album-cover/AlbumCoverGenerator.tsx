import React from "react";
import { XPWindow } from "../../components/os/XPWindow";
import { StatusBar } from "../../components/ui/status-bar";
import { useAlbumCover, useTextDragging } from "./hooks";
import { CanvasPreview } from "./components/CanvasPreview";
import { TextControls } from "./components/TextControls";
import { ActionButtons } from "./components/ActionButtons";
import { SourceSelector } from "./components/SourceSelector";
import { FilterSelector } from "./components/FilterSelector";
import type { AlbumCoverGeneratorProps } from "./types";

export const AlbumCoverGenerator: React.FC<AlbumCoverGeneratorProps> = ({
  onClose,
  onMinimize,
}) => {
  const {
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
  } = useAlbumCover();

  const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } =
    useTextDragging(canvasRef, textPos, setTextPos);

  return (
    <XPWindow
      title="HARLEM_COVER_GEN.exe"
      initialPosition={{ x: 150, y: 20 }}
      width="w-[820px]"
      onClose={onClose}
      onMinimize={onMinimize}
      icon="/paint.png"
    >
      <div
        className="flex flex-col bg-[#080808] text-white"
        style={{ fontFamily: '"Share Tech Mono", monospace' }}
      >
        <div className="flex relative overflow-hidden">
          {/* Main Preview Area */}
          <div className="flex-1 bg-[#000] p-6 flex items-center justify-center relative">
            <div className="relative group shadow-[0_0_80px_rgba(0,0,0,0.8)]">
               <CanvasPreview
                canvasRef={canvasRef}
                isDragging={isDragging}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              />
              <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-white/10 transition-colors" />
            </div>
          </div>

          {/* Right Sidebar - Glassmorphism */}
          <div className="w-80 bg-[rgba(26,26,26,0.7)] backdrop-blur-md p-7 flex flex-col gap-10 overflow-y-auto h-[550px] border-l border-white/5 scrollbar-hide">
            <div className="flex flex-col gap-4">
              <SourceSelector
                activeImage={activeImage}
                onImageChange={setActiveImage}
              />
            </div>

            <div className="flex flex-col gap-4">
              <FilterSelector
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                activeColors={activeColors}
                onColorsChange={setActiveColors}
              />
            </div>

            <div className="space-y-8 pt-4 border-t border-white/5">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] text-white/40 uppercase tracking-[2.5px] font-black">
                    Intensité Effet
                  </label>
                  <span className="text-[11px] text-[#ccff00] font-bold">{intensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#333] rounded-sm outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#ccff00] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(204,255,0,0.5)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-[#ccff00] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] text-white/40 uppercase tracking-[2.5px] font-black">
                    Texture Grain
                  </label>
                  <span className="text-[11px] text-[#ccff00] font-bold">{grainIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={grainIntensity}
                  onChange={(e) => setGrainIntensity(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#333] rounded-sm outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#ccff00] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(204,255,0,0.5)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-[#ccff00] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] text-white/40 uppercase tracking-[2.5px] font-black">
                    Motifs Cercles
                  </label>
                  <span className="text-[11px] text-[#ccff00] font-bold">{circularIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={circularIntensity}
                  onChange={(e) => setCircularIntensity(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#333] rounded-sm outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#ccff00] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(204,255,0,0.5)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-[#ccff00] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#111] border-t border-white/5 flex items-center justify-between gap-6">
          <div className="flex-1">
            <TextControls
              customText={customText}
              onTextChange={setCustomText}
              onRandomize={() => setCustomText("HARLEM")}
            />
          </div>

          <ActionButtons
            onGenerate={randomizeAll}
            onDownload={downloadArt}
          />
        </div>
      </div>

      <StatusBar className="bg-[#050505] text-white/30 border-t border-white/5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            ENGINE: ACTIVE
          </span>
          <span className="opacity-50">|</span>
          <span>FILTER: {activeFilter.toUpperCase()}</span>
          <span className="opacity-50">|</span>
          <span>COLORS: {activeColors.name.toUpperCase()}</span>
        </div>
      </StatusBar>
    </XPWindow>
  );
};
