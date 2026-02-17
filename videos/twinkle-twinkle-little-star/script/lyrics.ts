import { LyricLine } from '../../../src/types';

/**
 * Timestamped lyrics for "Twinkle Twinkle Little Star".
 * Timing follows a gentle lullaby tempo (~80 BPM).
 * Total duration: ~75 seconds (including intro and outro).
 */
export const lyrics: LyricLine[] = [
  // --- Verse 1 ---
  {
    text: 'Twinkle, twinkle, little star,',
    startTime: 3.0,
    endTime: 6.5,
    emphasis: ['Twinkle', 'star'],
  },
  {
    text: 'How I wonder what you are!',
    startTime: 6.5,
    endTime: 10.0,
    emphasis: ['wonder'],
  },
  {
    text: 'Up above the world so high,',
    startTime: 10.0,
    endTime: 13.5,
    emphasis: ['above', 'high'],
  },
  {
    text: 'Like a diamond in the sky.',
    startTime: 13.5,
    endTime: 17.0,
    emphasis: ['diamond', 'sky'],
  },
  {
    text: 'Twinkle, twinkle, little star,',
    startTime: 17.0,
    endTime: 20.5,
    emphasis: ['Twinkle', 'star'],
  },
  {
    text: 'How I wonder what you are!',
    startTime: 20.5,
    endTime: 24.0,
    emphasis: ['wonder'],
  },

  // --- Verse 2 ---
  {
    text: 'When the blazing sun is gone,',
    startTime: 25.0,
    endTime: 28.5,
    emphasis: ['blazing', 'sun'],
  },
  {
    text: 'When he nothing shines upon,',
    startTime: 28.5,
    endTime: 32.0,
    emphasis: ['nothing', 'shines'],
  },
  {
    text: 'Then you show your little light,',
    startTime: 32.0,
    endTime: 35.5,
    emphasis: ['show', 'light'],
  },
  {
    text: 'Twinkle, twinkle, through the night.',
    startTime: 35.5,
    endTime: 39.0,
    emphasis: ['Twinkle', 'night'],
  },
  {
    text: 'Twinkle, twinkle, little star,',
    startTime: 39.0,
    endTime: 42.5,
    emphasis: ['Twinkle', 'star'],
  },
  {
    text: 'How I wonder what you are!',
    startTime: 42.5,
    endTime: 46.0,
    emphasis: ['wonder'],
  },

  // --- Verse 3 (repeat verse 1) ---
  {
    text: 'Twinkle, twinkle, little star,',
    startTime: 47.0,
    endTime: 50.5,
    emphasis: ['Twinkle', 'star'],
  },
  {
    text: 'How I wonder what you are!',
    startTime: 50.5,
    endTime: 54.0,
    emphasis: ['wonder'],
  },
  {
    text: 'Up above the world so high,',
    startTime: 54.0,
    endTime: 57.5,
    emphasis: ['above', 'high'],
  },
  {
    text: 'Like a diamond in the sky.',
    startTime: 57.5,
    endTime: 61.0,
    emphasis: ['diamond', 'sky'],
  },
];

export const TOTAL_DURATION = 75.0;
