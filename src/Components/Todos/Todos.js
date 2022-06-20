import React from "react";
import { Link,} from "react-router-dom";
//customs
import "./Todos.css";
import TodoItem from "./todo/todoItem";

//redux
import { useDispatch } from 'react-redux';
import { toggleAllRedux, clearCompletedRedux } from "../../Redux/actions/actions";

const Todos = ({ all, left, active }) => {
  //redux 
  const dispatch = useDispatch();
  // filter the todo list items
  let showing = all.filter(function (todo) {
    switch (active) {
      case "pending":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  }, []);

  // function to handle the click of the buttons
  // const clickHandler = (name) => {
  //   if (name === "all") {
  //     setActive("all");
  //   } else if (name === "pending") {
  //     setActive("pending");
  //   } else if (name === "completed") {
  //     setActive("completed");
  //   } else {
  //     setActive("all");
  //   }
  // };
  //lower portion of the screen. one that toggles off when all items's of the todolist are deleted
  let main = (
    <div className="bottomContainer">
      <div className="routes">
        <p className="coutn">{left}item(s) left</p>
        <Link to="/all"
          className={active === "all" ? "button active" : "button"}
          // onClick={() => clickHandler("all")}
          name="all"> All</Link>
        <Link to="/pending"
          className={active === "pending" ? "button active" : "button"}
          // onClick={() => clickHandler("pending")}
          name="pending">Pending</Link>
        <Link to="/completed"
          className={active === "completed" ? "button active" : "button"}
          // onClick={() => clickHandler("completed")}
          name="completed">Completed</Link>
      </div>
      {left < all.length ? (
        <button
          className="button clear"
          onClick={() => dispatch(clearCompletedRedux())}>Clear completed</button>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="todo-list">
        {showing.length > 0 ? (
          <button
            className="completeAll button"
            onClick={() => dispatch(toggleAllRedux())}
          ><img src="arrowhead-up.png" className="icon" alt="A" />
          </button>
        ) : null}
        <ul>
          {showing.map((todo) => (
            <li key={todo.key}>
              <TodoItem
                todo={todo}
                key={todo.key}
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
