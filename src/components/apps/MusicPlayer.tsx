import React, { useEffect } from "react";
import { Music, Volume2 } from "lucide-react";
import { XPWindow } from "../os/XPWindow";

// Helper for formatting time
const formatTime = (time: number) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

interface MusicPlayerProps {
  onClose: () => void;
  onMinimize: () => void;
  audioState: any; // We'll type this properly if possible or use the return type of the hook
}

export const MusicPlayer = ({
  onClose,
  onMinimize,
  audioState,
}: MusicPlayerProps) => {
  const {
    playlist,
    currentTrackIndex,
    isPlaying,
    duration,
    currentTime,
    fileInputRef,
    handleFileSelect,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    volume,
    setVolume,
  } = audioState;

  return (
    <XPWindow
      title="Music Player"
      initialPosition={{ x: 150, y: 100 }}
      width="w-[500px]"
      onClose={onClose}
      onMinimize={onMinimize}
      icon="/music.png"
    >
      <div className="h-[500px] bg-[#1a1a1a] p-4 flex flex-col gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="audio/*"
          className="hidden"
        />

        {/* Now Playing Area */}
        <div className="bg-black border-2 border-[#333] h-24 rounded-sm p-4 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#ccff00]/5 z-0"></div>
          <div className="w-16 h-16 bg-[#111] border border-[#333] z-10 flex items-center justify-center">
            <Music className="text-[#ccff00]" size={32} />
          </div>
          <div className="flex-1 z-10 font-mono">
            <div className="text-[#ccff00] text-sm truncate">
              {currentTrackIndex !== -1 && playlist[currentTrackIndex]
                ? playlist[currentTrackIndex].name
                : "No music loaded"}
            </div>
            <div className="text-[#ccff00] opacity-80 text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            {/* Visualizer bars fake - only animate if playing */}
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
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={prevTrack}
            className="w-10 h-10 rounded-full bg-gradient-to-b from-[#444] to-[#222] border border-[#555] flex items-center justify-center text-[#ccff00] shadow-sm active:translate-y-0.5 hover:brightness-110"
            title="Previous"
          >
            ⏮
          </button>
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-b from-[#444] to-[#222] border border-[#555] flex items-center justify-center text-[#ccff00] shadow-sm active:translate-y-0.5 text-xl hover:brightness-110"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={nextTrack}
            className="w-10 h-10 rounded-full bg-gradient-to-b from-[#444] to-[#222] border border-[#555] flex items-center justify-center text-[#ccff00] shadow-sm active:translate-y-0.5 hover:brightness-110"
            title="Next"
          >
            ⏭
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full bg-gradient-to-b from-[#444] to-[#222] border border-[#555] flex items-center justify-center text-[#ccff00] shadow-sm active:translate-y-0.5 text-2xl font-bold pb-1 hover:brightness-110"
            title="Add Music"
          >
            +
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 px-8">
          <Volume2 size={16} className="text-[#ccff00]" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1 bg-[#444] rounded-lg appearance-none cursor-pointer accent-[#ccff00]"
          />
        </div>

        {/* Playlist */}
        <div className="flex-1 bg-black border border-[#333] overflow-auto p-1 font-sans text-sm">
          {playlist.length === 0 ? (
            <div className="text-gray-600 text-center italic mt-4">
              No tracks added. Click + to add mp3s.
            </div>
          ) : (
            playlist.map((file: any, index: number) => (
              <div
                key={index}
                onClick={() => playTrack(index)}
                className={`flex justify-between px-2 py-1 cursor-pointer select-none border-b border-[#222] ${
                  index === currentTrackIndex
                    ? "bg-[#333] text-[#ccff00]"
                    : "hover:bg-[#222] text-gray-400"
                }`}
              >
                <span className="truncate flex-1">
                  {index + 1}. {file.name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </XPWindow>
  );
};
