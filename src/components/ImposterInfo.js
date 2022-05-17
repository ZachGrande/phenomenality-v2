import { Link } from 'react-router-dom';
import '../css/ImposterInfo.css';
import expert from '../assets/imposter-types/expert.svg';
import genius from '../assets/imposter-types/genius.svg';
import perfectionist from '../assets/imposter-types/perfectionist.svg';
import soloist from '../assets/imposter-types/soloist.svg';
import superhero from '../assets/imposter-types/superhero.svg';

function ImposterInfo() {
  return(
    <div>
        <h1 className="h1imposterInfo">Imposter Phenomenon Information</h1>
        <div className="imposterInfo-container">
          <Link className="type" to="/type-1">
            <img src={perfectionist} alt="perfectionist logo"/>
            <div className='txt-div'>Perfectionist</div>
          </Link>
          <br />
          <Link className="type" to="/type-2">
            <img src={superhero} alt="superhuman logo"/>
            <div className='txt-div'>Superhuman</div>
          </Link>
          <br />
          <Link className="type" to="/type-3">
            <img src={genius} alt="genius logo"/>
            <div className='txt-div'>Genius</div>
          </Link>
          <br />
          <Link className="type" to="/type-4">
            <img src={soloist} alt="soloist logo"/> 
            <div className='txt-div'>Soloist</div>
          </Link>
          <br />
          <Link className="type" to="/type-5">
            <img src={expert} alt="expert logo"/>
            <div className='txt-div'>Expert</div>
          </Link>
        </div>
    </div>
    )
  }
  
  export default ImposterInfo;