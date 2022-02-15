import { React, useState } from 'react';
// import { render } from '@testing-library/react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import app from '../config';

const auth = getAuth(app);

function Authentication() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword);
      console.log(user);
    } catch (error) {
      console.log("Authentication error", error.message);
    }

  };

  const login = async () => {

  };

  const logout = async () => {

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
        <button>Log In</button>
    </div>
    )
}

export default Authentication;
