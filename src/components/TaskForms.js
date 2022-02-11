import React, { Component } from 'react';

export class AddTaskForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentInputValue: '' //initially, blank
    }

  }

  //called handleChange as convention
  handleChange = (event) => {
    let newValue = event.target.value;
    this.setState({currentInputValue: newValue})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Add a new task for: ", this.state.currentInputValue);
    this.props.howToAdd(this.state.currentInputValue);

    this.setState({currentInputValue: ''}) //clear out the old input

    // App.addTaskToArray()

  }

  render() {
    return (
      <form>
        <input
          className="form-control mb-3"
          placeholder="What else do you have to do?"
          value={this.state.currentInputValue}
          onChange={this.handleChange}
        />
        <button className="btn btn-primary" onClick={this.handleSubmit}>Add task to list</button>
      </form>
    );
  }
}