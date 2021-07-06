import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Modal,
  Input,
} from "@material-ui/core";
import "./Todo.css";
import db from "../../Pages/firebase";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import firebase from "firebase";

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    // update the todo with the new input
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div>
          <h3>Update the Task</h3>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(Event) => setInput(Event.target.value)}
          />
          <Button
           
            onClick={updateTodo}
        
          >
            Upload ✔
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary="Uploaded Task 🤞 "    />
        </ListItem>
        <Button
         
          onClick={(Event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
       
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>

        <Button
       
          onClick={(e) => setOpen(true)}
    
          endIcon={<EditIcon>send</EditIcon>}
        >
          Edit
        </Button>

       
      </List>
    </>
  );
}

export default Todo;