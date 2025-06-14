import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { useRef, useMemo } from 'react';

function Stars() {
  const starRef = useRef<THREE.Points>(null!);

  const starVertices = useMemo(() => {
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      vertices.push(x, y, z);
    }
    return new Float32Array(vertices);
  }, []); // We only need to run it once for initial population.

  /* Rotate the stars slowly */
  useFrame(() => {
    starRef.current.rotation.y -= 0.0001;
  });

  return (
    <>
      <points ref={starRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starVertices, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color={0xffffff}></pointsMaterial>
      </points>
    </>
  )
}

export default Stars;
