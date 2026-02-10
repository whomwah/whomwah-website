import { Canvas } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import { MeshBasicMaterial } from "three";
import { Html } from "./lib/html";
import { hslToHex } from "./lib/color";
import "./App.css";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const createPalette = () => {
  const randomInRange = (min: number, max: number) =>
    min + Math.random() * (max - min);

  const hue = randomInRange(0, 360) / 360;
  const saturation = randomInRange(0.75, 0.92);
  const lightness = randomInRange(0.55, 0.68);

  const accent = hslToHex(hue, saturation, lightness);
  const accentSoft = hslToHex(
    hue,
    clamp(saturation - 0.18, 0.55, 0.85),
    clamp(lightness + 0.12, 0.6, 0.82),
  );
  const accentDeep = hslToHex(
    hue,
    clamp(saturation + 0.08, 0.7, 0.98),
    clamp(lightness - 0.18, 0.28, 0.52),
  );
  // Off-white text for contrast against colored clouds
  const h1Hex = "rgba(255, 255, 255, 0.92)";

  return {
    accent,
    accentSoft,
    accentDeep,
    h1Hex,
  };
};

/**
 * Main application component with centered content layout
 * @returns {JSX.Element} Rendered application component
 */
function App() {
  const palette = useMemo(() => createPalette(), []);
  const containerStyle =
    {
      "--accent": palette.accent,
      "--accent-soft": palette.accentSoft,
      "--accent-deep": palette.accentDeep,
      "--h1": palette.h1Hex,
    } as CSSProperties;

  return (
    <div className="container" style={containerStyle}>
      <div className="html-content">
        <Html />
      </div>
      <div className="canvas-content">
        <Canvas camera={{ position: [0, 0, 5], fov: 100 }}>
          <Clouds material={MeshBasicMaterial} position={[0, 0, 0]}>
            <Cloud
              segments={20}
              bounds={[10, 0.1, 2]}
              volume={10}
              color={palette.accentDeep}
              speed={0.1}
              scale={0.8}
              position={[0, 0, 0]}
            />
            <Cloud
              seed={1}
              bounds={[10, 0.5, 2]}
              scale={1}
              volume={5}
              color={palette.accentSoft}
              position={[0, 0, 0]}
            />
          </Clouds>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
