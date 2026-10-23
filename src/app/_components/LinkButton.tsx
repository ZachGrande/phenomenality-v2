import type { ReactNode } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

/** A navigation link styled like a primary button. */
export default function LinkButton({
  href,
  children,
  className,
  'aria-label': ariaLabel,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={clsx(
        'block rounded-control bg-brand px-5 py-2.5 text-center font-sans text-base font-normal text-brand-contrast no-underline hover:shadow-elevate',
        className,
      )}
    >
      {children}
    </Link>
  );
}
