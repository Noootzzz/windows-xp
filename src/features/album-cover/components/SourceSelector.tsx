import React from "react";
import { SOURCE_IMAGES } from "../presets";
import type { SourceImage } from "../presets/types";

interface SourceSelectorProps {
  activeImage: SourceImage;
  onImageChange: (image: SourceImage) => void;
}

export const SourceSelector: React.FC<SourceSelectorProps> = ({
  activeImage,
  onImageChange,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-[10px] text-white/40 uppercase tracking-[2px] font-bold">
        Source Image
      </label>
      <div className="flex gap-3">
        {SOURCE_IMAGES.map((img) => (
          <button
            key={img.id}
            onClick={() => onImageChange(img)}
            className={`
              relative w-18 h-18 rounded-lg overflow-hidden border-2 transition-all duration-300
              ${img.id === activeImage.id 
                ? "border-[#ccff00] ring-4 ring-[#ccff00]/20 scale-105 shadow-xl shadow-[#ccff00]/10" 
                : "border-transparent opacity-50 hover:opacity-100 hover:border-white/20"}
            `}
          >
            <img 
              src={img.path} 
              alt={img.name} 
              className="w-full h-full object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  );
};
