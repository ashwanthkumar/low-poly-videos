import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { SheepActionType } from '../types';

interface GeometricSheepProps {
  position?: [number, number, number];
  action?: SheepActionType;
  color?: number;
  rotationY?: number;
}

const WOOL_COLOR = 0xf5f5dc;

/** Procedural low-poly sheep built from R3F primitives */
export const GeometricSheep: React.FC<GeometricSheepProps> = ({
  position = [0, 0, 0],
  action = 'idle',
  color = 0x222222,
  rotationY = Math.PI,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const legs = useMemo(
    () => [
      { x: -0.25, z: 0.25 },
      { x: 0.25, z: 0.25 },
      { x: -0.25, z: -0.25 },
      { x: 0.25, z: -0.25 },
    ],
    [],
  );

  // Action-based animation
  const anim = useMemo(() => {
    const speed = 3;
    const t = time * speed;
    const sin = Math.sin(t);

    switch (action) {
      case 'walk':
        return {
          headRot: [0, 0, 0] as [number, number, number],
          headPos: [0, 0.8, 0.55] as [number, number, number],
          legRots: [sin * 0.3, -sin * 0.3, -sin * 0.3, sin * 0.3],
          tailWag: sin * 0.2,
        };
      case 'graze':
        return {
          headRot: [0.5, 0, 0] as [number, number, number],
          headPos: [0, 0.6, 0.65] as [number, number, number],
          legRots: [0, 0, 0, 0],
          tailWag: sin * 0.1,
        };
      case 'lookUp':
        return {
          headRot: [-0.3, 0, 0] as [number, number, number],
          headPos: [0, 0.9, 0.5] as [number, number, number],
          legRots: [0, 0, 0, 0],
          tailWag: 0,
        };
      case 'nod':
        return {
          headRot: [sin * 0.25, 0, 0] as [number, number, number],
          headPos: [0, 0.8, 0.55] as [number, number, number],
          legRots: [0, 0, 0, 0],
          tailWag: Math.abs(sin) * 0.15,
        };
      default: // idle
        return {
          headRot: [sin * 0.03, 0, 0] as [number, number, number],
          headPos: [0, 0.8, 0.55] as [number, number, number],
          legRots: [0, 0, 0, 0],
          tailWag: sin * 0.05,
        };
    }
  }, [action, time]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Body (woolly ellipsoid) */}
      <group position={[0, 0.65, 0]}>
        <mesh scale={[1.3, 1, 1]} castShadow receiveShadow>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshLambertMaterial color={WOOL_COLOR} />
        </mesh>
      </group>

      {/* Head */}
      <group position={anim.headPos} rotation={anim.headRot}>
        <mesh castShadow>
          <sphereGeometry args={[0.2, 6, 5]} />
          <meshLambertMaterial color={color} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.08, 0.05, 0.17]}>
          <sphereGeometry args={[0.04, 4, 4]} />
          <meshLambertMaterial color={0xffffff} />
        </mesh>
        <mesh position={[0.08, 0.05, 0.17]}>
          <sphereGeometry args={[0.04, 4, 4]} />
          <meshLambertMaterial color={0xffffff} />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.08, 0.05, 0.2]}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshLambertMaterial color={0x000000} />
        </mesh>
        <mesh position={[0.08, 0.05, 0.2]}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshLambertMaterial color={0x000000} />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.2, 0.08, 0]} scale={[1, 0.5, 0.5]}>
          <sphereGeometry args={[0.08, 4, 4]} />
          <meshLambertMaterial color={color} />
        </mesh>
        <mesh position={[0.2, 0.08, 0]} scale={[1, 0.5, 0.5]}>
          <sphereGeometry args={[0.08, 4, 4]} />
          <meshLambertMaterial color={color} />
        </mesh>
      </group>

      {/* Legs */}
      {legs.map((leg, i) => (
        <group
          key={i}
          position={[leg.x, 0.4, leg.z]}
          rotation={[anim.legRots[i], 0, 0]}
        >
          <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.5, 5]} />
            <meshLambertMaterial color={color} />
          </mesh>
          {/* Hoof */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.05, 5]} />
            <meshLambertMaterial color={0x333333} />
          </mesh>
        </group>
      ))}

      {/* Tail */}
      <group position={[0, 0.7, -0.55]} rotation={[anim.tailWag, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.08, 5, 4]} />
          <meshLambertMaterial color={WOOL_COLOR} />
        </mesh>
      </group>
    </group>
  );
};
