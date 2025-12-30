import React from 'react';

import Image from 'next/image';

import styles from '../_styles/page.module.sass';

import genius from '@/app/_assets/imposter-types/genius.svg';

function Genius() {
  return (
    <div className={styles['imposter-content']}>
      <h1>the genius</h1>
      <Image className={styles['page-image']} src={genius} alt="genius icon" />
      <h2>overview</h2>
      <p>
        “The natural genius represents a person with imposter phenomenon that
        not only struggles with perfectionism but also sets out to achieve lofty
        goals on their first try. These individuals feel unworthy and shameful
        if they cannot easily complete a task or achieve a goal on their first
        go.
      </p>
      <pre></pre>
      <div className={styles['float-video']}>
        <iframe
          aria-label="Genius overview"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/MFd7I4iWeTg?start=131"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h2>general tips</h2>
      <ul>
        <li>
          To move past this, try viewing yourself as a work in progress.
          Accomplishing great things continuous learning, growing, and making
          mistakes--for everyone, even the most confident people.
        </li>
        <li>
          Rather than beating yourself up when you don't reach your impossibly
          high standards, identify specific, small, and changeable behaviors
          that you can improve over time.
        </li>
        <li>
          For example, if you want to have more impact at the office, it's much
          more productive to focus on going out of your comfort zone to practice
          your presentation skills than swearing off speaking up in meetings as
          something you're “just not good at.”
        </li>
      </ul>
      <h2>resources</h2>
      <ul>
        <li>
          <a href="https://www.scotthyoung.com/blog/2009/12/28/the-frustration-barrier-the-key-obstacle-to-being-good-at-anything/">
            The Frustration Barrier – The Key Obstacle to Being Good at Anything
          </a>
        </li>
        <li>
          <a href="https://www.forbes.com/sites/forbescoachescouncil/2021/05/26/14-tips-to-help-perfectionists-get-out-of-their-own-way/">
            14 Tips To Help Perfectionists Get Out Of Their Own Way
          </a>
        </li>
      </ul>
      <h2>quotes</h2>
      <blockquote>
        "I have written 11 books, but each time I think, ‘uh oh, they're going
        to find out now. I've run a game on everybody, and they're going to find
        me out."
      </blockquote>
      <cite>
        — Maya Angelou, Presidential Medal of Freedom Award Winning American
        Poet, Memoirist, and Civil Rights Activist
      </cite>
    </div>
  );
}

export default Genius;
