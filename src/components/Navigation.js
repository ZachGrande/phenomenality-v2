import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set, update, onValue } from 'firebase/database';

import app from '../config';

const auth = getAuth(app);
const database = getDatabase(app);

function Navigation() {

  const [user, setUser] = useState();
  const [initials, setInitials] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  useEffect(() => {
    setInitials(user?.displayName);
  }, [user])

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
          {initials ? <p>{initials}</p> : <p>Profile block</p>}
          {/* <p>Profile block</p> */}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;
