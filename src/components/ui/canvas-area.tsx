import React from "react";

interface CanvasAreaProps {
  placeholder?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const CanvasArea = ({ placeholder, children, className = "" }: CanvasAreaProps) => {
  return (
    <div className={`flex-1 bg-[#111] border-2 border-inset border-[#333] overflow-auto relative p-4 flex flex-col ${className}`}>
      {children || (
        <div className="flex-1 bg-black border border-dashed border-[#555] flex items-center justify-center">
          {placeholder}
        </div>
      )}

      {/* Vertical Scrollbar (Visual Only) */}
      <div className="absolute right-0 top-0 bottom-4 w-4 bg-[#252525] border-l border-[#333] flex flex-col items-center py-1">
        <div className="w-3 h-3 bg-[#333] border border-[#555] mb-auto text-[8px] flex items-center justify-center shadow-sm text-[#ccff00]">
          ▲
        </div>
        <div className="w-3 h-8 bg-[#444] border border-[#555] rounded-[1px] shadow-sm"></div>
        <div className="w-3 h-3 bg-[#333] border border-[#555] mt-auto text-[8px] flex items-center justify-center shadow-sm text-[#ccff00]">
          ▼
        </div>
      </div>

      {/* Horizontal Scrollbar (Visual Only) */}
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
  );
};
