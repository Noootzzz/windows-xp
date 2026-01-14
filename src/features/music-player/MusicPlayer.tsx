import React from "react";
import { XPWindow } from "../../components/os/XPWindow";
import { MediaControls, Playlist } from "../../components/ui/media-player";
import { FileInput } from "./components/FileInput";
import { AddMusicButton } from "./components/AddMusicButton";
import { VolumeControl } from "./components/VolumeControl";
import { NowPlayingSection } from "./components/NowPlayingSection";
import { WINDOW_CONFIG, PLAYER_COLORS, AUDIO_PATTERNS } from "./constants";
import type { MusicPlayerProps, PlaylistTrack } from "./types";

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  onClose,
  onMinimize,
  audioState,
}) => {
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

  const currentTrack =
    currentTrackIndex !== -1 ? playlist[currentTrackIndex] : null;

  const playlistTracks: PlaylistTrack[] = playlist.map((file, index) => ({
    id: index,
    name: file.name,
  }));

  return (
    <XPWindow
      title={WINDOW_CONFIG.TITLE}
      initialPosition={WINDOW_CONFIG.INITIAL_POSITION}
      width="w-[500px]"
      onClose={onClose}
      onMinimize={onMinimize}
      icon={WINDOW_CONFIG.ICON}
    >
      <div
        className="h-[500px] bg-[#1a1a1a] p-4 flex flex-col gap-4"
        style={{ backgroundColor: PLAYER_COLORS.BACKGROUND }}
      >
        <FileInput
          fileInputRef={fileInputRef}
          onFileSelect={handleFileSelect}
          acceptTypes={AUDIO_PATTERNS.ACCEPT_TYPES}
        />

        <NowPlayingSection
          currentTrack={currentTrack}
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
        />

        <MediaControls
          onPrevious={prevTrack}
          onPlay={togglePlay}
          onNext={nextTrack}
          isPlaying={isPlaying}
        />

        <AddMusicButton onClick={() => fileInputRef.current?.click()} />

        <VolumeControl volume={volume} onVolumeChange={setVolume} />

        <Playlist
          tracks={playlistTracks}
          currentTrackIndex={currentTrackIndex}
          onTrackSelect={playTrack}
        />
      </div>
    </XPWindow>
  );
};
