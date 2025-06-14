import * as THREE from 'three';

import fresnelVertexShader from './shaders/fresnelVertex.glsl';
import fresnelFragmentShader from './shaders/fresnelFragment.glsl';

function Fresnel() {
	const rimHex = 0x0099ff;
	const facingHex = 0x000000;

	return (
		<mesh scale={1.005}>
			<sphereGeometry args={[1, 50, 50]} />
			<shaderMaterial
				vertexShader={fresnelVertexShader}
				fragmentShader={fresnelFragmentShader}
				uniforms={{
					color1: { value: new THREE.Color(rimHex) },
					color2: { value: new THREE.Color(facingHex) },
					fresnelBias: { value: 0.1 },
					fresnelScale: { value: 1.0 },
					fresnelPower: { value: 4.0 },
				}}
				blending={THREE.AdditiveBlending}
			>
			</shaderMaterial>
		</mesh>
	)
}

export default Fresnel;
