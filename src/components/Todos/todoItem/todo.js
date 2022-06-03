import React, { Component } from "react";
import "./todo.css";

export class TodoItem extends Component {
  constructor() {
    super();
    this.state = { checked: false, editing: false, editText: "" };
  }
  componentDidMount() {
    this.setState({ editText: this.props.todo.todo });
  }
  // function to handle the change of the checkbox of the todo list items and to update the state of the todo list items
  handleChange = (event) => {
    if (event.target.checked) {
      console.log("✅ Checkbox is checked");
    } else {
      console.log("⛔️ Checkbox is NOT checked");
    }
    this.props.todoListHandler["toggleTodo"](this.props.todo);
    this.setState({ checked: event.target.checked });
  };

  //2nd input to handle the change of the todo list items
  handleSubmit = () => {
    console.log("submit");
    this.setState({ editing: false });
  }
  handleChange2 = (event) => {
    this.setState({ editText: event.target.value });
  };
  render() {
    // console.log();
    // the todo list items goes like :
    //                            grid layout
    //        a div with todos                a button to delete
    // a checkbox   a label   a button to edit
    return (
      <div className="grid-layout">
        <div className="container">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.handleChange}
          />
          <label
            onDoubleClick={() => {
              this.setState({ editing: true });
            }}
          >
            {this.props.todo.todo}
          </label>
        </div>
        <button
          className="destroy"
          onClick={() => {
            this.props.todoListHandler["removeTodo"](this.props.todo);
          }}
        />
        {this.state.editing ? (
          <input
            className={this.state.editing ? "edit edit-show" : "edit edit-hide"}
            type="text"
            value={this.state.editText}
            onBlur={this.handleSubmit}
            onChange={this.handleChange2}
            onKeyDown={this.handleKeyDown}
          />
        ) : null}
      </div>
    );
  }
}

export default TodoItem;
