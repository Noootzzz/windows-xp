import { Html, useGLTF, useVideoTexture } from "@react-three/drei";
import computerModel from "../../assets/models/Computer.glb";
import {
  useExperienceStore,
  useScreenStore,
} from "../store/useExperienceStore";
import { useEffect, useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { Background } from "../../components/layout/Background";
import { AlbumCoverGenerator } from "../../components/apps/AlbumCoverGenerator";
import { MusicPlayer } from "../../components/apps/MusicPlayer";
import { Taskbar } from "../../components/layout/Taskbar";

export default function Screen() {
  const { scene } = useGLTF(computerModel);
  const setMode = useExperienceStore((s) => s.setMode);
  const mode = useExperienceStore((s) => s.mode);
  const screen = useScreenStore((s) => s.screen);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const videoTexture = useVideoTexture("/videos/demo.mp4", {
    muted: true,
    loop: true,
    start: true,
  });
  const monitor003Ref = useRef<THREE.Object3D | null>(null);
  const monitor003 = useMemo(() => {
    const original = scene.getObjectByName("Monitor003");
    return original ? original.clone(true) : null;
  }, [scene]);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  // Album Cover Generator State
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isWindowMinimized, setIsWindowMinimized] = useState(false);

  // Music Player State
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isMusicPlayerMinimized, setIsMusicPlayerMinimized] = useState(false);

  // Custom Hook for Audio Logic
  const audioPlayer = useAudioPlayer();

  const toggleWindow = () => {
    if (!isWindowOpen) {
      setIsWindowOpen(true);
      setIsWindowMinimized(false);
    } else {
      setIsWindowMinimized(!isWindowMinimized);
    }
  };

  const toggleMusicPlayer = () => {
    if (!isMusicPlayerOpen) {
      setIsMusicPlayerOpen(true);
      setIsMusicPlayerMinimized(false);
    } else {
      setIsMusicPlayerMinimized(!isMusicPlayerMinimized);
    }
  };

  useEffect(() => {
    if (monitor003 && !materialRef.current) {
      videoTexture.flipY = false;
      videoTexture.rotation = Math.PI / 2;
      videoTexture.center.set(0.5, 0.5);
      videoTexture.repeat.set(1, 1);

      monitor003.traverse((child: any) => {
        if (child.isMesh && !materialRef.current) {
          materialRef.current = new THREE.MeshBasicMaterial({
            map: videoTexture,
            color: 0xffffff,
          });
          child.material = materialRef.current;
        }
      });
    }
  }, [monitor003, videoTexture]);

  useEffect(() => {
    if (materialRef.current) {
      if (screen === "off") {
        materialRef.current.color.setHex(0x000000);
        materialRef.current.opacity = 1;
      } else {
        materialRef.current.color.setHex(0xffffff);
        materialRef.current.opacity = 1;
      }
      materialRef.current.needsUpdate = true;
    }
  }, [screen]);

  return (
    <group scale={0.5} position={[0, 0, 0]}>
      {monitor003 && (
        <primitive
          ref={monitor003Ref}
          object={monitor003}
          receiveShadow
          castShadow
          onClick={(e: any) => {
            e.stopPropagation();
            if (mode === "focus") {
              return;
            }
            setMode("focus");
          }}
        >
          <Html
            transform
            position={[0,0.2,0.4]}
            className="htmlScreen"
            occlude="blending"
            style={{ width: "1200px", height: "1050px", overflow: "hidden" }}
            scale={0.20}
          >
              <div className="h-full w-full overflow-hidden bg-black relative selection:bg-blue-500 selection:text-white">
                <Background
                  selectedIcon={selectedIcon}
                  setSelectedIcon={setSelectedIcon}
                  openAlbumCover={() => {
                    setIsWindowOpen(true);
                    setIsWindowMinimized(false);
                  }}
                  openMusicPlayer={() => {
                    setIsMusicPlayerOpen(true);
                    setIsMusicPlayerMinimized(false);
                  }}
                />

                {/* Hidden Global Audio Element to persist playback */}
                <audio
                  ref={audioPlayer.audioRef}
                  onTimeUpdate={audioPlayer.updateTime}
                  onDurationChange={audioPlayer.updateDuration}
                  onEnded={audioPlayer.nextTrack}
                />

                {/* Window: Album Cover Generator */}
                {isWindowOpen && !isWindowMinimized && (
                  <AlbumCoverGenerator
                    onClose={() => setIsWindowOpen(false)}
                    onMinimize={() => setIsWindowMinimized(true)}
                  />
                )}

                {/* Window: Music Player */}
                {isMusicPlayerOpen && !isMusicPlayerMinimized && (
                  <MusicPlayer
                    onClose={() => setIsMusicPlayerOpen(false)}
                    onMinimize={() => setIsMusicPlayerMinimized(true)}
                    audioState={audioPlayer}
                  />
                )}

                <Taskbar
                  isWindowOpen={isWindowOpen}
                  isWindowMinimized={isWindowMinimized}
                  toggleWindow={toggleWindow}
                  isMusicPlayerOpen={isMusicPlayerOpen}
                  isMusicPlayerMinimized={isMusicPlayerMinimized}
                  toggleMusicPlayer={toggleMusicPlayer}
                />
              </div>
              {mode !== "focus" && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                  onClick={() => setMode("focus")}
                />
              )}
          </Html>
        </primitive>
      )}
    </group>
  );
}
