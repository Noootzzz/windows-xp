import { useEffect, useState, useCallback } from "react";
import { useScreenStore } from "../core/store";

const BOOT_LINES = [
  { text: "Award Modular BIOS v6.00PG", delay: 30 },
  { text: "Copyright (C) 1984-2001, Award Software, Inc.", delay: 20 },
  { text: "", delay: 50 },
  { text: "Intel Pentium III 800MHz Processor", delay: 40 },
  { text: "Memory Test: 262144K OK", delay: 80 },
  { text: "", delay: 30 },
  { text: "Detecting Primary Master... Maxtor 40GB", delay: 50 },
  { text: "Detecting Primary Slave... None", delay: 30 },
  { text: "Detecting Secondary Master... CD-ROM", delay: 40 },
  { text: "Detecting Secondary Slave... None", delay: 30 },
  { text: "", delay: 40 },
  { text: "Press DEL to enter SETUP", delay: 60 },
  { text: "", delay: 80 },
  { text: "Starting Windows XP...", delay: 150 },
  { text: "", delay: 50 },
];

const LOADING_STEPS = [
  "Loading system files...",
  "Initializing hardware...",
  "Loading drivers...",
  "Starting services...",
  "Preparing desktop...",
];

export function BootScreen() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const { setScreen } = useScreenStore();
  useEffect(() => {
    if (currentLineIndex >= BOOT_LINES.length) {
      setShowLoading(true);
      return;
    }

    const currentLine = BOOT_LINES[currentLineIndex];
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, currentLine.text]);
      setCurrentLineIndex((prev) => prev + 1);
    }, currentLine.delay);

    return () => clearTimeout(timer);
  }, [currentLineIndex]);

  useEffect(() => {
    if (!showLoading) return;

    const stepDuration = 20;
    const totalSteps = 100;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setLoadingProgress(step);

      const textIndex = Math.floor((step / totalSteps) * LOADING_STEPS.length);
      if (textIndex < LOADING_STEPS.length) {
        setLoadingText(LOADING_STEPS[textIndex]);
      }

      if (step >= totalSteps) {
        clearInterval(interval);
          setTimeout(() => {
          setScreen("on");
        }, 200);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [showLoading, setScreen]);

  const generateProgressBar = useCallback((progress: number) => {
    const width = 40;
    const filled = Math.floor((progress / 100) * width);
    const empty = width - filled;
    return `[${"█".repeat(filled)}${"░".repeat(empty)}] ${progress}%`;
  }, []);

  return (
    <div
      className="w-[1200px] h-[1050px] bg-black overflow-hidden relative"
      style={{ fontFamily: '"Perfect DOS VGA 437", "Courier New", monospace' }}
    >
      {/* Safe Area */}
      <div className="absolute top-[55px] left-[55px] right-[55px] bottom-[55px]">
        <div
          className="text-[#aaaaaa] text-lg leading-[1.4] whitespace-pre-wrap"
          style={{ textShadow: '0 0 5px rgba(170, 170, 170, 0.5)' }}
        >
          {displayedLines.map((line, index) => (
            <div
              key={index}
              className="min-h-[1.4em] animate-[fadeIn_0.1s_ease-in]"
            >
              {line}
            </div>
          ))}

          {showLoading && (
            <div className="mt-5">
              <div className="min-h-[1.4em]">{loadingText}</div>
              <div
                className="mt-2.5 text-[#ccff00] text-base tracking-normal"
                style={{ textShadow: '0 0 8px rgba(204, 255, 0, 0.6)' }}
              >
                {generateProgressBar(loadingProgress)}
              </div>
            </div>
          )}

          {!showLoading && (
            <span className="text-[#aaaaaa] animate-[blink_0.5s_step-end_infinite]">█</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default BootScreen;
