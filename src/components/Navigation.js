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
              {/* <a className="">Home</a> */}
              Home
            </Link>
          </li>
          <li>
            <Link to="/bank">
              {/* <a>Your Bank</a> */}
              Your Bank
            </Link>
          </li>
          <li>
            <Link to="questions">
              {/* <a>Q&#38;A</a> */}
              Q&#38;A
            </Link>
          </li>
          <li>
            <Link to="quiz">
              {/* <a>Imposter Quiz</a> */}
              Imposter Quiz
            </Link>
          </li>
          <li>
            <Link to="more-info">
              {/* <a>More Imposter Information</a> */}
              More Imposter Information
            </Link>
          </li>
          <li>
            <Link to="/about">
              {/* <a className="">About Us</a> */}
              About Us
            </Link>
          </li>
          <li>
            <Link to="/authentication">
              {/* <a className="">Sign In</a> */}
              Sign In
            </Link>
          </li>
          {/* <li>
            <Link to="/bank-new">
              New bank
            </Link>
          </li> */}
          <p>Profile block</p>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
