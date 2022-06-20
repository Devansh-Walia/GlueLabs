import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
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
    <Router>
      <div>
        <div className="todoapp">
          <h1 className="headding">redux-router</h1>
          <InputComponent
            value={newTodo}
            onKeyDown={handleKeyDown}
            handleChange={handleChange}
          />
          <Routes>
            <Route path="/all" element={<Todos all={todos} left={left} active={"all"} />}/>
            <Route path="/completed"  element={ <Todos all={todos} left={left} active={"completed"} /> }/>
            <Route path="/pending" element={ <Todos all={todos} left={left} active={"pending"} />}   />
          </Routes>

        </div>
        <Footer />
      </div>
    </Router>

  );
};

export default App;
