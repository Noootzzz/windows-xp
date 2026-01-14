import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

interface XPWindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  width?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  icon?: string;
}

export const XPWindow = ({
  title,
  children,
  initialPosition = { x: 0, y: 0 },
  width = "w-96",
  onClose,
  onMinimize,
  icon,
}: XPWindowProps) => {
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <Draggable
      defaultPosition={initialPosition}
      handle=".window-title-bar"
      nodeRef={nodeRef}
      disabled={isMaximized}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
    >
      <div
        ref={nodeRef}
        className={`
          absolute flex flex-col font-sans shadow-2xl z-40 pointer-events-auto
          ${
            isMaximized
              ? "w-full h-[calc(100vh-35px)] rounded-none left-0 top-0 border-0"
              : `${width} rounded-t-lg border-[3px]`
          } 
          bg-[#1a1a1a] border-[#333]
        `}
        style={isMaximized ? { transform: "none !important" } : {}}
      >
        {/* Title Bar - Dark Utopia Style */}
        <div
          className="window-title-bar h-[30px] flex items-center justify-between px-2 cursor-default select-none relative z-20"
          style={{
            background:
              "linear-gradient(to bottom, #333 0%, #1a1a1a 10%, #000 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
          onDoubleClick={() => setIsMaximized(!isMaximized)}
        >
          <div className="flex items-center gap-2">
            {icon ? (
              <img
                src={icon}
                alt=""
                className="w-4 h-4 object-contain shadow-sm"
              />
            ) : (
              <div className="w-4 h-4 bg-[#ccff00]/20 rounded-sm border border-[#ccff00]"></div>
            )}
            <span
              className="text-[#ccff00] font-bold text-shadow-sm text-[13px] tracking-wide"
              style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.8)" }}
            >
              {title}
            </span>
          </div>
          <div className="flex gap-1 opacity-90">
            {/* Minimize */}
            <button
              className="w-[22px] h-[22px] bg-gradient-to-b from-[#444] to-[#222] text-[#ccff00] hover:brightness-125 rounded-[3px] border border-[#555] flex items-center justify-center font-bold text-xs shadow-sm shadow-black"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize?.();
              }}
            >
              <span className="relative bottom-[3px] font-black">_</span>
            </button>
            {/* Maximize */}
            <button
              className="w-[22px] h-[22px] bg-gradient-to-b from-[#444] to-[#222] text-[#ccff00] hover:brightness-125 rounded-[3px] border border-[#555] flex items-center justify-center font-bold text-xs shadow-sm shadow-black"
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized(!isMaximized);
              }}
            >
              {isMaximized ? "❐" : "□"}
            </button>
            {/* Close */}
            <button
              className="w-[22px] h-[22px] bg-gradient-to-b from-[#d34538] to-[#991e14] text-white hover:brightness-125 rounded-[3px] border border-[#white]/30 flex items-center justify-center font-bold text-lg shadow-sm shadow-black"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
            >
              <span className="relative bottom-[1px] text-[14px]">×</span>
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-[#252525] border-b border-[#333] px-2 py-1 text-sm flex gap-3 text-[#aaa]">
          <span className="hover:bg-[#ccff00] hover:text-black px-1 cursor-pointer">
            File
          </span>
          <span className="hover:bg-[#ccff00] hover:text-black px-1 cursor-pointer">
            Edit
          </span>
          <span className="hover:bg-[#ccff00] hover:text-black px-1 cursor-pointer">
            View
          </span>
          <span className="hover:bg-[#ccff00] hover:text-black px-1 cursor-pointer">
            Help
          </span>
        </div>

        {/* Content Area - Wrapper */}
        <div className="p-1 bg-[#1a1a1a] flex-1 relative flex flex-col text-gray-200">
          {children}
        </div>
      </div>
    </Draggable>
  );
};
