import React from 'react'
import './input.css';
function Input({ ...props}) {
    return (
        <input
          value={props.value}
          className="add-new"
          placeholder="What needs to be done?"
          onKeyDown={props.onKeyDown}
          onChange={props.handleChange}
          autoFocus={ true}
        ></input>
      );
}

export default Input