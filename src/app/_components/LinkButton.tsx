import type { ReactNode } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

interface LinkButtonProps {
  href: string;
  'aria-label': string;
  children: ReactNode;
  className?: string;
}

export default function LinkButton({
  href,
  'aria-label': ariaLabel,
  children,
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      role="button"
      className={clsx(
        'block rounded-control bg-brand p-2.5 text-center font-sans text-base font-normal text-brand-contrast no-underline hover:shadow-elevate',
        className,
      )}
    >
      {children}
    </Link>
  );
}
