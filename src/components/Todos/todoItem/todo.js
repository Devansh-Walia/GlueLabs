import React, { Component } from "react";
import "./todo.css";

export class TodoItem extends Component {
  "use strict";
  constructor() {
    super();
    this.state = { checked: false };
  }
  handleChange = (event) => {
    if (event.target.checked) {
      console.log("✅ Checkbox is checked");
    } else {
      console.log("⛔️ Checkbox is NOT checked");
    }
    this.props.todoListHandler["toggleTodo"](this.props.todo);
    this.setState({ checked: event.target.checked });
  };
  render() {
    // console.log();
    return (
      <div className="grid-layout">
        <div className="container" >
        <input
          className="toggle"
            type="checkbox"
            checked={this.props.todo.completed }
          onChange={this.handleChange}
        />
          <label onDoubleClick={this.handleEdit}>{this.props.todo.todo}</label>
          </div>
        <button className="destroy" onClick={ ()=>{ this.props.todoListHandler["removeTodo"](this.props.todo) }} />
      </div>
    );
  }
}

export default TodoItem;
