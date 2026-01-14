import { useState } from "react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { Background } from "./layout/Background";
import { AlbumCoverGenerator } from "../features/album-cover/AlbumCoverGenerator";
import { MusicPlayer } from "../features/music-player/MusicPlayer";
import { Taskbar } from "./layout/Taskbar";
import { DesktopIcon } from "./DesktopIcon";

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
      <Background />

      {/* Safe Area for UI (Padded) */}
      <div className="absolute top-[55px] left-[55px] right-[55px] bottom-0 pointer-events-none">
        {/* Desktop Icons */}
        <div className="absolute inset-0 p-4 z-30 flex flex-col gap-4 flex-wrap content-start h-full pb-12 w-fit">
          <div className="pointer-events-auto contents">
            <DesktopIcon
              label="Album Cover"
              icon="/paint.png"
              selected={selectedIcon === "album"}
              onClick={() => {
                setSelectedIcon("album");
                setIsWindowOpen(true);
                setIsWindowMinimized(false);
              }}
            />
            <DesktopIcon
              label="Music Player"
              icon="/music.png"
              selected={selectedIcon === "musicPlayer"}
              onClick={() => {
                setSelectedIcon("musicPlayer");
                setIsMusicPlayerOpen(true);
                setIsMusicPlayerMinimized(false);
              }}
            />
          </div>
        </div>

        {/* Recycle Bin */}
        <div className="absolute bottom-12 right-4 z-30 flex flex-col items-end pointer-events-auto">
          <DesktopIcon
            label="Recycle Bin"
            icon="/trash.png"
            selected={selectedIcon === "recycle"}
            onClick={() => setSelectedIcon("recycle")}
          />
        </div>

        {/* Windows */}
        <div className="absolute inset-0 pointer-events-none z-40">
          {isWindowOpen && !isWindowMinimized && (
            <AlbumCoverGenerator
              onClose={() => setIsWindowOpen(false)}
              onMinimize={() => setIsWindowMinimized(true)}
            />
          )}

          {isMusicPlayerOpen && !isMusicPlayerMinimized && (
            <MusicPlayer
              onClose={() => setIsMusicPlayerOpen(false)}
              onMinimize={() => setIsMusicPlayerMinimized(true)}
              audioState={audioPlayer}
            />
          )}
        </div>

        {/* Taskbar */}
        <div className="pointer-events-auto">
          <Taskbar
            isWindowOpen={isWindowOpen}
            isWindowMinimized={isWindowMinimized}
            toggleWindow={toggleWindow}
            isMusicPlayerOpen={isMusicPlayerOpen}
            isMusicPlayerMinimized={isMusicPlayerMinimized}
            toggleMusicPlayer={toggleMusicPlayer}
          />
        </div>
      </div>

      {/* Hidden Global Audio Element to persist playback */}
      <audio
        ref={audioPlayer.audioRef}
        onTimeUpdate={audioPlayer.updateTime}
        onDurationChange={audioPlayer.updateDuration}
        onEnded={audioPlayer.nextTrack}
      />
    </div>
  );
}
