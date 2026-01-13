import React, { useState, useRef, useEffect } from "react";

export interface Track {
  name: string;
  source: File | string;
}

export const useAudioPlayer = () => {
  const [playlist, setPlaylist] = useState<Track[]>(() => {
    const musicFiles = import.meta.glob("/src/assets/musics/*.mp3", {
      eager: true,
      query: "?url",
      import: "default",
    });

    return Object.entries(musicFiles).map(([path, url]) => {
      const name = path.split("/").pop() || "Unknown Track";
      return {
        name,
        source: url as string,
      };
    });
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.3);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        source: file,
      }));
      setPlaylist((prev) => [...prev, ...newFiles]);
      if (
        currentTrackIndex === -1 &&
        playlist.length === 0 &&
        newFiles.length > 0
      ) {
        setCurrentTrackIndex(0);
      }
    }
  };

  const playTrack = (index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (currentTrackIndex === -1 && playlist.length > 0) {
      playTrack(0);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex < playlist.length - 1) {
      playTrack(currentTrackIndex + 1);
    } else {
      playTrack(0);
    }
  };

  const prevTrack = () => {
    if (currentTrackIndex > 0) {
      playTrack(currentTrackIndex - 1);
    }
  };

  const activeTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (activeTrack && audioRef.current) {
      let fileUrl = "";
      if (activeTrack.source instanceof File) {
        fileUrl = URL.createObjectURL(activeTrack.source);
      } else {
        fileUrl = activeTrack.source as string;
      }

      audioRef.current.src = fileUrl;
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error("Play failed", e));
      }

      return () => {
        if (activeTrack.source instanceof File) {
          URL.revokeObjectURL(fileUrl);
        }
      };
    }
  }, [activeTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const updateDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

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
    updateTime,
    updateDuration,
    volume,
    setVolume,
  };
};
