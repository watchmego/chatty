import { useState } from "react";

import "./textInput.css";
import { useParams } from "react-router-dom";

export const TextInput = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const { room } = useParams();

  const handleSend = (e) => {
    e.preventDefault();
    
    if (message.trim() && sessionStorage.getItem("name")) {
      
      socket.emit("message", {
        text: message,
        id: `${socket.id}${Math.random()}`,
        name: sessionStorage.getItem("name"),
        key: Math.random(),
        roomName: room,
      });
    }
    handleTyping(true);
    setMessage("");
  };

  const handleTyping = (remove = false) => {
    
    if (!typing) {
      socket.emit("typing", sessionStorage.getItem("name"), remove, room);
      setTyping(true);
      setTimeout(() => setTyping(false), 500);
    }
  };

  return (
    <div className="textContainer">
      <form className="form" onSubmit={handleSend}>
        <textarea
          type="text"
          placeholder="Write a message..."
          className="textInput"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={() => handleTyping()}
        />
        <button type="submit" className="sendButton">
          Send
        </button>
      </form>
    </div>
  );
};
