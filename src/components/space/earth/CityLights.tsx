import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

import lights from '../../../assets/lights_4k.jpg'

export default function Lights() {
  const lightsMap = useLoader(THREE.TextureLoader, lights);

  return (
    // <mesh rotation={[0, 0, -23.5 * Math.PI / 180]}>
    <mesh >
      <sphereGeometry args={[1, 50, 50]} />
      <meshBasicMaterial map={lightsMap} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}
