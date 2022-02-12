import React from 'react';
import TaskList from './Tasks';
import { AddTaskForm } from './TaskForms';

import { getDatabase, ref, onValue } from 'firebase/database';

export default class Bank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: props.tasks
    }

    this.database = props.database;
  }

  componentDidMount() {
    console.log("Mounted!");

    fetch('./tasks.json').then((res) => res.json()).then((data) => {
      this.setState((currState) => {
        return {tasks: data}
      });
    });
    // this.getUserData();
    this.testFunction();
  }

  testFunction = () => {
    const db = getDatabase();
    const ref1 = ref(db, '/');
    console.log(ref1);
    onValue(ref1, (snapshot) => {
      console.log("in the loop");
      const data = snapshot.val();
      console.log(data);
    });
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