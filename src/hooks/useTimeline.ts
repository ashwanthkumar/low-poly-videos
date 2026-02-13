import { useCurrentFrame, useVideoConfig } from 'remotion';
import {
  VideoScript,
  SceneData,
  CameraKeyframe,
  KeyframeData,
  EasingName,
} from '../types';
import { getEasing } from '../animation/Easing';

/** Interpolate between sorted keyframes at a given time */
function evaluateKeyframes(
  keyframes: KeyframeData[],
  time: number,
): number | number[] | string {
  if (keyframes.length === 0) return 0;
  if (keyframes.length === 1) return keyframes[0].value;
  if (time <= keyframes[0].time) return keyframes[0].value;
  if (time >= keyframes[keyframes.length - 1].time)
    return keyframes[keyframes.length - 1].value;

  let i = 0;
  while (i < keyframes.length - 1 && keyframes[i + 1].time <= time) {
    i++;
  }

  const kf0 = keyframes[i];
  const kf1 = keyframes[i + 1];

  // String values snap, no interpolation
  if (typeof kf0.value === 'string' || typeof kf1.value === 'string') {
    return kf0.value;
  }

  const duration = kf1.time - kf0.time;
  const t = duration > 0 ? (time - kf0.time) / duration : 0;
  const easingName: EasingName = kf1.easing ?? 'easeInOutCubic';
  const eased = getEasing(easingName)(t);

  // Numbers
  if (typeof kf0.value === 'number' && typeof kf1.value === 'number') {
    return kf0.value + (kf1.value - kf0.value) * eased;
  }

  // Arrays (vectors)
  if (Array.isArray(kf0.value) && Array.isArray(kf1.value)) {
    return kf0.value.map((v, idx) => {
      const target = (kf1.value as number[])[idx] ?? v;
      return v + (target - v) * eased;
    });
  }

  return kf0.value;
}

/** Interpolate camera keyframes at a given time */
function evaluateCamera(
  keyframes: CameraKeyframe[],
  time: number,
): { position: [number, number, number]; lookAt: [number, number, number]; fov: number } {
  const defaults = {
    position: [0, 4, 14] as [number, number, number],
    lookAt: [0, 1.5, 0] as [number, number, number],
    fov: 50,
  };

  if (keyframes.length === 0) return defaults;
  if (keyframes.length === 1) {
    return {
      position: keyframes[0].position,
      lookAt: keyframes[0].lookAt,
      fov: keyframes[0].fov ?? 50,
    };
  }

  if (time <= keyframes[0].time) {
    return {
      position: keyframes[0].position,
      lookAt: keyframes[0].lookAt,
      fov: keyframes[0].fov ?? 50,
    };
  }

  if (time >= keyframes[keyframes.length - 1].time) {
    const last = keyframes[keyframes.length - 1];
    return { position: last.position, lookAt: last.lookAt, fov: last.fov ?? 50 };
  }

  let i = 0;
  while (i < keyframes.length - 1 && keyframes[i + 1].time <= time) {
    i++;
  }

  const kf0 = keyframes[i];
  const kf1 = keyframes[i + 1];
  const t = (time - kf0.time) / (kf1.time - kf0.time);
  const eased = getEasing('easeInOutCubic')(t);

  const lerp3 = (
    a: [number, number, number],
    b: [number, number, number],
    f: number,
  ): [number, number, number] => [
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + (b[2] - a[2]) * f,
  ];

  return {
    position: lerp3(kf0.position, kf1.position, eased),
    lookAt: lerp3(kf0.lookAt, kf1.lookAt, eased),
    fov: (kf0.fov ?? 50) + ((kf1.fov ?? 50) - (kf0.fov ?? 50)) * eased,
  };
}

/** Resolved track values for a single target */
export interface TargetState {
  position?: [number, number, number];
  action?: string;
}

/** Full timeline state at a given frame */
export interface TimelineState {
  time: number;
  scene: SceneData | null;
  camera: { position: [number, number, number]; lookAt: [number, number, number]; fov: number };
  targets: Record<string, TargetState>;
}

/** Evaluate the full timeline state for the current Remotion frame */
export function useTimeline(script: VideoScript): TimelineState {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Find active scene
  let activeScene: SceneData | null = null;
  for (const scene of script.scenes) {
    if (time >= scene.startTime && time < scene.endTime) {
      activeScene = scene;
      break;
    }
  }
  // If past all scenes, use last scene
  if (!activeScene && script.scenes.length > 0 && time >= script.scenes[script.scenes.length - 1].startTime) {
    activeScene = script.scenes[script.scenes.length - 1];
  }

  // Evaluate camera
  const camera = activeScene
    ? evaluateCamera(activeScene.camera, time)
    : { position: [0, 4, 14] as [number, number, number], lookAt: [0, 1.5, 0] as [number, number, number], fov: 50 };

  // Evaluate all tracks
  const targets: Record<string, TargetState> = {};

  if (activeScene) {
    for (const track of activeScene.tracks) {
      if (!targets[track.target]) {
        targets[track.target] = {};
      }

      const value = evaluateKeyframes(track.keyframes, time);

      if (track.property === 'position' && Array.isArray(value)) {
        targets[track.target].position = value as [number, number, number];
      } else if (track.property === 'action' && typeof value === 'string') {
        targets[track.target].action = value;
      }
    }
  }

  return { time, scene: activeScene, camera, targets };
}
