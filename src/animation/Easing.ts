import { EasingFn, EasingName } from '../types';

/**
 * Custom easing functions (no GSAP dependency).
 * All functions take t in [0,1] and return a value in [0,1].
 */
export const Easing = {
  linear: (t: number): number => t,

  easeInQuad: (t: number): number => t * t,

  easeOutQuad: (t: number): number => t * (2 - t),

  easeInOutQuad: (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

  easeInCubic: (t: number): number => t * t * t,

  easeOutCubic: (t: number): number => {
    const t1 = t - 1;
    return t1 * t1 * t1 + 1;
  },

  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  easeInOutSine: (t: number): number =>
    -(Math.cos(Math.PI * t) - 1) / 2,

  easeOutBack: (t: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },

  easeOutElastic: (t: number): number => {
    if (t === 0 || t === 1) return t;
    const c4 = (2 * Math.PI) / 3;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
} as const satisfies Record<EasingName, EasingFn>;

/** Get an easing function by name */
export function getEasing(name: EasingName): EasingFn {
  return Easing[name];
}
