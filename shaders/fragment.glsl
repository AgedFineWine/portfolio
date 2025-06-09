uniform sampler2D globeTexture;
uniform sampler2D lightsTexture;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {

    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    vec4 texel = texture2D(globeTexture, vertexUV);
    vec4 lights = texture2D(lightsTexture, vertexUV);

    gl_FragColor = vec4(atmosphere + texel.xyz, 1.0);
}
