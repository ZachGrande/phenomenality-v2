import '../css/Landing.css'
import About from './About.js';
import Welcome from '../assets/landing-photos/welcome.jpg';
import Question from '../assets/landing-photos/question.png';

function Landing() {
  return(
    <div className='landing'>

      <div className="welcome flex-container">
        <div className="left-side"> 
          <h1>Welcome to Your Personal Cheerleader!</h1>
          <p className="landing-para">Log your daily achievements and mitigate the 
            effects of imposter phenomemon.</p>
          <div className='button-box'>
            <button>Sign In</button>
          </div>
        </div>
        <div className="right-side"> 
          <img src={Welcome} alt="Individuals Welcoming" width="40%" height="40%"/>
        </div>
      </div>     

      <div className="filter flex-container">
        <div className='left-side'>
          
        </div>
        <div className="right-side"> 
          <h2>Filter and sort through all your achievements</h2>
          <p className="landing-para">Track your day to day wins and build confidence 
            in yourself when reviewing your accomplishments 
            and cataloging resume-worthy achievements for 
            easy reference.</p>
        </div>
      </div>

      <div className="ipType flex-container">
        <div className='left-side'>
          <h2>See which imposter phenomenon type you most align with</h2>
          <p className="landing-para">Take a quiz to find out some tricks and tips you can 
            <br></br>
            something something something about how this is not 
            medical advice.</p>
        </div>
        <div className="right-side">
          
        </div>
      </div>

      <div className="what flex-container">
        <div className='left-side'>
          <img src={Question} alt="Individual Questioning" width="25%" height="25%"/>
        </div>
        <div className="right-side">
          <h2>What is Imposter Phenomenon?</h2>
          <p className="landing-para">Imposter phenomenon is the feeling of doubt in one’s 
            relevant knowledge and abilities regardless of experience
            or education, a common experience across young professionals
            who are gender minorities. To address this, Phenomenality 
            encourages recognition of accomplishments by prompting you
            to document your daily wins!</p>
        </div>
      </div>

      <div className="about">
        <About></About>
      </div>
      
    </div>
  )
}
  
export default Landing;