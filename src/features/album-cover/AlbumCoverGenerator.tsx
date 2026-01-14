import React from "react";
import { MousePointer2, PenTool, Square } from "lucide-react";
import { XPWindow } from "../../components/os/XPWindow";
import { CanvasArea } from "../../components/ui/canvas-area";
import { Toolbar, ToolbarButton } from "../../components/ui/toolbar";
import { StatusBar } from "../../components/ui/status-bar";

interface AlbumCoverGeneratorProps {
  onClose: () => void;
  onMinimize: () => void;
}

export const AlbumCoverGenerator = ({
  onClose,
  onMinimize,
}: AlbumCoverGeneratorProps) => {
  return (
    <XPWindow
      title="Album Cover Generator"
      initialPosition={{ x: 400, y: 50 }}
      width="w-[800px]"
      onClose={onClose}
      onMinimize={onMinimize}
      icon="/paint.png"
    >
      <div className="flex h-[600px] bg-[#1a1a1a]">
        <CanvasArea
          placeholder={
            <div className="flex flex-col items-center text-[#444]">
              <div className="w-16 h-16 border-2 border-[#333] rounded-none mb-2 bg-[#111]"></div>
              <span className="text-[#666]">Landscape Placeholder</span>
            </div>
          }
        />

        <Toolbar position="right">
          <ToolbarButton icon={<MousePointer2 size={16} />} title="Select" active />
          <ToolbarButton icon={<PenTool size={16} />} title="Pen" />
          <ToolbarButton icon={<Square size={16} />} title="Shape" />
        </Toolbar>
      </div>

      <StatusBar>Ready</StatusBar>
    </XPWindow>
  );
};
