import { useState } from 'react';
import { useWindowStore } from '../../core/store';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { Background } from '../../components/layout/Background';
import { Taskbar } from '../../components/layout/Taskbar';
import { WindowContainer } from './components/WindowContainer';
import { DesktopGrid } from './components/DesktopGrid';

export function Desktop() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const { windows, openWindow, closeWindow, minimizeWindow, restoreWindow } =
    useWindowStore();

  const audioPlayer = useAudioPlayer();

  const albumCoverWindow = windows['album-cover'];
  const musicPlayerWindow = windows['music-player'];

  const toggleWindow = (id: string) => {
    const window = windows[id];
    if (window?.isMinimized) {
      restoreWindow(id);
    } else {
      minimizeWindow(id);
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-black relative selection:bg-blue-500 selection:text-white">
      <Background />

      <div className="absolute top-[55px] left-[55px] right-[55px] bottom-0 pointer-events-none">
        <DesktopGrid
          selectedIcon={selectedIcon}
          onIconSelect={setSelectedIcon}
          onIconOpen={openWindow}
        />

        <WindowContainer
          windows={windows}
          onMinimize={minimizeWindow}
          onClose={closeWindow}
        />

        <div className="pointer-events-auto">
          <Taskbar
            isWindowOpen={!!albumCoverWindow?.isOpen}
            isWindowMinimized={!!albumCoverWindow?.isMinimized}
            toggleWindow={() => toggleWindow('album-cover')}
            isMusicPlayerOpen={!!musicPlayerWindow?.isOpen}
            isMusicPlayerMinimized={!!musicPlayerWindow?.isMinimized}
            toggleMusicPlayer={() => toggleWindow('music-player')}
          />
        </div>
      </div>

      <audio
        ref={audioPlayer.audioRef}
        onTimeUpdate={audioPlayer.updateTime}
        onDurationChange={audioPlayer.updateDuration}
        onEnded={audioPlayer.nextTrack}
      />
    </div>
  );
}
