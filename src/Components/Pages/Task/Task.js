import React, { useState, useEffect } from 'react';
import "./Task.css";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import db from "../../Pages/firebase";
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import Todo from './Todo';
import firebase from "firebase"

function Task() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we need to listen to database and then we get some data using fetch,
  useEffect(() => {
    //this code fires when app.js loaded
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map(doc => doc.data().todos))
        // console.log(snapshot.docs.map(doc => doc.data()))
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  // Function on button add TODo
  const addTodo = (Event) => {
    // preventing default nature of form of refresh
    Event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // to remove the entered words from input after clicking button
    setInput("");
  };

  return (
    <div>
      <Header />
      <div id="task_page">
        <Sidebar />
        <div id="task-container">
          <h1 className="App-header">Todo List </h1>
          <form>
            <FormControl>
              <InputLabel>
                <span role="img" aria-label="emoji">
                  ✅
                </span>
               Add Task
              </InputLabel>
              <Input
                value={input}
                onChange={(Event) => setInput(Event.target.value)}
              />
              <FormHelperText>
                We'll make you productive{" "}
                <span role="img" aria-label="emoji">
                  🕒
                </span>{" "}
              </FormHelperText>
            </FormControl>

            {/* using material ui */}
            <Button
              disabled={!input}
              type="submit"
              variant="contained"
              color="primary"
              onClick={addTodo}
            >
              Add Todo
            </Button>
            {/* <button onClick={addTodo}>Add Todo </button> */}
          </form>
          <ul>
            {todos.map((todo) => (
              <Todo todo={todo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Task;
