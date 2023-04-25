import { useState } from "react";

import "./textInput.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const TextInput = ({ socket }) => {

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const { room } = useParams();
  const dispatch = useDispatch();
  
  const handleSend = (e) => {
    
    e.preventDefault();
    console.log(sessionStorage.getItem("name"));
    if (message.trim() && sessionStorage.getItem("name")) {
      dispatch({ type: 'socket/sendMessage', payload: {
        text: message,
        id: `${socket.id}${Math.random()}`,
        name: sessionStorage.getItem("name"),
        key: Math.random(),
        roomName: room,
      }});
    }
    // if (message.trim() && sessionStorage.getItem("name")) {
    //   console.log("sending message");
    //   socket.emit("message", {
    //     text: message,
    //     id: `${socket.id}${Math.random()}`,
    //     name: sessionStorage.getItem("name"),
    //     key: Math.random(),
    //     roomName: room,
    //   });
    // }
    handleTyping(true);
    setMessage("");
  };

  const handleTyping = (remove = false) => {
    console.log("handletyping called with remove", remove);
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
