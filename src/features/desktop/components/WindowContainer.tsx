import React from 'react';
import { WindowType, type WindowState } from '../../../core/types/window.types';
import { AlbumCoverGenerator } from '../../album-cover/AlbumCoverGenerator';
import { MusicPlayer } from '../../music-player/MusicPlayer';
import { useAudioPlayer } from '../../../hooks/useAudioPlayer';

interface WindowContainerProps {
  windows: Record<string, WindowState>;
  onMinimize: (id: string) => void;
  onClose: (id: string) => void;
}

export const WindowContainer: React.FC<WindowContainerProps> = ({
  windows,
  onMinimize,
  onClose,
}) => {
  const audioPlayer = useAudioPlayer();

  const renderWindow = (window: WindowState) => {
    if (window.isMinimized) return null;

    switch (window.type) {
      case WindowType.ALBUM_COVER:
        return (
          <AlbumCoverGenerator
            key={window.id}
            onClose={() => onClose(window.id)}
            onMinimize={() => onMinimize(window.id)}
          />
        );
      case WindowType.MUSIC_PLAYER:
        return (
          <MusicPlayer
            key={window.id}
            onClose={() => onClose(window.id)}
            onMinimize={() => onMinimize(window.id)}
            audioState={audioPlayer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {Object.values(windows).map(renderWindow)}
    </div>
  );
};
