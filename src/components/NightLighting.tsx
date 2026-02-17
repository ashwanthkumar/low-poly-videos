import React from 'react';

/** Moonlit night lighting preset */
export const NightLighting: React.FC = () => {
  return (
    <>
      {/* Dim ambient — deep blue tint */}
      <ambientLight color={0x223355} intensity={0.25} />

      {/* Sky-to-ground: dark blue sky, very dark ground */}
      <hemisphereLight
        color={0x2244aa}
        groundColor={0x111122}
        intensity={0.4}
      />

      {/* Moonlight — cool silver-blue, from upper right */}
      <directionalLight
        color={0xccddff}
        intensity={0.8}
        position={[15, 20, -10]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
    </>
  );
};
