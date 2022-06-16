import React, { useState } from "react";

// redux
import { useSelector, useDispatch } from 'react-redux'
import { addTodoRedux } from "../../Redux/actions/actions";

//customs
import "./App.css";
import InputComponent from "../utils/Input/input";
import Todos from "../Todos/Todos";
import Footer from "../Footer/footer";

// costatnts
const ENTER_KEY = 13;
const App = () => {
  const todos = useSelector(state => state.todo.todos);
  const left = useSelector(state => state.todo.left);
  const dispatch = useDispatch();
  //states
  const [newTodo, setNewTodo] = useState("");
  
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
      dispatch(addTodoRedux(val));
      setNewTodo("");
    }
  };

  return (
    <div>
      <div className="todoapp">
        <h1 className="headding">redux-todo</h1>
        <InputComponent
          value={newTodo}
          onKeyDown={handleKeyDown}
          handleChange={handleChange}
        />
        <Todos
          all={todos}
          left={left}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
