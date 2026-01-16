import CanvasRoot from "./canvas/Canvas";
import InteractionHint from "./components/InteractionHint";
import IntroScreen from "./components/IntroScreen";
import { useScreenStore } from "./core/store";

export default function App() {
  const { screen } = useScreenStore();

  return (
    <div className="relative w-screen h-screen">
      <div id="canvas-container" className="absolute inset-0 z-0">
        <CanvasRoot />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <InteractionHint />
      </div>
      {screen === "intro" && (
        <div className="absolute inset-0 z-50">
          <IntroScreen />
        </div>
      )}
    </div>
  );
}
