import * as THREE from 'three';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import EarthBaseModel from './earth/BaseModel';
import CityLights from './earth/CityLights';
import Clouds from './earth/Clouds';
import Fresnel from './earth/Fresnel';
import Atmosphere from './earth/Atmosphere';
import Marker from './earth/Marker';

import { useMarker } from '../../context/MarkerContext';

function EarthScene() {
  const { markerHovered } = useMarker();
  const ref = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!markerHovered) ref.current.rotation.y += 0.001;
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
      markerCaption: 'My home in New York City, NY',
      color: 'orangered',
      latitude: 41,
      longitude: 74,
      markerHeight: 0.1
    },
    { markerCaption: 'My university in Rochester, NY',
      color: 'orangered',
      latitude: 42.5,
      longitude: 76.8,
      markerHeight: 0.125
    },
  ];

  return (
    <group ref={ref}>
      <EarthBaseModel /> {/* The actual Earth.tsx itself */}
      <CityLights />
      <Clouds />
      <Fresnel />
      <Atmosphere />

      {/* <Marker sh={sh} sp={sp} latitude={34} longitude={60}/> */} {/** rochester location with tilt */}
      {
        markers.map((marker, index) => (
          <Marker
            key={index}
            markerCaption={marker.markerCaption}
            color={marker.color}
            latitude={marker.latitude}
            longitude={marker.longitude}
            markerHeight={marker.markerHeight}
          />
        ))
      }
    </group>
  );
}

export default EarthScene;
