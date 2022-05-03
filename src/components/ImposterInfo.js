import { Link } from 'react-router-dom';
import '../css/ImposterInfo.css';

function ImposterInfo() {
  return(
    <div>
        <h1 className="h1imposterInfo">Imposter Phenomenon Information</h1>
        <div className="imposterInfo-container">
          <Link className="type" to="/type-1">
            The Perfectionist
          </Link>
          <br />
          <Link className="type" to="/type-2">
            The Superhuman
          </Link>
          <br />
          <Link className="type" to="/type-3">
            The Genius
          </Link>
          <br />
          <Link className="type" to="/type-4">
            The Soloist
          </Link>
          <br />
          <Link className="type" to="/type-5">
            The Expert
          </Link>
        </div>
    </div>
    )
  }
  
  export default ImposterInfo;