import * as THREE from 'three';

import { useRef } from 'react';

import { useMarker } from '../../../context/MarkerContext';

function placePointOnGlobe(latitude: number, longitude: number, radius: number = 1): THREE.Vector3 {
	const latRad = THREE.MathUtils.degToRad(latitude);  // Convert latitude to radians
	const lonRad = THREE.MathUtils.degToRad(longitude);  // Convert longitude to radians

	// Convert spherical to Cartesian coordinates
	const x = radius * Math.cos(latRad) * Math.cos(lonRad);
	const y = radius * Math.cos(latRad) * Math.sin(lonRad);
	const z = radius * Math.sin(latRad);

	return new THREE.Vector3(x, z, y);  // y is the lateral axis in Three.js confusingly
}

type MarkerProps = {
	color: string;
	latitude: number;
	longitude: number;
	markerCaption: string;
	markerHeight?: number;
}

function Marker({ color, latitude, longitude, markerCaption, markerHeight=0.2 }: MarkerProps) {
	const { setMarkerHovered, setMarkerCaption } = useMarker();

	const position = placePointOnGlobe(latitude, longitude);
	const ref = useRef<THREE.Mesh>(null!);

	if (ref.current) ref.current.lookAt(new THREE.Vector3(0, 0, 0));

	return (
		<mesh position={position} ref={ref} onPointerOver={() => {
			setMarkerHovered(true);
			setMarkerCaption(markerCaption)
		}}
			onPointerOut={() => {
				setMarkerHovered(false)
			}}
		>
			<boxGeometry args={[0.01, 0.01, markerHeight]} />
			<meshBasicMaterial color={color} opacity={0.5} transparent/> {/* Keyword transparent must be called for opacity to work */}
		</mesh>
	);
}

export default Marker;
