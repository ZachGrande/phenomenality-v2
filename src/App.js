import logo from './logo.svg';
import './App.css';
import ironman from "./assets/ironman.jpg"
import seattle from "./assets/seattle.jpg"
import LandingPage from './LandingPage.js'

function App() {
  return (
    <LandingPage />
    // <div className="App">
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
    // </div>
  );
}

export default App;
