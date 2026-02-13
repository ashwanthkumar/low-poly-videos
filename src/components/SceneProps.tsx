import React, { useMemo } from 'react';
import * as THREE from 'three';

/** Flat-shaded lambert material helper */
const FlatMat: React.FC<{ color: number }> = ({ color }) => (
  <meshLambertMaterial color={color} flatShading />
);

/** Low-poly wool bag */
const WoolBag: React.FC<{ position: [number, number, number]; rotationY?: number }> = ({
  position,
  rotationY = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.3, 0.35, 0.6, 6]} />
      <FlatMat color={0x2a1f14} />
    </mesh>
    <mesh position={[0, 0.65, 0]} scale={[1, 0.6, 1]} castShadow>
      <sphereGeometry args={[0.25, 5, 4]} />
      <FlatMat color={0xf5f5dc} />
    </mesh>
  </group>
);

/** Low-poly cottage */
const Cottage: React.FC<{ position: [number, number, number]; rotationY?: number }> = ({
  position,
  rotationY = 0,
}) => {
  const roofGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2.3, 0);
    shape.lineTo(0, 1.8);
    shape.lineTo(2.3, 0);
    shape.lineTo(-2.3, 0);
    return new THREE.ExtrudeGeometry(shape, { depth: 3.4, bevelEnabled: false });
  }, []);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Walls */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 2.5, 3]} />
        <FlatMat color={0xf5deb3} />
      </mesh>
      {/* Roof */}
      <mesh geometry={roofGeo} position={[0, 2.5, -1.7]} castShadow>
        <FlatMat color={0x8b0000} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.75, 1.55]}>
        <boxGeometry args={[0.8, 1.5, 0.1]} />
        <FlatMat color={0x654321} />
      </mesh>
      {/* Windows */}
      <mesh position={[-1.2, 1.6, 1.55]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <FlatMat color={0x87ceeb} />
      </mesh>
      <mesh position={[1.2, 1.6, 1.55]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <FlatMat color={0x87ceeb} />
      </mesh>
      {/* Chimney */}
      <mesh position={[1.2, 3.5, -0.5]} castShadow>
        <boxGeometry args={[0.5, 1.2, 0.5]} />
        <FlatMat color={0x8b4513} />
      </mesh>
    </group>
  );
};

/** Low-poly fence section */
const Fence: React.FC<{
  position: [number, number, number];
  rotationY?: number;
  length?: number;
  postSpacing?: number;
}> = ({ position, rotationY = 0, length = 8, postSpacing = 1.5 }) => {
  const numPosts = Math.floor(length / postSpacing) + 1;
  const posts = useMemo(() => {
    const items: { x: number; hasRail: boolean }[] = [];
    for (let i = 0; i < numPosts; i++) {
      items.push({ x: i * postSpacing - length / 2, hasRail: i < numPosts - 1 });
    }
    return items;
  }, [numPosts, postSpacing, length]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {posts.map((p, i) => (
        <React.Fragment key={i}>
          <mesh position={[p.x, 0.4, 0]} castShadow>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <FlatMat color={0x8b7355} />
          </mesh>
          {p.hasRail && (
            <>
              <mesh position={[p.x + postSpacing / 2, 0.7, 0]}>
                <boxGeometry args={[postSpacing, 0.06, 0.06]} />
                <FlatMat color={0x8b7355} />
              </mesh>
              <mesh position={[p.x + postSpacing / 2, 0.3, 0]}>
                <boxGeometry args={[postSpacing, 0.06, 0.06]} />
                <FlatMat color={0x8b7355} />
              </mesh>
            </>
          )}
        </React.Fragment>
      ))}
    </group>
  );
};

