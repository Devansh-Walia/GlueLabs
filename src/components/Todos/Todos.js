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
    var todos = this.props.all;
    var left = 0;
      todos.forEach(element => {
      if(element.completed === false){
        left++;
      }
    });
    var showing = todos.filter(function (todo) {
      switch (this.state.active) {
        case "pending":
          return !todo.completed;
        case "completed":
          return todo.completed;
        default:
          return true;
      }
    }, this);
    this.clickHandler = (name) => {
      if (name === "all") {
        showing = this.props.all;
        this.setState({ active: "all" });
      } else if (name === "pending") {
        showing = this.props.pending;
        this.setState({ active: "pending" });
      } else if (name === "completed") {
        showing = this.props.completed;
        this.setState({ active: "completed" });
      } else {
        showing = this.props.all;
        this.setState({ active: "all" });
      }
      this.forceUpdate();
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
