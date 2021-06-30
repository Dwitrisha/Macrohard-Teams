import React, { useState } from "react";
import "./Message/Message.css";
import "../css/Chat.css";
import Sidebar from "../Sidebar";
import Conversation from "./Conversation/Conversation";
import CreateIcon from "@material-ui/icons/Create";
import SendIcon from "@material-ui/icons/Send";
import { Input } from "@material-ui/core";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Picker from "emoji-picker-react";
import Header from "../Header";

function showEmoji() {
  var x = document.getElementById("Emoji_List");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function Chat() {
 

  //Selecting emoji from emoji picker
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const EmojiData = ({ chosenEmoji }) =>
    (document.getElementById("chat_message_input").value += chosenEmoji.emoji);

  return (
    <div id="chat_page">
      <Header />
      <div className="messenger">
        <Sidebar />
        <div id="chat_menu">
          <div className="chat_menu_wrapper">
            <div id="chat_menu_heading">
              <div style={{ marginLeft: "1rem" }}>
                Chat
                <CreateIcon style={{ fontSize: 20, marginLeft: "12rem" }} />
              </div>
            </div>
            <Conversation />
          </div>
        </div>

        <div id="message_heading">Jane Doe</div>
        <div id="chat_box">
          <div className="chat_box_wrapper">
            <div className="chat_box_top">
              <div id="Emoji_List" style={{ display: "none" }}>
                <Picker onEmojiClick={onEmojiClick} />
                <div style={{ display: "none" }}>
                 {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
                </div>
              </div>
              <div className="chat_box_background">
                <div id="chat_box_bottom">
                  <div style={{paddingLeft:"4.8rem"}}><div id="text_container">
                    <Input
                      id="chat_message_input"
                      placeholder="Type a new message"
                    /></div>
                    
                  </div>
                  <div id="chat_send">
                    <AttachFileIcon />
                    <SentimentVerySatisfiedIcon onClick={showEmoji} />
                    <SendIcon style={{ marginLeft: "39rem" }} />
                  </div>
                </div>
              </div>
              <div id="messages" className="chat_messages_wrapper">
                <div className={`message ${true && `message_own`} `}>
                  <div className="message_top">
                    <img
                      className="message_img"
                      src="data:image/jpeg;base64,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"
                    />

                    <div className="message_text">
                      <div className="message_time">1 hour ago</div>
                      Hello World!
                      <br />
                      Hello World!
                      <br />
                      Hello World!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
