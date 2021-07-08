import React, { useState, useEffect } from "react";
import "./Message/Message.css";
import "../css/Chat.css";
import Sidebar from "../Sidebar";
import SendIcon from "@material-ui/icons/Send";
import { Input, Button } from "@material-ui/core";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Header from "../Header";
import ConversationBar from "./Conversation/ConversationBar";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useStateValue } from "../Pages/StateProvider";
import db, { storage } from "./firebase";
import CloseIcon from "@material-ui/icons/Close";
import { Scrollbars } from 'react-custom-scrollbars';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import emoji from "emoji-mart/dist-es/components/emoji/emoji";

function showEmoji() {
  var x = document.getElementById("Emoji_List");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function showUpload() {
  if (document.getElementById("file_upload").style.display === "none")
    document.getElementById("file_upload").style.display = "block";
  else document.getElementById("file_upload").style.display = "none";
}
function closeUpload() {
  document.getElementById("file_upload").style.display = "none";
}
function Chat() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const [input, setInput] = useState("");
  //Selecting emoji from emoji picker
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const { roomId } = useParams();

  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendText = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      photo: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

const clickEmoji=(e)=>{
    db.collection("rooms").doc(roomId).collection("messages").add({
      message:e,
      name: user.displayName,
      photo: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`files/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function...
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .add({
                message: "File Uploaded: " + url,
                name: user.displayName,
                photo: user.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            setInput("");

            //post file inside db
            db.collection("files").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              fileUrl: url,
              username: user.displayName,
            });

            setProgress(0);
            setFile(null);
          });
      }
    );
  };

  //starting a new meeting within chat
  function join() {
    var url = Math.random().toString(36).substring(2, 7);
    //post meeting inside db
    db.collection("meetingLink").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      meetingUrl: url,
      fullUrl: url + " " +roomId,
      roomId: roomId,
    });

    window.open(`/${url}`, "_blank");
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: "Meeting Link: https://macrohard-teams.web.app/" + url,
        name: user.displayName,
        photo: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  }

  return (
    <div id="chat_page">
      <Header />
      <div className="messenger">
        <Sidebar />
        <div id="chat_menu">
          <Scrollbars  autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}>
          <ConversationBar />
          </Scrollbars>
        </div>

        <div id="message_heading">
          {roomName}
          <VideoCallIcon
            id="video_call_icon"
            style={{ fontSize: 30 }}
            onClick={join}
          />
        </div>
        <div id="chat_box">
          <div className="chat_box_wrapper">
            <div className="chat_box_top">
              <div id="file_upload" style={{ display: "none" }}>
                <progress value={progress} max="100" />{" "}
                <CloseIcon
                  id="progress_close"
                  style={{ marginLeft: "2rem" }}
                  onClick={closeUpload}
                />
                <br />
                <input
                  style={{ marginLeft: "5rem" }}
                  type="file"
                  onChange={handleChange}
                />
                <br />
                <Button id="upload_button" onClick={handleUpload}>
                  Upload
                </Button>
              </div>

              <div id="Emoji_List" style={{ display: "none" }}>
                <Picker onSelect={(emoji) => clickEmoji(emoji.native)} />
              </div>
              <div className="chat_box_background">
                <div id="chat_box_bottom">
                  <div style={{ paddingLeft: "8vw" }}>
                    <div id="text_container">
                      <Input
                        onChange={(e) => setInput(e.target.value)}
                        id="chat_message_input"
                        placeholder="Type a new message"
                        value={input}
                      />
                    </div>
                  </div>
                  <div id="chat_send">
                    <AttachFileIcon onClick={showUpload} />
                    <SentimentVerySatisfiedIcon onClick={showEmoji} />
                    <SendIcon
                      onClick={sendText}
                      style={{ marginLeft: "50vw" }}
                    />
                  </div>
                </div>
              </div>
              <div id="messages" className="chat_messages_wrapper">
                {messages.map((message) => (
                  <div
                    className={`message ${
                      message.name == user.displayName && `message_own`
                    } `}
                  >
                    <div className="message_top">
                      <img className="message_img" src={message.photo} />

                      <div className="message_text">
                        <div
                          className="message_time"
                          style={{ fontSize: "0.6rem" }}
                        >
                          {new Date(message.timestamp?.toDate()).toString()}
                        </div>
                        {message.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
