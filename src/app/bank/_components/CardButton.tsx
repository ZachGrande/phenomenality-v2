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
        variant === 'action' &&
          'border border-brand bg-transparent px-4 py-1.5 text-sm text-brand hover:bg-brand hover:text-brand-contrast hover:shadow-none',
        variant === 'delete' &&
          'absolute top-3 right-3 h-8 w-8 rounded-full bg-transparent p-0 text-lg leading-none text-inactive-text hover:bg-black/5 hover:text-ink hover:shadow-none',
      )}
    >
      {children}
    </button>
  );
}

export default CardButton;
