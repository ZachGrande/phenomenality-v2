'use client';

import type { ReactNode } from 'react';

import { MotionConfig } from 'motion/react';

import { transition } from '../_lib/motion';

/**
 * `reducedMotion="user"` makes every animation in the tree honour
 * `prefers-reduced-motion` without each component opting in.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={transition}>
      {children}
    </MotionConfig>
  );
}
