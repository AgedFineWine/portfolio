import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

import { useRef } from 'react';

function BaseModel() {
  const earthRef = useRef<THREE.Mesh>(null!);

  const colorMap = useLoader(THREE.TextureLoader, 'earth4k/earthmap4k.jpg');
  const bumpMap = useLoader(THREE.TextureLoader, 'earth4k/earthbump4k.jpg');
  const specularMap = useLoader(THREE.TextureLoader, 'earth4k/earthspec4k.jpg');

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

export default BaseModel;
