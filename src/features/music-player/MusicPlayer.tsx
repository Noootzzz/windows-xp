import React from "react";
import { Music, Volume2 } from "lucide-react";
import { XPWindow } from "../../components/os/XPWindow";
import { MediaControls, NowPlaying, Playlist } from "../../components/ui/media-player";

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
  audioState: any;
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

  const currentTrack = currentTrackIndex !== -1 && playlist[currentTrackIndex]
    ? playlist[currentTrackIndex].name
    : "No music loaded";

  const formattedDuration = `${formatTime(currentTime)} / ${formatTime(duration)}`;

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

        <NowPlaying
          title={currentTrack}
          duration={formattedDuration}
          icon={<Music className="text-[#ccff00]" size={32} />}
          visualizer
          isPlaying={isPlaying}
        />

        <MediaControls
          onPrevious={prevTrack}
          onPlay={togglePlay}
          onNext={nextTrack}
          isPlaying={isPlaying}
        />

        <div className="flex justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full bg-gradient-to-b from-[#444] to-[#222] border border-[#555] flex items-center justify-center text-[#ccff00] shadow-sm active:translate-y-0.5 text-2xl font-bold pb-1 hover:brightness-110"
            title="Add Music"
          >
            +
          </button>
        </div>

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

        <Playlist
          tracks={playlist.map((file: any, index: number) => ({
            id: index,
            name: file.name,
          }))}
          currentTrackIndex={currentTrackIndex}
          onTrackSelect={playTrack}
        />
      </div>
    </XPWindow>
  );
};
