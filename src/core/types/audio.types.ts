export interface Track {
  id: string;
  title: string;
  artist?: string;
  duration?: number;
  source: string | File;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  currentTrackIndex: number;
  playlist: Track[];
  volume: number;
  currentTime: number;
  duration: number;
}

export interface AudioPlayerControls {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  addTracks: (files: File[]) => number;
}
