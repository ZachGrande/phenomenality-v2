import TypeCard from './_components/TypeCard';

import expert from '@/app/_assets/imposter-types/expert.svg';
import genius from '@/app/_assets/imposter-types/genius.svg';
import perfectionist from '@/app/_assets/imposter-types/perfectionist.svg';
import soloist from '@/app/_assets/imposter-types/soloist.svg';
import superhero from '@/app/_assets/imposter-types/superhero.svg';

function ImposterInfo() {
  return (
    <div>
      <h1 className="ml-2 text-4xl font-display font-normal">
        imposter phenomenon information
      </h1>
      <div className="flex flex-row flex-wrap items-center justify-center gap-6 p-12">
        <TypeCard
          href="/type-1"
          src={perfectionist}
          alt="perfectionist logo"
          label="Perfectionist"
        />
        <TypeCard
          href="/type-2"
          src={superhero}
          alt="superhuman logo"
          label="Superhuman"
        />
        <TypeCard
          href="/type-3"
          src={genius}
          alt="genius logo"
          label="Genius"
        />
        <TypeCard
          href="/type-4"
          src={soloist}
          alt="soloist logo"
          label="Soloist"
        />
        <TypeCard
          href="/type-5"
          src={expert}
          alt="expert logo"
          label="Expert"
        />
      </div>
    </div>
  );
}

export default ImposterInfo;
