import * as THREE from 'three';

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

function Atmosphere() {
	return (
		// <mesh rotation={[0, 0, -23.5 * Math.PI / 180]} scale={[1.1, 1.1, 1.1]}>
		<mesh scale={[1.1, 1.1, 1.1]}>
			<sphereGeometry args={[1.0, 50, 50]} scale={1.05} />
			<shaderMaterial
				fragmentShader={atmosphereFragmentShader}
				vertexShader={atmosphereVertexShader}
				blending={THREE.AdditiveBlending}
				side={THREE.BackSide}
			>
			</shaderMaterial>
		</mesh>
	);
}

export default Atmosphere;
