export function OffScreen() {
  return (
    <div className="w-[1200px] h-[1050px] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center justify-center z-1">
        <img
          src="/images/cactus-jack.png"
          alt="Cactus Jack"
          className="w-[300px] h-auto brightness-0 invert opacity-90"
          style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(204, 255, 0, 0.3))' }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)'
        }}
      />
    </div>
  );
}

export default OffScreen;
