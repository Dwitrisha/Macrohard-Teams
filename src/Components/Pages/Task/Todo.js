import React, { useState, useEffect } from "react";
import db from "../firebase";
import firebase from "firebase";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from "@material-ui/icons";
import "./Todo.css";

import {
  Button,
  TextField,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("datetime", "desc")
      .onSnapshot((snapshot) => {
        console.log("Firebase Snap!");
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().todo,
              datatime: doc.data().datatime,
            };
          })
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const deleteTodo = (id) => {
    db.collection("todos")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  const openUpdateDialog = (todo) => {
    setOpen(true);
    setToUpdateId(todo.id);
    setUpdate(todo.name);
  };

  const editTodo = () => {
    db.collection("todos").doc(toUpdateId).update({
      todo: update,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Header />
      <div id="todo-page">
        <Sidebar />
        <div id="todo-container">
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="todo"
              label="Enter Task"
              name="todo"
              style={{ borderRadius: "5px", backgroundColor: "white" }}
              autoFocus
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <br />
            <Button
              type="submit"
              id="todo-button"
              onClick={addTodo}
              disabled={!input}
              startIcon={<AddCircleOutlineRounded />}
            >
              Add Todo
            </Button>
          </form>
          <center>
            <div id="todo-scroll">
              <List style={{ width: "45vw" }} dense={true}>
                {todos.map((todo) => (
                  <ListItem id="todo-box" key={todo.id}>
                    <ListItemText
                      primary={todo.name}
                      secondary={todo.datetime}
                    />

                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="Edit"
                        onClick={() => openUpdateDialog(todo)}
                      >
                        <Edit style={{ color: "rgb(175, 129, 250)" }} />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <DeleteOutlineRounded
                          style={{ color: "rgb(175, 129, 250" }}
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </center>

          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <TextField
                autoFocus
                margin="normal"
                label="Update Todo"
                type="text"
                fullWidth
                name="updateTodo"
                value={update}
                onChange={(event) => setUpdate(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={editTodo} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Todo;
