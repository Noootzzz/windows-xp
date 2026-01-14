import React, { useState, useRef, useEffect, useCallback } from "react";
import { PLAYER_CONFIG } from "../features/music-player/constants";
import {
  usePlaylist,
  usePlaybackControls,
  useAudioTime,
} from "../features/music-player/hooks/playback";
import { getAudioUrl, isFileSource } from "../features/music-player/utils";
import type { Track } from "../features/music-player/types";

export type { Track };

/**
 * Main audio player hook that orchestrates all music player functionality
 */
export const useAudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [volume, setVolume] = useState(PLAYER_CONFIG.DEFAULT_VOLUME);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { playlist, addTracksToPlaylist } = usePlaylist();

  const { isPlaying, playTrack, togglePlay, nextTrack, prevTrack } =
    usePlaybackControls(playlist, currentTrackIndex, setCurrentTrackIndex);

  const { duration, currentTime, updateTime, updateDuration } = useAudioTime();

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        const addedCount = addTracksToPlaylist(newFiles);

        if (
          currentTrackIndex === -1 &&
          playlist.length === 0 &&
          addedCount > 0
        ) {
          setCurrentTrackIndex(0);
        }
      }
    },
    [addTracksToPlaylist, currentTrackIndex, playlist.length]
  );

  const activeTrack = playlist[currentTrackIndex];

  // Handle track changes
  useEffect(() => {
    if (activeTrack && audioRef.current) {
      const fileUrl = getAudioUrl(activeTrack.source);
      audioRef.current.src = fileUrl;

      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error("Play failed", e));
      }

      return () => {
        if (isFileSource(activeTrack.source)) {
          URL.revokeObjectURL(fileUrl);
        }
      };
    }
  }, [activeTrack]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleUpdateTime = useCallback(() => {
    if (audioRef.current) {
      updateTime(audioRef.current);
    }
  }, [updateTime]);

  const handleUpdateDuration = useCallback(() => {
    if (audioRef.current) {
      updateDuration(audioRef.current);
    }
  }, [updateDuration]);

  return {
    playlist,
    currentTrackIndex,
    isPlaying,
    duration,
    currentTime,
    audioRef,
    fileInputRef,
    handleFileSelect,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    updateTime: handleUpdateTime,
    updateDuration: handleUpdateDuration,
    volume,
    setVolume,
  };
};
