import { useState } from "react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { Background } from "./layout/Background";
import { AlbumCoverGenerator } from "../features/album-cover/AlbumCoverGenerator";
import { MusicPlayer } from "../features/music-player/MusicPlayer";
import { Taskbar } from "./layout/Taskbar";

export function WindowsXPDesktop() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  // Album Cover Generator State
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isWindowMinimized, setIsWindowMinimized] = useState(false);

  // Music Player State
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isMusicPlayerMinimized, setIsMusicPlayerMinimized] = useState(false);

  const audioPlayer = useAudioPlayer();

  const toggleWindow = () => {
    if (!isWindowOpen) {
      setIsWindowOpen(true);
      setIsWindowMinimized(false);
    } else {
      setIsWindowMinimized(!isWindowMinimized);
    }
  };

  const toggleMusicPlayer = () => {
    if (!isMusicPlayerOpen) {
      setIsMusicPlayerOpen(true);
      setIsMusicPlayerMinimized(false);
    } else {
      setIsMusicPlayerMinimized(!isMusicPlayerMinimized);
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-black relative selection:bg-blue-500 selection:text-white">
      <Background
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        openAlbumCover={() => {
          setIsWindowOpen(true);
          setIsWindowMinimized(false);
        }}
        openMusicPlayer={() => {
          setIsMusicPlayerOpen(true);
          setIsMusicPlayerMinimized(false);
        }}
      />

      {/* Hidden Global Audio Element to persist playback */}
      <audio
        ref={audioPlayer.audioRef}
        onTimeUpdate={audioPlayer.updateTime}
        onDurationChange={audioPlayer.updateDuration}
        onEnded={audioPlayer.nextTrack}
      />

      {/* Window: Album Cover Generator */}
      {isWindowOpen && !isWindowMinimized && (
        <AlbumCoverGenerator
          onClose={() => setIsWindowOpen(false)}
          onMinimize={() => setIsWindowMinimized(true)}
        />
      )}

      {/* Window: Music Player */}
      {isMusicPlayerOpen && !isMusicPlayerMinimized && (
        <MusicPlayer
          onClose={() => setIsMusicPlayerOpen(false)}
          onMinimize={() => setIsMusicPlayerMinimized(true)}
          audioState={audioPlayer}
        />
      )}

      <Taskbar
        isWindowOpen={isWindowOpen}
        isWindowMinimized={isWindowMinimized}
        toggleWindow={toggleWindow}
        isMusicPlayerOpen={isMusicPlayerOpen}
        isMusicPlayerMinimized={isMusicPlayerMinimized}
        toggleMusicPlayer={toggleMusicPlayer}
      />
    </div>
  );
}
