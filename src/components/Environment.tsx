import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCurrentFrame, useVideoConfig } from 'remotion';

/** Low-poly ground plane with rolling hills */
const Ground: React.FC = () => {
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
      <meshLambertMaterial color={0x4a8c3f} flatShading />
    </mesh>
  );
};

/** Gradient sky sphere */
const Sky: React.FC = () => {
  const geometry = useMemo(() => {
    const radius = 200;
    const geo = new THREE.SphereGeometry(radius, 32, 16);

    const colors: number[] = [];
    const topC = new THREE.Color(0x4488cc);
    const bottomC = new THREE.Color(0xbbddff);
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

/** Cloud puff made of spheres */
const Cloud: React.FC<{ baseX: number; y: number; z: number; scale: number }> = ({
  baseX,
  y,
  z,
  scale,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame / fps;

  // Drift clouds slowly to the right, wrap around
  const x = ((baseX + elapsed * 0.2 + 40) % 80) - 40;

  const puffs = useMemo(
    () => [
      { x: 0, y: 0, z: 0, r: 1.5 },
      { x: 1.2, y: 0.3, z: 0.2, r: 1.2 },
      { x: -1.0, y: 0.2, z: -0.1, r: 1.0 },
      { x: 0.5, y: 0.5, z: -0.3, r: 0.9 },
      { x: -0.5, y: 0.4, z: 0.3, r: 1.1 },
    ],
    [],
  );

  return (
    <group position={[x, y, z]} scale={scale}>
      {puffs.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.r, 6, 5]} />
          <meshLambertMaterial color={0xffffff} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
};

/** Full environment: ground + sky + clouds */
export const Environment: React.FC = () => {
  return (
    <>
      <Ground />
      <Sky />
      <Cloud baseX={-15} y={20} z={-30} scale={1.5} />
      <Cloud baseX={10} y={22} z={-25} scale={1.2} />
      <Cloud baseX={25} y={18} z={-35} scale={1.8} />
      <Cloud baseX={-8} y={25} z={-40} scale={1.0} />
    </>
  );
};
