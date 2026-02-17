import { VideoScript } from '../../../src/types';
import { lyrics, TOTAL_DURATION } from './lyrics';

/**
 * Full scene data for "Twinkle Twinkle Little Star" video.
 *
 * Scene layout:
 * 1. Intro (0-3s): Camera descends from starry sky, family appears
 * 2. Verse 1 (3-24s): "Twinkle twinkle..." — family looks up, points at stars
 * 3. Verse 2 (24-46s): "When the blazing sun is gone..." — more animation
 * 4. Verse 3 (46-61s): Repeat verse 1 with camera variety
 * 5. Outro (61-65s): Family waves, camera pulls back
 * 6. Credits (65-75s): Credits roll
 */
export const script: VideoScript = {
  title: 'Twinkle Twinkle Little Star',
  duration: TOTAL_DURATION,
  fps: 30,
  scenes: [
    // --- Scene 1: Intro ---
    {
      name: 'intro',
      startTime: 0,
      endTime: 3,
      tracks: [
        // Family walks in from the right
        {
          target: 'father',
          property: 'position',
          keyframes: [
            { time: 0, value: [10, 0, 2], easing: 'easeOutCubic' },
            { time: 2.8, value: [-2.5, 0, 2] },
          ],
        },
        {
          target: 'father',
          property: 'action',
          keyframes: [
            { time: 0, value: 'walk' },
            { time: 2.5, value: 'idle' },
          ],
        },
        {
          target: 'mother',
          property: 'position',
          keyframes: [
            { time: 0, value: [12, 0, 1], easing: 'easeOutCubic' },
            { time: 2.8, value: [-0.5, 0, 1.5] },
          ],
        },
        {
          target: 'mother',
          property: 'action',
          keyframes: [
            { time: 0, value: 'walk' },
            { time: 2.5, value: 'idle' },
          ],
        },
        {
          target: 'son',
          property: 'position',
          keyframes: [
            { time: 0, value: [14, 0, 3], easing: 'easeOutCubic' },
            { time: 2.8, value: [1.5, 0, 2.5] },
          ],
        },
        {
          target: 'son',
          property: 'action',
          keyframes: [
            { time: 0, value: 'walk' },
            { time: 2.5, value: 'idle' },
          ],
        },
        // Sheep is already grazing
        {
          target: 'sheep',
          property: 'action',
          keyframes: [{ time: 0, value: 'graze' }],
        },
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 0, value: [3, 0, -1], easing: 'easeInOutCubic' },
            { time: 2.8, value: [2, 0, -1] },
          ],
        },
      ],
      camera: [
        { time: 0, position: [0, 18, 8], lookAt: [0, 0, 0], fov: 55 },
        { time: 2.8, position: [0, 5, 14], lookAt: [0, 2, 0], fov: 50 },
      ],
    },

    // --- Scene 2: Verse 1 ---
    {
      name: 'verse-1',
      startTime: 3,
      endTime: 24,
      tracks: [
        // Father points up at stars
        {
          target: 'father',
          property: 'action',
          keyframes: [
            { time: 3, value: 'idle' },
            { time: 4, value: 'point' },
            { time: 8, value: 'idle' },
            { time: 13, value: 'wave' },
            { time: 16, value: 'idle' },
            { time: 17, value: 'nod' },
            { time: 20, value: 'idle' },
          ],
        },
        // Mother looks up, waves
        {
          target: 'mother',
          property: 'action',
          keyframes: [
            { time: 3, value: 'idle' },
            { time: 6, value: 'nod' },
            { time: 9, value: 'idle' },
            { time: 10, value: 'point' },
            { time: 14, value: 'idle' },
            { time: 20, value: 'wave' },
            { time: 23, value: 'idle' },
          ],
        },
        // Son is excited, claps and waves
        {
          target: 'son',
          property: 'action',
          keyframes: [
            { time: 3, value: 'point' },
            { time: 7, value: 'clap' },
            { time: 11, value: 'idle' },
            { time: 13, value: 'wave' },
            { time: 17, value: 'clap' },
            { time: 21, value: 'idle' },
          ],
        },
        // Son bounces forward then back
        {
          target: 'son',
          property: 'position',
          keyframes: [
            { time: 3, value: [1.5, 0, 2.5], easing: 'easeInOutCubic' },
            { time: 10, value: [2, 0, 1] },
            { time: 17, value: [1, 0, 3] },
            { time: 23, value: [1.5, 0, 2.5] },
          ],
        },
        // Sheep wanders around
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 3, value: 'lookUp' },
            { time: 6, value: 'walk' },
            { time: 10, value: 'graze' },
            { time: 14, value: 'walk' },
            { time: 18, value: 'lookUp' },
            { time: 22, value: 'idle' },
          ],
        },
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 3, value: [2, 0, -1], easing: 'easeInOutCubic' },
            { time: 6, value: [3.5, 0, 0] },
            { time: 10, value: [4, 0, -2] },
            { time: 14, value: [2, 0, -3] },
            { time: 18, value: [0, 0, -2] },
            { time: 22, value: [1.5, 0, -1] },
          ],
        },
      ],
      camera: [
        { time: 3, position: [0, 5, 14], lookAt: [0, 2, 0], fov: 50 },
        { time: 8, position: [4, 4, 10], lookAt: [0, 2.5, 0], fov: 45 },
        { time: 13, position: [-3, 3, 8], lookAt: [0, 2, -1], fov: 45 },
        { time: 17, position: [0, 6, 12], lookAt: [0, 3, 0], fov: 50 },
        { time: 23, position: [3, 4, 11], lookAt: [0, 2, 0], fov: 48 },
      ],
    },

    // --- Scene 3: Verse 2 ---
    {
      name: 'verse-2',
      startTime: 24,
      endTime: 46,
      tracks: [
        // Father walks a bit then points up
        {
          target: 'father',
          property: 'position',
          keyframes: [
            { time: 24, value: [-2.5, 0, 2], easing: 'easeInOutCubic' },
            { time: 28, value: [-3, 0, 0] },
            { time: 35, value: [-2, 0, 1] },
            { time: 42, value: [-2.5, 0, 2] },
          ],
        },
        {
          target: 'father',
          property: 'action',
          keyframes: [
            { time: 24, value: 'walk' },
            { time: 27, value: 'point' },
            { time: 31, value: 'idle' },
            { time: 35, value: 'nod' },
            { time: 38, value: 'idle' },
            { time: 39, value: 'wave' },
            { time: 43, value: 'idle' },
          ],
        },
        // Mother claps, nods
        {
          target: 'mother',
          property: 'action',
          keyframes: [
            { time: 24, value: 'idle' },
            { time: 28, value: 'clap' },
            { time: 32, value: 'idle' },
            { time: 35, value: 'point' },
            { time: 39, value: 'nod' },
            { time: 42, value: 'idle' },
          ],
        },
        {
          target: 'mother',
          property: 'position',
          keyframes: [
            { time: 24, value: [-0.5, 0, 1.5], easing: 'easeInOutCubic' },
            { time: 30, value: [0, 0, 0.5] },
            { time: 38, value: [-1, 0, 2] },
            { time: 44, value: [-0.5, 0, 1.5] },
          ],
        },
        // Son runs around excitedly
        {
          target: 'son',
          property: 'action',
          keyframes: [
            { time: 24, value: 'walk' },
            { time: 28, value: 'point' },
            { time: 32, value: 'clap' },
            { time: 36, value: 'walk' },
            { time: 39, value: 'wave' },
            { time: 43, value: 'idle' },
          ],
        },
        {
          target: 'son',
          property: 'position',
          keyframes: [
            { time: 24, value: [1.5, 0, 2.5], easing: 'easeInOutCubic' },
            { time: 28, value: [3, 0, 1] },
            { time: 32, value: [2, 0, -1] },
            { time: 36, value: [0, 0, 2] },
            { time: 40, value: [1, 0, 3] },
            { time: 44, value: [1.5, 0, 2.5] },
          ],
        },
        // Sheep roams the compound
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 24, value: 'walk' },
            { time: 28, value: 'lookUp' },
            { time: 31, value: 'walk' },
            { time: 35, value: 'graze' },
            { time: 38, value: 'walk' },
            { time: 42, value: 'nod' },
            { time: 44, value: 'idle' },
          ],
        },
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 24, value: [1.5, 0, -1], easing: 'easeInOutCubic' },
            { time: 28, value: [-1, 0, -2] },
            { time: 31, value: [-3, 0, 0] },
            { time: 35, value: [-2, 0, 2] },
            { time: 38, value: [0, 0, 1] },
            { time: 42, value: [2, 0, -1] },
            { time: 44, value: [3, 0, -2] },
          ],
        },
      ],
      camera: [
        { time: 24, position: [3, 4, 11], lookAt: [0, 2, 0], fov: 48 },
        { time: 28, position: [-4, 3, 9], lookAt: [-1, 1.5, 0], fov: 45 },
        { time: 33, position: [0, 7, 10], lookAt: [0, 2, 0], fov: 52 },
        { time: 38, position: [4, 3, 8], lookAt: [1, 2, 0], fov: 45 },
        { time: 42, position: [-2, 4, 12], lookAt: [0, 2, 0], fov: 50 },
        { time: 45, position: [0, 5, 14], lookAt: [0, 2, 0], fov: 50 },
      ],
    },

    // --- Scene 4: Verse 3 (repeat) ---
    {
      name: 'verse-3',
      startTime: 46,
      endTime: 61,
      tracks: [
        {
          target: 'father',
          property: 'action',
          keyframes: [
            { time: 46, value: 'idle' },
            { time: 48, value: 'point' },
            { time: 52, value: 'nod' },
            { time: 55, value: 'idle' },
            { time: 57, value: 'wave' },
            { time: 60, value: 'idle' },
          ],
        },
        {
          target: 'mother',
          property: 'action',
          keyframes: [
            { time: 46, value: 'idle' },
            { time: 50, value: 'wave' },
            { time: 53, value: 'clap' },
            { time: 56, value: 'idle' },
            { time: 58, value: 'nod' },
            { time: 60, value: 'idle' },
          ],
        },
        {
          target: 'son',
          property: 'action',
          keyframes: [
            { time: 46, value: 'clap' },
            { time: 50, value: 'point' },
            { time: 54, value: 'wave' },
            { time: 58, value: 'clap' },
            { time: 60, value: 'idle' },
          ],
        },
        {
          target: 'son',
          property: 'position',
          keyframes: [
            { time: 46, value: [1.5, 0, 2.5], easing: 'easeInOutCubic' },
            { time: 50, value: [2.5, 0, 1] },
            { time: 55, value: [0.5, 0, 3] },
            { time: 60, value: [1.5, 0, 2.5] },
          ],
        },
        // Sheep trots to center
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 46, value: 'walk' },
            { time: 50, value: 'lookUp' },
            { time: 54, value: 'walk' },
            { time: 58, value: 'nod' },
            { time: 60, value: 'idle' },
          ],
        },
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 46, value: [3, 0, -2], easing: 'easeInOutCubic' },
            { time: 50, value: [1, 0, 0] },
            { time: 54, value: [-1, 0, -1] },
            { time: 58, value: [0, 0, -2] },
            { time: 60, value: [0, 0, 0] },
          ],
        },
      ],
      camera: [
        { time: 46, position: [0, 5, 14], lookAt: [0, 2, 0], fov: 50 },
        { time: 50, position: [-3, 3.5, 9], lookAt: [0, 2.5, 0], fov: 45 },
        { time: 54, position: [3, 4, 10], lookAt: [0, 2, -1], fov: 45 },
        { time: 58, position: [0, 6, 13], lookAt: [0, 2, 0], fov: 50 },
        { time: 60, position: [0, 5, 14], lookAt: [0, 2, 0], fov: 50 },
      ],
    },

    // --- Scene 5: Outro ---
    {
      name: 'outro',
      startTime: 61,
      endTime: 65,
      tracks: [
        {
          target: 'father',
          property: 'action',
          keyframes: [{ time: 61, value: 'wave' }],
        },
        {
          target: 'mother',
          property: 'action',
          keyframes: [{ time: 61, value: 'wave' }],
        },
        {
          target: 'son',
          property: 'action',
          keyframes: [{ time: 61, value: 'wave' }],
        },
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 61, value: 'nod' },
            { time: 63, value: 'idle' },
          ],
        },
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 61, value: [0, 0, 0], easing: 'easeInOutCubic' },
            { time: 64, value: [0, 0, 1] },
          ],
        },
      ],
      camera: [
        { time: 61, position: [0, 5, 14], lookAt: [0, 2, 0], fov: 50 },
        { time: 64.5, position: [0, 12, 22], lookAt: [0, 2, 0], fov: 50 },
      ],
    },

    // --- Scene 6: Credits ---
    {
      name: 'credits',
      startTime: 65,
      endTime: 75,
      tracks: [
        {
          target: 'sheep',
          property: 'action',
          keyframes: [{ time: 65, value: 'idle' }],
        },
        {
          target: 'sheep',
          property: 'position',
          keyframes: [{ time: 65, value: [0, 0, 1] }],
        },
        {
          target: 'father',
          property: 'action',
          keyframes: [{ time: 65, value: 'idle' }],
        },
        {
          target: 'mother',
          property: 'action',
          keyframes: [{ time: 65, value: 'idle' }],
        },
        {
          target: 'son',
          property: 'action',
          keyframes: [{ time: 65, value: 'idle' }],
        },
      ],
      camera: [
        { time: 65, position: [0, 12, 22], lookAt: [0, 2, 0], fov: 50 },
        { time: 75, position: [0, 15, 25], lookAt: [0, 2, 0], fov: 50 },
      ],
    },
  ],
  lyrics,
};
