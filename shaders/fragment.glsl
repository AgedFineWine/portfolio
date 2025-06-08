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

// precision mediump float;

// uniform sampler2D globeTexture;
// uniform sampler2D lightsTexture;
// uniform vec3 lightDirection;

// varying vec2 vertexUV;
// varying vec3 vertexNormal;

// void main() {
//   vec3 normal = normalize(vertexNormal);
//   vec3 lightDir = normalize(lightDirection);

//   // Compute basic diffuse lighting (Lambert)
//   float diffuse = max(dot(normal, lightDir), 0.0);

//   // Sample color from day and night textures
//   vec3 dayColor = texture2D(globeTexture, vertexUV).rgb;
//   vec3 nightColor = texture2D(lightsTexture, vertexUV).rgb;

//   // Blend based on how much the fragment faces the light
//   vec3 blendedColor = mix(nightColor, dayColor, diffuse);

//   gl_FragColor = vec4(blendedColor, 1.0);
// }
