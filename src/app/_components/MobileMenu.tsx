'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { dropVariants } from '../_lib/motion';

import { isActiveLink, navLinks } from './navLinks';
import ProfileAvatar from './ProfileAvatar';

const MENU_ID = 'mobile-menu';

/**
 * Hamburger toggle plus a full-width panel that drops from the header. Shown
 * below the `xl` breakpoint; the desktop link row takes over above it.
 */
export default function MobileMenu({ initials }: { initials: string }) {
  const pathname = usePathname();
  // The menu is only open for the route it was opened on, so any navigation
  // (link tap, browser back) closes it without an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = openedAt === pathname;
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const close = () => setOpenedAt(null);
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="flex size-11.5 flex-col items-center justify-center gap-1.5 rounded-control bg-transparent p-0 hover:shadow-none"
        onClick={() => setOpenedAt(isOpen ? null : pathname)}
      >
        <span
          className={clsx(
            'block h-0.5 w-6 rounded-full bg-ink transition-transform duration-200 motion-reduce:transition-none',
            isOpen && 'translate-y-2 rotate-45',
          )}
        />
        <span
          className={clsx(
            'block h-0.5 w-6 rounded-full bg-ink transition-opacity duration-200 motion-reduce:transition-none',
            isOpen && 'opacity-0',
          )}
        />
        <span
          className={clsx(
            'block h-0.5 w-6 rounded-full bg-ink transition-transform duration-200 motion-reduce:transition-none',
            isOpen && '-translate-y-2 -rotate-45',
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id={MENU_ID}
            variants={dropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border-subtle/20 bg-surface shadow-popup"
          >
            <ul className="mb-0 list-none p-0">
              {navLinks.map(({ href, label }) => {
                const active = isActiveLink(pathname, href);
                return (
                  <li key={href} className="border-b border-border-subtle/15">
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={clsx(
                        'flex min-h-14 items-center justify-between px-6 font-display text-xl text-ink no-underline active:bg-cream',
                        active &&
                          'bg-cream/60 shadow-[inset_4px_0_0_var(--color-brand)]',
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/authentication"
              className="flex min-h-16 items-center gap-4 px-6 py-3 font-sans text-lg text-ink no-underline active:bg-cream"
            >
              <ProfileAvatar initials={initials} size={40} />
              {initials ? 'your account' : 'sign in'}
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
