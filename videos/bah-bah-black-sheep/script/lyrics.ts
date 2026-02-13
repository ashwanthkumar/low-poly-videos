import { LyricLine } from '../../../src/types';

/**
 * Timestamped lyrics for "Bah Bah Black Sheep".
 * Timing follows standard nursery rhyme tempo (~100 BPM).
 * Total duration: ~65 seconds (including intro and outro).
 */
export const lyrics: LyricLine[] = [
  // --- Verse 1 ---
  {
    text: 'Baa, baa, black sheep,',
    startTime: 3.0,
    endTime: 6.0,
    emphasis: ['Baa', 'black'],
  },
  {
    text: 'Have you any wool?',
    startTime: 6.0,
    endTime: 9.0,
    emphasis: ['wool'],
  },
  {
    text: 'Yes sir, yes sir,',
    startTime: 9.0,
    endTime: 12.0,
    emphasis: ['Yes'],
  },
  {
    text: 'Three bags full!',
    startTime: 12.0,
    endTime: 15.5,
    emphasis: ['Three', 'bags'],
  },

  // --- Verse 2 ---
  {
    text: 'One for the master,',
    startTime: 16.0,
    endTime: 19.5,
    emphasis: ['One', 'master'],
  },
  {
    text: 'One for the dame,',
    startTime: 19.5,
    endTime: 23.0,
    emphasis: ['One', 'dame'],
  },
  {
    text: 'And one for the little boy',
    startTime: 23.0,
    endTime: 27.0,
    emphasis: ['one', 'little', 'boy'],
  },
  {
    text: 'Who lives down the lane.',
    startTime: 27.0,
    endTime: 31.0,
    emphasis: ['lane'],
  },

  // --- Verse 3 (repeat) ---
  {
    text: 'Baa, baa, black sheep,',
    startTime: 32.0,
    endTime: 35.0,
    emphasis: ['Baa', 'black'],
  },
  {
    text: 'Have you any wool?',
    startTime: 35.0,
    endTime: 38.0,
    emphasis: ['wool'],
  },
  {
    text: 'Yes sir, yes sir,',
    startTime: 38.0,
    endTime: 41.0,
    emphasis: ['Yes'],
  },
  {
    text: 'Three bags full!',
    startTime: 41.0,
    endTime: 44.5,
    emphasis: ['Three', 'bags'],
  },

  // --- Verse 4 (repeat verse 2) ---
  {
    text: 'One for the master,',
    startTime: 45.0,
    endTime: 48.5,
    emphasis: ['One', 'master'],
  },
  {
    text: 'One for the dame,',
    startTime: 48.5,
    endTime: 52.0,
    emphasis: ['One', 'dame'],
  },
  {
    text: 'And one for the little boy',
    startTime: 52.0,
    endTime: 56.0,
    emphasis: ['one', 'little', 'boy'],
  },
  {
    text: 'Who lives down the lane!',
    startTime: 56.0,
    endTime: 60.0,
    emphasis: ['lane'],
  },
];

export const TOTAL_DURATION = 75.0;
