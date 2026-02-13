import { VideoScript } from '../../../src/types';
import { lyrics, TOTAL_DURATION } from './lyrics';

/**
 * Full scene data for "Baa Baa Black Sheep" video.
 *
 * Scene layout:
 * 1. Intro (0-3s): Camera flies over meadow, family walks in
 * 2. Question (3-9s): "Baa baa black sheep, have you any wool?"
 * 3. Answer (9-15.5s): "Yes sir, yes sir, three bags full"
 * 4. Master & Dame (16-23s): "One for the master, one for the dame..."
 * 5. Little Boy (23-32s): "And one for the little boy who lives down the lane"
 * 6. Repeat (32-60s): Repeat with more animation
 * 7. Outro (60-65s): Family waves goodbye, camera pulls back
 * 8. Credits (65-75s): Credits roll over fading scene
 */
export const script: VideoScript = {
  title: 'Baa Baa Black Sheep',
  duration: TOTAL_DURATION,
  fps: 30,
  scenes: [
    // --- Scene 1: Intro ---
    {
      name: 'intro',
      startTime: 0,
      endTime: 3,
      tracks: [
        // Family walks in from the left
        {
          target: 'father',
          property: 'position',
          keyframes: [
            { time: 0, value: [-12, 0, 2], easing: 'easeOutCubic' },
            { time: 2.8, value: [-3, 0, 2] },
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
            { time: 0, value: [-14, 0, 1], easing: 'easeOutCubic' },
            { time: 2.8, value: [-1.5, 0, 1] },
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
            { time: 0, value: [-15, 0, 3], easing: 'easeOutCubic' },
            { time: 2.8, value: [0, 0, 3] },
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
        // Sheep grazes and wanders in the meadow
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 0, value: 'graze' },
          ],
        },
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 0, value: [2, 0, -3], easing: 'easeInOutCubic' },
            { time: 2.8, value: [0, 0, -2] },
          ],
        },
      ],
      camera: [
        { time: 0, position: [0, 12, 25], lookAt: [0, 1, 0], fov: 50 },
        { time: 2.8, position: [0, 4, 14], lookAt: [0, 1.5, 0], fov: 50 },
      ],
    },

    // --- Scene 2: Question ---
    {
      name: 'question',
      startTime: 3,
      endTime: 9,
      tracks: [
        {
          target: 'son',
          property: 'action',
          keyframes: [
            { time: 3, value: 'wave' },
            { time: 6, value: 'idle' },
          ],
        },
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 3, value: 'graze' },
            { time: 4, value: 'lookUp' },
          ],
        },
        // Sheep hops toward the family
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 3, value: [0, 0, -2], easing: 'easeInOutCubic' },
            { time: 5, value: [1, 0, -1] },
            { time: 7, value: [0.5, 0, 0] },
          ],
        },
        {
          target: 'father',
          property: 'action',
          keyframes: [{ time: 3, value: 'idle' }],
        },
        {
          target: 'mother',
          property: 'action',
          keyframes: [{ time: 3, value: 'idle' }],
        },
      ],
      camera: [
        { time: 3, position: [0, 4, 14], lookAt: [0, 1.5, 0], fov: 50 },
        { time: 5, position: [3, 3, 10], lookAt: [0, 1, -2], fov: 45 },
        { time: 8, position: [2, 2.5, 8], lookAt: [-1, 0.8, -2], fov: 45 },
      ],
    },

    // --- Scene 3: Answer ---
    {
      name: 'answer',
      startTime: 9,
      endTime: 15.5,
      tracks: [
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 9, value: 'nod' },
            { time: 14, value: 'idle' },
          ],
        },
        // Sheep trots to the wool bags
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 9, value: [0.5, 0, 0], easing: 'easeInOutCubic' },
            { time: 11, value: [1, 0, -1.5] },
            { time: 14, value: [1.2, 0, -2.5] },
          ],
        },
        {
          target: 'father',
          property: 'action',
          keyframes: [
            { time: 12, value: 'nod' },
            { time: 14, value: 'idle' },
          ],
        },
        {
          target: 'son',
          property: 'action',
          keyframes: [
            { time: 9, value: 'clap' },
            { time: 14, value: 'idle' },
          ],
        },
      ],
      camera: [
        { time: 9, position: [2, 2.5, 8], lookAt: [-1, 0.8, -2], fov: 45 },
        { time: 11, position: [-2, 2, 6], lookAt: [0, 0.8, -2], fov: 50 },
        { time: 15, position: [0, 3, 12], lookAt: [0, 1.2, 0], fov: 50 },
      ],
    },

    // --- Scene 4: Master & Dame ---
    {
      name: 'master-and-dame',
      startTime: 16,
      endTime: 23,
      tracks: [
        // Father steps forward (the master)
        {
          target: 'father',
          property: 'position',
          keyframes: [
            { time: 16, value: [-3, 0, 2], easing: 'easeInOutCubic' },
            { time: 18, value: [-2, 0, 0] },
          ],
        },
        {
          target: 'father',
          property: 'action',
          keyframes: [
            { time: 16, value: 'walk' },
            { time: 17.5, value: 'wave' },
            { time: 19, value: 'idle' },
          ],
        },
        // Mother steps forward (the dame)
        {
          target: 'mother',
          property: 'position',
          keyframes: [
            { time: 19, value: [-1.5, 0, 1], easing: 'easeInOutCubic' },
            { time: 21, value: [0, 0, 0] },
          ],
        },
        {
          target: 'mother',
          property: 'action',
          keyframes: [
            { time: 19, value: 'walk' },
            { time: 20.5, value: 'wave' },
            { time: 22, value: 'idle' },
          ],
        },
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 16, value: 'walk' },
            { time: 17, value: 'nod' },
            { time: 19, value: 'walk' },
            { time: 20, value: 'nod' },
            { time: 22, value: 'idle' },
          ],
        },
        // Sheep trots around near the wool bags
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 16, value: [1.2, 0, -2.5], easing: 'easeInOutCubic' },
            { time: 18, value: [2.5, 0, -1] },
            { time: 20, value: [1, 0, 0.5] },
            { time: 22, value: [-0.5, 0, -1] },
          ],
        },
      ],
      camera: [
        { time: 16, position: [0, 3, 12], lookAt: [0, 1.2, 0], fov: 50 },
        { time: 18, position: [-4, 3, 8], lookAt: [-2, 1, 0], fov: 45 },
        { time: 20, position: [2, 3, 8], lookAt: [0, 1, 0], fov: 45 },
        { time: 22.5, position: [0, 3.5, 10], lookAt: [0, 1.2, 0], fov: 50 },
      ],
    },

    // --- Scene 5: Little Boy ---
    {
      name: 'little-boy',
      startTime: 23,
      endTime: 32,
      tracks: [
        // Son walks toward sheep
        {
          target: 'son',
          property: 'position',
          keyframes: [
            { time: 23, value: [0, 0, 3], easing: 'easeInOutCubic' },
            { time: 26, value: [1, 0, -1] },
          ],
        },
        {
          target: 'son',
          property: 'action',
          keyframes: [
            { time: 23, value: 'walk' },
            { time: 25.5, value: 'wave' },
            { time: 28, value: 'idle' },
          ],
        },
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 23, value: 'lookUp' },
            { time: 25, value: 'walk' },
            { time: 27, value: 'nod' },
            { time: 30, value: 'idle' },
          ],
        },
        // Sheep hops excitedly toward the boy then circles around
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 23, value: [-0.5, 0, -1], easing: 'easeInOutCubic' },
            { time: 25, value: [0.5, 0, 0] },
            { time: 27, value: [2, 0, -1.5] },
            { time: 29, value: [3, 0, -3] },
            { time: 31, value: [1, 0, -2] },
          ],
        },
        // Parents watch
        {
          target: 'father',
          property: 'action',
          keyframes: [{ time: 23, value: 'idle' }],
        },
        {
          target: 'mother',
          property: 'action',
          keyframes: [{ time: 23, value: 'nod' }, { time: 26, value: 'idle' }],
        },
      ],
      camera: [
        { time: 23, position: [0, 3.5, 10], lookAt: [0, 1.2, 0], fov: 50 },
        { time: 25, position: [4, 2.5, 6], lookAt: [1, 1, -1], fov: 45 },
        { time: 28, position: [3, 2, 4], lookAt: [0.5, 0.8, -1.5], fov: 40 },
        { time: 31, position: [0, 4, 14], lookAt: [0, 1.5, 0], fov: 50 },
      ],
    },

    // --- Scene 6: Repeat ---
    {
      name: 'repeat',
      startTime: 32,
      endTime: 60,
      tracks: [
        // Everyone returns to group formation
        {
          target: 'father',
          property: 'position',
          keyframes: [
            { time: 32, value: [-2, 0, 0], easing: 'easeInOutCubic' },
            { time: 35, value: [-3, 0, 2] },
          ],
        },
        {
          target: 'mother',
          property: 'position',
          keyframes: [
            { time: 32, value: [0, 0, 0], easing: 'easeInOutCubic' },
            { time: 35, value: [-1.5, 0, 1] },
          ],
        },
        {
          target: 'son',
          property: 'position',
          keyframes: [
            { time: 32, value: [1, 0, -1], easing: 'easeInOutCubic' },
            { time: 35, value: [0, 0, 3] },
          ],
        },
        // Animations during repeat
        {
          target: 'father',
          property: 'action',
          keyframes: [
            { time: 32, value: 'walk' },
            { time: 35, value: 'idle' },
            { time: 45, value: 'wave' },
            { time: 48, value: 'idle' },
            { time: 52, value: 'nod' },
            { time: 56, value: 'idle' },
          ],
        },
        {
          target: 'mother',
          property: 'action',
          keyframes: [
            { time: 32, value: 'walk' },
            { time: 35, value: 'idle' },
            { time: 48, value: 'wave' },
            { time: 52, value: 'idle' },
            { time: 55, value: 'clap' },
            { time: 58, value: 'idle' },
          ],
        },
        {
          target: 'son',
          property: 'action',
          keyframes: [
            { time: 32, value: 'walk' },
            { time: 35, value: 'idle' },
            { time: 38, value: 'clap' },
            { time: 42, value: 'idle' },
            { time: 52, value: 'wave' },
            { time: 56, value: 'idle' },
          ],
        },
        // Sheep roams around the compound throughout the repeat
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 32, value: 'walk' },
            { time: 36, value: 'graze' },
            { time: 38, value: 'walk' },
            { time: 42, value: 'lookUp' },
            { time: 44, value: 'walk' },
            { time: 48, value: 'nod' },
            { time: 50, value: 'walk' },
            { time: 55, value: 'nod' },
            { time: 58, value: 'idle' },
          ],
        },
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 32, value: [1, 0, -2], easing: 'easeInOutCubic' },
            { time: 36, value: [3, 0, -1] },
            { time: 38, value: [4, 0, 1] },
            { time: 42, value: [2, 0, 2] },
            { time: 44, value: [-1, 0, 1] },
            { time: 48, value: [-3, 0, -1] },
            { time: 50, value: [-2, 0, -3] },
            { time: 54, value: [0, 0, -4] },
            { time: 58, value: [0, 0, -2] },
          ],
        },
      ],
      camera: [
        { time: 32, position: [0, 4, 14], lookAt: [0, 1.5, 0], fov: 50 },
        { time: 36, position: [-3, 3, 10], lookAt: [0, 1, 0], fov: 48 },
        { time: 40, position: [3, 3.5, 11], lookAt: [0, 1.2, 0], fov: 48 },
        { time: 45, position: [-2, 4, 8], lookAt: [-1, 1, 0], fov: 45 },
        { time: 50, position: [2, 3, 9], lookAt: [0, 1, 0], fov: 48 },
        { time: 55, position: [0, 3.5, 12], lookAt: [0, 1.5, 0], fov: 50 },
        { time: 59, position: [0, 4, 14], lookAt: [0, 1.5, 0], fov: 50 },
      ],
    },

    // --- Scene 7: Outro ---
    {
      name: 'outro',
      startTime: 60,
      endTime: 65,
      tracks: [
        // Everyone waves goodbye
        {
          target: 'father',
          property: 'action',
          keyframes: [{ time: 60, value: 'wave' }],
        },
        {
          target: 'mother',
          property: 'action',
          keyframes: [{ time: 60, value: 'wave' }],
        },
        {
          target: 'son',
          property: 'action',
          keyframes: [{ time: 60, value: 'wave' }],
        },
        {
          target: 'sheep',
          property: 'action',
          keyframes: [
            { time: 60, value: 'nod' },
            { time: 63, value: 'idle' },
          ],
        },
        // Sheep trots to center and faces camera
        {
          target: 'sheep',
          property: 'position',
          keyframes: [
            { time: 60, value: [0, 0, -2], easing: 'easeInOutCubic' },
            { time: 63, value: [0, 0, 0] },
          ],
        },
      ],
      camera: [
        { time: 60, position: [0, 4, 14], lookAt: [0, 1.5, 0], fov: 50 },
        { time: 64.5, position: [0, 10, 22], lookAt: [0, 2, 0], fov: 50 },
      ],
    },

    // --- Scene 8: Credits ---
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
          keyframes: [
            { time: 65, value: [0, 0, 0] },
          ],
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
        { time: 65, position: [0, 10, 22], lookAt: [0, 2, 0], fov: 50 },
        { time: 75, position: [0, 12, 25], lookAt: [0, 2, 0], fov: 50 },
      ],
    },
  ],
  lyrics,
};
