import { Link } from 'react-router-dom';
import '../css/ImposterInfo.css';

function ImposterInfo() {
  return(
    <div>
        <h1 className="h1imposterInfo">imposter phenomenon information</h1>
        <div className="imposterInfo-container">
          <Link className="type" to="/type-1">
            the perfectionist
          </Link>
          <br />
          <Link className="type" to="/type-2">
            the superhuman
          </Link>
          <br />
          <Link className="type" to="/type-3">
            the genius
          </Link>
          <br />
          <Link className="type" to="/type-4">
            the soloist
          </Link>
          <br />
          <Link className="type" to="/type-5">
            the expert
          </Link>
        </div>
    </div>
    )
  }
  
  export default ImposterInfo;