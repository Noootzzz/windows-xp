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
  audioRef: React.RefObject<HTMLAudioElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  updateTime: () => void;
  updateDuration: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export interface PlaylistTrack {
  id: number;
  name: string;
}
