import { Link } from 'react-router-dom';

function Navigation() {
  return(
    <nav>
      <div>
        <ul>
          <p>Phenomenality</p>
          <p>Strengthen Your Mentality</p>
          <li>
            <Link to="/">
              <a className="">Home</a>
            </Link>
          </li>
          <li>
            <Link to="/bank">
              <a>Your Bank</a>
            </Link>
          </li>
          <li>
            <Link to="questions">
              <a>Q&#38;A</a>
            </Link>
          </li>
          <li>
            <Link to="quiz">
              <a>Imposter Quiz</a>
            </Link>
          </li>
          <li>
            <Link to="more-info">
              <a>More Imposter Information</a>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <a className="">About Us</a>
            </Link>
          </li>
          <p>Profile block</p>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
