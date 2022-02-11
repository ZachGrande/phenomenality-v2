import React, { Component } from 'react';

export class Task extends Component {
  
  //helper method
 
  getClassName() {
    let className = '';
    // if(this.state.isComplete) {
    if(this.props.task.complete) {
      className = 'font-strike';
    }
    return className;
  }

  handleClick = (event) => {
    //what to do when clicked
    //another name for "App#toggleTask()"
    this.props.whatToDoWhenClicked(this.props.task.id);
  }

  render() {
    // console.log("rendering", this.props.task);
    // console.log(this.state);

    let thisTask = this.props.task; //can give local name for readability

    return (
      <li className={this.getClassName()} onClick={this.handleClick} >
        {thisTask.description}
        {/* (clicked {this.state.clickCount}) */}
      </li>
    );
  }
}

export default class TaskList extends Component {
  render() {
    //do data processing
    //this.props.tasks is an ARRAY of JS Objects
    let taskComponents = this.props.tasks.map((eachTask) => {
      let singleTaskElem = <Task key={eachTask.id} task={eachTask} whatToDoWhenClicked={this.props.whatToDoWhenClicked} />
      return singleTaskElem;
    })

    //what DOM is shown in a <TaskList>
    return (
      <ol>
        {taskComponents}
      </ol>
    );
  }
}