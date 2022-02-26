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
              Home
            </Link>
          </li>
          <li>
            <Link to="/bank">
              Your Bank
            </Link>
          </li>
          <li>
            <Link to="questions">
              Q&#38;A
            </Link>
          </li>
          <li>
            <Link to="quiz">
              Imposter Quiz
            </Link>
          </li>
          <li>
            <Link to="more-info">
              More Imposter Information
            </Link>
          </li>
          <li>
            <Link to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/authentication">
              Sign In
            </Link>
          </li>
          <p>Profile block</p>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
