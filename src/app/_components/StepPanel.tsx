'use client';

import type { ReactNode } from 'react';

import clsx from 'clsx';
import { motion } from 'motion/react';

import { stepVariants } from '../_lib/motion';

interface StepPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * One step of a multi-step flow. Render inside `<AnimatePresence mode="wait">`
 * with a stable `key` per step so the outgoing panel finishes before the next.
 */
export default function StepPanel({ children, className }: StepPanelProps) {
  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={clsx(
        'm-12.5 flex flex-col items-center px-18.75 py-12.5 outline-1 outline-border-subtle',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
