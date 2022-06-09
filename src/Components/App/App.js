import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
//customs
import InputComponent from "../utils/Input/input";
import Todos from "../Todos/Todos";
import Footer from "../Footer/footer";

// costatnts
const ENTER_KEY = 13;
const App = () => {
  const [all, setAll] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [newTodo, setNewTodo] = useState("");
  let todoListHandler = useMemo(() => {}, []);
  todoListHandler = {
    addTodo: (todo) => {
      // add a new todo to the list
      let All = [
        ...all,
        {
          key: all.length>0 ?all[all.length-1].key + 1:0,
          todo,
          completed: false,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        },
      ];
      setAll(All);
    },
    removeTodo: (todo) => {
      // remove a todo from the list
      let All = all.filter((t) => t.key !== todo.key);
      setAll(All);
    },
    updateTodo:  (todo, value) => {
      // update the todo
      let All = all;
      All.forEach((t) => {
        if (t.key === todo.key) {
          t.todo = value; // update task
          t.completed = false; // reset the completed status
        }
      });
       setAll(All);
      todoListHandler.save();
    },
    toggleTodo:  (todo) => {
      // toggle the completed status of the todo
      let All = all;
      // setState({ all: all });
      All.forEach((t) => {
        if (t.key === todo.key) {
          t.completed = !t.completed;
        }
      });
       setAll(All);
      todoListHandler.save();
    },
    clearCompleted: () => {
      // clear the completed todos
      setAll(all.filter((t) => !t.completed));
    },
    ToggleAll:  () => {
      // toggle all the todos completed status
      let All = all;
      let allTrue = true;
      All.forEach((t) => {
        if (t.completed === false) {
          allTrue = false;
          t.completed = true;
        }
      });
      if (allTrue) {
        All.forEach((t) => {
          t.completed = false;
        });
      }
       setAll(All);
      todoListHandler.save();
    },
    save: () => {
      localStorage.setItem("todos", JSON.stringify(all));
      console.log("saved");
      setAll(all);
    },
  };
  todoListHandler = useMemo(() => todoListHandler, [todoListHandler]);
  useEffect(() => {
    todoListHandler.save();
  }, [all, todoListHandler])

  // object to hold the function related to the input of the todo list items
  const inputHandler = {
    handleChange: (e) => {
      // update the new todo
      setNewTodo(e.target.value);
    },
    handleKeyDown: (e) => {
      // add the new todo
      if (e.keyCode !== ENTER_KEY) {
        return;
      }
      e.preventDefault();

      let val = newTodo.trim();
      console.log(val);
      if (val) {
        todoListHandler.addTodo(val);
        setNewTodo("");
      }
    },
  };

  return (
    <div>
      <div className="todoapp">
        <h1 className="headding">rf-todo</h1>
        <InputComponent
          value={newTodo}
          onKeyDown={inputHandler.handleKeyDown}
          handleChange={inputHandler.handleChange}
        />
        <Todos
          all={()=>all}
          todoListHandler={todoListHandler}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
