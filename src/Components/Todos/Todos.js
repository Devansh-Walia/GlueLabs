import React, { useState } from "react";
import "./Todos.css";
import TodoItem from "./todo/todoItem";
function Todos({all, left, clearCompleted, removeTodo, ToggleAll, updateTodo, toggleTodo }) {
  // const todos = all; // all is the array of the todo list items
  const [active, setActive] = useState("all");
  // console.dir(todos);
  //! use memo not right 
  // useMemo(() => { setTodos(all); setLeft(todos.filter((todo) => !todo.completed).length)}, [all])
  // filter the todo list items
  let showing = all.filter(function (todo) {
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
      {left < all.length ? (
        <button
          className="button clear"
          onClick={clearCompleted}
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
            onClick={ToggleAll}
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
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                toggleTodo={toggleTodo}
                editing={false}
              />
            </li>
          ))}
        </ul>
      </div>
      {all.length > 0 ? main : null}
    </>
  );
}

export default Todos;
