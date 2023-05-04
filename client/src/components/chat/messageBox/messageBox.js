import { useNavigate, useParams } from "react-router-dom";
import "./messageBox.css";
import { useDispatch } from "react-redux";

export const MessageBox = ({
  messages,
  lastMessageRef,
  handleHelp,
  typingStatus,
}) => {
  const navigate = useNavigate();
  const room = sessionStorage.getItem("room");
  const dispatch = useDispatch();

  const handleLeave = () => {
    dispatch({ type: 'socket/leave', payload: {room, sessionID: sessionStorage.getItem("sessionID")}});
    navigate("/");
  };
 
  return (
    <>
      <header className="chatHeader">
        <h2>{room}</h2>
        <div>
          <button className="mbButton" onClick={handleHelp}>
            Help
          </button>
          <button className="mbButton" onClick={handleLeave}>
            Leave Chat
          </button>
        </div>
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
