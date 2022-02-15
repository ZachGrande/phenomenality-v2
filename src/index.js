import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// firebaseConfig is now stored in 'config.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA_6VtPAZLUSF6828G0peEoERJdDDZ8fy0",
//   authDomain: "phenomenality-bdf65.firebaseapp.com",
//   databaseURL: "https://phenomenality-bdf65-default-rtdb.firebaseio.com",
//   projectId: "phenomenality-bdf65",
//   storageBucket: "phenomenality-bdf65.appspot.com",
//   messagingSenderId: "47065258935",
//   appId: "1:47065258935:web:e1c40865d25e46a80ce632",
//   measurementId: "G-HP9BTNZ836"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const database = getDatabase(app);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <App database={database} /> */}
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
