'use client';

import { useState, useEffect } from 'react';

import clsx from 'clsx';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';

import app from '../../config';
import downCarrot from '../_assets/icons/down-carrot.svg';
import leafActive from '../_assets/icons/leaf-active.svg';
import leafInactive from '../_assets/icons/leaf-inactive.svg';

import styles from './Navigation.module.css';

const auth = getAuth(app);

function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [initials, setInitials] = useState('');
  const [profileButton, setProfileButton] = useState(leafInactive);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    setInitials(user?.displayName ?? '');
  }, [user]);

  const toggleProfileButton = () => {
    if (profileButton === leafInactive) {
      setProfileButton(leafActive);
    } else {
      setProfileButton(leafInactive);
    }
  };

  function toggleDropDown() {
    setShowDropDownMenu(!showDropDownMenu);
  }

  return (
    <nav>
      <div className="w-full bg-cream p-4">
        <ul className="mb-0 px-0 leading-11.5">
          <Link
            className="hidden font-display text-2xl text-ink no-underline md:inline"
            href="/"
          >
            phenomenality | strengthen your mentality
          </Link>
          <Link
            className="inline font-display text-2xl text-ink no-underline md:hidden"
            href="/"
          >
            phenomenality
          </Link>
          {showDropDownMenu ? (
            <div className={styles.dropDown} id="popupForm">
              <ul className="px-4">
                <li className={clsx(styles.navvy, 'inline')}>
                  <Link
                    className="font-sans text-ink no-underline"
                    href="/accomplishments"
                  >
                    accomplishments
                  </Link>
                  <br />
                  <br />
                </li>
                <li className={clsx(styles.navvy, 'inline')}>
                  <Link
                    className="font-sans text-ink no-underline"
                    href="/bank"
                  >
                    your bank
                  </Link>
                  <br />
                  <br />
                </li>
                <li className={clsx(styles.navvy, 'inline')}>
                  <Link className="font-sans text-ink no-underline" href="quiz">
                    quiz
                  </Link>
                  <br />
                  <br />
                </li>
                <li className={clsx(styles.navvy, 'inline')}>
                  <Link
                    className="font-sans text-ink no-underline"
                    href="more-info"
                  >
                    imposter phenomenon
                  </Link>
                  <br />
                </li>
                <br />
                <br />
                <li className="inline text-center">
                  <Link
                    className="font-sans text-center text-ink no-underline"
                    href="/authentication"
                  >
                    {initials ? (
                      <div className="mr-4 inline-flex size-11.5 items-center justify-center rounded-full border-[3px] border-solid border-accent p-0 align-middle text-base font-semibold leading-none">
                        {initials}
                      </div>
                    ) : (
                      <Image
                        src={profileButton}
                        onMouseOver={toggleProfileButton}
                        onMouseLeave={toggleProfileButton}
                        width="50"
                        height="50"
                        alt="profile"
                      />
                    )}
                  </Link>
                </li>
              </ul>
              <div className="flex flex-wrap justify-center text-center">
                {/* <button type="button" className="btn cancel"
                      onClick={closeDropDownMenu}>close</button> */}
              </div>
            </div>
          ) : (
            <div className="relative float-right hidden text-xl xl:block">
              <li className={clsx(styles.navvy, 'inline', 'mx-2')}>
                <Link
                  className="font-sans text-ink no-underline"
                  href="/accomplishments"
                >
                  accomplishments
                </Link>
              </li>
              <li className={clsx(styles.navvy, 'inline', 'mx-2')}>
                <Link className="font-sans text-ink no-underline" href="/bank">
                  your bank
                </Link>
              </li>
              <li className={clsx(styles.navvy, 'inline', 'mx-2')}>
                <Link className="font-sans text-ink no-underline" href="quiz">
                  quiz
                </Link>
              </li>
              <li className={clsx(styles.navvy, 'inline', 'mx-2')}>
                <Link
                  className="font-sans text-ink no-underline"
                  href="more-info"
                >
                  imposter phenomenon
                </Link>
              </li>
              <li className="mx-2 inline">
                <Link
                  className="font-sans text-ink no-underline"
                  href="/authentication"
                >
                  {initials ? (
                    <div className="mr-4 inline-flex size-11.5 items-center justify-center rounded-full border-[3px] border-solid border-accent p-0 align-middle text-base font-semibold leading-none">
                      {initials}
                    </div>
                  ) : (
                    <Image
                      src={profileButton}
                      onMouseOver={toggleProfileButton}
                      onMouseLeave={toggleProfileButton}
                      width="46"
                      height="46"
                      alt="profile"
                    />
                  )}
                </Link>
              </li>
            </div>
          )}
          <button
            type="button"
            className="relative float-right z-100 cursor-pointer bg-transparent text-xl hover:shadow-none xl:hidden"
            onClick={toggleDropDown}
          >
            <div>
              <p className="mb-0 inline-block align-top font-sans font-extralight">
                menu
              </p>
              <Image
                className={clsx(
                  'inline-block float-right -ml-12.5 mt-2.25',
                  !showDropDownMenu ? '-rotate-90' : '',
                )}
                src={downCarrot}
                alt="menu"
                style={{ width: '12%', height: 'auto' }}
              />
            </div>
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
