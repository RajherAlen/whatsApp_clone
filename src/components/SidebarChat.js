import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import db from "../firebase";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, id, name }) => {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
    }
  }, [id]);

  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="sidebarChat_info">
          <h2> {name} </h2>
          <p> {messages[0]?.message}...</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
