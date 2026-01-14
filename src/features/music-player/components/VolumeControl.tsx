import React from "react";
import { Volume2 } from "lucide-react";
import { PLAYER_CONFIG, PLAYER_COLORS } from "../constants";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  onVolumeChange,
}) => {
  return (
    <div className="flex items-center gap-2 px-8">
      <Volume2 size={16} className="text-[#ccff00]" style={{ color: PLAYER_COLORS.ACCENT }} />
      <input
        type="range"
        min={PLAYER_CONFIG.VOLUME_MIN}
        max={PLAYER_CONFIG.VOLUME_MAX}
        step={PLAYER_CONFIG.VOLUME_STEP}
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-[#444] rounded-lg appearance-none cursor-pointer accent-[#ccff00]"
        style={{
          backgroundColor: PLAYER_COLORS.SLIDER_BG,
          accentColor: PLAYER_COLORS.ACCENT,
        }}
      />
    </div>
  );
};
