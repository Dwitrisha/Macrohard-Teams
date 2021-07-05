import React, { useState, useEffect } from "react";
import "./Conversation.css";
import CreateIcon from "@material-ui/icons/Create";
import db from "../firebase";
import { Link } from "react-router-dom";
import DarkMode from "../Modes/DarkMode";

function Conversation({ id, name, addNewChat }) {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter chat name:");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="conversation" id="conversation">
        <img
          className="conversation_img"
          src={`https://avatars.dicebear.com/api/identicon/${seed}.svg`}
          alt=""
        />
        <div id="convo">
          <p id="conversation_name">
            {name} <br />
            <div style={{ fontWeight: "400" }} id="conversation_message">{messages[0]?.message}</div>
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div id="chat_menu_heading">
      <div style={{ marginLeft: "0.5rem" }}>
         Chat
        <CreateIcon
          onClick={createChat}
          style={{ fontSize: 20, marginLeft: "9rem" }}
        />
      </div>
    </div>
  );
}

export default Conversation;
