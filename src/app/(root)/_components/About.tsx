import React from 'react';

import Image from 'next/image';

import styles from './About.module.css';
import EliseAdams from './images/EliseAdams.jpg';
import jackjack from './images/jack-jack.svg';
import RachelKinkley from './images/RachelKinkley.jpeg';
import TiffanyTse from './images/TiffanyTse.jpg';
import ValerieTse from './images/ValerieTse.jpg';
import ZachGrande from './images/ZachGrande.png';

export default function About() {
  return (
    <div className={styles.about}>
      <h1>the team</h1>

      <div className={styles['member-group']}>
        <div className={styles.member}>
          <Image
            src={EliseAdams}
            alt="Elise"
            className={styles['member-photo']}
          />
          <p className="text-[2vw]">elise adams</p>
          <p className="text-[1.6vw] font-normal italic">
            project manager/research
          </p>
        </div>
        <div className={styles.member}>
          <Image
            src={ZachGrande}
            alt="Zach"
            className={styles['member-photo']}
          />
          <p className="text-[2vw]">zach grande</p>
          <p className="text-[1.6vw] font-normal italic">
            full-stack development
          </p>
        </div>
        <div className={styles.member}>
          <Image
            src={RachelKinkley}
            alt="Rachel"
            className={styles['member-photo']}
          />
          <p className="text-[2vw]">rachel kinkley</p>
          <p className="text-[1.6vw] font-normal italic">front-end/research</p>
        </div>
        <div className={styles.member}>
          <Image
            src={TiffanyTse}
            alt="Tiffany"
            className={styles['member-photo']}
          />
          <p className="text-[2vw]">tiffany tse</p>
          <p className="text-[1.6vw] font-normal italic">front-end/ui</p>
        </div>
        <div className={styles.member}>
          <Image
            src={ValerieTse}
            alt="Valerie"
            className={styles['member-photo']}
          />
          <p className="text-[2vw]">valerie tse</p>
          <p className="text-[1.6vw] font-normal italic">program manager/ux</p>
        </div>
      </div>

      <div className={styles.thanks}>
        <p>
          with many thanks to jeremy zaretzky, emily porter, laura schildkraut,
          mina tari, and milla titova
        </p>
        <h6>
          NOTICE UPDATE: beginning 5/26 the development of “phenomenality” has
          shut down.
        </h6>
        <div className={styles['jackjack-container']}>
          <Image
            className={styles.jackjack}
            src={jackjack}
            alt="phenomenality logo"
          />
        </div>
      </div>
    </div>
  );
}
