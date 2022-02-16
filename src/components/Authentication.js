import { React, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

import app from '../config';

const auth = getAuth(app);
const database = getDatabase(app);

function createEntryForUserInDatabase(user) {
  console.log(user);
  set(ref(database, 'users/' + user.uid), {
    username: "test",
    email: user.email
  });
}

function Authentication() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    const thisRef = ref(database, 'users/' + user.uid);
    console.log(thisRef);
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword);
      // console.log(user);
      // createEntryForUserInDatabase(user);
      
    } catch (error) {
      console.log("Authentication error", error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword);
      console.log(user);
    } catch (error) {
      console.log("Authentication error", error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

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
        <h4>User Logged In:</h4>
        {user?.email}
        <br></br>
        <button onClick={logout}>Sign Out</button>
    </div>
    )
}

export default Authentication;
