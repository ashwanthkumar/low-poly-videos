import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCurrentFrame, useVideoConfig } from 'remotion';

/** Low-poly ground plane with rolling hills — darker nighttime grass */
const NightGround: React.FC = () => {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 24, 24);
    geo.rotateX(-Math.PI / 2);

    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);

      let y = 0;
      y += Math.sin(x * 0.15) * Math.cos(z * 0.12) * 0.4;
      y += Math.sin(x * 0.3 + 1.0) * Math.sin(z * 0.25 + 0.5) * 0.2;
      y += (Math.sin(x * 2.3 + z * 3.7) * 0.5 + 0.5) * 0.08;

      const distFromCenter = Math.sqrt(x * x + z * z);
      const flattenFactor = Math.min(1, distFromCenter / 10);
      y *= flattenFactor;

      positions.setY(i, y);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshLambertMaterial color={0x1a3a1a} flatShading />
    </mesh>
  );
};

/** Night sky sphere — deep blue/purple gradient */
const NightSky: React.FC = () => {
  const geometry = useMemo(() => {
    const radius = 200;
    const geo = new THREE.SphereGeometry(radius, 32, 16);

    const colors: number[] = [];
    const topC = new THREE.Color(0x050520);
    const bottomC = new THREE.Color(0x1a1a4a);
    const tempColor = new THREE.Color();

    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      const t = (y / radius + 1) / 2;
      tempColor.lerpColors(bottomC, topC, t);
      colors.push(tempColor.r, tempColor.g, tempColor.b);
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial vertexColors side={THREE.BackSide} />
    </mesh>
  );
};

/** Twinkling stars scattered across the sky */
const Stars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame / fps;

  const stars = useMemo(() => {
    const result: { x: number; y: number; z: number; size: number; twinkleOffset: number }[] = [];
    // Seeded random for consistent star placement
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };

    for (let i = 0; i < 120; i++) {
      const theta = rand() * Math.PI * 0.45 + Math.PI * 0.05; // upper hemisphere
      const phi = rand() * Math.PI * 2;
      const r = 180;
      result.push({
        x: r * Math.sin(theta) * Math.cos(phi),
        y: r * Math.cos(theta) + 20, // bias upward
        z: r * Math.sin(theta) * Math.sin(phi),
        size: 0.3 + rand() * 0.7,
        twinkleOffset: rand() * Math.PI * 2,
      });
    }
    return result;
  }, []);

  return (
    <group>
      {stars.map((star, i) => {
        const twinkle = 0.5 + 0.5 * Math.sin(elapsed * (1.5 + (i % 5) * 0.3) + star.twinkleOffset);
        return (
          <mesh key={i} position={[star.x, star.y, star.z]}>
            <sphereGeometry args={[star.size, 4, 4]} />
            <meshBasicMaterial
              color={0xffffee}
              transparent
              opacity={twinkle * 0.9 + 0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

/** Crescent moon */
const Moon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame / fps;

  // Gentle sway
  const angle = elapsed * 0.02;
  const x = 40 * Math.cos(angle) + 30;
  const y = 80 + Math.sin(elapsed * 0.05) * 2;
  const z = -100;

  return (
    <group position={[x, y, z]}>
      <mesh>
        <sphereGeometry args={[8, 12, 12]} />
        <meshBasicMaterial color={0xffeebb} />
      </mesh>
      {/* Dark sphere to create crescent shape */}
      <mesh position={[3, 2, 3]}>
        <sphereGeometry args={[7, 12, 12]} />
        <meshBasicMaterial color={0x050520} />
      </mesh>
    </group>
  );
};

/** Full night environment: ground + night sky + stars + moon */
export const NightEnvironment: React.FC = () => {
  return (
    <>
      <NightGround />
      <NightSky />
      <Stars />
      <Moon />
    </>
  );
};
