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
          {/* <li>
            <Link to="/authentication">
              Sign In
            </Link>
          </li> */}
          <li>
            <Link to="/authentication">
              {initials ? <p>{initials}</p> : <img src={profileButton}
                                              onMouseOver={toggleProfileButton}
                                              onMouseLeave={toggleProfileButton}
                                              width="50"
                                              alt="profile"></img>}
            </Link>
          </li>
          {/* <p>Profile block</p> */}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
