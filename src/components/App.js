import React from 'react';
import '../styles/App.sass';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navigation from './Navigation.js';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Landing from './Landing.js';
import Bank from './Bank.js';
import Questions from './Questions.js';
import Quiz from './Quiz.js';
import ImposterInfo from './ImposterInfo.js';
import About from './About.js';
import Authentication from './Authentication.js';
import AddAccomplishment from './AddAccomplishment.js';
import AddEncouragement from './AddEncouragement.js';
import Perfectionist from './types/Perfectionist.js';
import Superhuman from './types/Superhuman.js';
import Genius from './types/Genius.js';
import Soloist from './types/Soloist.js';
import Expert from './types/Expert.js';

export default class App extends React.Component {

  render() {
    return (
      <div className="page-container">
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Phenomenality</title>
        </Helmet>
        <Router className="content-wrap">
          <Navigation />
          <Routes>
            <Route exact={true} path="/" element={<Landing />} />
            <Route exact={true} path="/accomplishments" element={<AddAccomplishment />} />
            <Route exact={true} path="/accomplishments-complete" element={<AddEncouragement />} />
            <Route exact={true} path="/bank" element={<Bank />} />
            <Route exact={true} path="/questions" element={<Questions />} />
            <Route exact={true} path="/quiz" element={<Quiz />} />
            <Route exact={true} path="/more-info" element={<ImposterInfo />} />
            <Route exact={true} path="/about" element={<About />} />
            <Route exact={true} path="/authentication" element={<Authentication />} />
            <Route exact={true} path="/type-1" element={<Perfectionist />} />
            <Route exact={true} path="/type-2" element={<Superhuman />} />
            <Route exact={true} path="/type-3" element={<Genius />} />
            <Route exact={true} path="/type-4" element={<Soloist />} />
            <Route exact={true} path="/type-5" element={<Expert />} />
          </Routes>
        </Router>
        <footer>
          {/* <p>&copy; 2022 University of Washington - Team Orka</p> */}
        </footer>
        </HelmetProvider>
      </div>
    );
  }
}
