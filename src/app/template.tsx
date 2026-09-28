import type { ReactNode } from 'react';

import PageTransition from './_components/PageTransition';

/**
 * Next.js remounts `template.tsx` on every navigation, so wrapping here gives
 * every current and future route its transition without per-page wiring.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
