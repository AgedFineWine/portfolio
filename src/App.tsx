import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import fs from './shaders/fs.glsl'
import vs from './shaders/vs.glsl'

function Lights() {
  const lightsMap = useLoader(THREE.TextureLoader, 'earth4k/earthlights4k.jpg');

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

function Marker({ r, sh, color, latitude, longitude, st, name }: { sh: (a: boolean) => void, color: string, name: string, st: (n: string) => void, latitude: number, longitude: number }) {
  const position = placePointOnGlobe(latitude, longitude);
  const ref = useRef<THREE.Mesh>(null!);

  // const result = useLoader(GLTFLoader, 'marker.glb');

  // Update the rotation to make the box face the normal vector
  // useFrame(() => {
  if (ref.current) {
    ref.current.lookAt(new THREE.Vector3(0, 0, 0))
  }
  // });

  return (
    <>
      <mesh position={position} ref={ref} onPointerOver={() => {
        sh(true);
        st(name)
        r()
      }}
        onPointerOut={() => {
          sh(false)
          r()
        }}
      >
        <boxGeometry args={[0.01, 0.01, 0.2]} />
        <meshBasicMaterial color={color} opacity={0.7} />
      </mesh>
      {/* <primitive ref={ref} position={position} object={result.scene}></primitive> */}

    </>
  );
}

function MyStars() {
  const ref = useRef<THREE.Points>(null!);
  const starVertices = useMemo(() => {
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      vertices.push(x, y, z);
    }
    return new Float32Array(vertices);
  }, []); // only run once

  useFrame(() => {
    ref.current.rotation.y -= 0.0001;
  });

  return (
    <>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starVertices, 3]}

          /></bufferGeometry>
        <pointsMaterial color={0xffffff}></pointsMaterial>
      </points>
    </>
  )
}

function EarthG({ h, sh, st }: { sh: (a: boolean) => void, h: boolean }) {
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!h) ref.current.rotation.y += 0.001;
  });

  // if (ref.current) {
  //   gsap.to(ref.current.rotation, {
  //     // x: -1*pos.y * 0.5,
  //     y: pos.x * 0.5,
  //     duration: 1,
  //   });
  // }

  return (
    <group ref={ref}>
      <Animated />
      <Lights />
      <Clouds />
      <Shader />
      <Aura />
      {/* <Marker sh={sh} sp={sp} latitude={34} longitude={60}/> */} {/** rochester location with tilt */}
      <Marker sh={sh} st={st} name={'Home in New York City'} color={'red'} latitude={41} longitude={74} />

      <Marker sh={sh} st={st} name={'School in Rochester'} color={'red'} latitude={42.5} longitude={76.8} />
    </group>
  );
}


function DashedRing({ radius = 50, segments = 128 }) {
  const line = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,        // ax, aY (center)
      radius, radius, // xRadius, yRadius
      0, 2 * Math.PI, // startAngle, endAngle
      false,        // clockwise
      0             // rotation
    )

    const points = curve.getPoints(segments)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const material = new THREE.LineDashedMaterial({
      color: 0xffffff,
      dashSize: 0.7,
      gapSize: 0.2,
    })

    const line = new THREE.Line(geometry, material)
    line.computeLineDistances()
    return line
  }, [radius, segments])

  return (
    <primitive
      position={[-50, 0, 0,]}
      rotation={[Math.PI/2, 0, 0]}
      object={line}
      />
  )
}

function Sun() {
  return (
    <>
      <mesh position={[-50, 0, 0]}>
        <sphereGeometry args={[2, 50, 50]} />
        <meshBasicMaterial color={'yellow'} />
      </mesh>
    </>
  )
}

function App() {
  const [hovered, setHovered] = useState(false);
  interface MousePosition {
    x: number;
    y: number;
  }
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 100 });
  const [text, setText] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null!);

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  }

  return (
    <div id="canvas-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} ref={ref}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <Canvas camera={{ position: [1, 0, 2] }} style={{ backgroundColor: 'black' }}
      >
        {/* <Canvas dpr={window.devicePixelRatio} camera={{ position: [0, 0, 13] }} style={{ backgroundColor: 'black' }}> */}
        <EarthG h={hovered} sh={setHovered} sp={handleMouseMove} st={setText} />
        <MyStars />
        <DashedRing />
        <Sun />

        {/* <axesHelper args={[5]} /> */}
        {/* <gridHelper></gridHelper> */}
        <OrbitControls />
        {/* <directionalLight position={[0, 10, 20]} intensity={1.5} /> */}
        {/* <directionalLight position={[-3.0, 4, 0.5]} intensity={3.5} /> */}
        <directionalLight position={[0, 8, 8]} intensity={3.5} />
      </Canvas>
      <div style={{
        display: hovered ? 'inline-block' : 'none',
        transform: `translate(${position.x}px, ${position.y - window.innerHeight}px)`,
        transformOrigin: "top left",
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '8px'
      }}
      >
        {text}
      </div>
    </div>
  );
}

export default App;
