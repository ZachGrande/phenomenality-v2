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
    <div className="text-center">
      <h1 className="text-display-lg font-display">the team</h1>

      <div className="flex flex-wrap justify-center gap-6 p-6 font-bold">
        <div className="flex flex-col items-center">
          <Image
            src={EliseAdams}
            alt="Elise"
            className="size-40 rounded-full object-cover md:size-48"
          />
          <p className="text-fluid-lg">elise adams</p>
          <p className="text-fluid-md font-normal italic">
            project manager/research
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={ZachGrande}
            alt="Zach"
            className="size-40 rounded-full object-cover md:size-48"
          />
          <p className="text-fluid-lg">zach grande</p>
          <p className="text-fluid-md font-normal italic">
            full-stack development
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={RachelKinkley}
            alt="Rachel"
            className="size-40 rounded-full object-cover md:size-48"
          />
          <p className="text-fluid-lg">rachel kinkley</p>
          <p className="text-fluid-md font-normal italic">front-end/research</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={TiffanyTse}
            alt="Tiffany"
            className="size-40 rounded-full object-cover md:size-48"
          />
          <p className="text-fluid-lg">tiffany tse</p>
          <p className="text-fluid-md font-normal italic">front-end/ui</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={ValerieTse}
            alt="Valerie"
            className="size-40 rounded-full object-cover md:size-48"
          />
          <p className="text-fluid-lg">valerie tse</p>
          <p className="text-fluid-md font-normal italic">program manager/ux</p>
        </div>
      </div>

      <div>
        <p>
          with many thanks to jeremy zaretzky, emily porter, laura schildkraut,
          mina tari, and milla titova
        </p>
        <h6>
          NOTICE UPDATE: beginning 5/26 the development of “phenomenality” has
          shut down.
        </h6>
        <div className="my-5">
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
