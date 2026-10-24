import Image from 'next/image';

import ImposterContent from '../_components/ImposterContent';

import soloist from '@/app/_assets/imposter-types/soloist.svg';

function Soloist() {
  return (
    <ImposterContent>
      <h1>the soloist</h1>
      <Image
        className="mx-auto block h-auto max-w-[50%] md:max-w-[40%] lg:max-w-[30%]"
        src={soloist}
        alt="soloist icon"
      />
      <h2>overview</h2>
      <p>
        The soloist represents a person with imposter phenomenon that has
        difficulty asking others for help. Perhaps they may feel that others are
        not as competent as themselves or that they must prove their own worth
        through their individual productivity.
      </p>
      <pre></pre>
      <div className="m-4 lg:float-right">
        <iframe
          aria-label="Soloist overview"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/MFd7I4iWeTg?start=139"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h2>general tips</h2>
      <ul>
        <li>
          Keep in mind that you could be taking much longer to complete
          something by insisting that you have to figure it out yourself rather
          than reaching out to someone.
        </li>
        <li>
          It&apos;s important to recognize that no one is completely isolated.
          Independence is blissful; however, it shouldn&apos;t deter you from
          accepting assistance from others. Everyone has their areas of
          strength, and asking for help with a particular area you are not good
          at will help to maximize both the quality and quantity of your
          completed tasks.
        </li>
        <li>
          Therefore, you should learn to view asking questions as a willingness
          to learn rather than incompetence.
        </li>
      </ul>
      <h2>resources</h2>
      <ul>
        <li>
          <a href="https://www.cnbc.com/2019/07/09/stop-asking-can-i-pick-your-brain-harvard-says-this-is-how-successful-people-ask-for-advice.html">
            Harvard researchers: How to ask for advice without being annoying
          </a>
        </li>
        <li>
          <a href="https://www.themuse.com/advice/4-times-you-just-need-to-suck-it-up-and-ask-for-help-at-work">
            4 Times You Just Need to Suck it Up and Ask for Help at Work
          </a>
        </li>
      </ul>
      <h2>quotes</h2>
      <blockquote>
        &quot;I still sometimes feel like a loser kid in high school. I just
        have to pick myself up and tell myself that I&apos;m a superstar every
        morning so that I can get through this day and be for my fans what they
        need for me to be.&quot;
      </blockquote>
      <cite>
        — Lady Gaga, Grammy and Oscar Winning Singer-Songwriter and Actress
      </cite>
    </ImposterContent>
  );
}

export default Soloist;
