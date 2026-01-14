import React from "react";
import { Music } from "lucide-react";
import { NowPlaying } from "../../../components/ui/media-player";
import { PLAYER_COLORS, MESSAGES } from "../constants";
import { formatDuration } from "../utils";
import type { Track } from "../types";

interface NowPlayingSectionProps {
  currentTrack: Track | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export const NowPlayingSection: React.FC<NowPlayingSectionProps> = ({
  currentTrack,
  currentTime,
  duration,
  isPlaying,
}) => {
  const trackName = currentTrack?.name || MESSAGES.NO_MUSIC_LOADED;
  const formattedDuration = formatDuration(currentTime, duration);

  return (
    <NowPlaying
      title={trackName}
      duration={formattedDuration}
      icon={
        <Music
          className="text-[#ccff00]"
          size={32}
          style={{ color: PLAYER_COLORS.ACCENT }}
        />
      }
      visualizer
      isPlaying={isPlaying}
    />
  );
};
