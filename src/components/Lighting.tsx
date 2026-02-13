import React from 'react';

/** Sunny meadow lighting setup — ambient + hemisphere + directional with shadows */
export const Lighting: React.FC = () => {
  return (
    <>
      <ambientLight color={0x87ceeb} intensity={0.3} />
      <hemisphereLight
        args={[0x87ceeb, 0x556b2f, 0.6]}
      />
      <directionalLight
        color={0xfff5e0}
        intensity={1.5}
        position={[10, 15, 8]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.001}
      />
    </>
  );
};
