import React, { useState } from "react";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { Taskbar } from "./components/layout/Taskbar";
import { Background } from "./components/layout/Background";
import { AlbumCoverGenerator } from "./components/apps/AlbumCoverGenerator";
import { MusicPlayer } from "./components/apps/MusicPlayer";

export default function App() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  // Album Cover Generator State
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isWindowMinimized, setIsWindowMinimized] = useState(false);

  // Music Player State
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isMusicPlayerMinimized, setIsMusicPlayerMinimized] = useState(false);

  // Custom Hook for Audio Logic
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
    <div className="h-screen w-screen overflow-hidden bg-black relative selection:bg-blue-500 selection:text-white">
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
