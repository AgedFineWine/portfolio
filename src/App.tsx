import { useState, useRef, useEffect, useContext } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
// import { FirstPersonControls } from '@react-three/drei';
// import { getFresnelMat } from './util/fresnel.ts';

import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl'
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl'
import fs from '../shaders/fs.glsl'
import vs from '../shaders/vs.glsl'

function Lights() {
  const lightsMap = useLoader(THREE.TextureLoader, 'earth10k/earthlights10k.jpg');

  return (
    // <mesh rotation={[0, 0, -23.5 * Math.PI / 180]}>
    <mesh >
      <sphereGeometry args={[1, 50, 50]} />
      <meshBasicMaterial map={lightsMap} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function Clouds() {
  const cloudMap = useLoader(THREE.TextureLoader, 'earthhiresclouds4K.jpg');
  const Bref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    Bref.current.rotation.y += 0.0005;
  });
  return (
    // <mesh ref={Bref} rotation={[0, 0, -23.5 * Math.PI / 180]} scale={1.008}>
    <mesh ref={Bref} scale={1.008}>
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

  const colorMap = useLoader(THREE.TextureLoader, 'earth4k/earthmap4k.jpg');
  // const colorMap = useLoader(THREE.TextureLoader, 'b3d.jpg');
  const bumpMap = useLoader(THREE.TextureLoader, 'earth4k/earthbump4k.jpg');
  const specularMap = useLoader(THREE.TextureLoader, 'earth4k/earthspec4k.jpg');

  return (
    // <mesh ref={Bref} rotation={[0, 0, -23.5 * Math.PI / 180]}>
    <mesh ref={Bref} >
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

function placePointOnGlobe(latitude: number, longitude: number, radius: number = 1): THREE.Vector3 {
  const latRad = THREE.MathUtils.degToRad(latitude);  // Convert latitude to radians
  const lonRad = THREE.MathUtils.degToRad(longitude);  // Convert longitude to radians

  // Convert spherical to Cartesian coordinates
  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const y = radius * Math.cos(latRad) * Math.sin(lonRad);
  const z = radius * Math.sin(latRad);

  return new THREE.Vector3(x, z, y);  // y is the lateral axis in Three.js
}

function Marker({ sh, color, latitude, longitude }: { sh: (a:boolean) => void, color:string, latitude: number, longitude: number }) {
  const position = placePointOnGlobe(latitude, longitude);
  const ref = useRef<THREE.Mesh>(null!);

  // Update the rotation to make the box face the normal vector
  useFrame(() => {
    if (ref.current) {
      const normal = position.clone().normalize();  // The normal is just the position on the sphere
      ref.current.lookAt(normal);  // Make the box face the normal vector
      console.log(normal)
    }
  });

  return (
    <>
      <mesh position={position} ref={ref} onPointerOver={(e) => {
        sh(true);
        // sp(e)
      }}
      onPointerOut={() => {
        sh(false)
      }}
      >
        <boxGeometry args={[0.01, 0.01, 0.1]} />
        <meshBasicMaterial color={color} transparent />
      </mesh>

    </>
  );
}


function EarthG({sh, sp}: { sh:(a:boolean) => void, sp: (a:MouseEvent)=> void }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame(() => {
    // ref.current.rotation.y += 0.001;
  });
  return (
    <group ref={ref}>
      <Animated />
      <Lights />
      <Clouds />
      <Shader />
      <Aura />
      {/* <Marker sh={sh} sp={sp} latitude={34} longitude={60}/> */} {/** rochester location with tilt */}
      <Marker sh={sh} color='hotpink' latitude={41} longitude={74}/>

      <Marker sh={sh} color='teal' latitude={43} longitude={76}/>
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
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({x:0, y:100});
  const ref = useRef<HTMLDivElement>(null!);

  const handleMouseMove = (event) => {
    setPosition({x: event.clientX, y: event.clientY});
    // console.log(`Mouse position: ${event.clientX}, ${event.clientY}`);
  }

  return (
    <div id="canvas-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} ref={ref}>
      <Canvas camera={{ position: [2, 2, 2] }} style={{ backgroundColor: 'black' }} onMouseMove={(e) => handleMouseMove(e)}>
        {/* <Canvas dpr={window.devicePixelRatio} camera={{ position: [0, 0, 13] }} style={{ backgroundColor: 'black' }}> */}
        <EarthG sh={setHovered} sp={handleMouseMove}/>
        {/* <axesHelper args={[5]} /> */}
        {/* <gridHelper></gridHelper> */}
        <OrbitControls />
        <Stars />
        <directionalLight position={[0, 10, 20]} intensity={1.5} />
      </Canvas>
        <div style={{
        display: hovered ? 'inline-block' : 'none',
        transform: `translate(${position.x}px, ${position.y - window.innerHeight}px)`,
        transformOrigin: "top left",
        // position: 'absolute',
        // left: position.x,
        // top: position.y,
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '8px'
        }}
        >
        Home in New York City
      </div>
    </div>
  );
}

export default App;
