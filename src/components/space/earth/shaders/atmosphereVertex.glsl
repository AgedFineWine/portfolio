// varying vec3 vertexNormal;

// void main() {
//     vertexNormal = normalize(normalMatrix * normal);

//     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
// }

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    vNormal = normalize(mat3(modelMatrix) * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}