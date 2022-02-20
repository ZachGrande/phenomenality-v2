import React from 'react';
import { useState } from 'react';
import TaskList from './Tasks';
import { AddTaskForm } from './TaskForms';
import { getDatabase, ref, onValue, get, child } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import app from '../config';

const database = getDatabase(app);
const auth = getAuth(app);

// onAuthStateChanged(auth, (currentUser) => {
//   setUser(currentUser);
// })

// function Bank() {

export default class Bank extends React.Component {
  constructor(props) {
    super(props);

    // const [user, setUser] = useState({})

    this.state = {
      tasks: props.tasks,
      user: {}
    }

    // onAuthStateChanged(auth, (currentUser) => {
    //   // console.log("inside function, user", currentUser);
    //   this.state.user = currentUser;
    //   // this.setState({user: currentUser});
    // });
  }

  getUserInformation = async () => {
    onAuthStateChanged(auth, (currentUser) => {
      // console.log("inside function, user", currentUser);
      this.state.user = currentUser;
      // this.setState({user: currentUser});
    });
  };

  componentDidMount() {
    console.log("Mounted bank!");
    this.getUserInformation();
    console.log("Current user: ", this.state);
    // console.log("Equality check", this.state.user.uid !== undefined)

    // if (this.state.user.uid !== undefined) {
      this.getUserData(this.state.user.uid);
    // }

    // console.log("Current state 2: ", this.state);
    // onAuthStateChanged(auth, (currentUser) => {
    //   // console.log("inside function, user", currentUser);
    //   this.state.user = currentUser;
    // });
    // console.log("Auth state:", getInstance().getCurrentUser());
    // console.log("Bank finished loading, here's user", this.state.user);
  }

  componentDidUpdate(prevProps) {
    /*if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }*/
    // console.log("Current state update: ", this.state);
  }

  getUserData = (userID) => {
    // let dbRef = ref(database, '/');
    // console.log("About to access database", this.state);
    let dbRef = ref(database, 'users/o1gF4ZvARde0hABL7hVDUePharg2/data/');
    console.log("User ID to reach database with:", userID)
    // let dbRef = ref(database, 'users/' + userID + '/data/');

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