/** Low-poly tree (stacked cones on cylinder) */
const Tree: React.FC<{ position: [number, number, number]; height?: number }> = ({
  position,
  height = 3,
}) => {
  const trunkH = height * 0.35;
  const trunkR = height * 0.06;
  const foliageBaseY = trunkH * 0.7;

  const layers = useMemo(
    () => [
      { y: foliageBaseY, r: height * 0.3, h: height * 0.35 },
      { y: foliageBaseY + height * 0.22, r: height * 0.22, h: height * 0.3 },
      { y: foliageBaseY + height * 0.42, r: height * 0.14, h: height * 0.25 },
    ],
    [height, foliageBaseY],
  );

  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, trunkH / 2, 0]} castShadow>
        <cylinderGeometry args={[trunkR * 0.7, trunkR, trunkH, 5]} />
        <FlatMat color={0x654321} />
      </mesh>
      {/* Foliage layers */}
      {layers.map((l, i) => (
        <mesh key={i} position={[0, l.y + l.h / 2, 0]} castShadow>
          <coneGeometry args={[l.r, l.h, 6]} />
          <FlatMat color={0x228b22} />
        </mesh>
      ))}
    </group>
  );
};

/** Low-poly flower cluster */
const FlowerCluster: React.FC<{
  position: [number, number, number];
  color?: number;
  count?: number;
}> = ({ position, color = 0xff6699, count = 5 }) => {
  const flowers = useMemo(() => {
    const items: { x: number; z: number }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + i * 0.3;
      const dist = (i * 0.618) % 1;
      items.push({ x: Math.cos(angle) * dist, z: Math.sin(angle) * dist });
    }
    return items;
  }, [count]);

  return (
    <group position={position}>
      {flowers.map((f, i) => (
        <group key={i} position={[f.x, 0, f.z]}>
          <mesh position={[0, 0.125, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 4]} />
            <FlatMat color={0x228b22} />
          </mesh>
          <mesh position={[0, 0.27, 0]} rotation={[-Math.PI / 6, 0, 0]}>
            <circleGeometry args={[0.06, 5]} />
            <meshLambertMaterial color={color} flatShading />
          </mesh>
          <mesh position={[0, 0.27, 0]}>
            <sphereGeometry args={[0.025, 4, 4]} />
            <FlatMat color={0xffff00} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/** Dirt path on the ground */
const Path: React.FC = () => {
  const geometry = useMemo(() => {
    const points = [
      [-15, 4],
      [-10, 3.5],
      [-5, 2],
      [0, 0],
      [2, -2],
    ];
    const halfW = 0.6;
    const vertices: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      let dx: number, dy: number;
      if (i < points.length - 1) {
        dx = points[i + 1][0] - p[0];
        dy = points[i + 1][1] - p[1];
      } else {
        dx = p[0] - points[i - 1][0];
        dy = p[1] - points[i - 1][1];
      }
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len;
      const ny = dx / len;

      vertices.push(p[0] + nx * halfW, 0.02, p[1] + ny * halfW);
      vertices.push(p[0] - nx * halfW, 0.02, p[1] - ny * halfW);

      if (i < points.length - 1) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshLambertMaterial color={0xc4a46c} flatShading />
    </mesh>
  );
};

/** All scene props: cottage, fences, trees, flowers, wool bags, path */
export const SceneProps: React.FC = () => {
  return (
    <>
      <Path />
      <Cottage position={[-12, 0, -8]} rotationY={0.3} />
      <Fence position={[0, 0, -4]} length={12} />
      <Fence position={[-8, 0, -2]} rotationY={Math.PI / 2} length={6} />

      {/* Trees */}
      <Tree position={[-10, 0, -5]} height={3.5} />
      <Tree position={[12, 0, -6]} height={4} />
      <Tree position={[-15, 0, 2]} height={3} />
      <Tree position={[15, 0, -3]} height={3.8} />
      <Tree position={[8, 0, -10]} height={4.5} />
      <Tree position={[-8, 0, -12]} height={3.2} />

      {/* Flower clusters */}
      <FlowerCluster position={[4, 0, 4]} color={0xff6699} />
      <FlowerCluster position={[-6, 0, 5]} color={0xffaa00} />
      <FlowerCluster position={[7, 0, -1]} color={0xff4444} />
      <FlowerCluster position={[-4, 0, -3]} color={0xaa44ff} />

      {/* Wool bags */}
      <WoolBag position={[1, 0, -2.5]} />
      <WoolBag position={[1.8, 0, -2.3]} rotationY={0.5} />
      <WoolBag position={[1.4, 0, -3]} rotationY={-0.3} />
    </>
  );
};
