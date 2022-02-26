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

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  // button w field for display name
  // when null, show "you haven't told us what to call you!"
  // update profile as an onClick function, from Firebase docs

  const register = async () => {
    try {
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
      // const user = await signInWithEmailAndPassword(
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword);
      // console.log(user);
    } catch (error) {
      console.log("Authentication error", error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateDisplayName = async () => {

    updateProfile(auth.currentUser, {
      displayName: displayName
    }).then(() => {
      // console.log("Profile updated!")
      // console.log("User", user);
      update(ref(database, 'users/' + user.uid), {
        displayName: user.displayName,
      });
    }).catch((error) => {
      console.log("Error updating profile", error);
    })
  }

  /*const DisplayNameBlock = () => {
    let hasUserSetDisplayName  = user?.displayName !== null;
    console.log(hasUserSetDisplayName);
    console.log(user?.displayName);
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

  return(
    <div>
        <p>Authentication Page</p>
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

        <h3>Log In</h3>
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
        <button onClick={login}>Log In</button>
        <h4>Update Information</h4>
        <p>**This only works if you are already logged in.**</p>
        {/* {displayNameBlock} */}
        {/* <DisplayNameBlock /> */}
        <input
          placeholder="John Appleseed"
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        />
        <button onClick={updateDisplayName}>Update Profile</button>
        <h4>User Logged In:</h4>
        {/* <p>{user.displayName !== null ? displayName : "You have not set a name"}</p> */}
        <p>{user?.displayName}</p>
        {user?.email}
        <br></br>
        <button onClick={logout}>Sign Out</button>
    </div>
    )
}

export default Authentication;
