import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Camera from "./Camera";
import Lights from "./Lights";
import Computer from "./models/Computer";
import Environment from "./Environment";
import Screen from "./models/Screen";
import ComputerCase from "./models/ComputerCase";
import KeyBoard from "./models/KeyBoard";
import { useExperienceStore } from "../store/useExperienceStore";
import Desk from "./models/Desk";

export default function Experience() {
  const mode = useExperienceStore((s) => s.mode);

  return (
    <>
      <Camera />
      <OrbitControls
        enabled={mode !== "focus"}
        enableDamping
        dampingFactor={0.05}
        target={[0, 0.8, 2]}
      />
      <Lights />
      <Environment />

      <Suspense fallback={null}>
        <Desk />
        <Screen />
        <Computer />
        <ComputerCase />
        <KeyBoard />
      </Suspense>
      </>
  );
}
