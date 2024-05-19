import '../css/About.sass';
import ZachGrande from '../assets/team-photos/ZachGrande.png';
import EliseAdams from '../assets/team-photos/EliseAdams.jpg';
import ValerieTse from '../assets/team-photos/ValerieTse.jpg';
import TiffanyTse from '../assets/team-photos/TiffanyTse.jpg';
import RachelKinkley from '../assets/team-photos/RachelKinkley.jpeg';
import jackjack from '../assets/jack-jack.svg';

function About() {
  return(
    <div className="about">
        <h1>the team</h1>

        <div className="member-group">
          <div className="member">
            <img src={EliseAdams} alt="Elise"/>
            <p className="member-name">elise adams</p>
            <p className="member-role">project manager/research</p>
          </div>
          <div className="member">
            <img src={ZachGrande} alt="Zach"/>
            <p className="member-name">zach grande</p>
            <p className="member-role">full-stack development</p>
          </div>
          <div className="member">
            <img src={RachelKinkley} alt="Rachel"/>
            <p className="member-name">rachel kinkley</p>
            <p className="member-role">front-end/research</p>
          </div>
          <div className="member">
            <img src={TiffanyTse} alt="Tiffany"/>
            <p className="member-name">tiffany tse</p>
            <p className="member-role">front-end/ui</p>
          </div>
          <div className="member">
            <img src={ValerieTse} alt="Valerie"/>
            <p className="member-name">valerie tse</p>
            <p className="member-role">program manager/ux</p>
          </div>
        </div>

        <div className='thanks'>
          <p>with many thanks to jeremy zaretzky, emily porter, laura schildkraut, mina tari, and milla titova</p>
          <h6>NOTICE UPDATE: beginning 5/26 the development of “phenomenality” has shut down.
</h6>
          <div className="jackjack-container">
          <img className="jackjack" src={jackjack} alt="logo" />
          </div>
        </div>
    </div>
    )
  }
  
  export default About;