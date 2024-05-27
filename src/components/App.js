import React from 'react';
import '../styles/App.sass';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import SiteRouter from './SiteRouter';

export default class App extends React.Component {

  render() {
    return (
      <div className="page-container">
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Phenomenality</title>
        </Helmet>
        <Router>
          <Routes>
            <Route path="/*" element={<SiteRouter />} />
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
