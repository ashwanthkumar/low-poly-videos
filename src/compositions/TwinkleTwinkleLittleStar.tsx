import React from 'react';
import { AbsoluteFill, Audio, staticFile, useVideoConfig } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { script } from '../../videos/twinkle-twinkle-little-star/script/scenes';
import { useTimeline } from '../hooks/useTimeline';
import { NightEnvironment } from '../components/NightEnvironment';
import { SceneProps } from '../components/SceneProps';
import { NightLighting } from '../components/NightLighting';
import { AnimatedCamera } from '../components/AnimatedCamera';
import {
  GeometricCharacter,
  FAMILY_CONFIGS,
} from '../components/GeometricCharacter';
import { GeometricSheep } from '../components/GeometricSheep';
import { LyricsOverlay } from './LyricsOverlay';
import { TwinkleCreditsOverlay } from './TwinkleCreditsOverlay';
import { ActionType, SheepActionType } from '../types';

const DEFAULT_POSITIONS: Record<string, [number, number, number]> = {
  father: [-2.5, 0, 2],
  mother: [-0.5, 0, 1.5],
  son: [1.5, 0, 2.5],
};

const SHEEP_DEFAULT_POS: [number, number, number] = [2, 0, -1];

interface TwinkleTwinkleLittleStarProps {
  fovBoost?: number;
}

/** Main composition for Twinkle Twinkle Little Star */
export const TwinkleTwinkleLittleStar: React.FC<TwinkleTwinkleLittleStarProps> = ({
  fovBoost = 0,
}) => {
  const { width, height } = useVideoConfig();
  const { camera, targets } = useTimeline(script);

  const getPos = (name: string): [number, number, number] =>
    targets[name]?.position ?? DEFAULT_POSITIONS[name] ?? [0, 0, 0];

  const getAction = (name: string, fallback: string = 'idle'): string =>
    targets[name]?.action ?? fallback;

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ fov: 50, near: 0.1, far: 500, position: [0, 5, 14] }}
        gl={{ antialias: true }}
      >
        <AnimatedCamera
          position={camera.position}
          lookAt={camera.lookAt}
          fov={camera.fov + fovBoost}
        />
        <NightLighting />
        <NightEnvironment />
        <SceneProps />

        {/* Characters */}
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

      {/* Lyrics overlay */}
      <LyricsOverlay lyrics={script.lyrics} />

      {/* Credits overlay (65-75s) */}
      <TwinkleCreditsOverlay />

      {/* Audio */}
      <Audio src={staticFile('audio/twinkle-twinkle-little-star.mp3')} />
    </AbsoluteFill>
  );
};
