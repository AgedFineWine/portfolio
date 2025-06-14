import * as THREE from 'three';

import { useMemo } from 'react';

function OrbitRing({ radius = 50, segments = 128 }) {
	const line = useMemo(() => {
		const curve = new THREE.EllipseCurve(
			0, 0,
			radius, radius,
			0, 2 * Math.PI,
			false,
			0
		);

		const points = curve.getPoints(segments);
		const geometry = new THREE.BufferGeometry().setFromPoints(points);

		const material = new THREE.LineDashedMaterial({
			color: 0xffffff,
			dashSize: 0.7,
			gapSize: 0.2,
			transparent: true,
			opacity: 0.5
		});

		const line = new THREE.Line(geometry, material);
		line.computeLineDistances();
		return line;
	}, [radius, segments]);

	return (
		<primitive
			position={[-50, 0, 0,]}
			rotation={[Math.PI / 2, 0, 0]}
			object={line}
		/>
	)
}

export default OrbitRing;
