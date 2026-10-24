import type { ReactNode } from 'react';

// Descendant variants replace the old `.imposter-content h1/h2/p/li/blockquote`
// module rules so the shared type-page typography lives in one place.
const wrapper = [
  'mx-12.5 mb-12.5',
  '[&_h1]:ml-[0.5em] [&_h1]:font-display [&_h1]:text-[2rem]',
  '[&_h2]:ml-[0.5em] [&_h2]:font-display',
  '[&_p]:ml-[1em] [&_p]:font-sans [&_p]:font-medium [&_p]:text-xl',
  '[&_li]:ml-[1em] [&_li]:font-sans',
  '[&_blockquote]:ml-[1em] [&_blockquote]:font-sans [&_blockquote]:italic',
].join(' ');

export default function ImposterContent({ children }: { children: ReactNode }) {
  return <div className={wrapper}>{children}</div>;
}
