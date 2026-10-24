import { ViewTransition } from 'react';
import type { ReactNode } from 'react';

/**
 * Untyped navigations (nav links, browser back/forward) crossfade. Links that
 * pass `transitionTypes={['nav-forward'|'nav-back']}` slide directionally.
 */
const pageTransitionClasses = {
  'nav-forward': 'nav-forward',
  'nav-back': 'nav-back',
  default: 'page',
};

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={pageTransitionClasses}
      exit={pageTransitionClasses}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
