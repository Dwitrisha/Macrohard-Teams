import React, { Component,useState} from "react";
import { Input, Button, IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Home.css";
import QueuePlayNextTwoToneIcon from "@material-ui/icons/QueuePlayNextTwoTone";
import AddToQueueTwoToneIcon from "@material-ui/icons/AddToQueueTwoTone";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { useStateValue } from "./Components/Pages/StateProvider";
import db from "./Components/Pages/firebase";
import firebase from "firebase";

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
    }
  };

  render() {
 
    function start() {
      var url = Math.random().toString(36).substring(2, 7);
      window.open(`/${url}`,'_blank');
     
      db.collection("rooms").add({
        name:"Meeting Room: "+url,
    })
    .then((docRef) => {
       var roomId=docRef.id;
       db.collection("meetingLink").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        meetingUrl: url,
        fullUrl: url + " " +roomId,
        roomId: roomId,
      });
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  
     
    }

    return (
      <div id="homepage">
        <Header />
        <div className="container2">
          <Sidebar />

          <div id="call_grid">
            <div id="call_option">
              <p id="call_heading">Start a meeting</p>
              <QueuePlayNextTwoToneIcon
                style={{ fontSize: 130, color: "#464775" }}
              />
              <br />
              <Button
                id="call_button"
                onClick={start}
                style={{ margin: "20px" }}
              >
                Start
              </Button>
            </div>

            <div id="call_option">
              <p id="call_heading2">Join a meeting</p>

              <AddToQueueTwoToneIcon
                style={{ fontSize: 130, color: "#464775" }}
              />
              <br />
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
