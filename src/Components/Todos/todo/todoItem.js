import React, { useState, useEffect } from "react";
import "./todoItem.css";
function TodoItem({ todo, removeTodo, toggleTodo, updateTodo }) {
  const [checked, setChecked] = useState(todo.completed);
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  useEffect(() => {
    setEditingText(todo.todo);
    setChecked(todo.completed);
  }, [todo.todo, todo.completed, todo]);
  // ===== custom methods =====
  // function to handle the change of the checkbox of the todo list items and to update the state of the todo list items
  const handleChange = (event) => {
    // handle the change of the checkbox
    toggleTodo(todo);
    setChecked(event.target.checked);
  };

  //2nd input to handle the change of the todo list items
  const handleSubmit = (event) => {
    // handle the submit of the todo list items after edit
    updateTodo(todo, event.target.value);
    setEditing(false);
  };
  const handleChange2 = (event) => {
    // handle the change of the todo list items
    setEditingText(event.target.value);
  };
  const handleKeyDown = (event) => {
    // handle the keydown of the todo list items
    if (event.keyCode === 13) {
      // if enter key is pressed
      handleSubmit(event);
    }
    if (event.keyCode === 27) {
      // if esc key is pressed
      setEditingText(todo.todo);
      setEditing(false);
    }
  };
  return (
    <div className="grid-layout">
      <div className="container">
        <input
          className="toggle"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <label
          onDoubleClick={() => {
            setEditing(true);
          }}
        >
          {todo.todo}
        </label>
      </div>
      <button
        className="destroy"
        onClick={() => {
          removeTodo(todo);
        }}
      />
      {editing ? (
        <input
          className={editing ? "edit edit-show" : "edit edit-hide"}
          type="text"
          autoFocus={true}
          value={editingText}
          onBlur={handleSubmit}
          onChange={handleChange2}
          onKeyDown={handleKeyDown}
        />
      ) : null}
    </div>
  );
}

export default TodoItem;
