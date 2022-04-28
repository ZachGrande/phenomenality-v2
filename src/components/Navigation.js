import '../css/Navigation.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../config';
import leafActive from '../assets/leaf-active.svg';
import leafInactive from '../assets/leaf-inactive.svg';

const auth = getAuth(app);

function Navigation() {

  const [user, setUser] = useState();
  const [initials, setInitials] = useState("");
  const [profileButton, setProfileButton] = useState(leafInactive);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  useEffect(() => {
    setInitials(user?.displayName);
  }, [user])

  const toggleProfileButton = () => {
    if (profileButton === leafInactive) {
      setProfileButton(leafActive);
    } else {
      setProfileButton(leafInactive);
    }
  }

  return(
    <nav>
      <div className="navigation">
        <ul>
          <p>Phenomenality</p>
          <p>Strengthen Your Mentality</p>
          <li>
            <Link className="navbar-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navbar-link" to="/accomplishments">
              Accomplishments
            </Link>
          </li>
          <li>
            <Link className="navbar-link" to="/bank">
              Your Bank
            </Link>
          </li>
          <li>
            <Link className="navbar-link" to="questions">
              Q&#38;A
            </Link>
          </li>
          <li>
            <Link className="navbar-link" to="quiz">
              Imposter Quiz
            </Link>
          </li>
          <li>
            <Link className="navbar-link" to="more-info">
              More Imposter Information
            </Link>
          </li>
          <li>
            <Link className="navbar-link" to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="navbar-link" to="/authentication">
              {initials ?
                // <li className="initials">
                <div className="initials">
                  {initials}
                </div>
                // </li>
                :
                <img src={profileButton}
                onMouseOver={toggleProfileButton}
                onMouseLeave={toggleProfileButton}
                width="50"
                alt="profile"></img>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
