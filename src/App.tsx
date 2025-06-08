import { useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
// import { FirstPersonControls } from '@react-three/drei';
// import { getFresnelMat } from './util/fresnel.ts';
// import { atmosphere } from './util/atmo.ts';

import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl'
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl'
import fs from '../shaders/fs.glsl'
import vs from '../shaders/vs.glsl'

function Lights() {
  // const lightsMap = useLoader(THREE.TextureLoader, '8k_earth_nightmap.jpg');
  // const lightsMap = useLoader(THREE.TextureLoader, 'earth1k/earthlights1k.jpg');
  const lightsMap = useLoader(THREE.TextureLoader, 'earth4k/earthlights4k.jpg');
  // const lightsMap = useLoader(THREE.TextureLoader, 'earth10k/earthlights10k.jpg');
  const Bref = useRef<THREE.Mesh>(null!);
  // useFrame(() => {
  //   Bref.current.rotation.y += 0.002;
  // });
  return (
    <mesh ref={Bref} rotation={[0, 0, -23.5 * Math.PI / 180]}>
      <sphereGeometry args={[1, 50, 50]} />
      <meshBasicMaterial map={lightsMap} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function Clouds() {
  // const cloudMap = useLoader(THREE.TextureLoader, '8k_earth_clouds.jpg');
  // const cloudMap = useLoader(THREE.TextureLoader, 'earthcloudmap.jpg');
  const cloudMap = useLoader(THREE.TextureLoader, 'earthhiresclouds4K.jpg');
  const Bref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    Bref.current.rotation.y += 0.0005;
  });
  return (
    <mesh ref={Bref} rotation={[0, 0, -23.5 * Math.PI / 180]} scale={1.008}>
      <sphereGeometry args={[1, 50, 50]} />
      <meshStandardMaterial
        map={cloudMap}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Animated() {
  const Bref = useRef<THREE.Mesh>(null!);

  // const colorMap = useLoader(THREE.TextureLoader, '8k_earth_daymap.jpg');
  // const colorMap = useLoader(THREE.TextureLoader, 'earth1k/earthmap1k.jpg');
  // const bumpMap = useLoader(THREE.TextureLoader, 'earth1k/earthbump1k.jpg');
  // const specularMap = useLoader(THREE.TextureLoader, 'earth1k/earthspec1k.jpg');

  const colorMap = useLoader(THREE.TextureLoader, 'earth4k/earthmap4k.jpg');
  const bumpMap = useLoader(THREE.TextureLoader, 'earth4k/earthbump4k.jpg');
  const specularMap = useLoader(THREE.TextureLoader, 'earth4k/earthspec4k.jpg');

  // useFrame(() => {
  //   Bref.current.rotation.y += 0.002;
  // });


  return (
    <mesh ref={Bref} rotation={[0, 0, -23.5 * Math.PI / 180]}>
      <sphereGeometry args={[1, 50, 50]} />
      <meshPhongMaterial
        map={colorMap}
        bumpMap={bumpMap}
        specularMap={specularMap}
        bumpScale={0.04}
      />
    </mesh>
  );
}

function Shader() {
  const rimHex = 0x0099ff;
  const facingHex = 0x000000;
  return (
    <>
    <mesh scale={1.005}>
      <sphereGeometry args={[1, 50, 50]} />
      <shaderMaterial
      vertexShader={vs}
      fragmentShader={fs}
      uniforms={{
        color1: { value: new THREE.Color(rimHex) },
        color2: { value: new THREE.Color(facingHex) },
        fresnelBias: { value: 0.1 },
        fresnelScale: { value: 1.0 },
        fresnelPower: { value: 4.0 },
      }}
      // transparent
      blending={THREE.AdditiveBlending}

      >

      </shaderMaterial>
    </mesh>
    </>
  )
}

function Aura() {

  return (
    <mesh rotation={[0, 0, -23.5 * Math.PI / 180]} scale={[1.1, 1.1, 1.1]}>
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

// function Blue() {
//   const fm = atmosphere();

//   return (
//     <mesh rotation={[0, 0, -23.5 * Math.PI / 180]}>
//       <sphereGeometry args={[1.0, 50, 50]} scale={1.5} />
//       <primitive object={fm} attach="material" />
//     </mesh>
//   );
// }


function Landmark({ lat, lon, name, population, color }) {
  const ref = useRef<THREE.Mesh>(null!);

  function latLongToVector3(lat: number, lon:number, radius:number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  const position = latLongToVector3(lat, lon, 1);
  // console.log((position))

  const height = 10000;
  return (
    // <mesh ref={ref} position={position} scale={[0.05, height, 0.05]}>
    <mesh ref={ref} position={[.412,-.471,.751]} scale={[0.05, height, 0.05]}>
      <boxGeometry args={[-0.108,-.234,.4261]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function EarthG() {
  const landmarks = [
    // { name: 'New York', lat: 40.7128, lon: -74.0060, population: 8400000, color: 'red' },
    { name: 'Roc', U: 43.15, V: 77.608, population: 8400000, color: 'red' },
  ];

  const ref = useRef<THREE.Group>(null!)
    useFrame(() => {
    ref.current.rotation.y += 0.001;
  });
  return (
    <group ref={ref}>
      <Animated />
      <Lights />
      <Clouds />
      <Shader />
      {/* <Blue></Blue> */}
      <Aura />

      {/* {landmarks.map((landmark, index) => (
        <Landmark
          key={index}
          lat={landmark.U}
          lon={landmark.V}
          name={landmark.name}
          population={landmark.population}
          color={landmark.color}
        />
      ))} */}
    </group>
  );
}

// function Lights() {
//   const lightsMap = useLoader(THREE.TextureLoader, 'earth4k/earthlights4k.jpg');
//   return (
//     <mesh >
//       <sphereGeometry args={[5, 50, 50]} />
//       <meshBasicMaterial map={lightsMap} blending={THREE.AdditiveBlending} />
//     </mesh>
//   );
// }

// function Map() {
//   const Map = useLoader(THREE.TextureLoader, 'earth4k/earthmap4k.jpg');
//   const bumpMap = useLoader(THREE.TextureLoader, 'earth4k/earthbump4k.jpg');
//   const specularMap = useLoader(THREE.TextureLoader, 'earth4k/earthspec4k.jpg');
//   return (
//     <mesh >
//       <sphereGeometry args={[5, 50, 50]} />
//       <meshPhongMaterial map={Map} bumpMap={bumpMap} specularMap={specularMap}/>
//     </mesh>
//   );
// }

// function EarthV2() {
//   return (
//     <>
//       <mesh scale={1.05}>
//         <sphereGeometry args={[5, 50, 50]} />
//         <shaderMaterial
//           vertexShader={vertexShader}
//           fragmentShader={fragmentShader}
//         // uniforms={{
//         //   globeTexture: {
//         //     value: new THREE.TextureLoader().load('earth4k/earthmap4k.jpg')
//         //   },
//         // }}
//         >
//         </shaderMaterial>
//       </mesh>
//     </>
//   )
// }

// function AtmosphereV2() {
//   return (
//     <>
//       <mesh scale={[1.1, 1.1, 1.1]}>
//         <sphereGeometry args={[5, 50, 50]} />
//         <shaderMaterial
//           vertexShader={atmosphereVertexShader}
//           fragmentShader={atmosphereFragmentShader}
//           blending={THREE.AdditiveBlending}
//           side={THREE.BackSide}
//         >
//         </shaderMaterial>
//       </mesh>
//     </>
//   )
// }

// function Together() {
//   const ref = useRef<THREE.Group>(null!);
//   useFrame(() => {
//     ref.current.rotation.y += 0.001;
//   })
//   return (
//     <group ref={ref}>
//       {/* <EarthV2 /> */}
//       <Lights />
//       <Map />
//       {/* <AtmosphereV2 /> */}
//     </group>
//   )
// }

function App() {

  return (
    <div id="canvas-container" style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [2, 2, 2] }} style={{ backgroundColor: 'black' }}>
      {/* <Canvas dpr={window.devicePixelRatio} camera={{ position: [0, 0, 13] }} style={{ backgroundColor: 'black' }}> */}
        <EarthG />
        {/* <myEarth /> */}
        {/* <axesHelper args={[5]} /> */}
        {/* <gridHelper></gridHelper> */}
        <OrbitControls />
        <Stars />
        {/* <ambientLight intensity={2} /> */}

        {/* ================================== */}
        {/* <Together></Together> */}
        {/* <ambientLight /> */}
        <directionalLight position={[0, 10, 20]} intensity={1.5} />
      </Canvas>
    </div>
  );
}

export default App;
