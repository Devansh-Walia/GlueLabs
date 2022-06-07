import React, { useState, useEffect } from "react";
import "./todoItem.css";
function TodoItem({ ...props }) {
  const [checked, setChecked] = useState(props.todo.completed);
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  useEffect(() => {
    setEditingText(props.todo.todo);
  }, [props.todo.todo]);
  // ===== custom methods =====
  const inputHandler = {
    // function to handle the change of the checkbox of the todo list items and to update the state of the todo list items
    handleChange: (event) => {
      // handle the change of the checkbox
      if (event.target.checked) {
        console.log("✅ Checkbox is checked");
      } else {
        console.log("⛔️ Checkbox is NOT checked");
      }
      props.todoListHandler["toggleTodo"](props.todo);
      setChecked(event.target.checked);
    },

    //2nd input to handle the change of the todo list items
    handleSubmit: (event) => {
      // handle the submit of the todo list items after edit
      props.todoListHandler["updateTodo"](props.todo, event.target.value);
      setEditing(false);
    },
    handleChange2: (event) => {
      // handle the change of the todo list items
      setEditingText(event.target.value);
    },
    handleKeyDown: (event) => {
      // handle the keydown of the todo list items
      if (event.keyCode === 13) {
        // if enter key is pressed
        inputHandler.handleSubmit(event);
      }
      if (event.keyCode === 27) {
        // if esc key is pressed
        setEditingText(props.todo.todo);
        setEditing(false);
      }
    },
  };
  return (
    <div className="grid-layout">
      <div className="container">
        <input
          className="toggle"
          type="checkbox"
          checked={checked}
          onChange={inputHandler.handleChange}
        />
        <label
          onDoubleClick={() => {
            setEditing(true);
          }}
        >
          {props.todo.todo}
        </label>
      </div>
      <button
        className="destroy"
        onClick={() => {
          props.todoListHandler["removeTodo"](props.todo);
        }}
      />
      {editing ? (
        <input
          className={editing ? "edit edit-show" : "edit edit-hide"}
          type="text"
          autoFocus={true}
          value={editingText}
          onBlur={inputHandler.handleSubmit}
          onChange={inputHandler.handleChange2}
          onKeyDown={inputHandler.handleKeyDown}
        />
      ) : null}
    </div>
  );
}

export default TodoItem;
