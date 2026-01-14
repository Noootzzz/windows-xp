import React from "react";

interface MediaControlsProps {
  onPrevious?: () => void;
  onPlay?: () => void;
  onNext?: () => void;
  isPlaying?: boolean;
  className?: string;
}

export const MediaControls = ({
  onPrevious,
  onPlay,
  onNext,
  isPlaying,
  className = "",
}: MediaControlsProps) => {
  return (
    <div className={`flex justify-center gap-4 ${className}`}>
      <button
        onClick={onPrevious}
        className="w-10 h-10 rounded-full bg-gradient-to-b from-[#444] to-[#222] border border-[#555] flex items-center justify-center text-[#ccff00] shadow-sm active:translate-y-0.5 hover:brightness-110"
        title="Previous"
      >
        ⏮
      </button>
      <button
        onClick={onPlay}
        className="w-12 h-12 rounded-full bg-gradient-to-b from-[#444] to-[#222] border border-[#555] flex items-center justify-center text-[#ccff00] shadow-sm active:translate-y-0.5 text-xl hover:brightness-110"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
      <button
        onClick={onNext}
        className="w-10 h-10 rounded-full bg-gradient-to-b from-[#444] to-[#222] border border-[#555] flex items-center justify-center text-[#ccff00] shadow-sm active:translate-y-0.5 hover:brightness-110"
        title="Next"
      >
        ⏭
      </button>
    </div>
  );
};

interface NowPlayingProps {
  title?: string;
  duration?: string;
  icon?: React.ReactNode;
  visualizer?: boolean;
  isPlaying?: boolean;
  className?: string;
}

export const NowPlaying = ({
  title = "No music loaded",
  duration = "00:00 / 00:00",
  icon,
  visualizer = true,
  isPlaying = false,
  className = "",
}: NowPlayingProps) => {
  return (
    <div className={`bg-black border-2 border-[#333] h-24 rounded-sm p-4 flex items-center gap-4 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[#ccff00]/5 z-0"></div>
      <div className="w-16 h-16 bg-[#111] border border-[#333] z-10 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 z-10 font-mono">
        <div className="text-[#ccff00] text-sm truncate">{title}</div>
        <div className="text-[#ccff00] opacity-80 text-xs">{duration}</div>
        {visualizer && (
          <div className="flex gap-0.5 mt-2 h-4 items-end">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-[#ccff00] transition-all duration-75"
                style={{
                  height: isPlaying ? `${Math.random() * 100}%` : "5%",
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface PlaylistProps {
  tracks: Array<{ name: string; id: string | number }>;
  currentTrackIndex?: number;
  onTrackSelect?: (index: number) => void;
  className?: string;
}

export const Playlist = ({
  tracks = [],
  currentTrackIndex = -1,
  onTrackSelect,
  className = "",
}: PlaylistProps) => {
  return (
    <div className={`flex-1 bg-black border border-[#333] overflow-auto p-1 font-sans text-sm ${className}`}>
      {tracks.length === 0 ? (
        <div className="text-gray-600 text-center italic mt-4">
          No tracks added. Click + to add mp3s.
        </div>
      ) : (
        tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => onTrackSelect?.(index)}
            className={`flex justify-between px-2 py-1 cursor-pointer select-none border-b border-[#222] ${
              index === currentTrackIndex
                ? "bg-[#333] text-[#ccff00]"
                : "hover:bg-[#222] text-gray-400"
            }`}
          >
            <span className="truncate flex-1">
              {index + 1}. {track.name}
            </span>
          </div>
        ))
      )}
    </div>
  );
};
