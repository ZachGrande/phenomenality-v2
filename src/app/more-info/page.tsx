import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './_styles/page.module.sass';

import expert from '@/app/_assets/imposter-types/expert.svg';
import genius from '@/app/_assets/imposter-types/genius.svg';
import perfectionist from '@/app/_assets/imposter-types/perfectionist.svg';
import soloist from '@/app/_assets/imposter-types/soloist.svg';
import superhero from '@/app/_assets/imposter-types/superhero.svg';

function ImposterInfo() {
  return (
    <div>
      <h1 className={styles.h1imposterInfo}>imposter phenomenon information</h1>
      <div className={styles['imposterInfo-container']}>
        <Link className={styles.type} href="/type-1">
          <Image src={perfectionist} alt="perfectionist logo" />
          <div className={styles['txt-div']}>Perfectionist</div>
        </Link>
        <br />
        <Link className={styles.type} href="/type-2">
          <Image src={superhero} alt="superhuman logo" />
          <div className={styles['txt-div']}>Superhuman</div>
        </Link>
        <br />
        <Link className={styles.type} href="/type-3">
          <Image src={genius} alt="genius logo" />
          <div className={styles['txt-div']}>Genius</div>
        </Link>
        <br />
        <Link className={styles.type} href="/type-4">
          <Image src={soloist} alt="soloist logo" />
          <div className={styles['txt-div']}>Soloist</div>
        </Link>
        <br />
        <Link className={styles.type} href="/type-5">
          <Image src={expert} alt="expert logo" />
          <div className={styles['txt-div']}>Expert</div>
        </Link>
      </div>
    </div>
  );
}

export default ImposterInfo;
