import React, { useEffect, useRef } from "react";
import { Download, Play } from "lucide-react";
import { XPWindow } from "../../components/os/XPWindow";
import { StatusBar } from "../../components/ui/status-bar";

interface AlbumCoverGeneratorProps {
  onClose: () => void;
  onMinimize: () => void;
}

export const AlbumCoverGenerator = ({
  onClose,
  onMinimize,
}: AlbumCoverGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAcid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    const BLACK = "#050505";
    const ACID = "#ccff00";
    const WHITE = "#f0f0f0";

    const words = [
      "TRAVIS",
      "JACK",
      "CACTUS",
      "MODUS",
      "VIVENDI",
      "GAMER",
      "LEVEL",
      "SCORE",
    ];

    ctx.fillStyle = BLACK;
    ctx.fillRect(0, 0, w, h);

    const drawSplatterDots = (
      x: number,
      y: number,
      radius: number,
      color: string
    ) => {
      ctx.fillStyle = color;
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * radius;
        const dotSize = Math.random() * 4 + 1;

        ctx.fillRect(
          x + Math.cos(angle) * dist,
          y + Math.sin(angle) * dist,
          dotSize,
          dotSize
        );
      }
    };

    const drawLCDGrid = () => {
      ctx.fillStyle = "rgba(10, 20, 0, 0.4)";

      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1);
      }
      for (let x = 0; x < w; x += 3) {
        ctx.fillRect(x, 0, 1, h);
      }
    };

    const drawPixelAdvisory = () => {
      const x = w - 60;
      const y = h - 40;

      ctx.fillStyle = WHITE;
      ctx.fillRect(x, y, 50, 30);
      ctx.fillStyle = BLACK;
      ctx.fillRect(x + 2, y + 2, 46, 26);

      ctx.fillStyle = WHITE;
      ctx.font = '8px "Press Start 2P"';
      ctx.fillText("E", x + 25, y + 18);
    };

    const slashCount = 15;

    ctx.lineWidth = 1;

    for (let i = 0; i < slashCount; i++) {
      ctx.beginPath();
      const startX = Math.random() * w;
      const startY = Math.random() * h;
      const length = Math.random() * 300 + 100;

      const angle = -Math.PI / 4 + (Math.random() - 0.5);

      ctx.moveTo(startX, startY);
      for (let j = 0; j < 20; j++) {
        const progress = j / 20;
        ctx.lineWidth = (Math.random() * 30 + 5) * (1 - progress);

        const x = startX + Math.cos(angle) * (length * progress);
        const y = startY + Math.sin(angle) * (length * progress);

        if (Math.random() > 0.3) {
          ctx.lineTo(
            x + (Math.random() * 10 - 5),
            y + (Math.random() * 10 - 5)
          );
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
      }

      ctx.strokeStyle = Math.random() > 0.8 ? WHITE : ACID;
      ctx.stroke();

      ctx.strokeStyle &&
        drawSplatterDots(startX, startY, 50, ctx.strokeStyle as string);
    }

    for (let k = 0; k < 5; k++) {
      ctx.fillStyle = Math.random() > 0.5 ? ACID : BLACK;
      const blockSize = Math.floor(Math.random() * 40 + 10);
      const bx = Math.floor((Math.random() * w) / 10) * 10;
      const by = Math.floor((Math.random() * h) / 10) * 10;

      ctx.fillRect(bx, by, blockSize, blockSize);
      ctx.fillRect(bx + 10, by + 10, blockSize, blockSize);
      ctx.strokeStyle = ACID;
      ctx.strokeRect(bx - 5, by - 5, blockSize + 10, blockSize + 10);
    }

    const word = words[Math.floor(Math.random() * words.length)];
    ctx.font = '40px "Press Start 2P"';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = BLACK;
    ctx.fillText(word, w / 2 + 4, h / 2 + 4);

    ctx.strokeStyle = ACID;
    ctx.lineWidth = 2;
    ctx.strokeText(word, w / 2, h / 2);

    ctx.fillStyle = WHITE;
    ctx.fillText(word, w / 2, h / 2);

    drawLCDGrid();

    drawPixelAdvisory();
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `gameboy_acid_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    generateAcid();
  }, []);

  return (
    <XPWindow
      title="GAMEBOY_ACID_GEN.exe"
      initialPosition={{ x: 300, y: 50 }}
      width="w-[530px]"
      onClose={onClose}
      onMinimize={onMinimize}
      icon="/paint.png"
    >
      <div
        className="flex flex-col bg-[#111]"
        style={{ fontFamily: '"Share Tech Mono", monospace' }}
      >
        <div className="relative flex items-center justify-center bg-[#0a0a0a] p-4">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80"></div>

          <div className="relative z-10 p-1 bg-[#222] border-t border-l border-[#444] border-b border-r border-[#000] shadow-2xl w-full">
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="w-full h-auto block bg-[#0f380f]"
              style={{
                imageRendering: "pixelated",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center p-6 bg-[#181818] border-t border-[#333]">
          <button
            onClick={generateAcid}
            className="px-8 py-4 bg-[#252525] text-[#ccff00] border border-[#ccff00]/40 hover:border-[#ccff00] rounded-[2px] text-base cursor-pointer hover:bg-[#ccff00]/10 transition-all flex items-center gap-3 font-bold tracking-widest uppercase shadow-md active:translate-y-[1px]"
            style={{ fontFamily: '"Share Tech Mono", monospace' }}
          >
            <Play size={24} className="text-[#ccff00]" />
            GENERATE ACID
          </button>
          <button
            onClick={downloadArt}
            className="px-8 py-4 bg-[#252525] text-[#888] hover:text-white border border-[#444] hover:border-[#888] rounded-[2px] text-base cursor-pointer hover:bg-[#333] transition-all flex items-center gap-3 font-bold tracking-widest uppercase shadow-md active:translate-y-[1px]"
            style={{ fontFamily: '"Share Tech Mono", monospace' }}
          >
            <Download size={24} />
            SAVE TO DISK
          </button>
        </div>
      </div>

      <StatusBar>Ready</StatusBar>
    </XPWindow>
  );
};
