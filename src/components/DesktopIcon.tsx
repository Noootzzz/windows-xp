import React from "react";
import type { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  label: string;
  icon: LucideIcon | string;
  onClick?: () => void;
  selected?: boolean;
}

export function DesktopIcon({
  label,
  icon: Icon,
  onClick,
  selected,
}: DesktopIconProps) {
  const isImage = typeof Icon === "string";
  return (
    <div
      className={`
        w-48 flex flex-col items-center gap-1 p-2 cursor-pointer
        ${
          selected
            ? "bg-[#316ac5]/50 border border-[#316ac5]/50 rounded-sm"
            : "hover:bg-white/10 border border-transparent"
        }
      `}
      onClick={onClick}
    >
      <div className="relative">
        {isImage ? (
          <img
            src={Icon}
            alt={label}
            className="w-48 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          />
        ) : (
          <Icon
            size={48}
            className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            strokeWidth={1.5}
          />
        )}
      </div>
      <span
        className={`
          text-white text-xl text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]
        
        `}
      >
        {label}
      </span>
    </div>
  );
}
