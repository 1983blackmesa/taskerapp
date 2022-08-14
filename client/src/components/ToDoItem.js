import React, { useState } from "react";

function ToDoItem(props) {
  const [isDone, setIsDone] = useState(false);

  //function to handle Click to change the state back to true
  function handleClick() {
    setIsDone((prevValue) => {
      //get previous value and update the state
      return !prevValue;
    });
  }

  return (
    <div
      onClick={() => {
        handleClick();
      }}
    >
      <ul>
        <li style={{ textDecoration: isDone ? "line-through" : "none" }}>
          {props.text}{" "}
        </li>
      </ul>
    </div>
  );
}

export default ToDoItem;