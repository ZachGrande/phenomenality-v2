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

// function App() {
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // tasks: props.tasks
      tasks: []
    }

    this.database = props.database;
  }

  componentDidMount() {
    console.log("Component mounted!");

    fetch('./tasks.json').then((res) => res.json()).then((data) => {
      this.setState((currState) => {
        return {tasks: data}
      });
    });
  }

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
          <Route exact={true} path="/bank" element={<Bank tasks={this.state.tasks} database={this.database} />} />
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
