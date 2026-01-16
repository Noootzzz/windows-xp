import CanvasRoot from "./canvas/Canvas";
import InteractionHint from "./components/InteractionHint";

export default function App() {
  return (
    <div className="relative w-screen h-screen">
      <div
        id="canvas-container"
        className="absolute inset-0 z-0"
      >
        <CanvasRoot />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <InteractionHint />
      </div>
    </div>
  );
}
