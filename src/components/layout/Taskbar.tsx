import { Globe } from "lucide-react";

interface TaskbarProps {
  isWindowOpen: boolean;
  isWindowMinimized: boolean;
  toggleWindow: () => void;
  isMusicPlayerOpen: boolean;
  isMusicPlayerMinimized: boolean;
  toggleMusicPlayer: () => void;
}

export const Taskbar = ({
  isWindowOpen,
  isWindowMinimized,
  toggleWindow,
  isMusicPlayerOpen,
  isMusicPlayerMinimized,
  toggleMusicPlayer,
}: TaskbarProps) => {
  return (
    <div
      className="absolute bottom-0 left-0 px-10 w-full h-[30px] flex items-center z-50 select-none font-sans"
      style={{
        background:
          "linear-gradient(to bottom, #333 0%, #1a1a1a 10%, #000 100%)",
        borderTop: "1px solid #555",
      }}
    >
      {/* Start Button */}
      <button
        className="
        h-full pl-2 pr-6
        flex items-center gap-2
        rounded-r-[15px]
        cursor-pointer
        mr-2
        relative
        group
        hover:brightness-110
        transition-all
        shadow-[2px_0_5px_rgba(0,0,0,0.5)]
    "
        style={{
          background:
            "linear-gradient(to bottom, #eeff66 0%, #ccff00 40%, #88aa00 100%)",
          border: "1px solid #668800",
          borderLeft: "none",
          boxShadow:
            "inset 1px 1px 2px rgba(255,255,255,0.7), 2px 0 3px rgba(0,0,0,0.5)",
        }}
      >
        <div className="w-[18px] h-[18px] bg-black text-[#ccff00] rounded-full flex items-center justify-center shadow-sm border border-[#557700]">
          <Globe size={12} strokeWidth={3} />
        </div>
        <span
          className="font-black italic text-black text-[15px] tracking-wide relative top-[1px]"
          style={{ textShadow: "0px 1px 0px rgba(255,255,255,0.4)" }}
        >
          Start
        </span>
      </button>

      {/* Separator / Quick Launch Area */}
      <div className="w-[1px] h-[20px] bg-[#444] border-r border-[#111] mx-1"></div>

      {/* Taskbar Items */}
      <div className="flex-1 flex items-center px-1 gap-1 h-full pt-[2px]">
        {isWindowOpen && (
          <div
            className={`
                flex items-center h-[26px] px-2 w-[160px] max-w-[160px] text-xs cursor-pointer gap-2 rounded-[3px]
                transition-all
                ${
                  !isWindowMinimized
                    ? "bg-[#111] text-[#ccff00] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)] border border-[#333]"
                    : "bg-gradient-to-b from-[#444] to-[#222] text-gray-200 border border-[#555] hover:brightness-110 shadow-[1px_1px_1px_rgba(0,0,0,0.5)]"
                }
            `}
            onClick={toggleWindow}
          >
            <img src="/paint.png" alt="" className="w-4 h-4 object-contain" />
            <span className="truncate">Album Cover Generator</span>
          </div>
        )}
        {isMusicPlayerOpen && (
          <div
            className={`
                flex items-center h-[26px] px-2 w-[160px] max-w-[160px] text-xs cursor-pointer gap-2 rounded-[3px]
                transition-all
                ${
                  !isMusicPlayerMinimized
                    ? "bg-[#111] text-[#ccff00] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)] border border-[#333]"
                    : "bg-gradient-to-b from-[#444] to-[#222] text-gray-200 border border-[#555] hover:brightness-110 shadow-[1px_1px_1px_rgba(0,0,0,0.5)]"
                }
            `}
            onClick={toggleMusicPlayer}
          >
            <img src="/music.png" alt="" className="w-4 h-4 object-contain" />
            <span className="truncate">Music Player</span>
          </div>
        )}
      </div>

      {/* System Tray */}
      <div
        className="h-full pl-3 pr-3 flex items-center gap-3 cursor-default border-l border-[#444]"
        style={{
          background:
            "linear-gradient(to bottom, #151515 0%, #252525 20%, #151515 100%)",
          boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.5)",
        }}
      >
        {/* Tray Icons */}
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ccff00]/20 border border-[#ccff00]/50 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
          </div>
        </div>

        <span className="text-xs text-[#ccff00] font-sans">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
