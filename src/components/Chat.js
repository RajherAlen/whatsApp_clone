import React, { useState, useEffect, useReducer } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import db from "../firebase";
import { useParams } from "react-router-dom";
import { useStateValue } from "../stateProvider/StateProvider";
import firebase from "firebase";
import { actionTypes } from "../stateProvider/reducer";

const Chat = () => {
  const [message, setMessage] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [dot, setDot] = useState(false);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snap) => setRoomName(snap.data()));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
    }
  }, [roomId]);

  const deleteChat = () => {
    db.collection("rooms").doc(roomId).delete();
    setDot(false);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: message,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="chat_headerInfo">
          <h3> {roomName?.name} </h3>
          <p style={{ fontSize: "12px" }}>
            Last seen{" "}
            <span style={{ fontSize: "11px" }}>
              {messages[messages.length - 1]?.timestamp?.toDate().toUTCString()}
            </span>
          </p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon onClick={() => setDot(!dot)} />
          </IconButton>
          <div className={`chat_deleteNone ${dot && "chat_delete"}`}>
            <p onClick={deleteChat}>Delete chat</p>
          </div>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              user.displayName === message.name && "chat_reciever"
            }`}
          >
            <span className="chat_name"> {message.name} </span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
