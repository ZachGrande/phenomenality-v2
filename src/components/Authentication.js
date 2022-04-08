import { React, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set, update } from 'firebase/database';

import app from '../config';

const auth = getAuth(app);
const database = getDatabase(app);

function createEntryForUserInDatabase(user) {
  // console.log("Setting db for user", user);
  set(ref(database, 'users/' + user.uid), {
    email: user.email,
  });
}

/*function displayNameBlock(user) {
  let hasSetDisplayName = "hello"
  return (
    <div>
      <input
        placeholder="John Appleseed"
        onChange={(event) => {
        setDisplayName(event.target.value);
        }}
      />
      <button onClick={updateDisplayName}>Update Profile</button>
    </div>
  )
}*/

function Authentication() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [displayName, setDisplayName] = useState("");

  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [loginPage, setLoginPage] = useState(true);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    // setTimeout(() => {
      setLoading(false);
    // }, 1000)
  })

  const register = async () => {
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword)
      createEntryForUserInDatabase(user.user);
    } catch (error) {
      console.log("Authentication error", error.message);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword);
    } catch (error) {
      console.log("Authentication error", error.message);
    }
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
  };

  const updateDisplayName = async () => {
    updateProfile(auth.currentUser, {
      displayName: displayName
    }).then(() => {
      update(ref(database, 'users/' + user.uid), {
        displayName: user.displayName,
      });
    }).catch((error) => {
      console.log("Error updating profile", error);
    })
  }

  const toggleLogin = () => {
    setLoginPage(!loginPage);
  }

  if (loading) {
    return (
      <h1>LOADING ASSETS</h1>
    )
  }

  if (!user) {
    if (loginPage) {
      return (
        <div>
          <h3>Welcome Back</h3>
          <input
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <button onClick={login}>Sign In</button>
          <p>Don't have an account? <button onClick={toggleLogin}>Register today.</button></p>
        </div>
      )
    } else {
      return (
      <div>
        <h3>Register</h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <button onClick={register}>Create User</button>
        <p>Already have an account? <button onClick={toggleLogin}>Sign in.</button></p>
      </div>
      )
    }
  } else {
    return (
      <div>
        <h4>Update Information</h4>
        <h4>Want to change your name? Enter it here.</h4>
        <input
          placeholder="John Appleseed"
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        />
        <button onClick={updateDisplayName}>Update Profile</button>
        <h4>User Logged In:</h4>
        {/* <p>{user.displayName !== null ? user.displayName : "You have not set a name"}</p> */}
        <p>{user?.displayName}</p>
        {user?.email}
        <br></br>
        <button onClick={logout}>Sign Out</button>
      </div>
    )
  }
}

export default Authentication;
