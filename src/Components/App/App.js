import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
//customs
import InputComponent from "../utils/Input/input";
import Todos from "../Todos/Todos";
import Footer from "../Footer/footer";

// costatnts
const ENTER_KEY = 13;
const App = () => {
  const [all, setAll] = useState([]);
  const [left, setLeft] = useState(all.filter((todo) => !todo.completed).length);
  const [newTodo, setNewTodo] = useState("");
  const save = useCallback(
    (tempState) => {
      // console.log("in save");
      localStorage.setItem("todos", JSON.stringify(tempState));
      setAll(tempState);
      setLeft(all.filter((t) => !t.completed).length);
    },
    [all],
  );
  const addTodo = useCallback(
    (todo) => {
      // console.log("in add", all);
      // add a new todo to the list
      const tempState = [
        ...all,
        {
          key: new Date(),
          todo,
          completed: false,
        },
      ];
      // console.log(tempState);
      save(tempState);
    },
    [all, save],
  );

  const removeTodo = useCallback((todo) => {
    // remove a todo from the list
    // console.log("in remove");
    const tempState = all.filter((t) => t.key !== todo.key);
    save(tempState);
  }, [all, save]);
  const updateTodo = useCallback((todo, value) => {
    // console.log("in updateTodo");
    // update the todo
    const tempState = all;
    tempState.forEach((t) => {
      if (t.key === todo.key) {
        t.todo = value; // update task
        t.completed = false; // reset the completed status
      }
    });
    save(tempState);
  }, [all, save]);
  const toggleTodo = useCallback((todo) => {
    // console.log("in toggleTodo");
    // toggle the completed status of the todo
    const tempState = all;
    // setState({ all: all });
    tempState.forEach((t) => {
      if (t.key === todo.key) {
        t.completed = !t.completed;
      }
    });
    save(tempState);
  }, [all, save]);
  const clearCompleted = useCallback(() => {
    // console.log("int clwarcompleted");
    // clear the completed todos
    const tempState = all.filter((t) => !t.completed);
    // console.dir(tempState, "all");
    save(tempState);
  }, [all, save]);
  const ToggleAll = useCallback(() => {
    // console.log("int toggleAll");
    // toggle all the todos completed status
    const tempState = all;
    let wereAllTodosCompleted = true;
    tempState.forEach((t) => {
      if (t.completed === false) {
        wereAllTodosCompleted = false;
        t.completed = true;
      }
    });
    if (wereAllTodosCompleted) {
      tempState.forEach((t) => {
        t.completed = false;
      });
    }
    save(tempState);
  }, [all, save]);

  // object to hold the function related to the input of the todo list items

  const handleChange = (e) => {
    // update the new todo
    setNewTodo(e.target.value);
  };
  const handleKeyDown = (e) => {
    // add the new todo
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    e.preventDefault();

    let val = newTodo.trim();
    // console.log(val);
    if (val) {
      addTodo(val);
      setNewTodo("");
    }
  };
  useEffect(() => setAll(JSON.parse(localStorage.getItem("todos")) || []), []);
  useEffect(() => setLeft(all.filter((t) => !t.completed).length), [all]);

  return (
    <div>
      <div className="todoapp">
        <h1 className="headding">rf-todo</h1>
        <InputComponent
          value={newTodo}
          onKeyDown={handleKeyDown}
          handleChange={handleChange}
        />
        <Todos
          all={all}
          left={left}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          toggleTodo={toggleTodo}
          ToggleAll={ToggleAll}
          clearCompleted={clearCompleted}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
