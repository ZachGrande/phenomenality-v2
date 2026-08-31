import type { Transition, Variants } from 'motion/react';

/**
 * Single source of truth for motion across the app. Anything that animates
 * should pull its timing and variants from here rather than inlining values.
 */

export const duration = {
  fast: 0.18,
  base: 0.28,
} as const;

export const transition: Transition = {
  duration: duration.base,
  ease: 'easeOut',
};

/** Route-level motion lives in CSS; see the view-transition rules in globals.css. */

/** Step-level transition: content rises in and lifts away. */
export const stepVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

/** Spread onto any `motion` element that acts as a control. */
export const pressable = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.98 },
} as const;
