import React, { useState, useEffect } from "react";
import db from "../firebase";
import firebase from "firebase";
import "./Todo.css";
import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from "@material-ui/icons";

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

const AddTodo = () => {

  //declaring states to add todo
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div>
      <form>
        <TextField
          required
          id="todo"
          label="Enter Task"
          name="todo"
          style={{ borderRadius:"5px",backgroundColor:"white"}}
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
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default AddTodo;
