import React from "react";
import { XPWindow } from "../../components/os/XPWindow";
import { StatusBar } from "../../components/ui/status-bar";
import { useAlbumCover, useCanvasDrawing, useTextDragging } from "./hooks";
import { CanvasPreview } from "./components/CanvasPreview";
import { TextControls } from "./components/TextControls";
import { ChaosSlider } from "./components/ChaosSlider";
import { ActionButtons } from "./components/ActionButtons";
import type { AlbumCoverGeneratorProps } from "./types";

export const AlbumCoverGenerator: React.FC<AlbumCoverGeneratorProps> = ({
  onClose,
  onMinimize,
}) => {
  const {
    customText,
    setCustomText,
    chaosLevel,
    setChaosLevel,
    textPos,
    setTextPos,
    randomizeText,
    downloadArt,
  } = useAlbumCover();

  const { canvasRef, generateBackground } = useCanvasDrawing(
    customText,
    textPos,
    chaosLevel
  );

  const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } =
    useTextDragging(canvasRef, customText, textPos, setTextPos);

  return (
    <XPWindow
      title="GAMEBOY_ACID_GEN.exe"
      initialPosition={{ x: 300, y: 50 }}
      width="w-[530px]"
      onClose={onClose}
      onMinimize={onMinimize}
      icon="/paint.png"
    >
      <div
        className="flex flex-col bg-[#111]"
        style={{ fontFamily: '"Share Tech Mono", monospace' }}
      >
        <CanvasPreview
          canvasRef={canvasRef}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />

        <div className="grid grid-cols-2 gap-4 p-4 bg-[#1a1a1a] border-t border-[#333]">
          <TextControls
            customText={customText}
            onTextChange={setCustomText}
            onRandomize={randomizeText}
          />
          <ChaosSlider value={chaosLevel} onChange={setChaosLevel} />
        </div>

        <ActionButtons
          onGenerate={generateBackground}
          onDownload={() => downloadArt(canvasRef)}
        />
      </div>

      <StatusBar>Ready</StatusBar>
    </XPWindow>
  );
};
