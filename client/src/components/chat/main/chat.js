import { useState, useEffect, useRef } from "react";
import { InfoPanel } from "../infoPanel/infoPanel";
import { MessageBox } from "../messageBox/messageBox";
import { TextInput } from "../textBox/textInput";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, addUser } from "../../../features/chat/chatSlice";

import "./chat.css";

export const Chat = ({ socket }) => {
  // const unload = (e) => {
  //     e.preventDefault();
  //     socket.emit("message",{
  //         text: "leaving room",
  //         id: `${socket.id}${Math.random()}`,
  //         name: sessionStorage.getItem('name'),
  //         key: Math.random(),
  //         roomName: room
  //     });
  //     socket.emit('leave', room)
  //     socket.disconnect();
  // }

  // const { room } = useParams();
  //chat message list
  const messages = useSelector((state) => state.messages.messageList);
  const users = useSelector((state) => state.users.userList);
  const typingStatus = useSelector((state) => state.typing.typing);
  console.log(typingStatus);
  const [aiActive, setAIActive] = useState(false);

  //ref to keep last message in view
  const lastMessageRef = useRef(null);
  const timeoutId = useRef(0);

  // temporary variables to initialise app
  const dispatch = useDispatch();
  

  const name = sessionStorage.getItem("name");
  const sessionID = sessionStorage.getItem("sessionID");
  const userID = sessionStorage.getItem("userID");

  socket.auth = {
            name: name,
            sessionID: sessionID,
            userID: userID
          }

  useEffect(() => {
    dispatch({ type: 'socket/connect', payload: socket});



    return () => {
      dispatch({ type: 'socket/disconnect', payload: socket})
      // window.removeEventListener('beforeunload', unload);
    };
  }, []);

  //scroll to last message
  useEffect(() => {
    if (messages.length > 0) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {!sessionStorage.getItem("name") ? (
        <Navigate to="/" />
      ) : (
        <div className="main">
          <InfoPanel socket={socket} users={users} ai={aiActive} />
          <div className="chatContainer">
            <MessageBox
              messages={messages}
              lastMessageRef={lastMessageRef}
              typingStatus={typingStatus}
              socket={socket}
            />
            <TextInput socket={socket} />
          </div>
        </div>
      )}
    </>
  );
};
