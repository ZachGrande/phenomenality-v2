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
            <img src={ZachGrande} alt="Zach" width="200" height="200"/>
            <p className="member-name">Zach Grande</p>
            <p className="member-role">Full Stack Development</p>
          </div>
          <div className="member">
            <img src={EliseAdams} alt="Elise" width="200" height="200"/>
            <p className="member-name">Elise Adams</p>
            <p className="member-role">Project Manager/UX Research</p>
          </div>
          <div className="member">
            <img src={ValerieTse} alt="Valerie" width="200" height="200"/>
            <p className="member-name">Valerie Tse</p>
            <p className="member-role">Program Manager/UX/Research</p>
          </div>
          <div className="member">
            <img src={TiffanyTse} alt="Tiffany" width="200" height="200"/>
            <p className="member-name">Tiffany Tse</p>
            <p className="member-role">UI/Front-end</p>
          </div>
          <div className="member">
            <img src={RachelKinkley} alt="Rachel" width="200" height="200"/>
            <p className="member-name">Rachel Kinkley</p>
            <p className="member-role">Front-end/Research</p>
          </div>
        </div>
        <div>
          <h2>With Thanks To</h2>
          <p>Jeremy Zaretzky</p>
          <p>Emily Porter</p>
          <p>Laura Schildkraut</p>
          <p>Mina Tari</p>
          <p>Milla Titova</p>
        </div>
    </div>
    // <div style={{backgroundImage: `url(${seattle})`}}>
    //   <p>Hello, world!</p>
    // </div>
    )
  }
  
  export default About;