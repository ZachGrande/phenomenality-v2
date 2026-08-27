import type { ReactNode } from 'react';

import clsx from 'clsx';

interface CardButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'action' | 'delete';
  'aria-label'?: string;
}

function CardButton({
  onClick,
  children,
  variant = 'action',
  'aria-label': ariaLabel,
}: CardButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        'm-1.25 inline',
        variant === 'delete' &&
          'absolute top-0 right-0 border border-cream bg-cream p-3.75 text-center text-ink',
      )}
    >
      {children}
    </button>
  );
}

export default CardButton;
