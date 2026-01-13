import React from "react";
import { MousePointer2, PenTool, Square } from "lucide-react";
import { XPWindow } from "../os/XPWindow";

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
        {/* Main Canvas Area */}
        <div className="flex-1 bg-[#111] border-2 border-inset border-[#333] overflow-auto relative p-4 flex flex-col">
          <div className="flex-1 bg-black border border-dashed border-[#555] flex items-center justify-center">
            <div className="flex flex-col items-center text-[#444]">
              <div className="w-16 h-16 border-2 border-[#333] rounded-none mb-2 bg-[#111]"></div>
              <span className="text-[#666]">Landscape Placeholder</span>
            </div>
          </div>

          {/* Scrollbars (Visual Only) */}
          <div className="absolute right-0 top-0 bottom-4 w-4 bg-[#252525] border-l border-[#333] flex flex-col items-center py-1">
            <div className="w-3 h-3 bg-[#333] border border-[#555] mb-auto text-[8px] flex items-center justify-center shadow-sm text-[#ccff00]">
              ▲
            </div>
            <div className="w-3 h-8 bg-[#444] border border-[#555] rounded-[1px] shadow-sm"></div>
            <div className="w-3 h-3 bg-[#333] border border-[#555] mt-auto text-[8px] flex items-center justify-center shadow-sm text-[#ccff00]">
              ▼
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-4 h-4 bg-[#252525] border-t border-[#333] flex items-center px-1">
            <div className="w-3 h-3 bg-[#333] border border-[#555] mr-auto text-[8px] flex items-center justify-center shadow-sm text-[#ccff00]">
              ◄
            </div>
            <div className="w-8 h-3 bg-[#444] border border-[#555] rounded-[1px] shadow-sm"></div>
            <div className="w-3 h-3 bg-[#333] border border-[#555] ml-auto text-[8px] flex items-center justify-center shadow-sm text-[#ccff00]">
              ►
            </div>
          </div>
        </div>

        {/* Vertical Toolbar on the Right */}
        <div className="w-10 bg-[#252525] flex flex-col items-center py-2 gap-2 border-l border-[#333]">
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#333] border border-[#ccff00] shadow-inner text-[#ccff00] active:bg-black"
            title="Select"
          >
            <MousePointer2 size={16} />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center border border-transparent hover:border-[#ccff00] hover:bg-[#333] hover:shadow-sm text-gray-400 hover:text-[#ccff00]"
            title="Pen"
          >
            <PenTool size={16} />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center border border-transparent hover:border-[#ccff00] hover:bg-[#333] hover:shadow-sm text-gray-400 hover:text-[#ccff00]"
            title="Shape"
          >
            <Square size={16} />
          </button>
        </div>
      </div>
      {/* Status Bar */}
      <div className="h-6 border-t border-[#333] mt-1 flex items-center px-2 text-xs text-gray-500 shadow-[inset_0_1px_0_#222]">
        Ready
      </div>
    </XPWindow>
  );
};
