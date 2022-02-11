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
import TaskList from './Tasks';
import { AddTaskForm } from './TaskForms';

// function App() {
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // tasks: props.tasks
      tasks: []
    }
  }

  componentDidMount() {
    console.log("Mounted!");

    fetch('./tasks.json').then((res) => res.json()).then((data) => {
      this.setState((currState) => {
        return {tasks: data}
      });
    });
  }

  toggleTask = (taskId) => {
    this.setState((currState) => {
      let newUpdatedTasksArray = currState.tasks.map((eachTask) => {
        let taskCopy = Object.assign({}, eachTask)
        if (taskCopy.id === taskId) {
          taskCopy.complete = !taskCopy.complete;
        }
        return taskCopy;
      });
      return {tasks: newUpdatedTasksArray};
    })
  }

  addTask = (newDescription) => {
    this.setState((currState) => {
      let newTask = {
        id: currState.tasks.length+1,
        description: newDescription,
        complete: false
      }

      let newTasksArray = currState.tasks.concat( [newTask] )

      return {tasks: newTasksArray};
    })
  }

  render() {
    console.log("Rendering app");

    let incompleteArray = this.state.tasks.filter((task) => !task.complete);
    console.log("Number of incomplete tasks", incompleteArray.length);

    return (
      <div className="">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Phenomenality</title>
        </Helmet>
        <Navigation />
        <Routes>
          <Route exact={true} path="/" element={<Landing />} />
          <Route exact={true} path="/bank" element={<Bank />} />
          <Route exact={true} path="/questions" element={<Questions />} />
          <Route exact={true} path="/quiz" element={<Quiz />} />
          <Route exact={true} path="/more-info" element={<ImposterInfo />} />
          <Route exact={true} path="/about" element={<About />} />
        </Routes>

        <div className="container">
          <p className="lead" onClick={() => this.addTask("testing")}>
            Num things I have to do: <strong>{incompleteArray.length}</strong>
          </p>
          <TaskList tasks={this.state.tasks} whatToDoWhenClicked={this.toggleTask} />
          <AddTaskForm howToAdd={this.addTask} />
        </div>
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
