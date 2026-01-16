import { useScreenStore } from "../core/store";

export function IntroScreen() {
  const { startExperience } = useScreenStore();

  return (
    <div
      onClick={startExperience}
      className="w-full h-full bg-black/70 flex flex-col items-center justify-center cursor-pointer select-none gap-4"
    >
      <img
        src="/images/cactus-jack.png"
        alt="Cactus Jack"
        className="size-32 object-contain brightness-0 invert opacity-90 transition-all duration-500 hover:opacity-100 "
      />

      <p className="text-white/30 text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#ccff00]">
        Decouvrez l'environnemnt du nouvelle album de Travis Scott
      </p>

      {/* Entrer */}
      <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[#ccff00]">
        ENTRER
      </span>
    </div>
  );
}

export default IntroScreen;
