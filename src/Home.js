import React, { Component } from "react";
import { Input, Button, IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Home.css";
import QueuePlayNextTwoToneIcon from "@material-ui/icons/QueuePlayNextTwoTone";
import AddToQueueTwoToneIcon from "@material-ui/icons/AddToQueueTwoTone";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }

  handleChange = (e) => this.setState({ url: e.target.value });

  join = () => {
    if (this.state.url !== "") {
      var url = this.state.url.split("/");
      window.location.href = `/${url[url.length - 1]}`;
    } else {
      var url = Math.random().toString(36).substring(2, 7);
      window.location.href = `/${url}`;
    }
  };


  render() {
    return (

      <div id="homepage">
        	<Header/>
        <div className="container2">
          <Sidebar />

          <div id="call_grid">
            <div id="call_option">
              <p id="call_heading">Start a meeting</p>
              <QueuePlayNextTwoToneIcon
                style={{ fontSize: 120, color: "#464775" }}
              />
              <Button
                id="call_button"
                onClick={this.join}
                style={{ margin: "20px" }}
              >
                Start
              </Button>
            </div>

            <div id="call_option">
              <p id="call_heading2">Join a meeting</p>
              <AddToQueueTwoToneIcon
                style={{ fontSize: 120, color: "#464775" }}
              />
              <Input
                id="call_url"
                placeholder="URL"
                onChange={(e) => this.handleChange(e)}
              />
              <Button
                id="call_button"
                onClick={this.join}
                style={{ margin: "20px" }}
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
