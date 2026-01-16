export const sliderStyles = {
  container: 'flex flex-col gap-4',
  labelContainer: 'flex justify-between items-center',
  label: 'text-[11px] text-white/40 uppercase tracking-[2.5px] font-black',
  value: 'text-[11px] text-[#ccff00] font-bold',
  input:
    'w-full h-1 bg-[#333] rounded-sm outline-none appearance-none ' +
    '[&::-webkit-slider-thumb]:appearance-none ' +
    '[&::-webkit-slider-thumb]:w-3 ' +
    '[&::-webkit-slider-thumb]:h-3 ' +
    '[&::-webkit-slider-thumb]:bg-[#ccff00] ' +
    '[&::-webkit-slider-thumb]:rounded-full ' +
    '[&::-webkit-slider-thumb]:cursor-pointer ' +
    '[&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(204,255,0,0.5)] ' +
    '[&::-webkit-slider-thumb]:transition-transform ' +
    '[&::-webkit-slider-thumb]:hover:scale-110 ' +
    '[&::-moz-range-thumb]:w-3 ' +
    '[&::-moz-range-thumb]:h-3 ' +
    '[&::-moz-range-thumb]:bg-[#ccff00] ' +
    '[&::-moz-range-thumb]:rounded-full ' +
    '[&::-moz-range-thumb]:cursor-pointer ' +
    '[&::-moz-range-thumb]:border-none ' +
    '[&::-moz-range-thumb]:shadow-[0_0_10px_rgba(204,255,0,0.5)]',
};
