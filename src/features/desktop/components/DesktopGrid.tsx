import React from 'react';
import { DesktopIcon } from '../../../components/DesktopIcon';
import { WindowType } from '../../../core/types/window.types';

interface DesktopGridProps {
  selectedIcon: string | null;
  onIconSelect: (id: string) => void;
  onIconOpen: (id: string, type: WindowType) => void;
}

export const DesktopGrid: React.FC<DesktopGridProps> = ({
  selectedIcon,
  onIconSelect,
  onIconOpen,
}) => {
  return (
    <>
      <div className="absolute inset-0 p-4 z-30 flex flex-col gap-4 flex-wrap content-start h-full pb-12 w-fit">
        <div className="pointer-events-auto contents">
          <DesktopIcon
            label="Album Cover"
            icon="/paint.png"
            selected={selectedIcon === 'album'}
            onClick={() => {
              onIconSelect('album');
              onIconOpen('album-cover', WindowType.ALBUM_COVER);
            }}
          />
          <DesktopIcon
            label="Music Player"
            icon="/music.png"
            selected={selectedIcon === 'musicPlayer'}
            onClick={() => {
              onIconSelect('musicPlayer');
              onIconOpen('music-player', WindowType.MUSIC_PLAYER);
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-12 right-4 z-30 flex flex-col items-end pointer-events-auto">
        <DesktopIcon
          label="Recycle Bin"
          icon="/trash.png"
          selected={selectedIcon === 'recycle'}
          onClick={() => onIconSelect('recycle')}
        />
      </div>
    </>
  );
};
