import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import styles from '../styles/Landing.module.sass';

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.landing}>
        <div className={styles.welcome}>
          <div className={styles['left-side']}>
            <h1>welcome to your personal cheerleader!</h1>
            <p>Log your daily accomplishments and mitigate the effects of imposter phenomenon.</p>
            <div className={styles.buttonBox}>
              <Link href="/authentication" className={styles.button}>Sign in</Link>
            </div>
          </div>
          <div className={styles['right-side']}>
            <Image src="/assets/landing-photos/welcome.jpg" alt="Individuals Welcoming" width={500} height={500} />
          </div>
        </div>

        <div className={styles.filter}>
          <div className={styles.leftSide}>
            <Image src="/assets/landing-photos/bank-demo.svg" alt="Bank" width={250} height={250} />
          </div>
          <div className={styles.rightSide}>
            <h2>Filter and sort through all your accomplishments</h2>
            <p>
              Track your day-to-day wins and build confidence in yourself when reviewing your
              accomplishments and cataloging resume-worthy achievements for easy reference.
            </p>
            <div className={styles.buttonBox}>
              <Link href="/accomplishments" className={styles.button}>Add an accomplishment</Link>
            </div>
          </div>
        </div>

        <div className={styles.ipType}>
          <div className={styles.leftSide}>
            <h2>See which imposter phenomenon type you most align with</h2>
            <p>
              Take a quiz to find out some tricks and tips. Phenomenality does not contain medical
              advice and is not meant to be a substitute for professional care. If you are
              experiencing mental health challenges, we encourage you to seek professional help.
            </p>
            <div className={styles.buttonBox}>
              <Link href="/quiz" className={styles.button}>Take the quiz</Link>
            </div>
          </div>
          <div className={styles.rightSide}>
            <Image src="/chart.svg" alt="Individual Chart" width={100} height={100} />
          </div>
        </div>

        <div className={styles.what}>
          <div className={styles.leftSide}>
            <Image src="/question.svg" alt="Individual Questioning" width={250} height={250} />
          </div>
          <div className={styles.rightSide}>
            <h2>What is imposter phenomenon?</h2>
            <p>
              Imposter phenomenon is the feeling of doubt in one’s relevant knowledge and abilities
              regardless of experience or education, a common experience across young professionals
              who are gender minorities. To address this, Phenomenality encourages recognition of
              accomplishments by prompting you to document your daily wins!
            </p>
            <div className={styles.buttonBox}>
              <Link href="/more-info" className={styles.button}>Learn more</Link>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2022 University of Washington - Team Orka</p>
      </footer>
    </div>
  );
}
