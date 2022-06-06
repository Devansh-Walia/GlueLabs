import React, { Component } from "react";
import "./App.css";
//customs
import Input from "../input/Input";
import Todos from "../Todos/Todos";
import Footer from "../Footer/Footer";

// costatnts
const ENTER_KEY = 13;
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
  // ===== life cycle methods =====

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
  // == custom methods ==
        
        // object to hold the function related to the edit of the todo list items
        todoListHandler = {
          save: () => { // save the data to the localstorage
            localStorage.setItem("todos", JSON.stringify(this.state.all));
          },
          addTodo: (todo) => { // add a new todo to the list
            this.state.all.push({
              key: this.state.all.length + 1,
              todo,
              completed: false,
            });
          },
          removeTodo: (todo) => { // remove a todo from the list
            this.setState({ all: this.state.all.filter((t) => t.key !== todo.key) });
          },
          updateTodo: (todo, value) => {  // update the todo
            var all = this.state.all;
            all.forEach((t) => {
              if (t.key === todo.key) {
                t.todo = value; // update task
                t.completed = false; // reset the completed status
              }
            });
            this.setState({ all }); 
          },
          toggleTodo: (todo) => { // toggle the completed status of the todo
            var all = this.state.all; 
            // this.setState({ all: all });
          all.forEach((t) => {
              if (t.key === todo.key) {
                t.completed = !t.completed;
              }
            });
            this.setState({ all });
          },
          clearCompleted: () => {  // clear the completed todos
            this.setState({ all: this.state.all.filter((t) => !t.completed) });
          },
          ToggleAll: () => { // toggle all the todos completed status
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
          handleChange: (e) => { // update the new todo
            this.setState({ newTodo: e.target.value });
          },
          handleKeyDown: (e) => { // add the new todo
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
