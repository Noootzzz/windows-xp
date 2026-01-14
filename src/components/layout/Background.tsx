import React from "react";
import { DesktopIcon } from "../DesktopIcon";

interface BackgroundProps {
  selectedIcon: string | null;
  setSelectedIcon: (icon: string | null) => void;
  openAlbumCover: () => void;
  openMusicPlayer: () => void;
}

export const Background = ({
  selectedIcon,
  setSelectedIcon,
  openAlbumCover,
  openMusicPlayer,
}: BackgroundProps) => {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url(/windows_xp_bg.png)" }}
      />

      <div className="absolute inset-0 p-4 z-30 flex flex-col gap-4 flex-wrap content-start h-full pb-12 w-fit pointer-events-none">
        <div className="pointer-events-auto contents">
          <DesktopIcon
            label="Album Cover"
            icon="/paint.png"
            selected={selectedIcon === "album"}
            onClick={() => {
              setSelectedIcon("album");
              openAlbumCover();
            }}
          />
          <DesktopIcon
            label="Music Player"
            icon="/music.png"
            selected={selectedIcon === "musicPlayer"}
            onClick={() => {
              setSelectedIcon("musicPlayer");
              openMusicPlayer();
            }}
          />
        </div>
      </div>

      {/* Recycle Bin (Bottom Right) */}
      <div className="absolute bottom-12 right-4 z-30 flex flex-col items-end pointer-events-auto">
        <DesktopIcon
          label="Recycle Bin"
          icon="/trash.png"
          selected={selectedIcon === "recycle"}
          onClick={() => setSelectedIcon("recycle")}
        />
      </div>
    </>
  );
};
