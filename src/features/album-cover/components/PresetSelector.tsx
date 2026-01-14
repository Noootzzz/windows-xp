import { PRESETS, getPresetIds } from "../presets";
import type { PresetId } from "../presets/types";

interface PresetSelectorProps {
  activePreset: PresetId;
  onPresetChange: (presetId: PresetId) => void;
}

export default function PresetSelector({
  activePreset,
  onPresetChange,
}: PresetSelectorProps) {
  const presetIds = getPresetIds();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-[#888] uppercase tracking-wider">
        Style
      </label>
      <div className="flex gap-2">
        {presetIds.map((id) => {
          const preset = PRESETS[id];
          const isActive = id === activePreset;

          return (
            <button
              key={id}
              onClick={() => onPresetChange(id)}
              className={`
                relative size-10 rounded border-2 transition-all duration-200
                ${isActive ? "border-white scale-110" : "border-transparent hover:border-[#555]"}
              `}
              style={{
                background: `linear-gradient(135deg, ${preset.background} 0%, ${preset.primary} 50%, ${preset.secondary} 100%)`,
              }}
              title={preset.name}
            >
              {isActive && (
                <div className="absolute -top-1 -right-1 size-3 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      <span className="text-xs text-[#ccff00]">
        {PRESETS[activePreset].name}
      </span>
    </div>
  );
};
