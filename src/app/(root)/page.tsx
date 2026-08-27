import Image from 'next/image';

import BankDemo from '../_assets/landing-photos/bank-demo.svg';
import Chart from '../_assets/landing-photos/chart.svg';
import Question from '../_assets/landing-photos/question.svg';
import Welcome from '../_assets/landing-photos/welcome.jpg';
import LinkButton from '../_components/LinkButton';

import About from './_components/About';

export default function Page() {
  return (
    <div>
      <div className="flex flex-col items-center justify-evenly gap-6 bg-surface p-4 md:flex-row">
        <div className="w-full md:flex-1">
          <h1 className="text-display-xl font-display font-semibold">
            welcome to your personal cheerleader!
          </h1>
          <p className="text-fluid-lg font-sans">
            log your daily accomplishments and mitigate the effects of imposter
            phenomemon.
          </p>
          <LinkButton
            href="/authentication"
            aria-label="Sign in"
            className="w-24"
          >
            sign in
          </LinkButton>
        </div>
        <div className="w-full md:flex-1 md:pl-12">
          <Image
            src={Welcome}
            alt="Individuals Welcoming"
            className="h-auto w-full max-w-xl"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-evenly gap-6 bg-cream p-4 md:flex-row">
        <div className="w-full md:flex-1">
          <Image src={BankDemo} alt="Bank" className="h-auto w-full max-w-xl" />
        </div>
        <div className="w-full md:flex-1 md:pl-12">
          <h2 className="text-display-lg font-display font-semibold">
            filter and sort through all your accomplishments
          </h2>
          <p className="text-fluid-lg font-sans">
            track your day to day wins and build confidence in yourself when
            reviewing your accomplishments and cataloging resume-worthy
            achievements for easy reference.
          </p>
          <LinkButton
            href="/accomplishments"
            aria-label="Add an Accomplishment"
            className="w-fit"
          >
            add an accomplishment
          </LinkButton>
        </div>
      </div>

      <div className="flex flex-col items-center justify-evenly gap-6 bg-surface p-4 md:flex-row">
        <div className="w-full md:flex-1">
          <h2 className="text-display-lg font-display font-semibold">
            see which imposter phenomenon type you most align with
          </h2>
          <p className="text-fluid-lg font-sans">
            take a quiz to find out some tricks and tips you can
          </p>
          <p className="text-fluid-lg font-sans">
            phenomenality does not contain medical advice and is not meant to be
            a subsitute for professional care. if you are experiencing mental
            health challenges, we encourage you to seek out professional help.
          </p>
          <LinkButton href="/quiz" aria-label="Take the Quiz" className="w-fit">
            take the quiz
          </LinkButton>
        </div>
        <div className="w-full md:flex-1 md:pl-12">
          <Image
            src={Chart}
            alt="Individual Chart"
            className="h-auto w-full max-w-xl"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-evenly gap-6 bg-cream p-4 md:flex-row">
        <div className="w-full md:flex-1">
          <Image
            src={Question}
            alt="Individual Questioning"
            className="h-auto w-full max-w-xl"
          />
        </div>
        <div className="w-full md:flex-1 md:pl-12">
          <h2 className="text-display-lg font-display font-semibold">
            what is imposter phenomenon?
          </h2>
          <p className="text-fluid-lg font-sans">
            imposter phenomenon is the feeling of doubt in one’s relevant
            knowledge and abilities regardless of experience or education, a
            common experience across young professionals who are gender
            minorities. to address this, phenomenality encourages recognition of
            accomplishments by prompting you to document your daily wins!
          </p>
          <LinkButton
            href="/more-info"
            aria-label="Learn more about Imposter Phenomenon"
            className="w-fit"
          >
            learn more
          </LinkButton>
        </div>
      </div>

      <div className="p-4">
        <About />
      </div>
    </div>
  );
}
