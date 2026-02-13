import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { CharacterConfig, ActionType } from '../types';

/** Character configs for the family */
export const FAMILY_CONFIGS: Record<string, CharacterConfig> = {
  father: {
    role: 'father',
    name: 'Father',
    height: 1.8,
    bodyColor: 0x2255aa,
    skinColor: 0xf5c6a0,
    hairColor: 0x3d2b1f,
    pantsColor: 0x333333,
    shoeColor: 0x1a1a1a,
  },
  mother: {
    role: 'mother',
    name: 'Mother',
    height: 1.65,
    bodyColor: 0xcc3366,
    skinColor: 0xf5c6a0,
    hairColor: 0x5a3825,
    pantsColor: 0xcc3366,
    shoeColor: 0x663333,
  },
  son: {
    role: 'son',
    name: 'Tommy',
    height: 1.2,
    bodyColor: 0x44aa44,
    skinColor: 0xf5c6a0,
    hairColor: 0x3d2b1f,
    pantsColor: 0x2266aa,
    shoeColor: 0xcc4400,
  },
};

interface GeometricCharacterProps {
  config: CharacterConfig;
  position?: [number, number, number];
  action?: ActionType;
}

/** Procedural box-figure character built from R3F primitives */
export const GeometricCharacter: React.FC<GeometricCharacterProps> = ({
  config,
  position = [0, 0, 0],
  action = 'idle',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const h = config.height;

  // Proportions
  const dims = useMemo(() => {
    const headRadius = h * 0.1;
    const torsoHeight = h * 0.28;
    const torsoWidth = h * 0.26;
    const torsoDepth = h * 0.16;
    const hipHeight = h * 0.08;
    const armLength = h * 0.26;
    const armRadius = h * 0.035;
    const legLength = h * 0.30;
    const legTopRadius = h * 0.055;
    const legBotRadius = h * 0.038;
    const shoeHeight = h * 0.04;
    const legTopY = shoeHeight + legLength;
    const hipTop = legTopY + hipHeight;
    const torsoBottom = hipTop;
    const torsoCenterY = torsoBottom + torsoHeight / 2;
    const legOffsetX = torsoWidth * 0.3;
    const shoulderRelY = torsoHeight / 2 - armRadius;
    const shoulderX = torsoWidth / 2 + armRadius * 0.5;
    const neckHeight = headRadius * 0.4;
    const headRelY = torsoHeight / 2 + neckHeight + headRadius * 0.9;

    return {
      headRadius, torsoHeight, torsoWidth, torsoDepth,
      hipHeight, armLength, armRadius, legLength,
      legTopRadius, legBotRadius, shoeHeight,
      legTopY, hipTop, torsoBottom, torsoCenterY,
      legOffsetX, shoulderRelY, shoulderX,
      neckHeight, headRelY,
    };
  }, [h]);

  // Action-based animation
  const anim = useMemo(() => {
    const speed = 3;
    const t = time * speed;
    const sin = Math.sin(t);
    const cos = Math.cos(t);

    switch (action) {
      case 'walk':
        return {
          leftLegRot: sin * 0.4,
          rightLegRot: -sin * 0.4,
          leftArmRot: -sin * 0.3,
          rightArmRot: sin * 0.3,
          torsoRot: 0,
          headNod: 0,
        };
      case 'wave':
        return {
          leftLegRot: 0,
          rightLegRot: 0,
          leftArmRot: 0,
          rightArmRot: -2.5 + Math.sin(t * 2) * 0.3,
          torsoRot: 0,
          headNod: 0,
        };
      case 'nod':
        return {
          leftLegRot: 0,
          rightLegRot: 0,
          leftArmRot: 0,
          rightArmRot: 0,
          torsoRot: 0,
          headNod: Math.sin(t * 2) * 0.2,
        };
      case 'clap':
        return {
          leftLegRot: 0,
          rightLegRot: 0,
          leftArmRot: -1.2 + Math.abs(sin) * 0.4,
          rightArmRot: -1.2 + Math.abs(sin) * 0.4,
          torsoRot: 0,
          headNod: Math.abs(sin) * 0.1,
        };
      case 'point':
        return {
          leftLegRot: 0,
          rightLegRot: 0,
          leftArmRot: 0,
          rightArmRot: -1.3,
          torsoRot: 0,
          headNod: 0,
        };
      case 'hold':
        return {
          leftLegRot: 0,
          rightLegRot: 0,
          leftArmRot: -0.8,
          rightArmRot: -0.8,
          torsoRot: 0,
          headNod: 0,
        };
      default: // idle
        return {
          leftLegRot: 0,
          rightLegRot: 0,
          leftArmRot: sin * 0.05,
          rightArmRot: cos * 0.05,
          torsoRot: 0,
          headNod: sin * 0.02,
        };
    }
  }, [action, time]);

  return (
    <group position={position}>
      {/* Left Leg */}
      <group
        position={[-dims.legOffsetX, dims.legTopY, 0]}
        rotation={[anim.leftLegRot, 0, 0]}
      >
        <mesh position={[0, -dims.legLength / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry
            args={[dims.legBotRadius, dims.legTopRadius, dims.legLength, 6]}
          />
          <meshLambertMaterial color={config.pantsColor} />
        </mesh>
        <mesh
          position={[0, -dims.legLength - dims.shoeHeight / 2 + 0.01, dims.legBotRadius * 0.4]}
          castShadow
        >
          <boxGeometry
            args={[dims.legBotRadius * 2.5, dims.shoeHeight, dims.legBotRadius * 3.5]}
          />
          <meshLambertMaterial color={config.shoeColor} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group
        position={[dims.legOffsetX, dims.legTopY, 0]}
        rotation={[anim.rightLegRot, 0, 0]}
      >
        <mesh position={[0, -dims.legLength / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry
            args={[dims.legBotRadius, dims.legTopRadius, dims.legLength, 6]}
          />
          <meshLambertMaterial color={config.pantsColor} />
        </mesh>
        <mesh
          position={[0, -dims.legLength - dims.shoeHeight / 2 + 0.01, dims.legBotRadius * 0.4]}
          castShadow
        >
          <boxGeometry
            args={[dims.legBotRadius * 2.5, dims.shoeHeight, dims.legBotRadius * 3.5]}
          />
          <meshLambertMaterial color={config.shoeColor} />
        </mesh>
      </group>

      {/* Hip */}
      <mesh
        position={[0, dims.legTopY + dims.hipHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[dims.torsoWidth, dims.hipHeight + 0.02, dims.torsoDepth]} />
        <meshLambertMaterial color={config.pantsColor} />
      </mesh>

      {/* Torso (parent of head + arms) */}
      <group position={[0, dims.torsoCenterY, 0]}>
        {/* Torso box */}
        <mesh castShadow receiveShadow>
          <boxGeometry
            args={[dims.torsoWidth, dims.torsoHeight + 0.02, dims.torsoDepth]}
          />
          <meshLambertMaterial color={config.bodyColor} />
        </mesh>

        {/* Left Arm */}
        <group
          position={[-dims.shoulderX, dims.shoulderRelY, 0]}
          rotation={[anim.leftArmRot, 0, 0]}
        >
          <mesh position={[0, -dims.armLength / 2, 0]} castShadow>
            <cylinderGeometry
              args={[dims.armRadius * 0.8, dims.armRadius, dims.armLength, 6]}
            />
            <meshLambertMaterial color={config.bodyColor} />
          </mesh>
          <mesh position={[0, -dims.armLength, 0]}>
            <sphereGeometry args={[dims.armRadius * 1.2, 6, 4]} />
            <meshLambertMaterial color={config.skinColor} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group
          position={[dims.shoulderX, dims.shoulderRelY, 0]}
          rotation={[anim.rightArmRot, 0, 0]}
        >
          <mesh position={[0, -dims.armLength / 2, 0]} castShadow>
            <cylinderGeometry
              args={[dims.armRadius * 0.8, dims.armRadius, dims.armLength, 6]}
            />
            <meshLambertMaterial color={config.bodyColor} />
          </mesh>
          <mesh position={[0, -dims.armLength, 0]}>
            <sphereGeometry args={[dims.armRadius * 1.2, 6, 4]} />
            <meshLambertMaterial color={config.skinColor} />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, dims.torsoHeight / 2 + dims.neckHeight / 2, 0]}>
          <cylinderGeometry
            args={[dims.headRadius * 0.4, dims.headRadius * 0.5, dims.neckHeight, 6]}
          />
          <meshLambertMaterial color={config.skinColor} />
        </mesh>

        {/* Head */}
        <group
          position={[0, dims.headRelY, 0]}
          rotation={[anim.headNod, 0, 0]}
        >
          <mesh castShadow>
            <sphereGeometry args={[dims.headRadius, 8, 6]} />
            <meshLambertMaterial color={config.skinColor} />
          </mesh>
          {/* Hair */}
          <mesh position={[0, dims.headRadius * 0.05, 0]}>
            <sphereGeometry
              args={[
                dims.headRadius * 1.05,
                8,
                4,
                0,
                Math.PI * 2,
                0,
                Math.PI * 0.55,
              ]}
            />
            <meshLambertMaterial color={config.hairColor} />
          </mesh>
          {/* Eyes */}
          <mesh
            position={[
              -dims.headRadius * 0.3,
              dims.headRadius * 0.1,
              dims.headRadius * 0.85,
            ]}
          >
            <sphereGeometry args={[dims.headRadius * 0.12, 4, 4]} />
            <meshLambertMaterial color={0x222222} />
          </mesh>
          <mesh
            position={[
              dims.headRadius * 0.3,
              dims.headRadius * 0.1,
              dims.headRadius * 0.85,
            ]}
          >
            <sphereGeometry args={[dims.headRadius * 0.12, 4, 4]} />
            <meshLambertMaterial color={0x222222} />
          </mesh>
          {/* Smile */}
          <mesh
            position={[0, -dims.headRadius * 0.15, dims.headRadius * 0.85]}
            rotation={[Math.PI, 0, 0]}
          >
            <torusGeometry
              args={[dims.headRadius * 0.15, dims.headRadius * 0.03, 4, 8, Math.PI]}
            />
            <meshLambertMaterial color={0x222222} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
