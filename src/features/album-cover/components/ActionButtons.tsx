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
    <div className="flex justify-between items-center p-6 bg-[#181818] border-t border-[#333]">
      <button
        onClick={onGenerate}
        className="px-8 py-4 bg-[#252525] text-[#ccff00] border border-[#ccff00]/40 hover:border-[#ccff00] rounded-[2px] text-base cursor-pointer hover:bg-[#ccff00]/10 transition-all flex items-center gap-3 font-bold tracking-widest uppercase shadow-md active:translate-y-[1px]"
        style={{ fontFamily: '"Share Tech Mono", monospace' }}
      >
        <Play size={24} className="text-[#ccff00]" />
        GENERATE ACID
      </button>
      <button
        onClick={onDownload}
        className="px-8 py-4 bg-[#252525] text-[#888] hover:text-white border border-[#444] hover:border-[#888] rounded-[2px] text-base cursor-pointer hover:bg-[#333] transition-all flex items-center gap-3 font-bold tracking-widest uppercase shadow-md active:translate-y-[1px]"
        style={{ fontFamily: '"Share Tech Mono", monospace' }}
      >
        <Download size={24} />
        SAVE TO DISK
      </button>
    </div>
  );
};
