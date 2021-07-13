import React, { Component, useState } from "react";
import Video from "./Video";
import Home from "./Home";
import Header from "./Components/Header";
import Call from "./Components/Pages/Call";
import Chat from "./Components/Pages/Chat";
import Calendar from "./Components/Pages/Calendar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Pages/Login";
import Drive from "./Components/Pages/Drive/Drive";
import Todo from "./Components/Pages/Task/Todo";
import { useStateValue } from "./Components/Pages/StateProvider";

function App() {
  //to check user is logged in or not
  const [{ user }, dispatch] = useStateValue();
  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/rooms/:roomId">
              <Chat />
            </Route>

            <Route path="/chat">
              <Chat />
            </Route>

            <Route path="/schedule">
              <Calendar />
            </Route>

            <Route path="/drive">
              <Drive />
            </Route>
            <Route path="/task">
              <Todo />
            </Route>

            <Route path="/home" component={Home} />
            <Route path="/:url" component={Video} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
