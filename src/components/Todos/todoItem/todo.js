import React, { Component } from "react";
import "./todo.css";

export class TodoItem extends Component {
  constructor() {
    super();
    this.state = { checked: false, editing: false, editText: "" };
  }
  //===== life cycle methods =====
  componentDidMount() {
    this.setState({ editText: this.props.todo.todo });
  }

  // ===== custom methods =====
  inputHandler = {
    // function to handle the change of the checkbox of the todo list items and to update the state of the todo list items
    handleChange: (event) => {
      // handle the change of the checkbox
      if (event.target.checked) {
        console.log("✅ Checkbox is checked");
      } else {
        console.log("⛔️ Checkbox is NOT checked");
      }
      this.props.todoListHandler["toggleTodo"](this.props.todo);
      this.setState({ checked: event.target.checked });
    },

    //2nd input to handle the change of the todo list items
    handleSubmit: (event) => {
      // handle the submit of the todo list items after edit
      this.props.todoListHandler["updateTodo"](
        this.props.todo,
        event.target.value
      );
      this.setState({ editing: false });
    },
    handleChange2: (event) => {
      // handle the change of the todo list items
      this.setState({ editText: event.target.value });
    },
    handleKeyDown: (event) => {
      // handle the keydown of the todo list items
      if (event.keyCode === 13) {
        // if enter key is pressed
        this.inputHandler.handleSubmit(event);
      }
      if (event.keyCode === 27) {
        // if esc key is pressed
        this.setState({ editText: this.props.todo.todo, editing: false });
      }
    },
  };
  render() {
    return (
      <div className="grid-layout">
        <div className="container">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.inputHandler.handleChange}
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
            autoFocus={true}
            value={this.state.editText}
            onBlur={this.inputHandler.handleSubmit}
            onChange={this.inputHandler.handleChange2}
            onKeyDown={this.inputHandler.handleKeyDown}
          />
        ) : null}
      </div>
    );
  }
}

export default TodoItem;

// the todo list items goes like :
//                            grid layout
//        a div with todos                a button to delete
// a checkbox   a label   a button to edit
