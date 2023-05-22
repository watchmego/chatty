import { useState } from "react";

import "./textInput.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export const TextInput = () => {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const { room } = useParams();
  const dispatch = useDispatch();
  const aiRegex = /^[Aa][Ii](\s)/;

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() && sessionStorage.getItem("name")) {
      dispatch({
        type: "socket/sendMessage",
        payload: {
          text: message,
          name: sessionStorage.getItem("name"),
          key: Math.random(),
          roomName: room,
        },
      });
    }
    setMessage("");
  };

  //text input event handler
  const handleTyping = (input, remove = false) => {

    if(input.key === 'Enter' && !input.shiftKey) {
      input.preventDefault();
      handleSend();
      return;
    }
    setMessage(input.target.value);
    //detect whether use is messaging AI
    let regexMatch = input.target.value.match(aiRegex);

    if (regexMatch?.length > 0) {
      setMessage((message) => "AI:" + message.slice(regexMatch[0].length));
    }
    //dispatch active typer event to server
    if (!typing) {
      dispatch({
        type: "socket/typing",
        payload: { name: sessionStorage.getItem("name"), remove, room },
      });
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
          onInput={(input) => handleTyping(input)}
        />
        <button type="submit" className="sendButton">
          Send
        </button>
      </form>
    </div>
  );
};
