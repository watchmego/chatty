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
  console.log(messages);

  //ref to keep last message in view
  const lastMessageRef = useRef(null);
  const timeoutId = useRef(0);

  // temporary variables to initialise app
  const dispatch = useDispatch();
  const { room } = useParams();
  const [typingStatus, setTypingStatus] = useState(false);

  const sessionID = sessionStorage.getItem("sessionID");
  const userID = sessionStorage.getItem("userID");
  console.log(sessionStorage.getItem("name"));
  const name = sessionStorage.getItem("name");
  if (typeof socket.auth === "undefined") {
    socket.auth = {};
  }
  socket.auth.name = name;
  socket.auth.sessionID = sessionID;
  socket.auth.userID = userID;
  useEffect(() => {
    // const unload = event => {
    //     const e = event || window.event;
    //     e.preventDefault();

    //     console.log('beforeunload event triggered', socket);

    //             socket.emit('leave', room)
    //         socket.disconnect();
    //     return (e.returnValue =
    //       'Are you sure you want to exit?');
    //   };

    const onConnectError = (err) => {
      console.log(`connect_error due to ${err.message}`);
    };
    const onMessage = (data) => {
      dispatch(addMessage(data));
    };

    const onConnect = () => {
      console.log("connecting socket", socket.auth);
    };

    const onSession = ({ sessionID, userID }) => {
      console.log("session data received");
      socket.auth.sessionID = sessionID;
      socket.auth.userID = userID;
      sessionStorage.setItem("sessionID", sessionID);
      sessionStorage.setItem("userID", userID);
      socket.userID = userID;
      socket.emit("join", { name: name, roomName: room });
    };

    const onUserUpdate = (data) => {
      console.log("userdata", data);
      dispatch(addUser(data));
    };

    const onTyping = (message) => {
      console.log("typgin");
      if (message !== `${sessionStorage.getItem("name")} is typing`) {
        setTypingStatus(message);
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => setTypingStatus(""), 5000);
      }
    };

    socket.on("typing", onTyping);
    socket.on("userList", onUserUpdate);
    socket.on("session", onSession);
    socket.on("connect_error", onConnectError);
    socket.on("messageResponse", onMessage);
    socket.on("connect", onConnect);
    //timeout to ensure listeners are all active before connecting
    setTimeout(() => {
      console.log("connecting socket", socket);
      socket.connect({ auth: { name: name } });
    }, 500);

    //    window.addEventListener('beforeunload', unload);

    return () => {
      socket.emit("leave", room);
      socket.off("typing");
      socket.off("connect_error");
      socket.off("messageResponse");
      socket.off("connect");
      socket.off("session");
      // unload();
      socket = null;
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
          <InfoPanel socket={socket} users={users} />
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
