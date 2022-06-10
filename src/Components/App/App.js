import React, { useState, useCallback, useEffect } from "react";

//customs
import "./App.css";
import InputComponent from "../utils/Input/input";
import Todos from "../Todos/Todos";
import Footer from "../Footer/footer";

// costatnts
const ENTER_KEY = 13;
const App = () => {
  //states
  const [all, setAll] = useState([]);
  const [left, setLeft] = useState(all.filter((todo) => !todo.completed).length);
  const [newTodo, setNewTodo] = useState("");
  
  //save todos to the localstorage + state + update no of items left to be completed
  const save = useCallback(
    (tempState) => {
      localStorage.setItem("todos", JSON.stringify(tempState));
      setAll(tempState);
      setLeft(all.filter((t) => !t.completed).length);
    },
    [all],
  );

  // add a new todo to the list
  const addTodo = useCallback(
    (todo) => {
      const tempState = [...all,{
          key: new Date(),
          todo,
          completed: false,
        },];
      save(tempState);
    },
    [all, save],
  );

  // remove a todo from the list
  const removeTodo = useCallback((todo) => {
    const tempState = all.filter((t) => t.key !== todo.key);
    save(tempState);
  }, [all, save]);

  // update the todo
  const updateTodo = useCallback((todo, value) => {
    const tempState = all;
    tempState.forEach((t) => {
      if (t.key === todo.key) {
        t.todo = value; 
        t.completed = false; 
      }
    });
    save(tempState);
  }, [all, save]);

  // toggle the completed status of the todo
  const toggleTodo = useCallback((todo) => {
    const tempState = all;
    tempState.forEach((t) => {
      if (t.key === todo.key) {
        t.completed = !t.completed;
      }
    });
    save(tempState);
  }, [all, save]);
  
  // clear the completed todos
  const clearCompleted = useCallback(() => {
    const tempState = all.filter((t) => !t.completed);
    save(tempState);
  }, [all, save]);

  // toggle all the todos completed status
  const ToggleAll = useCallback(() => {
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


  // function related to the input of the todo list items
  
  // update the new todo
  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };
  // add the new todo
  const handleKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    e.preventDefault();

    let val = newTodo.trim();
    if (val) {
      addTodo(val);
      setNewTodo("");
    }
  };

  //use effect to set the all state to things from local storage or default to empty array
  useEffect(() => setAll(JSON.parse(localStorage.getItem("todos")) || []), []);
  //se effects to handle changes in the todo items and reflect them to no of left items
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
