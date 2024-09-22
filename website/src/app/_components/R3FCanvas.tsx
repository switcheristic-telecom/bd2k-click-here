"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Splat } from "@react-three/drei";
import SplatScene from "./SplatScene";
import Wall from "./Wall";
import ProjectorScreen from "./ProjectorScreen";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize, Resolution } from "postprocessing";
import { Suspense } from "react";

function R3FCanvas() {
  return (
    <Canvas camera={{ position: [-3, 0, 3], fov: 75, near: 0.1, far: 100 }}>
      <EffectComposer>
        <Bloom
          intensity={1} // The bloom intensity.
          blurPass={undefined} // A blur pass.
          kernelSize={KernelSize.LARGE} // blur kernel size
          luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
          mipmapBlur={false} // Enables or disables mipmap blur.
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        />
      </EffectComposer>

      <OrbitControls
        enablePan={false}
        maxAzimuthAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        maxPolarAngle={(Math.PI / 3) * 2}
        minPolarAngle={Math.PI / 3}
        maxDistance={5}
        minDistance={0.5}
      />
      <ambientLight intensity={3} color={"#e0dcca"} />
      <pointLight position={[10, 10, 10]} />
      <SplatScene />
      <group position={[0, 0.1, -0.5]}>
        <Wall />
        <ProjectorScreen />
      </group>
    </Canvas>
  );
}

export default R3FCanvas;
