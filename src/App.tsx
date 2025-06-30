import { useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
// import { Cone, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import gsap from 'gsap';

import { MarkerContext } from './context/MarkerContext';

import EarthScene from './components/space/EarthScene';
import OrbitRing from './components/space/OrbitRing';
import Stars from './components/space/Stars';
import Sun from './components/space/Sun';

// import { CameraDebugger } from './components/Debugger';
import NavBar from './components/NavBar';
import Introduction from './components/Introduction';

import ProjectSection from './components/projects/ProjectSection';
import AboutWork from './components/AboutWork';
import SubHeader from './components/SectionHeader';
import Skills from './components/skills/Skills';
import Footer from './components/Footer';

interface MousePosition { x: number; y: number; }

function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(-0.9599585609979925, 0.0022743838413765705, 0.4579251621285705);

    if (innerWidth < 768) {
      camera.lookAt(0, 1, 0);
    }
  });

  return null;
}

function Scene() {
  return (
    <>
      <CameraController />
      <Sun />
      <EarthScene />
      <OrbitRing />
      <Stars />
      <directionalLight position={[-2, 2, 0]} intensity={3} />
    </>
  );
}

export default function App() {
  const [markerHovered, setMarkerHovered] = useState<boolean>(false);
  const positionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const [markerCaption, setMarkerCaption] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null!);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    positionRef.current.x = event.clientX;
    positionRef.current.y = event.clientY;
  }

  return (
    <>
      <div className={`w-full h-[100vh] overflow-hidden relative canvasContainer`} ref={ref}
        onMouseMove={(e) => handleMouseMove(e)}
      // onWheel={onWheel}
      >
        <MarkerContext.Provider value={{ markerHovered: markerHovered, setMarkerHovered, setMarkerCaption }}> {/* Set/define necessar context here */}
          <Canvas camera={{ position: [0.8370747744283268, 0.7071858469614015, 5.070274999307938], fov: 30 }}
            className={`bg-[var(--primary-background-color)] w-full h-full`}>
            {/* <CameraDebugger /> */}
            {/* <axesHelper args={[5]} /> */}
            {/* <gridHelper></gridHelper> */}
            {/* <OrbitControls /> */}
            <Scene />
          </Canvas>
          <div
            className={`transform origin-top-left bg-black/60 text-white py-2 px-4 rounded-lg`}
            style={{
              display: markerHovered ? 'inline-block' : 'none',
              transform: `translate(${positionRef.current.x}px, ${positionRef.current.y - window.innerHeight}px)`,
            }}>
            {markerCaption}
          </div>
        </MarkerContext.Provider>

        <div className={`flex flex-col items-center pointer-events-none absolute top-0
          right-0 bottom-auto left-0 h-full`}>
          <NavBar />
          <div className={`flex w-full absolute top-[47%] transform translate-y-[-60%] boundingBox introductionContainer`}>
            <Introduction />
          </div>
        </div>
      </div>

      <div className={`relative bg-[var(--primary-background-color)] w-full h-full`}>
		<div className={`absolute h-[85px] top-0 transform translate-y-[-50%] w-full bg-black/50 backdrop-blur-[3px] z-[999]
      mask-[image:linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_20%,rgba(0,0,0,1)_40%,rgba(0,0,0,1)_60%,rgba(0,0,0,1)_100%)]
      pointer-events-none`}></div>
        {/* <SubHeader singleWord={'Intro'} shortTextBefore={'About My '} emphasis={'Works'} /> */}
        <AboutWork />

        <SubHeader centered singleWord={'Portfolio'} shortTextBefore={'Explore My '} emphasis={'Latest Works'} />
        <ProjectSection />

        <SubHeader centered singleWord={'Skills'} shortTextBefore={'The '} emphasis={'Skillset'} shortTextAfter={' Behind My Work'} />
        <Skills />


        <Footer />
      </div>
    </>
  );
}