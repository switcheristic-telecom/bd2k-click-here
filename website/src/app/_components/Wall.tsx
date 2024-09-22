import { useLoader } from "@react-three/fiber";

import * as THREE from "three";

const REPEAT = 2;
function Wall() {
  const colorMap = useLoader(
    THREE.TextureLoader,
    "/textures/cement_arcing_pattern1_bl/cement_arcing_pattern1_albedo.png",
  );
  const normalMap = useLoader(
    THREE.TextureLoader,
    "/textures/cement_arcing_pattern1_bl/cement_arcing_pattern1_Normal-ogl.png",
  );
  const ambientOcclusionMap = useLoader(
    THREE.TextureLoader,
    "/textures/cement_arcing_pattern1_bl/cement_arcing_pattern1_ao.png",
  );

  const heightMap = useLoader(
    THREE.TextureLoader,
    "/textures/cement_arcing_pattern1_bl/cement_arcing_pattern1_Height.png",
  );

  const roughnessMap = useLoader(
    THREE.TextureLoader,
    "/textures/cement_arcing_pattern1_bl/cement_arcing_pattern1_Roughness.png",
  );

  // set repeat to 2
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(REPEAT, REPEAT);

  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(REPEAT, REPEAT);

  ambientOcclusionMap.wrapS = THREE.RepeatWrapping;
  ambientOcclusionMap.wrapT = THREE.RepeatWrapping;
  ambientOcclusionMap.repeat.set(REPEAT, REPEAT);

  heightMap.wrapS = THREE.RepeatWrapping;
  heightMap.wrapT = THREE.RepeatWrapping;
  heightMap.repeat.set(REPEAT, REPEAT);

  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(REPEAT, REPEAT);

  return (
    <mesh position={[0.6, 0, 0]}>
      <planeGeometry args={[9, 5, 1, 1]} />
      <meshPhysicalMaterial
        map={colorMap}
        // color={"#908478"}
        normalMap={normalMap}
        aoMap={ambientOcclusionMap}
        displacementMap={heightMap}
        displacementScale={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default Wall;
