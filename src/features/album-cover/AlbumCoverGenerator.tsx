import React, { useCallback } from 'react';
import { XPWindow } from '../../components/os/XPWindow';
import { StatusBar } from '../../components/ui/status-bar';
import { AlbumCanvas } from './components/AlbumCanvas';
import { ControlPanel } from './components/ControlPanel';
import { TextControls } from './components/TextControls';
import { ActionButtons } from './components/ActionButtons';
import {
  useAlbumCover,
  useTextDragging,
} from './hooks';
import { useCanvasDrawing   } from './hooks/useCanvasDrawing';
import type { AlbumCoverGeneratorProps } from './types';

export const AlbumCoverGenerator: React.FC<AlbumCoverGeneratorProps> = ({
  onClose,
  onMinimize,
}) => {
  const state = useAlbumCover();
  const { canvasRef } = useCanvasDrawing({
    activeImage: state.activeImage,
    activeFilter: state.activeFilter,
    activeColors: state.activeColors,
    intensity: state.intensity,
    grainIntensity: state.grainIntensity,
    circularIntensity: state.circularIntensity,
    customText: state.customText,
    textPos: state.textPos,
  });

  const dragging = useTextDragging(canvasRef, state.textPos, state.setTextPos);

  const downloadArt = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `travis_cover_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, [canvasRef]);

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
          <AlbumCanvas
            canvasRef={canvasRef}
            isDragging={dragging.isDragging}
            onMouseDown={dragging.handleMouseDown}
            onMouseMove={dragging.handleMouseMove}
            onMouseUp={dragging.handleMouseUp}
          />

          <ControlPanel
            activeImage={state.activeImage}
            activeFilter={state.activeFilter}
            activeColors={state.activeColors}
            intensity={state.intensity}
            grainIntensity={state.grainIntensity}
            circularIntensity={state.circularIntensity}
            onImageChange={state.setActiveImage}
            onFilterChange={state.setActiveFilter}
            onColorsChange={state.setActiveColors}
            onIntensityChange={state.setIntensity}
            onGrainChange={state.setGrainIntensity}
            onCircularChange={state.setCircularIntensity}
          />
        </div>

        <div className="px-6 py-4 bg-[#111] border-t border-white/5 flex items-center justify-between gap-6">
          <div className="flex-1">
            <TextControls
              customText={state.customText}
              onTextChange={state.setCustomText}
              onRandomize={() => state.setCustomText('HARLEM')}
            />
          </div>

          <ActionButtons
            onGenerate={state.randomizeAll}
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
          <span>FILTER: {state.activeFilter.toUpperCase()}</span>
          <span className="opacity-50">|</span>
          <span>COLORS: {state.activeColors.name.toUpperCase()}</span>
        </div>
      </StatusBar>
    </XPWindow>
  );
};
