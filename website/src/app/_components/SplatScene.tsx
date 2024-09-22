import { Grid, Splat } from "@react-three/drei";

function SplatScene() {
  return (
    <>
      {/* <Grid></Grid> */}

      <group rotation={[0, 0.02, 0]} position={[-1.5, -2, 0.35]}>
        <Splat
          src="/gsplats/click here installation-supersplat-nowall-wide.splat"
          alphaTest={0.0}
          scale={1}
        />
      </group>
    </>
  );
}

export default SplatScene;
