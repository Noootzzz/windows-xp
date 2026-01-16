export interface Track {
  name: string;
  source: File | string;
}

export interface MusicPlayerProps {
  onClose: () => void;
  onMinimize: () => void;
  audioState: AudioPlayerState;
}

export interface AudioPlayerState {
  playlist: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  updateTime: () => void;
  updateDuration: () => void;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

export interface PlaylistTrack {
  id: number;
  name: string;
}
