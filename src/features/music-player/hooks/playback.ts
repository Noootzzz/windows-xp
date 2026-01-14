import { useState, useCallback } from "react";
import type { Track } from "../types";
import { extractFilename } from "../utils";

/**
 * Hook to manage playlist state
 */
export const usePlaylist = () => {
  const [playlist, setPlaylist] = useState<Track[]>(() => {
    const musicFiles = import.meta.glob("/src/assets/musics/*.mp3", {
      eager: true,
      query: "?url",
      import: "default",
    });

    return Object.entries(musicFiles).map(([path, url]) => ({
      name: extractFilename(path),
      source: url as string,
    }));
  });

  const addTracksToPlaylist = useCallback((files: File[]) => {
    const newTracks = files.map((file) => ({
      name: file.name,
      source: file,
    }));
    setPlaylist((prev) => [...prev, ...newTracks]);
    return newTracks.length;
  }, []);

  return {
    playlist,
    addTracksToPlaylist,
  };
};

/**
 * Hook to manage playback controls
 */
export const usePlaybackControls = (
  playlist: Track[],
  currentTrackIndex: number,
  setCurrentTrackIndex: (index: number) => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = useCallback(
    (index: number) => {
      if (index >= 0 && index < playlist.length) {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
      }
    },
    [playlist.length, setCurrentTrackIndex]
  );

  const togglePlay = useCallback(() => {
    if (currentTrackIndex === -1 && playlist.length > 0) {
      playTrack(0);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [currentTrackIndex, playlist.length, playTrack]);

  const nextTrack = useCallback(() => {
    if (currentTrackIndex < playlist.length - 1) {
      playTrack(currentTrackIndex + 1);
    } else {
      playTrack(0);
    }
  }, [currentTrackIndex, playlist.length, playTrack]);

  const prevTrack = useCallback(() => {
    if (currentTrackIndex > 0) {
      playTrack(currentTrackIndex - 1);
    }
  }, [currentTrackIndex, playTrack]);

  return {
    isPlaying,
    setIsPlaying,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
  };
};

/**
 * Hook to manage time and duration
 */
export const useAudioTime = () => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const updateTime = useCallback((audioElement: HTMLAudioElement) => {
    setCurrentTime(audioElement.currentTime);
  }, []);

  const updateDuration = useCallback((audioElement: HTMLAudioElement) => {
    setDuration(audioElement.duration);
  }, []);

  return {
    duration,
    currentTime,
    updateTime,
    updateDuration,
  };
};
