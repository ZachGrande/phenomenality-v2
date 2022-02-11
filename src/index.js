import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

const SAMPLE_TASKS = [
  {id:1, description:'Learned a new Excel skill', complete:true},
  {id:2, description:'Gave coworker a compliment', complete:false},
  {id:3, description:'Finished more than planned today', complete:false}
]

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App tasks={SAMPLE_TASKS} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
