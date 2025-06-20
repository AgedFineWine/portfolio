import { useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';

import { MarkerContext } from './context/MarkerContext';

import EarthScene from './components/space/EarthScene';
import OrbitRing from './components/space/OrbitRing';
import Stars from './components/space/Stars';
import Sun from './components/space/Sun';

// import { CameraDebugger } from './components/Debugger';
import NavBar from './components/nav/NavBar';
import Introduction from './components/introduction/Introduction';

import styles from './App.module.css';
import ProjectSection from './components/projects/ProjectSection';
import AboutWork from './components/about/AboutWork';
import goldBorder from './assets/gold_border.svg';
import SubHeader from './components/subheader/SubHeader';
import Skills from './components/skills/Skills';

interface MousePosition { x: number; y: number; }

function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.lookAt(-0.9599585609979925, 0.0022743838413765705, 0.4579251621285705);
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
  const positionRef = useRef<MousePosition>({ x: 0, y: 0});
  const [markerCaption, setMarkerCaption] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null!);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    positionRef.current.x = event.clientX;
    positionRef.current.y = event.clientY;
  }

  return (
    <>
      <div className={styles.canvasContainer} ref={ref}
      onMouseMove={(e) => handleMouseMove(e)}
      >
        <MarkerContext.Provider value={{ markerHovered: markerHovered, setMarkerHovered, setMarkerCaption }}> {/* Set/define necessar context here */}
          <Canvas camera={{ position: [0.8370747744283268, 0.7071858469614015, 5.070274999307938], fov: 30 }} className={styles.canvas}>
            {/* <CameraDebugger /> */}
            {/* <axesHelper args={[5]} /> */}
            {/* <gridHelper></gridHelper> */}
            {/* <OrbitControls /> */}
            <Scene />
          </Canvas>
          <div
            className={styles.markerCaptionContainer}
            style={{
              display: markerHovered ? 'inline-block' : 'none',
              transform: `translate(${positionRef.current.x}px, ${positionRef.current.y - window.innerHeight}px)`,
            }}>
            {markerCaption}
          </div>
        </MarkerContext.Provider>

        <div className={styles.overlayContent}>
          <NavBar />
          <div className={`${styles.introContent} boundingBox`}>
            <Introduction />
          </div>
        </div>
      </div>
      
      <div className={styles.mainContent}>
        <SubHeader singleWord={'Intro'} shortText={'About My Work'} border={goldBorder} />
        <AboutWork />

        <SubHeader singleWord={'Portfolio'} shortText={'Explore My Latest Works'} border={goldBorder} />
        <ProjectSection />

        <SubHeader singleWord={'Skills'} shortText={'The Skillset Behind My Work'} border={goldBorder} />
        <Skills />
      </div>
    </>
  );
}
