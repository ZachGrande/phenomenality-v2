import React from 'react';
import '../css/App.css';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation.js';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing.js';
import Bank from './Bank.js';
import Questions from './Questions.js';
import Quiz from './Quiz.js';
import ImposterInfo from './ImposterInfo.js';
import About from './About.js';
// import Firebase from 'firebase';
import config from '../config';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from 'firebase/database';
// import { Firebase } from 'firebase';

const app = initializeApp(config);
const database = getDatabase(app);

// function App() {
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // initializeApp(config);


    // const app = initializeApp(config);
    // this.database = getDatabase(app);

    this.state = {
      // tasks: props.tasks
      tasks: []
    }

    // this.database = props.database;
  }

  componentDidMount() {
    console.log("App Component mounted!");

    // this.getUserData();

    fetch('./tasks.json').then((res) => res.json()).then((data) => {
      this.setState((currState) => {
        return {tasks: data}
      });
    });
  }

  // getUserData = () => {
  //   let ref1 = ref(database, '/');
  //   // ref1.on('value', snapshot => {
  //   //   const state = snapshot.val();
  //   //   console.log(state);
  //   // })

  //   get(child(ref1, '/')).then((snapshot) => {
  //     if(snapshot.exists()) {
  //       console.log("Snapshot val", snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   })

  //   console.log("DATA RETRIEVED IN APP");
  // }

  render() {
    console.log("Rendering app...");

    return (
      <div className="">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Phenomenality</title>
        </Helmet>
        <Navigation />
        <Routes>
          <Route exact={true} path="/" element={<Landing />} />
          {/* <Route exact={true} path="/bank" element={<Bank tasks={this.state.tasks} database={this.database} />} /> */}
          <Route exact={true} path="/bank" element={<Bank tasks={this.state.tasks} />} />
          <Route exact={true} path="/questions" element={<Questions />} />
          <Route exact={true} path="/quiz" element={<Quiz />} />
          <Route exact={true} path="/more-info" element={<ImposterInfo />} />
          <Route exact={true} path="/about" element={<About />} />
        </Routes>
      {/* // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload. Test!
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //     <img src={ironman} alt="iron man"></img>
      //   </header>
      //   <div style={{backgroundImage: `url(${seattle})`}}>
      //     <h1>Test</h1>
      //   </div>
      // </div> */}
      </div>
    );
  }
}

// export default App;
