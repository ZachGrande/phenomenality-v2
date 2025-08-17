'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import leafActive from 'assets/leaf-active.svg';
// import leafInactive from 'assets/leaf-inactive.svg';
// import downCarrot from 'assets/down-carrot.svg';
import clsx from 'clsx';
import styles from '../styles/Navigation.module.sass';
import app from '../config';

const leafActive = 'assets/leaf-active.svg';
const leafInactive = 'assets/leaf-inactive.svg';
const downCarrot = 'assets/down-carrot.svg';
const auth = getAuth(app);

function Navigation() {
  const [user, setUser] = useState();
  const [initials, setInitials] = useState('');
  const [profileButton, setProfileButton] = useState(leafInactive);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    setInitials(user?.displayName);
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
      <div className={clsx(styles.navigation, 'w-100 p-3')}>
        <ul className="mb-0 px-0">
          <Link className={clsx(styles.keepStrengthen, styles['navbar-link'], styles['home-font'])} href="/">
            phenomenality | strengthen your mentality
          </Link>
          <Link className={clsx(styles.dropStrengthen, styles['navbar-link'], styles['home-font'])} href="/">
            phenomenality
          </Link>
          {showDropDownMenu
            ? (
              <div className={clsx(styles.dropDown, styles.dropDownContainer)} id="popupForm">
                <ul className="px-4">
                  <li className={clsx(styles.navvy, 'd-inline')}>
                    <Link className={clsx(styles['navbar-link'], styles['link-font'])} href="/accomplishments">
                      accomplishments
                    </Link>
                    <br />
                    <br />
                  </li>
                  <li className={clsx(styles.navvy, 'd-inline')}>
                    <Link className={clsx(styles['navbar-link'], styles['link-font'])} href="/bank">
                      your bank
                    </Link>
                    <br />
                    <br />
                  </li>
                  <li className={clsx(styles.navvy, 'd-inline')}>
                    <Link className={clsx(styles['navbar-link'], styles['link-font'])} href="quiz">
                      quiz
                    </Link>
                    <br />
                    <br />
                  </li>
                  <li className={clsx(styles.navvy, 'd-inline')}>
                    <Link className={clsx(styles['navbar-link'], styles['link-font'])} href="more-info">
                      imposter phenomenon
                    </Link>
                    <br />
                  </li>
                  <br />
                  <br />
                  <li className={clsx(styles.dropdownInitials, 'd-inline')}>
                    <Link className={clsx(styles['navbar-link'], styles['link-font'], styles.dropdownInitials)} href="/authentication">
                      {initials
                        ? (
                          <div className={styles.initials}>
                            {initials}
                          </div>
                        )
                        : (
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
                <div className={styles['popup-btn-center']}>
                  {/* <button type="button" className="btn cancel"
                      onClick={closeDropDownMenu}>close</button> */}
                </div>
              </div>
            )
            : (
              <div className={clsx(styles['nav-left'])}>
                <li className={clsx(styles.navvy, 'd-inline', 'mx-2')}>
                  <Link className={clsx(styles['navbar-link'], styles['link-font'])} href="/accomplishments">
                    accomplishments
                  </Link>
                </li>
                <li className={clsx(styles.navvy, 'd-inline', 'mx-2')}>
                  <Link className={clsx(styles['navbar-link'], styles['link-font'])} href="/bank">
                    your bank
                  </Link>
                </li>
                <li className={clsx(styles.navvy, 'd-inline', 'mx-2')}>
                  <Link className={clsx(styles['navbar-link'], styles['link-font'])} href="quiz">
                    quiz
                  </Link>
                </li>
                <li className={clsx(styles.navvy, 'd-inline', 'mx-2')}>
                  <Link className={clsx(styles['navbar-link'], styles['link-font'])} href="more-info">
                    imposter phenomenon
                  </Link>
                </li>
                <li className="d-inline mx-2">
                  <Link className={clsx(styles['navbar-link'], styles['link-font'])} href="/authentication">
                    {initials
                      ? (
                        <div className="initials">
                          {initials}
                        </div>
                      )
                      : (
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
            ) }
          <button type="button" className={styles['carrot-menu']} onClick={toggleDropDown}>
            <div className={styles.menu}>
              <p className={clsx(styles['link-font'], 'mb-0 d-inline-block align-top')}>menu</p>
              <img
                className={clsx(styles['carrot-icon'], 'd-inline-block', (!showDropDownMenu ? styles.rotated : ''))}
                src={downCarrot}
                alt="Bank"
                width="12%"
                height="12%"
              />
            </div>
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
