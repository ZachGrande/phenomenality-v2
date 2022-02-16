import React from 'react';
import TaskList from './Tasks';
import { AddTaskForm } from './TaskForms';
import { getDatabase, ref, onValue, get, child } from 'firebase/database';

import app from '../config';

const database = getDatabase(app);

export default class Bank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: props.tasks
    }
  }

  componentDidMount() {
    console.log("Mounted bank!");
    console.log("Current state: ", this.state);
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
    let dbRef = ref(database, '/');

    get(child(dbRef, '/')).then((snapshot) => {
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
