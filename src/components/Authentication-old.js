import React from 'react';
import { render } from '@testing-library/react';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

import config from '../config';

const app = initializeApp(config);
const auth = getAuth(app);

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // var firebase = require('firebase');
    // var firebaseui = require('firebaseui');

    // var ui = new auth.AuthUI();
  }

  register = async () => {

  }

  login = async () => {

  }

  logout = async () => {

  }

  render() {
    return(
      <div>
          <p>Authentication Page</p>
          <input placeholder="Email..." />
          <input placeholder="Password..." />
          <button>Create User</button>
      </div>
      )
    }
}
