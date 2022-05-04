import '../css/About.css';
import ZachGrande from '../assets/team-photos/ZachGrande.png';
import EliseAdams from '../assets/team-photos/EliseAdams.jpg';
import ValerieTse from '../assets/team-photos/ValerieTse.jpg';
import TiffanyTse from '../assets/team-photos/TiffanyTse.jpg';
import RachelKinkley from '../assets/team-photos/RachelKinkley.jpeg';

function About() {
  return(
    <div className="about">
        <h1>The Team</h1>

        <div className="member-group">
          <div className="member">
            <img src={EliseAdams} alt="Elise"/>
            <p className="member-name">Elise Adams</p>
            <p className="member-role">Project Manager/Research</p>
          </div>
          <div className="member">
            <img src={ZachGrande} alt="Zach"/>
            <p className="member-name">Zach Grande</p>
            <p className="member-role">Full-Stack Development</p>
          </div>
          <div className="member">
            <img src={RachelKinkley} alt="Rachel"/>
            <p className="member-name">Rachel Kinkley</p>
            <p className="member-role">Front-end/Research</p>
          </div>
          <div className="member">
            <img src={TiffanyTse} alt="Tiffany"/>
            <p className="member-name">Tiffany Tse</p>
            <p className="member-role">Front-end/UI</p>
          </div>
          <div className="member">
            <img src={ValerieTse} alt="Valerie"/>
            <p className="member-name">Valerie Tse</p>
            <p className="member-role">Program Manager/UX</p>
          </div>
        </div>

        <div className='thanks'>
          <p>With many thanks to Jeremy Zaretzky, Emily Porter, Laura Schildkraut, Mina Tari, and Milla Titova</p>
        </div>
    </div>
    )
  }
  
  export default About;