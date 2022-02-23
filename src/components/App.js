import React from 'react';
import '../css/App.css';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation.js';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Landing from './Landing.js';
import Bank from './Bank.js';
import Questions from './Questions.js';
import Quiz from './Quiz.js';
import ImposterInfo from './ImposterInfo.js';
import About from './About.js';
import Authentication from './Authentication.js';
// import BankNew from './BankNew.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // tasks: props.tasks
      tasks: []
    }
  }

  componentDidMount() {
    console.log("App Component mounted!");

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
        <Router>
          <Navigation />
          <Routes>
            <Route exact={true} path="/" element={<Landing />} />
            <Route exact={true} path="/bank" element={<Bank tasks={this.state.tasks} />} />
            <Route exact={true} path="/questions" element={<Questions />} />
            <Route exact={true} path="/quiz" element={<Quiz />} />
            <Route exact={true} path="/more-info" element={<ImposterInfo />} />
            <Route exact={true} path="/about" element={<About />} />
            <Route exact={true} path="/authentication" element={<Authentication />} />
            {/* <Route exact={true} path="/bank-new" element={<BankNew />} /> */}
          </Routes>
        </Router>
      </div>
    );
  }
}
