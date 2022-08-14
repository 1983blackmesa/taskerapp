import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Header from "./components/layout/Header";


import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import EditModal from "./components/EditModal";


function Home() {
  const userInfo = useContext(UserContext);

  //To Do List
  const [inputVal, setInputVal] = useState([]);
  const [todos, setTodos] = useState([]);


  //Notes Taking app
  //const [notesinputVal, notessetInputVal] = useState([]);
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(0);

  const getModal = (id) => {
    setShowModal(id);
  };

  const URL = "http://localhost:5000";

  useEffect(() => {
    getList();
  }, []);

  // READ
  const getList = () => {
    axios
      .get('http://localhost:5000/notes', { withCredentials: true })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // UPDATE
  const hideModal = (id, data) => {
    if (data.title === "" && data.content === "") {
      deleteNote(id);
    } else {
      axios.patch(URL + `/notes/update/${id}`, data, { withCredentials: true }).then(() => {
        getList();
      });
    }
    setShowModal(0);
  };

  // DELETE

  const deleteNote = (id) => {
    axios.delete(URL + `/notes/${id}`, { withCredentials: true }).then(() => {
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note._id !== id);
      });
    });
  };



  //TO DO LIST DB

  useEffect(() => {
    axios.get('http://localhost:5000/todos', { withCredentials: true })
      .then(response => {
        setTodos(response.data);
      })
  }, []);

  if (!userInfo.email) {
    return 'You need to be logged in to see this page';
  }

  function addTodo(e) {
    e.preventDefault();
    axios.put('http://localhost:5000/todos', { text: inputVal }, { withCredentials: true })
      .then(response => {
        setTodos([...todos, response.data]);
        setInputVal('');
      })

  }

  function updateTodo(todo) {
    const data = { id: todo._id, done: !todo.done };
    axios.post('http://localhost:5000/todos', data, { withCredentials: true })
      .then(() => {
        const newTodos = todos.map(t => {
          if (t._id === todo._id) {
            t.done = !t.done;
          }
          return t;
        });
        setTodos([...newTodos]);
      });
  };


  // DELETE THIS!
  var styles = {
    padding: 20
  }

  return (
    <div className="bg">
      <div className="fullPage">
        <Header />

        <div className="listArea">
          <Grid container>
            <CreateArea onAdd={getList} URL={URL} />
          </Grid>

          <Grid container spacing={0}>
            {notes.map((noteItem) => {
              const { _id, title, content, updatedAt } = noteItem;
              return (
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  spacing={0}
                  key={"gridKey" + _id}
                >
                  <Note
                    key={"noteKey" + _id}
                    id={_id}
                    title={title}
                    content={content}
                    onDelete={deleteNote}
                    onEdit={() => getModal(_id)}
                  />
                  <EditModal
                    key={"modalKey" + _id}
                    id={_id}
                    openState={showModal === _id}
                    handleOnClose={hideModal}
                    title={title}
                    content={content}
                    time={updatedAt}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>

        <div style={styles}>
          <form onSubmit={e => addTodo(e)}>
            <h1>To-Do List</h1>
            <input placeholder={'Add Item'}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)} />
          </form>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <input type="checkbox"
                  checked={todo.done}
                  //checked={this.todo.checked}
                  onChange={() => { }}
                  onClick={() => updateTodo(todo)}
                />
                {todo.done ? <del>{todo.text}</del> : todo.text}
              </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
