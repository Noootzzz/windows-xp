import React from "react";
import { FILTERS, getFilterIds, COLOR_PRESETS } from "../presets";
import type { FilterType, ColorPreset } from "../presets/types";

interface FilterSelectorProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeColors: ColorPreset;
  onColorsChange: (colors: ColorPreset) => void;
}

export const FilterSelector: React.FC<FilterSelectorProps> = ({
  activeFilter,
  onFilterChange,
  activeColors,
  onColorsChange,
}) => {
  const filterIds = getFilterIds();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label className="text-[11px] text-white/40 uppercase tracking-[2.5px] font-black">
          Filtre Actif
        </label>
        <div className="relative group">
          <select 
            value={activeFilter}
            onChange={(e) => onFilterChange(e.target.value as FilterType)}
            className="w-full bg-white/5 text-white text-[13px] p-3.5 border border-white/10 rounded-lg outline-none appearance-none cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all font-bold tracking-widest"
          >
            {filterIds.map(id => (
              <option key={id} value={id} className="bg-[#111]">{FILTERS[id].name.toUpperCase()}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-[#ccff00] transition-colors text-sm">
            ▼
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-[11px] text-white/40 uppercase tracking-[2.5px] font-black">
          Palette Harlem
        </label>
        <div className="flex flex-wrap gap-4">
          {COLOR_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => onColorsChange(p)}
              className={`
                w-9 h-9 rounded-full border-2 transition-all duration-300 relative
                ${p.id === activeColors.id 
                  ? "border-white scale-125 shadow-2xl shadow-white/20 z-10" 
                  : "border-transparent opacity-50 hover:opacity-100 hover:scale-110"}
              `}
              style={{ backgroundColor: p.primary }}
              title={p.name}
            >
              {p.id === activeColors.id && (
                <div className="absolute inset-0 rounded-full border border-black/20" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
