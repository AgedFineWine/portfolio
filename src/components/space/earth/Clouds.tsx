import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';

import { useRef } from 'react';

import clouds from '../../../assets/earth/clouds_4k.jpg';

export default function Clouds() {
	const cloudMap = useLoader(THREE.TextureLoader, clouds);
	const cloudRef = useRef<THREE.Mesh>(null!);

	useFrame(() => {
		cloudRef.current.rotation.y += 0.0005;
	});

	return (
		// <mesh ref={Bref} rotation={[0, 0, -23.5 * Math.PI / 180]} scale={1.008}>
		<mesh ref={cloudRef} scale={1.008}>
			<sphereGeometry args={[1, 50, 50]} />
			<meshStandardMaterial
				map={cloudMap}
				transparent={true}
				opacity={0.8}
				blending={THREE.AdditiveBlending}
			/>
		</mesh>
	);
}
