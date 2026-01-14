import React from "react";
import { RefreshCw } from "lucide-react";

interface TextControlsProps {
  customText: string;
  onTextChange: (text: string) => void;
  onRandomize: () => void;
}

export const TextControls: React.FC<TextControlsProps> = ({
  customText,
  onTextChange,
  onRandomize,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#888] text-xs uppercase tracking-widest font-bold">
        Subject Text
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={customText}
          onChange={(e) => onTextChange(e.target.value)}
          className="flex-1 bg-[#0a0a0a] border border-[#333] text-[#ccff00] p-2 text-sm focus:outline-none focus:border-[#ccff00] uppercase font-bold"
          style={{ fontFamily: '"Press Start 2P"' }}
        />
        <button
          onClick={onRandomize}
          className="bg-[#222] border border-[#333] hover:border-[#ccff00] text-[#ccff00] p-2 flex items-center justify-center group"
          title="Randomize Text"
        >
          <RefreshCw
            size={14}
            className="group-hover:rotate-180 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};
