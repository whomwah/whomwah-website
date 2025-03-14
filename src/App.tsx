import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { Html } from "./lib/html";
import { Mesh } from "three";

/**
 * Box component that renders a rotating 3D cube
 * @param {Object} props - Component properties
 * @param {[number, number, number]} props.position - 3D position coordinates
 * @returns {JSX.Element} Rendered box component
 */
function Box({ position }: { position: [x: number, y: number, z: number] }) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>(null!);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => (ref.current.rotation.x += delta));

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
}

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
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight
              position={[-10, -10, -10]}
              decay={0}
              intensity={Math.PI}
            />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
