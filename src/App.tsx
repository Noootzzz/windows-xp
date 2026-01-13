import CanvasRoot from "./canvas/Canvas";

export default function App() {
  return (
    <>
      
      <div
        id="canvas-container"
        className="absolute top-0 left-0 w-screen h-screen"
      >
        <CanvasRoot />
      </div>
    </>
  );
}
