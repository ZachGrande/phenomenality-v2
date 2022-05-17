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
          <Link className="navbar-link home-font" to="/">
          phenomenality | strengthen your mentality
            </Link>
          {/* <li>
            <Link className="navbar-link" to="/">
              home
            </Link>
          </li> */}
          <div className="nav-left">
          <li className="navvy">
            <Link className="navbar-link link-font" to="/accomplishments">
            accomplishments
            </Link>
          </li>
          <li className="navvy">
            <Link className="navbar-link link-font" to="/bank">
              your bank
            </Link>
          </li>
          {/* <li>
            <Link className="navbar-link" to="questions">
              Q&#38;A
            </Link>
          </li> */}
          <li className="navvy">
            <Link className="navbar-link link-font" to="quiz">
              quiz
            </Link>
          </li>
          <li className="navvy">
            <Link className="navbar-link link-font" to="more-info">
              imposter phenomenon
            </Link>
          </li>
          {/* <li>
            <Link className="navbar-link" to="/about">
              About Us
            </Link>
          </li> */}
          <li>
            <Link className="navbar-link link-font" to="/authentication">
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
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
