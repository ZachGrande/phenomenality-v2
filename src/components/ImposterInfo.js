import { Link } from 'react-router-dom';

function ImposterInfo() {
  return(
    <div>
        <p>Imposter Info</p>
        <Link to="/type-1">
          The Perfectionist
        </Link>
        <br />
        <Link to="/type-2">
          The Superhuman
        </Link>
        <br />
        <Link to="/type-3">
          The Genius
        </Link>
        <br />
        <Link to="/type-4">
          The Soloist
        </Link>
        <br />
        <Link to="/type-5">
          The Expert
        </Link>
    </div>
    )
  }
  
  export default ImposterInfo;