import '../css/About.css';
import ZachGrande from '../assets/team-photos/ZachGrande.png';
import EliseAdams from '../assets/team-photos/EliseAdams.jpg';
import ValerieTse from '../assets/team-photos/ValerieTse.jpg';
import TiffanyTse from '../assets/team-photos/TiffanyTse.jpg';
import RachelKinkley from '../assets/team-photos/RachelKinkley.jpeg';

function About() {
  return(
    <div>
        <h1>About Us</h1>
        <div className="member-group">
        <div className="member">
          <img src={ZachGrande} width="200" height="200"/>
          <p className="member-name">Zach Grande</p>
          <p className="member-role">Full Stack Development</p>
        </div>
        <div className="member">
          <img src={EliseAdams} width="200" height="200"/>
          <p className="member-name">Elise Adams</p>
          <p className="member-role">UX Design/Research</p>
        </div>
        <div className="member">
          <img src={ValerieTse} width="200" height="200"/>
          <p className="member-name">Valerie Tse</p>
          <p className="member-role">Program Manager/UX/Research</p>
        </div>
        <div className="member">
          <img src={TiffanyTse} width="200" height="200"/>
          <p className="member-name">Tiffany Tse</p>
          <p className="member-role">UI/Front-end</p>
        </div>
        <div className="member">
          <img src={RachelKinkley} width="200" height="200"/>
          <p className="member-name">Rachel Kinkley</p>
          <p className="member-role">Front-end/Research</p>
        </div>
        </div>
    </div>
    // <div style={{backgroundImage: `url(${seattle})`}}>
    //   <p>Hello, world!</p>
    // </div>
    )
  }
  
  export default About;