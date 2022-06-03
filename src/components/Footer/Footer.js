import React, { Component } from 'react'
import './Footer.css'
export class Footer extends Component {

  render() {
    return (
        <div className='footer'>
            <p>Double click to edit the task</p>
            <p>Created by <a href='https://github.com/Devansh-Walia'>Devansh</a></p>
            <p>Part of GlueLabs intern experience</p>
      </div>
    )
  }
}

export default Footer