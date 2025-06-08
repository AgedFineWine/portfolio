import * as THREE from "three";

function atmosphere() {
    // for atmosphere
    const fs = `
 varying vec3 vertexNormal;

 void main() {
    float intensity = pow(0.8 - dot(vertexNormal, vec3(0.0, 0.0, 1.0) ), 2.0);

     gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
 }
   `;

   const vs = `
varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    vertexUV = uv;
    vertexNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(
        position, 1.0
    );
}
`;

//   const vs = `
// varying vec2 vertexUV;
// varying vec3 vertexNormal;

// void main() {
//     vertexUV = uv;
//     vertexNormal = normal;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(
//         position, 1.0
//     );
// }
//   `;
//   const fs = `
// uniform sampler2D globeTexture;

// varying vec3 vertexNormal;
// varying vec2 vertexUV;

// void main() {
//     float intensity = 1.05 - dot(vertexNormal, vec3(0.0,0.0,1.0));
//     vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

//     gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
// }
//   `;
  const fresnelMat = new THREE.ShaderMaterial({
    // uniforms: {
    //     globeTexture: {
    //         value: new THREE.TextureLoader().load(
    //             'earth4k/earthmap4k.jpg' // or any texture you want to use
    //         )
    //     }
    // },
    vertexShader: vs,
    fragmentShader: fs,
    // transparent: true,
    blending: THREE.AdditiveBlending,
    // wireframe: true,

    side: THREE.BackSide, // Render the back side for atmosphere effect
  });
  return fresnelMat;
}

export { atmosphere };