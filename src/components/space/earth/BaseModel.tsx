import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

import { useRef } from 'react';

import earth from '../../../assets/earth/earth_4k.jpg';
import earthBump from '../../../assets/earth/earthbump_4k.jpg';
import earthSpec from '../../../assets/earth/earthspec_4k.jpg';

export default function BaseModel() {
  const earthRef = useRef<THREE.Mesh>(null!);

  const colorMap = useLoader(THREE.TextureLoader, earth);
  const bumpMap = useLoader(THREE.TextureLoader, earthBump);
  const specularMap = useLoader(THREE.TextureLoader, earthSpec);

  return (
    // // Uncomment the line below to rotate the Earth model for the 23.5 degree tilt
    // <mesh ref={earthRef} rotation={[0, 0, -23.5 * Math.PI / 180]}>
    <mesh ref={earthRef} >
      <sphereGeometry args={[1, 50, 50]} />
      <meshPhongMaterial
        map={colorMap}
        bumpMap={bumpMap}
        specularMap={specularMap}
        bumpScale={0.04}
      />
    </mesh>
  );
}
