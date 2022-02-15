import React from 'react';
import TaskList from './Tasks';
import { AddTaskForm } from './TaskForms';

import app from '../config';

import { getDatabase, ref, onValue, get, child } from 'firebase/database';
// import { initializeApp } from "firebase/app";

// const app = initializeApp(config);
const database = getDatabase(app);

export default class Bank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: props.tasks
    }

    // this.database = props.database;
  }

  componentDidMount() {
    console.log("Mounted bank!");

    // fetch('./tasks.json').then((res) => res.json()).then((data) => {
    //   this.setState((currState) => {
    //     return {tasks: data}
    //   });
    // });
    console.log("Current state: ", this.state);
    // this.getUserData();
    // this.testFunction();
    // this.readDataOnce()
    this.getUserData();
    console.log("Current state 2: ", this.state);
  }

  componentDidUpdate(prevProps) {
    /*if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }*/
    console.log("Current state update: ", this.state);
  }

  getUserData = () => {
    let ref1 = ref(database, '/');

    get(child(ref1, '/')).then((snapshot) => {
      if(snapshot.exists()) {
        console.log("Snapshot val", snapshot.val());
        this.setState({tasks: snapshot.val()});
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })

    console.log("DATA RETRIEVED IN APP");
  }

  testFunction = () => {
    const db = getDatabase();
    const ref1 = ref(db, '/');
    console.log("Ref1", ref1);
    onValue(ref1, (snapshot) => {
      console.log("in the loop");
      const data = snapshot.val();
      console.log(data);
    });
    console.log("Just ran testFunction()");
  }

  /*getUserData = () => {
    let ref = this.database.ref('/');
    ref.on('value', snapshot => {
      console.log(snapshot.val());
      const state = snapshot.val();
      // this.setState(state);
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    })
    console.log("Data retrieved!");
  }*/

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
    console.log("Rendering Bank...");

    let incompleteArray = this.state.tasks.filter((task) => !task.complete);
    console.log("Number of incomplete tasks", incompleteArray.length);

    return(
      <div className="container">
        <p className="lead" onClick={() => this.addTask("testing")}>
          Num things I have to do: <strong>{incompleteArray.length}</strong>
        </p>
        <TaskList tasks={this.state.tasks} whatToDoWhenClicked={this.toggleTask} />
        <AddTaskForm howToAdd={this.addTask} />
      </div>
    )
  }
}

  
// export default Bank;