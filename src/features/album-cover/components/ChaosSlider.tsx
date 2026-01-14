import React from "react";
import { GENERATION_CONFIG } from "../constants";

interface ChaosSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const ChaosSlider: React.FC<ChaosSliderProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#888] text-xs uppercase tracking-widest font-bold flex justify-between">
        <span>Chaos Level</span>
        <span className="text-[#ccff00]">{value}%</span>
      </label>
      <input
        type="range"
        min={GENERATION_CONFIG.MIN_CHAOS}
        max={GENERATION_CONFIG.MAX_CHAOS}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-[#0a0a0a] appearance-none cursor-pointer border border-[#333] accent-[#ccff00]"
        style={{
          WebkitAppearance: "none",
        }}
      />
    </div>
  );
};
