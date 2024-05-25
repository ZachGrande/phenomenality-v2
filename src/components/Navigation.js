import '../styles/Navigation.sass'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../config';
import leafActive from '../assets/leaf-active.svg';
import leafInactive from '../assets/leaf-inactive.svg';
import downCarrot from '../assets/down-carrot.svg';

const auth = getAuth(app);

function Navigation() {

  const [user, setUser] = useState();
  const [initials, setInitials] = useState("");
  const [profileButton, setProfileButton] = useState(leafInactive);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);


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

function toggleDropDown() {
  setShowDropDownMenu(!showDropDownMenu);
}

  return (
    <nav>
      <div className="navigation w-100 p-3">
        <ul>
          <Link className="keepStrengthen navbar-link home-font" to="/">
            phenomenality | strengthen your mentality
          </Link>
          <Link className="dropStrengthen navbar-link home-font" to="/">
            phenomenality
          </Link>
          {showDropDownMenu ?
            <div className="dropDown dropDownContainer" id="popupForm">
              <ul>
                <li className="navvy">
                  <Link className="navbar-link link-font" to="/accomplishments">
                    accomplishments
                  </Link>
                  <br></br>
                  <br></br>
                </li>
                <li className="navvy">
                  <Link className="navbar-link link-font" to="/bank">
                    your bank
                  </Link>
                  <br></br>
                  <br></br>
                </li>
                <li className="navvy">
                  <Link className="navbar-link link-font" to="quiz">
                    quiz
                  </Link>
                  <br></br>
                  <br></br>
                </li>
                <li className="navvy">
                  <Link className="navbar-link link-font" to="more-info">
                    imposter phenomenon
                  </Link>
                  <br></br>
                </li>
                <br></br>
                <br></br>
                <li className="dropdownInitials">
                  <Link className="navbar-link link-font dropdownInitials" to="/authentication">
                  {initials ?
                    <div className="initials">
                      {initials}
                    </div>
                  :
                    <img src={profileButton}
                    onMouseOver={toggleProfileButton}
                    onMouseLeave={toggleProfileButton}
                    width="50"
                    alt="profile"></img>}
                  </Link>
                </li>
              </ul>
              <div className="popup-btn-center">
                {/* <button type="button" className="btn cancel" onClick={closeDropDownMenu}>close</button> */}
              </div>
            </div>
          : 
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
              <li>
                <Link className="navbar-link link-font" to="/authentication">
                  {initials ?
                    <div className="initials">
                      {initials}
                    </div>
                  :
                    <img src={profileButton}
                    onMouseOver={toggleProfileButton}
                    onMouseLeave={toggleProfileButton}
                    width="46"
                    alt="profile"></img>}
                </Link>
              </li>
            </div> }
            <button className="carrot-menu" onClick={toggleDropDown}>
              <div className="menu">
                <p>menu
                  <img className={"carrot-icon" + (!showDropDownMenu ? ' rotated' : '')} src={downCarrot} alt="Bank" width="12%" height="12%"/>
                </p>
              </div>
            </button>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
