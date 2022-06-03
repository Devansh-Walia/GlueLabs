import React, { Component } from "react";
import "./Todos.css";
import TodoItem from "./todoItem/todo";
export class Todos extends Component {
  constructor() {
    super();
    this.state = {
      active: "all",
    };
  }
  render() {
    var todos = this.props.all; // this.props.all is the array of the todo list items
    var left = 0; // the number of the todo list items that are not completed
      todos.forEach(element => { // loop through the todo list items
      if(element.completed === false){ // if the todo list item is not completed
        left++; // increase the number of the todo list items that are not completed
      }
    });
    var showing = todos.filter(function (todo) { // filter the todo list items
      switch (this.state.active) { // switch the state of the todo list items
        case "pending": // if the state is pending
          return !todo.completed; // return the todo list items that are not completed
        case "completed": // if the state is completed
          return todo.completed; // return the todo list items that are completed
        default: // if the state is all
          return true; // return all the todo list items
      }
    }, this); // this is the context of the filter function
    this.clickHandler = (name) => { // function to handle the click of the buttons
      if (name === "all") { // if the button is all
        this.setState({ active: "all" }); // set the state of the todo list items to all
      } else if (name === "pending") { // if the button is pending
        this.setState({ active: "pending" }); // set the state of the todo list items to pending
      } else if (name === "completed") { // if the button is completed
        this.setState({ active: "completed" }); // set the state of the todo list items to completed
      } else { // if the button is clear completed
        this.setState({ active: "all" }); // set the state of the todo list items to all
      }
      this.forceUpdate(); // force the update of the todo list items
    };
    var main = (
      <div className="routes">
          <p className="coutn">{left}item(s) left</p>
          <button
            className={this.state.active === "all" ? "button active" : "button"}
            onClick={() => this.clickHandler("all")}
            name="all"
          >
            All
          </button>
          <button
            className={
              this.state.active === "pending" ? "button active" : "button"
            }
            onClick={() => this.clickHandler("pending")}
            name="pending"
          >
            Pending
          </button>
          <button
            className={
              this.state.active === "completed" ? "button active" : "button"
            }
            onClick={() => this.clickHandler("completed")}
            name="completed"
          >
            Completed
          </button>
        </div>
    );
    
    return (
      <>
        <div className="todo-list">
          <ul>
            {showing.map((todo) => (
              <li key={todo.key}>
                <TodoItem
                  todo={todo}
                  key={todo.key}
                  todoListHandler={this.props.todoListHandler}
                  editing={false}
                />
              </li>
            ))}
          </ul>
        </div>
        {this.props.all.length>0?main:null}
      </>
    );
  }
}

export default Todos;
