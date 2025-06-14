import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

function Lights() {
  const lightsMap = useLoader(THREE.TextureLoader, 'earth4k/earthlights4k.jpg');

  return (
    // <mesh rotation={[0, 0, -23.5 * Math.PI / 180]}>
    <mesh >
      <sphereGeometry args={[1, 50, 50]} />
      <meshBasicMaterial map={lightsMap} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

export default Lights;
