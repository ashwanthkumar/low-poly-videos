/** Camera keyframe data */
export interface CameraKeyframe {
  time: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  fov?: number;
}

/** Character identity */
export type CharacterRole = 'father' | 'mother' | 'son' | 'daughter' | 'baby';

/** Character configuration */
export interface CharacterConfig {
  role: CharacterRole;
  name: string;
  height: number;
  bodyColor: number;
  skinColor: number;
  hairColor: number;
  pantsColor: number;
  shoeColor: number;
}

/** Action types for characters */
export type ActionType = 'idle' | 'walk' | 'wave' | 'nod' | 'clap' | 'point' | 'hold';

/** Sheep actions */
export type SheepActionType = 'idle' | 'graze' | 'lookUp' | 'nod' | 'walk';

/** Easing function type */
export type EasingFn = (t: number) => number;

/** Named easing presets */
export type EasingName =
  | 'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInOutSine'
  | 'easeOutBack'
  | 'easeOutElastic';

/** A single keyframe in a track */
export interface KeyframeData {
  time: number;
  value: number | number[] | string;
  easing?: EasingName;
}

/** Animation track targeting a property */
export interface TrackData {
  target: string;
  property: string;
  keyframes: KeyframeData[];
}

/** A scene in the video */
export interface SceneData {
  name: string;
  startTime: number;
  endTime: number;
  tracks: TrackData[];
  camera: CameraKeyframe[];
}

/** Lyric line with timing */
export interface LyricLine {
  text: string;
  startTime: number;
  endTime: number;
  emphasis?: string[];
}

/** Full video script */
export interface VideoScript {
  title: string;
  duration: number;
  fps: number;
  scenes: SceneData[];
  lyrics: LyricLine[];
}
