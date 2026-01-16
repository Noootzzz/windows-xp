import { useExperienceStore, useScreenStore } from "../core/store";

export default function InteractionHint() {
  const { mode } = useExperienceStore();
  const { screen } = useScreenStore();

  if (screen === "on" || screen === "booting") return null;

  return (
    <div className="fixed bottom-6 right-6 z-9999 pointer-events-none">
      {mode !== "focus" ? (
        <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-white/40 uppercase">
          <span className="w-[5px] h-[5px] rounded-full bg-white/50 animate-[hintPulse_2s_ease-in-out_infinite]" />
          Click screen
        </div>
      ) : (
        <div className="flex flex-col gap-1 font-mono text-[10px] tracking-tight uppercase">
          <div className="flex items-center gap-1 text-lime-400/60">
            <span>●</span> Green button - On
          </div>
          <div className="flex items-center gap-1 text-red-400/60">
            <span>●</span> Red button - Off
          </div>
        </div>
      )}
    </div>
  );
}
