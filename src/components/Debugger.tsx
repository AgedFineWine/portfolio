import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export function CameraDebugger() {
	const { camera } = useThree();

	useFrame(() => {
		const dir = new THREE.Vector3();
		camera.getWorldDirection(dir);

		const dist = 1; // Doesn't matter, we just care about direction
		const target = new THREE.Vector3().copy(camera.position).add(dir.multiplyScalar(dist));
		console.log(`look: ${target.x}, ${target.y}, ${target.z}`);

		console.log(`Camera pos: ${camera.position.x}, ${camera.position.y}, ${camera.position.z}`)
	});

	return null;
}