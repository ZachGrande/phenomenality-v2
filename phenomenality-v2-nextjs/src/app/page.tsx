import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './page.module.sass';
import About from '../components/About';

import BankDemo from '../assets/landing-photos/bank-demo.svg';
import Chart from '../assets/landing-photos/chart.svg';
import Welcome from '../assets/landing-photos/welcome.jpg';
import Question from '../assets/landing-photos/question.svg';

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.landing}>
        <div className={clsx(styles.welcome, 'p-3', styles['flex-container'])}>
          <div className={styles['left-side']}>
            <h1>welcome to your personal cheerleader!</h1>
            <p className={styles['landing-para']}>
              log your daily accomplishments and mitigate the
              effects of imposter phenomemon.
            </p>
            <div className={clsx(styles['button-box'], styles['sign-in'])}>
              <Link aria-label="Sign in" className="button rmv-underline" role="button" href="/authentication">sign in</Link>
            </div>
          </div>
          <div className={styles['right-side']}>
            <Image src={Welcome} alt="Individuals Welcoming" className={styles.landingImage} />
          </div>
        </div>

        <div className={clsx(styles.filter, styles['flex-container'], 'p-3')}>
          <div className={styles['left-side']}>
            <Image src={BankDemo} alt="Bank" className={styles.landingImage} />
          </div>
          <div className={styles['right-side']}>
            <h2>filter and sort through all your accomplishments</h2>
            <p className={styles['landing-para']}>
              track your day to day wins and build confidence
              in yourself when reviewing your accomplishments
              and cataloging resume-worthy achievements for
              easy reference.
            </p>
            <div className={clsx(styles['button-box'], styles.accomp)}>
              <Link aria-label="Add an Accomplishment" className={clsx(styles.button, styles['rmv-underline'], styles.accompBtn)} role="button" href="/accomplishments">add an accomplishment</Link>
            </div>
          </div>
        </div>

        <div className={clsx(styles.ipType, styles['flex-container'], 'p-3')}>
          <div className={styles['left-side']}>
            <h2>see which imposter phenomenon type you most align with</h2>
            <p className={styles['landing-para']}>
              take a quiz to find out some tricks and tips you can
              <br />
              phenomenality does not contain medical advice and is not meant to be a subsitute
              for professional care. if you are experiencing mental health challenges, we encourage
              you to seek out professional help.
            </p>
            <div className={clsx(styles['button-box'], styles.quiz)}>
              <Link aria-label="Take the Quiz" className={clsx(styles.button, styles['rmv-underline'], styles.accompBtn)} role="button" href="/quiz">take the quiz</Link>
            </div>
          </div>
          <div className={styles['right-side']}>
            <Image src={Chart} alt="Individual Chart" className={styles.landingImage} />
          </div>
        </div>

        <div className={clsx(styles.what, styles['flex-container'], 'p-3')}>
          <div className={styles['left-side']}>
            <Image src={Question} alt="Individual Questioning" className={styles.landingImage} />
          </div>
          <div className={styles['right-side']}>
            <h2>what is imposter phenomenon?</h2>
            <p className={styles['landing-para']}>
              imposter phenomenon is the feeling of doubt in one’s
              relevant knowledge and abilities regardless of experience
              or education, a common experience across young professionals
              who are gender minorities. to address this, phenomenality
              encourages recognition of accomplishments by prompting you
              to document your daily wins!
            </p>
            <div className={clsx(styles['button-box'], styles.types)}>
              <Link aria-label="Learn more about Imposter Phenomenon" className={clsx(styles.button, styles['rmv-underline'], styles.accompBtn)} role="button" href="/more-info">learn more</Link>
            </div>
          </div>
        </div>

        <div className={clsx(styles.about, 'p-3')}>
          <About />
        </div>

      </div>
    </div>
  );
}
