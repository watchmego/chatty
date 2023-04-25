import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./messageBox.css";

export const MessageBox = ({
  messages,
  lastMessageRef,
  socket,
  typingStatus,
}) => {
  const navigate = useNavigate();
  const { room } = useParams();

  const handleLeave = () => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("sessionID");
    sessionStorage.removeItem("userID");
    socket.emit("leave", room);
    navigate("/");
  };

  console.log(messages);
  return (
    <>
      <header className="chatHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveButton" onClick={handleLeave}>
          Leave Chat
        </button>
      </header>
      <div className="messageContainer">
        {messages.map((message) =>
          message.name === sessionStorage.getItem("name") ? (
            <div className="messageBox" key={message.key}>
              <p className="senderName">ME</p>
              <div className="messageSender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="messageBox" key={message.key}>
              <p>{message.name}</p>
              <div className="messageRecipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
        <div ref={lastMessageRef} />
        <div className="messageStatus">
          <p>{typingStatus}</p>
        </div>
      </div>
    </>
  );
};
