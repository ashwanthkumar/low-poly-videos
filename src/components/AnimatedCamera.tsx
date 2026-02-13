import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimatedCameraProps {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

/** Camera that smoothly follows keyframe-interpolated position/lookAt/fov */
export const AnimatedCamera: React.FC<AnimatedCameraProps> = ({
  position,
  lookAt,
  fov,
}) => {
  const { camera } = useThree();
  const lookAtVec = useRef(new THREE.Vector3());

  useFrame(() => {
    camera.position.set(position[0], position[1], position[2]);
    lookAtVec.current.set(lookAt[0], lookAt[1], lookAt[2]);
    camera.lookAt(lookAtVec.current);

    if ((camera as THREE.PerspectiveCamera).fov !== fov) {
      (camera as THREE.PerspectiveCamera).fov = fov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
};
