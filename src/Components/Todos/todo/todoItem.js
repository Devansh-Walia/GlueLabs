import React, { useState, useEffect, useCallback } from "react";

//customs
import "./todoItem.css";

//redux
import {  useDispatch } from 'react-redux';
import { deleteTodoRedux, updateTodoRedux, toggleTodoRedux } from "../../../Redux/actions/actions";


//constatnts 
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const TodoItem = ({ todo}) => {
  //redux 
  const dispatch = useDispatch();
  //states
  const [checked, setChecked] = useState(todo.completed);
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  
  //useEffect to handle toggling of chaeckbox and editing text states
  useEffect(() => {
    setEditingText(todo.todo);
    setChecked(todo.completed);
  }, [todo.todo, todo.completed]);


  // ===== custom methods =====
  // function to handle the change of the checkbox of the todo list items and to update the state of the todo list items
  
  // handle the change of the checkbox
  const handleChange = useCallback((event) => {
    dispatch(toggleTodoRedux(todo));
    setChecked(event.target.checked);
  }, [todo, dispatch]);

  //2nd input to handle the change of the todo list items
  
  // handle the submit of the todo list items after edit
  const handleSubmit = useCallback( (event) => {
    dispatch(updateTodoRedux(todo, event.target.value));
    setEditing(false);
  }, [todo, dispatch]);
  
  // handle the change of the todo list items
  const handleChange2 = (event) => {
    setEditingText(event.target.value);
  };
  
  // handle the keydown of the todo list items
  const handleKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY) 
      handleSubmit(event);
    
    if (event.keyCode === ESCAPE_KEY) {
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
          onChange={handleChange}/>
        <label
          onDoubleClick={() => setEditing(true)}>
          {todo.todo}
        </label>
      </div>
      <button
        className="destroy"
        onClick={() =>  dispatch(deleteTodoRedux(todo))}/>
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
