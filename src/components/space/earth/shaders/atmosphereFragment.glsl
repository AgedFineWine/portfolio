// varying vec3 vertexNormal;

// void main() {
//     // float intensity = pow(0.8 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
//     float intensity = pow(0.8 - dot(vertexNormal, normalize(cameraPosition)), 2.0);
//     gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
// }

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
    float fresnel = pow(0.5 - dot(normalize(vNormal), normalize(vViewDir)), 6.0);
    vec3 baseColor = vec3(0.3, 0.6, 1.0);
    gl_FragColor = vec4(baseColor * fresnel, 1.0);
}
