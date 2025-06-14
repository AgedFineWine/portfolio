import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import EarthScene from './components/space/EarthScene';
import OrbitRing from './components/space/OrbitRing';
import Stars from './components/space/Stars';
import Sun from './components/space/Sun';

import { MarkerContext } from './context/MarkerContext';

interface MousePosition {
  x: number;
  y: number;
}

function App() {
  const [markerHovered, setMarkerHovered] = useState<boolean>(false);
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 100 });
  const [markerCaption, setMarkerCaption] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null!);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  }

  return (
    <div
      id="canvas-container"
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
      ref={ref}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <MarkerContext.Provider value={{
          markerHovered,
          setMarkerHovered,
          setMarkerCaption
        }}>
      <Canvas camera={{ position: [1, 0, 2] }} style={{ backgroundColor: 'black' }}>
        {/* <Canvas dpr={window.devicePixelRatio} camera={{ position: [0, 0, 13] }} style={{ backgroundColor: 'black' }}> */}
        <Sun />

        {/* <axesHelper args={[5]} /> */}
        {/* <gridHelper></gridHelper> */}
        <OrbitControls />
        {/* <directionalLight position={[0, 10, 20]} intensity={1.5} /> */}
        {/* <directionalLight position={[-3.0, 4, 0.5]} intensity={3.5} /> */}
        <EarthScene />
        <OrbitRing />
        <Stars />
        <directionalLight position={[-2, 2, 0]} intensity={3} />
      </Canvas>
      <div style={{
        display: markerHovered ? 'inline-block' : 'none',
        transform: `translate(${position.x}px, ${position.y - window.innerHeight}px)`,
        transformOrigin: "top left",
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '8px'
      }}
      >
        {markerCaption}
      </div>
      </MarkerContext.Provider>
    </div>
  );
}

export default App;
