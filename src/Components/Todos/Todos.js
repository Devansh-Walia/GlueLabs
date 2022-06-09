import React, { useEffect, useMemo, useState} from "react";
import "./Todos.css";
import TodoItem from "./todo/todoItem";
function Todos({ ...props }) {
  // const todos = props.all; // props.all is the array of the todo list items
  const [active, setActive] = useState("all");
  const [todos, setTodos] = useState(props.all);
  const [left, setLeft] = useState(todos.filter((todo) => !todo.completed).length);
  console.dir(todos);
  useEffect(() => {
    if (props.all)
      setTodos(props.all);
    if (todos)
      setLeft(todos.filter((todo) => !todo.completed).length)
  }, [todos, props.all, left, props]);
  useMemo(() => { setTodos(props.all); setLeft(todos.filter((todo) => !todo.completed).length)}, [props.all])
  // filter the todo list items
  let showing = todos.filter(function (todo) {
    switch (
      active // switch the state of the todo list items
    ) {
      case "pending": // if the state is pending
        return !todo.completed; // return the todo list items that are not completed
      case "completed": // if the state is completed
        return todo.completed; // return the todo list items that are completed
      default: // if the state is all
        return true; // return all the todo list items
    }
  }, []); // this is the context of the filter function
  // function to handle the click of the buttons

  const clickHandler = (name) => {
    if (name === "all") {
      // if the button is all
      setActive("all"); // set the state of the todo list items to all
    } else if (name === "pending") {
      // if the button is pending
      setActive("pending"); // set the state of the todo list items to pending
    } else if (name === "completed") {
      // if the button is completed
      setActive("completed"); // set the state of the todo list items to completed
    } else {
      // if the button is clear completed
      setActive("all"); // set the state of the todo list items to all
    }
  };
  let main = (
    <div className="bottomContainer">
      <div className="routes">
        <p className="coutn">{left}item(s) left</p>
        <button
          className={active === "all" ? "button active" : "button"}
          onClick={() => clickHandler("all")}
          name="all"
        >
          All
        </button>
        <button
          className={active === "pending" ? "button active" : "button"}
          onClick={() => clickHandler("pending")}
          name="pending"
        >
          Pending
        </button>
        <button
          className={active === "completed" ? "button active" : "button"}
          onClick={() => clickHandler("completed")}
          name="completed"
        >
          Completed
        </button>
      </div>
      {left < todos.length ? (
        <button
          className="button clear"
          onClick={props.todoListHandler["clearCompleted"]}
        >
          Clear completed
        </button>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="todo-list">
        {showing.length > 0 ? (
          <button
            className="completeAll button"
            onClick={props.todoListHandler["ToggleAll"]}
          >
            <img src="arrowhead-up.png" className="icon" alt="A" />
          </button>
        ) : null}
        <ul>
          {showing.map((todo) => (
            <li key={todo.key}>
              <TodoItem
                todo={todo}
                key={todo.key}
                todoListHandler={props.todoListHandler}
                editing={false}
              />
            </li>
          ))}
        </ul>
      </div>
      {todos.length > 0 ? main : null}
    </>
  );
}

export default Todos;
