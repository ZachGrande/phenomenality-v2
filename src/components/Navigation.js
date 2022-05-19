import '../css/Navigation.css'
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

// const navLeft = document.querySelector(".nav-left");
// const navvy = document.querySelectorAll(".navvy");
// const carrotMenu = document.querySelector(".carrot-menu");
// const closeIcon= document.querySelector(".closeIcon");
// const menu = document.querySelector(".menu");

// function toggleMenu() {
//   console.log("menu clicked")
//   if (navLeft.classList.contains("showMenu")) {
//     navLeft.classList.remove("showMenu");
//     closeIcon.style.display = "none";
//     menu.style.display = "block";
//   } else {
//     navLeft.classList.add("showMenu");
//     closeIcon.style.display = "block";
//     menu.style.display = "none";
//   }
// }

// menu.addEventListener("click", toggleMenu);

function dropDownMenu() {
  setShowDropDownMenu(true);
}

function closeDropDownMenu() {
  setShowDropDownMenu(false);
}

if (!showDropDownMenu) { 
  return (
    <nav>
      <div className="navigation">
        <ul>
        <Link className="keepStrengthen navbar-link home-font" to="/">
          phenomenality | strengthen your mentality
            </Link>
            <Link className="dropStrengthen navbar-link home-font" to="/">
          phenomenality
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
          <button className="carrot-menu" onClick={dropDownMenu}>
          <div className="menu">
            <p>menu
            <img className= "carrot-icon"src={downCarrot} alt="Bank photo" width="12%" height="12%"/>
            </p>
          </div>
          {/* <i className="closeIcon material-icons">c</i> */}
        </button>
        </ul>
      </div>
    </nav>) 
  } else {
    return (
    <nav>
      <div className="navigation">
        <ul>
        <Link className="keepStrengthen navbar-link home-font" to="/">
          phenomenality | strengthen your mentality
            </Link>
            <Link className="dropStrengthen navbar-link home-font" to="/">
          phenomenality
            </Link>
            <button className="carrot-menu" onClick={closeDropDownMenu}>
          <div className="menu">
            <p>menu
            <img className= "carrot-icon"src={downCarrot} alt="Bank photo" width="12%" height="12%"/>
            </p>
          </div>
          {/* <i className="closeIcon material-icons">c</i> */}
        </button>
        </ul>
          <div className="dropDown dropDownContainer moveeeee" id="popupForm">
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
          {/* <li>
            <Link className="navbar-link" to="questions">
              Q&#38;A
            </Link>
          </li> */}
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
          <div className="popup-btn-center">
              {/* <button type="button" className="btn cancel" onClick={closeDropDownMenu}>close</button> */}
            </div>
          </div>
        </div>
    </nav>)
} 
}

export default Navigation;
