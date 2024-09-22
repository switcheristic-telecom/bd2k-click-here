import { useLoader } from "@react-three/fiber";
import {
  RectAreaLightHelper,
  RectAreaLightUniformsLib,
} from "three/examples/jsm/Addons.js";
import * as THREE from "three";

import { useThree } from "@react-three/fiber";

const aspectRatio = 4 / 3;
function ProjectorScreen() {
  const colorMap = useLoader(THREE.TextureLoader, "/images/yuquanwin.png");

  // convert to RGBA
  colorMap.format = THREE.RGBAFormat;

  return (
    <>
      <mesh position={[1, 0.4, 0.05]}>
        <planeGeometry args={[5, 5 / aspectRatio, 1, 1]} />
        <meshPhysicalMaterial
          map={colorMap}
          displacementScale={0.1}
          side={THREE.DoubleSide}
          // emissiveMap={colorMap}
          emissiveIntensity={0.23}
          emissive={"#fff"}
        />
      </mesh>
    </>
  );
}

export default ProjectorScreen;
