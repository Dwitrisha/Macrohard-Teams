import React from "react";
import "../css/Call.css";
import Sidebar from "../Sidebar";
import CallOption from "./Call/CallOption";
import CallBox from "./Call/CallBox";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Call() {
  return (
    <div id="call">
      <Router>
        <Switch>
          <Route
            exact
            path="/video"
            render={() => {
              window.location.href = "../VideoMeeting/public/videoindex.html";
            }}
          />
        </Switch>
      </Router>

      <Sidebar />
      <div id="call_boxes_wrapper">
        <CallOption />
      </div>
    </div>
  );
}

export default Call;
