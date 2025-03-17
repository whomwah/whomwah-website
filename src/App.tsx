import { Canvas } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import { MeshBasicMaterial } from "three";
import { Html } from "./lib/html";
import "./App.css";

/**
 * Main application component with centered content layout
 * @returns {JSX.Element} Rendered application component
 */
function App() {
  return (
    <div className="container">
      <div className="html-content">
        <Html />
      </div>
      <div className="canvas-content">
        <Canvas camera={{ position: [0, 0, 5], fov: 100 }}>
          <Clouds material={MeshBasicMaterial}>
            <Cloud
              segments={20}
              bounds={[4, 0.1, 2]}
              volume={10}
              color="orange"
              speed={0.1}
              scale={0.8}
            />
            <Cloud
              seed={1}
              bounds={[4, 0.5, 2]}
              scale={1}
              volume={5}
              color="yellow"
            />
          </Clouds>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
