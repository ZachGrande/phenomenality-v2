import '../css/App.css';
// import LandingPage from './LandingPage.js';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation.js';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage.js';
import About from './About.js';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Phenomenality</title>
      </Helmet>
      <Navigation />
      <Routes>
        <Route exact={true} path="/" element={<LandingPage />} />
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

export default App;
