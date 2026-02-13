import React from 'react';
import { useCurrentFrame, useVideoConfig, AbsoluteFill, interpolate } from 'remotion';
import { LyricLine } from '../types';

interface LyricsOverlayProps {
  lyrics: LyricLine[];
}

/** HTML/CSS lyrics overlay rendered on top of the 3D canvas */
export const LyricsOverlay: React.FC<LyricsOverlayProps> = ({ lyrics }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const time = frame / fps;

  // Scale fonts relative to reference width (1920)
  const scale = width / 1920;

  // Find active lyric
  const activeLyric = lyrics.find(
    (l) => time >= l.startTime && time < l.endTime,
  );

  if (!activeLyric) return null;

  // Fade in/out
  const fadeInDuration = 0.3;
  const fadeOutDuration = 0.3;
  const opacity = interpolate(
    time,
    [
      activeLyric.startTime,
      activeLyric.startTime + fadeInDuration,
      activeLyric.endTime - fadeOutDuration,
      activeLyric.endTime,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // Highlight emphasis words
  const words = activeLyric.text.split(' ');
  const emphasis = new Set(activeLyric.emphasis ?? []);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: Math.round(80 * scale),
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          opacity,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: Math.round(16 * scale),
          padding: `${Math.round(16 * scale)}px ${Math.round(32 * scale)}px`,
        }}
      >
        <div
          style={{
            fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
            fontSize: Math.round(48 * scale),
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            display: 'flex',
            gap: Math.round(12 * scale),
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {words.map((word, i) => {
            const isEmphasis = emphasis.has(word.replace(/[,!?.]/g, ''));
            return (
              <span
                key={i}
                style={{
                  color: isEmphasis ? '#FFD700' : 'white',
                  transform: isEmphasis ? 'scale(1.1)' : undefined,
                  display: 'inline-block',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
