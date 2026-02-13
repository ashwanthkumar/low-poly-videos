import React from 'react';
import { AbsoluteFill, Audio, staticFile, useVideoConfig } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { script } from '../../videos/bah-bah-black-sheep/script/scenes';
import { useTimeline } from '../hooks/useTimeline';
import { Environment } from '../components/Environment';
import { SceneProps } from '../components/SceneProps';
import { Lighting } from '../components/Lighting';
import { AnimatedCamera } from '../components/AnimatedCamera';
import {
  GeometricCharacter,
  FAMILY_CONFIGS,
} from '../components/GeometricCharacter';
import { GeometricSheep } from '../components/GeometricSheep';
import { LyricsOverlay } from './LyricsOverlay';
import { CreditsOverlay } from './CreditsOverlay';
import { ActionType, SheepActionType } from '../types';

/** Default starting positions for characters */
const DEFAULT_POSITIONS: Record<string, [number, number, number]> = {
  father: [-3, 0, 2],
  mother: [-1.5, 0, 1],
  son: [0, 0, 3],
};

const SHEEP_DEFAULT_POS: [number, number, number] = [0, 0, -2];

interface BahBahBlackSheepProps {
  /** Extra FOV added to every camera keyframe (widens view for portrait) */
  fovBoost?: number;
}

/** Main composition for Bah Bah Black Sheep */
export const BahBahBlackSheep: React.FC<BahBahBlackSheepProps> = ({
  fovBoost = 0,
}) => {
  const { width, height } = useVideoConfig();
  const { camera, targets } = useTimeline(script);

  // Resolve character states
  const getPos = (name: string): [number, number, number] =>
    targets[name]?.position ?? DEFAULT_POSITIONS[name] ?? [0, 0, 0];

  const getAction = (name: string, fallback: string = 'idle'): string =>
    targets[name]?.action ?? fallback;

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ fov: 50, near: 0.1, far: 500, position: [0, 4, 14] }}
        gl={{ antialias: true }}
      >
        <AnimatedCamera
          position={camera.position}
          lookAt={camera.lookAt}
          fov={camera.fov + fovBoost}
        />
        <Lighting />
        <Environment />
        <SceneProps />

        {/* Characters: father, mother, son */}
        <GeometricCharacter
          config={FAMILY_CONFIGS.father}
          position={getPos('father')}
          action={getAction('father') as ActionType}
        />
        <GeometricCharacter
          config={FAMILY_CONFIGS.mother}
          position={getPos('mother')}
          action={getAction('mother') as ActionType}
        />
        <GeometricCharacter
          config={FAMILY_CONFIGS.son}
          position={getPos('son')}
          action={getAction('son') as ActionType}
        />

        {/* Sheep */}
        <GeometricSheep
          position={targets.sheep?.position ?? SHEEP_DEFAULT_POS}
          action={getAction('sheep', 'graze') as SheepActionType}
        />
      </ThreeCanvas>

      {/* Lyrics overlay on top of 3D */}
      <LyricsOverlay lyrics={script.lyrics} />

      {/* Credits overlay (65-75s) */}
      <CreditsOverlay />

      {/* Audio */}
      <Audio src={staticFile('audio/bah-bah-black-sheep.mp3')} />
    </AbsoluteFill>
  );
};
