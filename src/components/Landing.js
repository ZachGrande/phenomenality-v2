import '../css/Landing.css'
import BankDemo from '../assets/landing-photos/bank-demo.svg';
import About from './About.js';
import Welcome from '../assets/landing-photos/welcome.jpg';
import Question from '../assets/landing-photos/question.svg';
import Chart from '../assets/landing-photos/chart.svg';
import { Link } from 'react-router-dom';

function Landing() {
  return(
    <div className='landing'>
      <div className="welcome flex-container">
        <div className="left-side"> 
          <h1>welcome to your personal cheerleader!</h1>
          <p className="landing-para">log your daily accomplishments and mitigate the 
            effects of imposter phenomemon.</p>
          <div className='button-box sign-in'>
            <Link aria-label="Sign in" className="button rmv-underline" role="button" to="/authentication">sign in</Link>
          </div>
        </div>
        <div className="right-side"> 
          <img src={Welcome} alt="Individuals Welcoming" width="50%" height="50%"/>
        </div>
      </div>         

      <div className="filter flex-container">
        <div className='left-side'>
          <img src={BankDemo} alt="Bank photo" width="25%" height="25%"/>
        </div>
        <div className="right-side"> 
          <h2>filter and sort through all your accomplishments</h2>
          <p className="landing-para">track your day to day wins and build confidence 
            in yourself when reviewing your accomplishments 
            and cataloging resume-worthy achievements for 
            easy reference.</p>
            <div className='button-box accomp'>
            <Link aria-label="Add an Accomplishment" className="button rmv-underline accompBtn" role="button" to="/accomplishments">add an accomplishment</Link>
            </div>
        </div>
      </div>

      <div className="ipType flex-container">
        <div className='left-side'>
          <h2>see which imposter phenomenon type you most align with</h2>
          <p className="landing-para">take a quiz to find out some tricks and tips you can 
            <br></br>
            phenomenality does not contain medical advice and is not meant to be a subsitute 
            for professional care. if you are experiencing mental health challenges, we encourage 
            you to seek out professional help. </p>
            <div className='button-box quiz'>
            <Link aria-label="Take the Quiz" className="button rmv-underline accompBtn" role="button" to="/quiz">take the quiz</Link>
            </div>
        </div>
        <div className="right-side">
        <img src={Chart} alt="Individual Chart" width="10%" height="10%"/>
        </div>
      </div>

      <div className="what flex-container">
        <div className='left-side'>
          <img src={Question} alt="Individual Questioning" width="25%" height="25%"/>
        </div>
        <div className="right-side">
          <h2>what is imposter phenomenon?</h2>
          <p className="landing-para">imposter phenomenon is the feeling of doubt in one’s 
            relevant knowledge and abilities regardless of experience
            or education, a common experience across young professionals
            who are gender minorities. to address this, phenomenality 
            encourages recognition of accomplishments by prompting you
            to document your daily wins!</p>
            <div className='button-box types'>
            <Link aria-label="Learn more about Imposter Phenomenon" className="button rmv-underline accompBtn" role="button" to="/more-info">learn more</Link>
            </div>
        </div>
      </div>

      <div className="about">
        <About></About>
      </div>
      
    </div>
  )
}
  
export default Landing;