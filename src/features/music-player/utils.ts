/**
 * Formats time in seconds to MM:SS format
 */
export const formatTime = (time: number): string => {
  if (isNaN(time)) return "00:00";
  
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Formats duration string with current time and total duration
 */
export const formatDuration = (currentTime: number, duration: number): string => {
  return `${formatTime(currentTime)} / ${formatTime(duration)}`;
};

/**
 * Extracts filename from a path
 */
export const extractFilename = (path: string): string => {
  return path.split("/").pop() || "Unknown Track";
};

/**
 * Creates a URL from a File object
 */
export const createFileUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Checks if a source is a File object
 */
export const isFileSource = (source: File | string): source is File => {
  return source instanceof File;
};

/**
 * Gets the URL for an audio source (either File or string)
 */
export const getAudioUrl = (source: File | string): string => {
  return isFileSource(source) ? createFileUrl(source) : source;
};
