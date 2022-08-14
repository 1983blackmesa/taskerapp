import React from "react";

const Input = (props) => {
  const { value, onChange } = props;
  const handleOnChange = (event) => {
    onChange(event);
  };

  return (
    <input
      name="title"
      className="textSpace"
      onChange={handleOnChange}
      value={value}
      placeholder="Title"
      autoComplete="off"
      autoCorrect="off" 
      autoCapitalize="off" 
      spellCheck="false"
      autoFocus
    />
  );
};

export default Input;
