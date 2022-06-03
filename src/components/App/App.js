import React, { Component } from "react";
import "./App.css";
//customs
import Input from "../input/Input";
import Todos from "../Todos/Todos";
import Footer from "../Footer/Footer";

// costatnts
var ENTER_KEY = 13;
class App extends Component {
  constructor(props) {
    super(props);

    // getInitialState
    this.state = {
      all: [],
      nowShowing: "all",
      editing: null,
      newTodo: "",
    };
  }
  // check the localstorage and if there is any todo init the state to be the same
  // else init the state to be empty
  // runs once
  componentDidMount() {
    var localData = localStorage.getItem("todos");
    this.setState({all: JSON.parse(localData)});
  }
  //after some change has been made, we update the localstorage as a cleanup and to save the data
  componentDidUpdate() {
    this.todoListHandler.save();
  }
  // object to hold the function related to the edit of the todo list items
  todoListHandler = {
    save: () => {
      localStorage.setItem("todos", JSON.stringify(this.state.all));
    },
    addTodo: (todo) => {
      this.state.all.push({
        key: this.state.all.length + 1,
        todo,
        completed: false,
      });
    },
    removeTodo: (todo) => {
      this.setState({ all: this.state.all.filter((t) => t.key !== todo.key) });
    },
    updateTodo: (todo) => { 
      var all = this.state.all;
      all.forEach((t) => {
        if (t.key === todo.key) {
          t.todo = todo.todo;
          t.completed = todo.completed;
        }
      });
      this.setState({ all });
    },
    toggleTodo: (todo) => {
      var all = this.state.all;
      // this.setState({ all: all });
     all.forEach((t) => {
        if (t.key === todo.key) {
          t.completed = !t.completed;
        }
      });
      this.setState({ all });
    },
    clearCompleted: () => { 
      this.setState({ all: this.state.all.filter((t) => !t.completed) });
    },
    ToggleAll: () => {
      var all = this.state.all;
      var allTrue = true;
      all.forEach((t) => {
        if (t.completed === false) {
          allTrue = false;
          t.completed = true;
        }
      });
      if (allTrue) {
        all.forEach((t) => {
          t.completed = false;
        });
      }
      this.setState({ all });
    }
  };
  // object to hold the function related to the input of the todo list items
  inputHandler = {
    handleChange: (e) => {
      this.setState({ newTodo: e.target.value });
    },
    handleKeyDown: (e) => {
      if (e.keyCode !== ENTER_KEY) {
        return;
      }
      e.preventDefault();

      var val = this.state.newTodo.trim();
      console.log(val);
      if (val) {
        this.todoListHandler.addTodo(val);
        this.setState({ newTodo: "" });
      }
    },
  };
  render() {
    return (
      <div>
        <div className="todoapp">
          <h1 className="headding">rc-todo</h1>
          <Input
            value={this.state.newTodo}
            onKeyDown={this.inputHandler.handleKeyDown}
            handleChange={this.inputHandler.handleChange}
          />
          <Todos
            all={this.state.all}
            nowShowing={this.state.nowShowing}
            todoListHandler={this.todoListHandler}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
