import React, { Component } from "react";
import "./input.css";
export class Input extends Component {
'use strict'; 

  render() {
    return (
      <input
        value={this.props.value}
        className="add-new"
        placeholder="What needs to be done?"
        onKeyDown={this.props.onKeyDown}
        onChange={this.props.handleChange}
        autoFocus={ true}
      ></input>
    );
  }
}

export default Input;
