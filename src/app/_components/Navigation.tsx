'use client';

import { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import app from '../../config';

import MobileMenu from './MobileMenu';
import { isActiveLink, navLinks } from './navLinks';
import ProfileAvatar from './ProfileAvatar';

import type { User } from 'firebase/auth';

const auth = getAuth(app);

function Navigation() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const initials = user?.displayName ?? '';

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <nav
      className="relative z-40 bg-cream px-4 py-2"
      style={{ viewTransitionName: 'site-header' }}
    >
      <div className="flex items-center justify-between">
        <Link className="font-display text-2xl text-ink no-underline" href="/">
          <span className="hidden md:inline">
            phenomenality | strengthen your mentality
          </span>
          <span className="md:hidden">phenomenality</span>
        </Link>

        <ul className="mb-0 hidden list-none items-center p-0 text-xl xl:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href} className="mx-3">
              <Link
                className="relative block py-1 font-sans text-ink no-underline after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:origin-center after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100 aria-[current=page]:after:scale-x-100 motion-reduce:after:transition-none"
                href={href}
                aria-current={isActiveLink(pathname, href) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mx-2">
            <Link href="/authentication" className="no-underline">
              <ProfileAvatar initials={initials} size={46} />
            </Link>
          </li>
        </ul>

        <MobileMenu initials={initials} />
      </div>
    </nav>
  );
}

export default Navigation;
