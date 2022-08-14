import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const Item = (props) => {
  const { onDelete, id, onEdit, name} = props;

  const handleOnDeleteItem = () => {
    onDelete(id);
  };

  const handleOnEditItem = () => onEdit();

  return (
    <div className="item">
      <h1>{name}</h1>
      <span className="itemEdit" onClick={handleOnEditItem}>
        EDIT
      </span>
      <button onClick={handleOnDeleteItem}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Item;
