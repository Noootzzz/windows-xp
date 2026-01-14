import React from "react";
import { Download, Play } from "lucide-react";

interface ActionButtonsProps {
  onGenerate: () => void;
  onDownload: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGenerate,
  onDownload,
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onGenerate}
        className="px-10 py-4 bg-[#ccff00] text-black hover:bg-[#ddff33] rounded-[6px] text-[14px] cursor-pointer transition-all flex items-center gap-3 font-black tracking-[2px] uppercase active:scale-95 active-pulse shadow-[0_0_20px_rgba(204,255,0,0.2)]"
      >
        <Play size={18} fill="currentColor" />
        Randomize
      </button>
      <button
        onClick={onDownload}
        className="px-8 py-4 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 border border-white/10 rounded-[6px] text-[13px] cursor-pointer transition-all flex items-center gap-3 font-bold tracking-[2px] uppercase active:scale-95"
      >
        <Download size={18} />
        Save to Disk
      </button>
    </div>
  );
};
