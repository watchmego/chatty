import React from 'react'
import "./help.css";

export const Help = ({handleHelp}) => {
  return (

        <div className="helpContainer">
            <h2>Help</h2>
            <ul>
                <li>To use AI, first invite using the button on the left, then type AI followed by a space and your question</li>
            </ul>
            <button onClick={handleHelp}>Close</button>
        </div>
  )
}
