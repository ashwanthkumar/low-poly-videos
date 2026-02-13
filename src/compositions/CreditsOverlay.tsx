import React from 'react';
import { useCurrentFrame, useVideoConfig, AbsoluteFill, interpolate } from 'remotion';

const CREDITS_START = 65;
const CREDITS_END = 75;

/** Credits screen shown after the song ends */
export const CreditsOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const time = frame / fps;

  // Scale fonts relative to reference width (1920)
  const s = width / 1920;

  if (time < CREDITS_START) return null;

  // Fade in the dark overlay
  const overlayOpacity = interpolate(
    time,
    [CREDITS_START, CREDITS_START + 1.5],
    [0, 0.75],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // Fade in the text
  const textOpacity = interpolate(
    time,
    [CREDITS_START + 1, CREDITS_START + 2.5],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // Scroll credits up gently
  const scrollY = interpolate(
    time,
    [CREDITS_START + 2, CREDITS_END],
    [40, -20],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
      }}
    >
      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
      />

      {/* Credits content */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            transform: `translateY(${scrollY}px)`,
            textAlign: 'center',
            color: 'white',
            fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
          }}
        >
          <div
            style={{
              fontSize: Math.round(56 * s),
              fontWeight: 'bold',
              marginBottom: Math.round(40 * s),
              color: '#FFD700',
              textShadow: '2px 2px 12px rgba(0,0,0,0.8)',
            }}
          >
            Baa Baa Black Sheep
          </div>

          <div style={{ fontSize: Math.round(28 * s), marginBottom: Math.round(50 * s), opacity: 0.8 }}>
            A Low-Poly Nursery Rhyme
          </div>

          <div style={{ fontSize: Math.round(24 * s), marginBottom: Math.round(16 * s), opacity: 0.6 }}>
            Prompted by
          </div>
          <div
            style={{
              fontSize: Math.round(36 * s),
              fontWeight: 'bold',
              marginBottom: Math.round(40 * s),
              textShadow: '1px 1px 6px rgba(0,0,0,0.6)',
            }}
          >
            Ashwanth Kumar
          </div>

          <div style={{ fontSize: Math.round(24 * s), marginBottom: Math.round(16 * s), opacity: 0.6 }}>
            AI Assistant
          </div>
          <div style={{ fontSize: Math.round(32 * s), marginBottom: Math.round(40 * s) }}>
            Claude by Anthropic
          </div>

          <div style={{ fontSize: Math.round(24 * s), marginBottom: Math.round(16 * s), opacity: 0.6 }}>
            Voice generated with
          </div>
          <div style={{ fontSize: Math.round(28 * s), marginBottom: Math.round(40 * s) }}>
            Qwen3-TTS (Alibaba)
          </div>

          <div style={{ fontSize: Math.round(24 * s), marginBottom: Math.round(16 * s), opacity: 0.6 }}>
            Background music
          </div>
          <div style={{ fontSize: Math.round(22 * s), marginBottom: Math.round(10 * s) }}>
            "Baby Lullaby Music" - orangefreesounds.com
          </div>
          <div style={{ fontSize: Math.round(18 * s), opacity: 0.5 }}>
            Licensed under CC BY 4.0
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
