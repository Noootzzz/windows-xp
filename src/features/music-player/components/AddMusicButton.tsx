import React from "react";
import { PLAYER_COLORS, MESSAGES } from "../constants";

interface AddMusicButtonProps {
  onClick: () => void;
}

export const AddMusicButton: React.FC<AddMusicButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="w-10 h-10 rounded-full bg-gradient-to-b from-[#444] to-[#222] border border-[#555] flex items-center justify-center text-[#ccff00] shadow-sm active:translate-y-0.5 text-2xl font-bold pb-1 hover:brightness-110"
        title={MESSAGES.ADD_MUSIC_TITLE}
        style={{
          background: `linear-gradient(to bottom, ${PLAYER_COLORS.BUTTON_GRADIENT_FROM}, ${PLAYER_COLORS.BUTTON_GRADIENT_TO})`,
          borderColor: PLAYER_COLORS.BUTTON_BORDER,
          color: PLAYER_COLORS.ACCENT,
        }}
      >
        +
      </button>
    </div>
  );
};
