import React, { useState, useRef, useEffect } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";

import Input from "./formElements/Input";
import Textarea from "./formElements/Textarea";

const CreateArea = (props) => {
  const { URL, onAdd } = props;
  const createArea = useRef();
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    user: "",
    title: "",
    content: "",
  });

  const handleClickOutside = (event) => {
    // outside click
    if (!createArea.current.contains(event.target)) {
      if (note.title !== "" || note.content !== "" || note.user !== "") {
        submitNote();
      }
      setExpanded(false);
    }
  };

  const handleClickInside = () => setExpanded(true);

  useEffect(() => {
    // add on mousedown
    document.addEventListener("mousedown", handleClickOutside);

    // return function to be called when unmounted
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  // Prevent default when enter key is pressed on text input, then focus on textarea
  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("createTextarea").focus();
  };


/*
const getList = () => {
  axios
    .get('http://localhost:5000/notes', {withCredentials:true})
    .then((response) => {
      setNotes(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
*/

  // CREATE
  //{withCredentials:true}
  const submitNote = () => {
    axios.post(URL + "/notes/add", note, {withCredentials:true}).then(() => {
      onAdd();
      setNote({
        user: "",
        title: "",
        content: "",
      });
    });
  };

  return (
    <form className="create-note" onSubmit={handleSubmit}>
      <div className="addNoteDiv" onClick={handleClickInside} ref={createArea}>
        {expanded && <Input onChange={handleChange} value={note.title} />}
        <Textarea
          onChange={handleChange}
          value={note.content}
          rows={expanded ? 3 : 1}
          id="createTextarea"
        />
      </div>
      <Zoom in={expanded}>
        <Fab>
          <AddIcon onClick={handleClickOutside} />
        </Fab>
      </Zoom>
    </form>
  );
};

export default CreateArea;
