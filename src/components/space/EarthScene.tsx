import * as THREE from 'three';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

import EarthBaseModel from './earth/BaseModel';
import CityLights from './earth/CityLights';
import Clouds from './earth/Clouds';
import Fresnel from './earth/Fresnel';
import Atmosphere from './earth/Atmosphere';
import Marker from './earth/Marker';

import { useMarker } from '../../context/MarkerContext';

export default function EarthScene() {
  const { markerHovered } = useMarker();
  const ref = useRef<THREE.Group>(null!);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive behavior
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
  }, []);

  useFrame(() => {
    if (!markerHovered) {
      // Slower rotation on mobile for better performance
      const rotationSpeed = isMobile ? 0.0005 : 0.001;
      ref.current.rotation.y += rotationSpeed;
    }
  });

  // if (ref.current) {
  //   gsap.to(ref.current.rotation, {
  //     // x: -1*pos.y * 0.5,
  //     y: pos.x * 0.5,
  //     duration: 1,
  //   });
  // }

  const markers = [
    {
      markerCaption: 'Home in New York City, NY',
      color: 'red',
      latitude: 41,
      longitude: 74,
      markerHeight: 0.4
    },
    { markerCaption: 'University in Rochester, NY',
      color: 'turquoise',
      latitude: 42.5,
      longitude: 76.8,
      markerHeight: 0.3
    },
  ];

  {/* EarthBaseModel is the actual Earth itself */}
  return (
    <group ref={ref}>
      <EarthBaseModel />
      <CityLights />
      <Clouds />
      <Fresnel />
      <Atmosphere />

      {/* <Marker sh={sh} sp={sp} latitude={34} longitude={60}/> */} {/** rochester location with tilt */}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          markerCaption={marker.markerCaption}
          color={marker.color}
          latitude={marker.latitude}
          longitude={marker.longitude}
          markerHeight={marker.markerHeight}
        />
      ))}
    </group>
  );
}
